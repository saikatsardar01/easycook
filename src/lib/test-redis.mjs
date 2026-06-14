import { createClient } from 'redis';

const client = createClient({
    url: 'rediss://default:fyKigVxTsj9w1ll6XPqg9TnkT4ch1WeZ@redis-14498.crce263.ap-south-1-1.ec2.cloud.redislabs.com:14498',
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