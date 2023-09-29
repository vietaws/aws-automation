import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2'; // ES Modules import

const region = process.env.REGION || 'ap-southeast-1';
const instanceId = process.env.INSTANCE_ID || 'i-0d2ce8980753c896a';

const client = new EC2Client({
  region: region,
});

const command = new DescribeInstancesCommand({
  InstanceIds: [instanceId],
  //   DryRun: true || false,
  //   MaxResults: Number('int'),
  //   NextToken: 'STRING_VALUE',
});
const response = await client.send(command);
const status = response.Reservations[0].Instances[0].State.Name;
//status 1: stopped, pending, running
//status 2: stopping, stopped
console.log('status: ', status);
