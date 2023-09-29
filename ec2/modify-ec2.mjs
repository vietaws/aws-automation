import { EC2Client, ModifyInstanceAttributeCommand } from '@aws-sdk/client-ec2'; // ES Modules
const region = process.env.REGION || 'ap-southeast-1';
const instanceId = process.env.INSTANCE_ID || 'i-0d2ce8980753c896a';
const newInstanceType = process.env.NEW_INSTANCE_TYPE || 't3.nano';

const client = new EC2Client({
  region: region,
});

const command = new ModifyInstanceAttributeCommand({
  //   Attribute: 'instanceType',
  InstanceId: instanceId, // required
  InstanceType: {
    Value: newInstanceType,
  },
});
const response = await client.send(command);
console.log('response: ', response.$metadata.httpStatusCode);
