import {
  AutoScalingClient,
  UpdateAutoScalingGroupCommand,
} from '@aws-sdk/client-auto-scaling'; // ES Modules import

const client = new AutoScalingClient({ region: 'ap-southeast-1' });

export const handler = async (event) => {
  // TODO implement

  //update asg
  const input = {
    AutoScalingGroupName: 'asg-aws-automation',
    MinSize: 0,
    MaxSize: 0,
    DesiredCapacity: 0,
  };
  const command = new UpdateAutoScalingGroupCommand(input);

  const response = await client.send(command);

  const result = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return result;
};
