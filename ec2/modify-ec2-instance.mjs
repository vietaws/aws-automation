//script name: vertical scaling amazon ec2
//Author: Viet Tran
//Email: hello@viet.vn

/*
    1. stop ec2 and check is it stopped?
    2. check stopped before modifying ec2 instance to new instance type
    3. check stopped before starting ec2 and inform success/failure status
*/

import {
  EC2Client,
  StopInstancesCommand,
  StartInstancesCommand,
  DescribeInstancesCommand,
  ModifyInstanceAttributeCommand,
} from '@aws-sdk/client-ec2';

const region = process.env.REGION || 'ap-southeast-1';
const instanceId = process.env.INSTANCE_ID || 'i-0d2ce8980753c896a';
const newInstanceType = process.env.NEW_INSTANCE_TYPE || 't3.micro';

const client = new EC2Client({
  region: region,
});

const stopEc2Instance = async () => {
  const command = new StopInstancesCommand({
    InstanceIds: [instanceId],
    //   Hibernate: true || false,
    //   DryRun: true || false,
    Force: true,
  });
  const response = await client.send(command);
};
const checkEc2InstanceStatus = async () => {
  const command = new DescribeInstancesCommand({
    InstanceIds: [instanceId],
    //   DryRun: true || false,
    //   MaxResults: Number('int'),
    //   NextToken: 'STRING_VALUE',
  });
  const response = await client.send(command);
  const status = response.Reservations[0].Instances[0].State.Name;
  return status;
  //status 1: stopped, pending, running
  //status 2: stopping, stopped
};

const modifyEc2InstanceType = async () => {
  const command = new ModifyInstanceAttributeCommand({
    //   Attribute: 'instanceType',
    InstanceId: instanceId, // required
    InstanceType: {
      Value: newInstanceType,
    },
  });
  const response = await client.send(command);
  const status = response.$metadata.httpStatusCode;
  return status;
};

const startEc2Instance = async () => {
  const command = new StartInstancesCommand({
    InstanceIds: [instanceId],
    //   DryRun: true || false
  });
  await client.send(command);
};

const waitForStatus = async (status) => {
  let ec2Status = await checkEc2InstanceStatus();
  let time = 0;
  //status: stopped or running
  while (ec2Status !== status) {
    await new Promise((resolver) => setTimeout(resolver, 3000));
    time += 3;
    ec2Status = await checkEc2InstanceStatus();
    const msg = status === 'stopped' ? 'stopping' : 'running';
    console.log(
      `--- Current status is: ${ec2Status}. Wait for ${msg} in ${time} seconds... `
    );
  }
};

export const handler = async () => {
  //stop the ec2
  console.log(`*** STOP AMAZON EC2 INSTANCE! ***`);
  await stopEc2Instance();
  await waitForStatus('stopped');
  console.log(`--- EC2 InstanceId ${instanceId} has stopped gracefully!`);
  console.log(`*** MODIFY AMAZON EC2 INSTANCE! ***`);
  let statusCode = await modifyEc2InstanceType();
  if (statusCode === 200) {
    console.log(`--- Modified to new instance type: ${newInstanceType}`);
    console.log(`*** START AMAZON EC2 INSTANCE! ***`);
    await startEc2Instance();
    await waitForStatus('running');
    console.log(
      `--- The EC2 instance is RUNNING has new instance type ${newInstanceType}`
    );
  } else {
    console.log(`--- ERROR`);
  }
};

handler();
