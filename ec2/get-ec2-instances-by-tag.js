// Author: VietAWS
// Youtube Channel: VietAWS

// load the SDK for JavaScript
import {
  EC2Client,
  StopInstancesCommand,
  DescribeInstancesCommand,
} from '@aws-sdk/client-ec2';

// a client can be shared by different commands.
const client = new EC2Client({ region: 'ap-southeast-1' });
//init ec2 client: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/ec2clientresolvedconfig.html

export const handler = async (event) => {
  // TODO implement

  const filters = {
    Filters: [
      {
        Name: 'tag:env',
        Values: ['demo'],
      },
    ],
  };
  //Fiter Object: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/filter.html

  const ec2InstancesCmd = new DescribeInstancesCommand(filters);
  //api ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/classes/describeinstancescommand.html
  const ec2InstancesList = await client.send(ec2InstancesCmd);

  //   const ec2InstanceIds = []
  //   ec2InstancesList.Reservations.forEach(id => {
  //     ec2InstanceIds.push(id.Instances[0].InstanceId)
  //   })

  const result = {
    statusCode: 200,
    // num: ec2InstancesList.Reservations.length,
    // ids: ec2InstanceIds,
    body: ec2InstancesList,
  };
  return result;
};
