// Author: VietAWS
// Youtube Channel: VietAWS

//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

const _getAllData = async (params, startKey) => {
  if (startKey) {
    params.ExclusiveStartKey = startKey;
  }
  const res = await ddbDocClient.query(params);
  return res;
};

const handler = async (event, context) => {
  // Call using full client.
  try {
    let params = {
      TableName: 'vietaws-pk-sk-demo',
      Limit: 2,
      KeyConditionExpression: '#hkey = :hvalue',
      ProjectionExpression: 'SK, #level',
      ExpressionAttributeNames: {
        '#hkey': 'PK',
        '#level': 'level',
      },
      ExpressionAttributeValues: {
        ':hvalue': 'AWS',
      },
      ConsistentRead: false,
      ReturnConsumedCapacity: 'TOTAL',
      // ExclusiveStartKey: thisUsersScans[someRequestParamScanID]
    };
    let lastEvaluatedKey = null;
    let rows = [];
    do {
      const result = await _getAllData(params, lastEvaluatedKey);
      // rows = rows.concat(result.Items);
      lastEvaluatedKey = result.LastEvaluatedKey;
      console.log(
        `${result.Items.length} Items (RCU: ${
          result.ConsumedCapacity.CapacityUnits
        }): ${JSON.stringify(result.Items)}.`
      );
      console.log(`LastEvaluatedKey: ${JSON.stringify(lastEvaluatedKey)}`);
      // console.log(`Rows: ${JSON.stringify(rows)}`);
    } while (lastEvaluatedKey);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();

export { handler };
