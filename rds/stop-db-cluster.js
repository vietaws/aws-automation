// Author: VietAWS
// Youtube Channel: VietAWS

import { RDSClient, StopDBClusterCommand } from '@aws-sdk/client-rds'; // ES Modules import

const client = new RDSClient({
  region: 'ap-southeast-1',
});

export const handler = async (event) => {
  // TODO implement

  const inputDBCluster = {
    DBClusterIdentifier: 'aurora-sls-dev',
  };
  const inputDBInstance = {
    DBInstanceIdentifier: 'aws-rds-mysql-dms-demo',
  };

  const command = new StopDBClusterCommand(inputDBCluster);
  // const command = new StopDBInstanceCommand(inputDBInstance)
  const response = await client.send(command);

  const result = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return result;
};
