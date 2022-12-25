//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

// Call using full client.
const handler = async (event, context) => {
  try {
    const res = await ddbDocClient.put({
      TableName: 'vietaws-pk-sk-demo',
      Item: {
        PK: 'viet',
        // SK: new Date().toISOString(),
        SK: '2',
        content: 'VietAWS',
      },
      ConditionExpression: `attribute_not_exists(PK) AND attribute_not_exists(SK)`,
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(
      // `Created item successfully!`
      `Created item successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();
export { handler };
