import { createClient } from 'redis';

const client = createClient({
    url: 'URL',
});

client.on('error', console.error);

async function run() {
    await client.connect();
    console.log('connected');

    await client.set('test', 'hello');
    const val = await client.get('test');

    console.log('value:', val);
}

run();