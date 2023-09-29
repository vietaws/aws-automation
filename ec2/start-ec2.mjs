import { EC2Client, StartInstancesCommand } from '@aws-sdk/client-ec2'; // ES

const region = process.env.REGION || 'ap-southeast-1';
const instanceId = process.env.INSTANCE_ID || 'i-0d2ce8980753c896a';

const client = new EC2Client({
  region: region,
});
const command = new StartInstancesCommand({
  InstanceIds: [instanceId],
  //   DryRun: true || false
});
const response = await client.send(command);

console.log('response: ', response);
