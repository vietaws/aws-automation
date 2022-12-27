import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'; // ES Modules import
// const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm"); // CommonJS import
const client = new SSMClient({ region: 'ap-southeast-1' });
const handler = async () => {
  const command = new GetParameterCommand({ Name: 'vietaws' });
  const response = await client.send(command);

  console.log('Response: ' + JSON.stringify(response.Parameter.Value));
};

handler();
