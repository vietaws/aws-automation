// Author: VietAWS
// Youtube Channel: VietAWS

// load the SDK for JavaScript
import { EC2Client, StopInstancesCommand } from '@aws-sdk/client-ec2';

// a client can be shared by different commands.
const client = new EC2Client({ region: 'ap-southeast-1' });
//init ec2 client: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/ec2clientresolvedconfig.html

export const handler = async (event) => {
  // TODO implement

  const input = {
    InstanceIds: ['i-07a4eb933c30ba6bd'],
  };
  const command = new StopInstancesCommand(input);
  //stop ec2 command: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/classes/stopinstancescommand.html
  const response = await client.send(command);
  //response msg: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/stopinstancescommandoutput.html

  const result = {
    statusCode: 200,
    body: 'Hello from VietAWS',
  };
  return result;
};
