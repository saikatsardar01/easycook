import { createClient, RedisClientType } from 'redis';
import crypto from 'crypto';

// --- RAM CACHE SINGLETON ---
// This stores the massive 13MB recipe blob in the server's RAM
// so it only downloads from Redis ONCE per server lifetime.
interface MemoryCache {
  data: any | null;
  timestamp: number;
}

const globalForRedis = global as unknown as {
  redisInstance: RedisClientType | null;
  connectionPromise: Promise<RedisClientType> | null;
  memoryCache: MemoryCache;
};

if (!globalForRedis.memoryCache) {
  globalForRedis.memoryCache = { data: null, timestamp: 0 };
}

export async function getRedis(): Promise<RedisClientType> {
  if (globalForRedis.redisInstance?.isOpen) {
    return globalForRedis.redisInstance;
  }

  if (globalForRedis.connectionPromise) {
    return globalForRedis.connectionPromise;
  }

  globalForRedis.connectionPromise = (async () => {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      const maskedUrl = redisUrl.replace(/:[^:@]+@/, ':****@');
      console.log(`🔌 Connecting to Redis: ${maskedUrl}`);
    }

    const client = createClient({ url: redisUrl });
    client.on('error', (err) => console.log('❌ Redis Client Error:', err.message));
    
    await client.connect();
    globalForRedis.redisInstance = client as RedisClientType;
    globalForRedis.connectionPromise = null;
    return globalForRedis.redisInstance;
  })();

  return globalForRedis.connectionPromise;
}

/**
 * Enhanced Cache Helper: RAM -> REDIS -> TURSO
 */
export async function withRedisCache<T>(
  name: string,
  args: any[],
  fetcher: () => Promise<T>
): Promise<T> {
  // 1. Generate Key
  const argHash = crypto
    .createHash('md5')
    .update(JSON.stringify(args))
    .digest('hex');
  const key = `cache:${name}:${argHash}`;

  // 2. CHECK RAM FIRST (Lightning Fast)
  // Only use RAM for the "all_recipes" giant fetch to avoid downloading 13MB
  if (name === 'all_recipes') {
    const now = Date.now();
    const ramAge = (now - globalForRedis.memoryCache.timestamp) / 1000;
    
    // If RAM is fresh (< 5 minutes), return it instantly
    if (globalForRedis.memoryCache.data && ramAge < 300) {
      return globalForRedis.memoryCache.data as T;
    }
  }

  try {
    const redis = await getRedis();
    const cachedValue = await redis.get(key);

    if (cachedValue) {
      const { data, timestamp } = JSON.parse(cachedValue);
      const age = (Date.now() - timestamp) / 1000;

      // Update RAM Cache if this is the giant fetch
      if (name === 'all_recipes') {
        globalForRedis.memoryCache = { data, timestamp: Date.now() };
      }

      // If fresh enough (< 24h), return
      if (age < 86400) {
        return data as T;
      }
    }

    // 3. FALLBACK TO DATABASE (Slowest)
    const freshData = await fetcher();
    
    // Save to Redis
    await redis.set(
      key,
      JSON.stringify({ data: freshData, timestamp: Date.now() }),
      { EX: 87000 }
    );

    // Update RAM Cache
    if (name === 'all_recipes') {
      globalForRedis.memoryCache = { data: freshData, timestamp: Date.now() };
    }

    return freshData;
  } catch (err: any) {
    console.error('Redis cache error, falling back to RAM or DB:', err.message);
    
    // Emergency RAM fallback: If Redis is down, use whatever we have in RAM
    if (name === 'all_recipes' && globalForRedis.memoryCache.data) {
      return globalForRedis.memoryCache.data as T;
    }
    
    return fetcher();
  }
}