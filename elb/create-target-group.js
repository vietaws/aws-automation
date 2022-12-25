import {
  ElasticLoadBalancingV2Client,
  CreateTargetGroupCommand,
  ProtocolEnum,
  TargetTypeEnum,
} from '@aws-sdk/client-elastic-load-balancing-v2';

const client = new ElasticLoadBalancingV2Client({ region: 'ap-southeast-1' });

export const handler = async (event) => {
  // TODO implement

  //create target group
  let cmd = new CreateTargetGroupCommand({
    Name: 'my-tg1',
    TargetType: TargetTypeEnum.INSTANCE,
    Protocol: ProtocolEnum.HTTP,
    Port: 80,
    VpcId: 'vpc-0643b4895fc03615b',
  });

  const response = await client.send(cmd);

  const result = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return result;
};
