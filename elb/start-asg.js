// Author: VietAWS
// Youtube Channel: VietAWS

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
    MinSize: 1,
    MaxSize: 4,
    DesiredCapacity: 2,
  };
  const command = new UpdateAutoScalingGroupCommand(input);

  const response = await client.send(command);

  const result = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return result;
};
