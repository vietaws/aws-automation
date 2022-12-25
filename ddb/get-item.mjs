//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

const handler = async (event, context) => {
  // Call using full client.
  try {
    const res = await ddbDocClient.query({
      TableName: 'vietaws-pk-sk-demo',
      KeyConditionExpression: '#hkey = :hvalue AND #rkey = :rvalue',
      ExpressionAttributeNames: {
        '#hkey': 'PK',
        '#rkey': 'SK',
      },
      ExpressionAttributeValues: {
        ':hvalue': 'viet',
        ':rvalue': '2',
      },
      // ConsistentRead: true,
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(`Items: ${JSON.stringify(res.Items)}`);
    console.log(
      // `Created item successfully!`
      `Get item successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();

export { handler };
