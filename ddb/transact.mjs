//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import {
  DynamoDB,
  ReturnConsumedCapacity,
  ReturnValue,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

// Call using full client.
const handler = async (event, context) => {
  try {
    const res = await ddbDocClient.transactWrite({
      TransactItems: [
        {
          //add user
          Put: {
            TableName: 'vietaws-pk-sk-demo',
            Item: {
              PK: 'AWS',
              SK: 'new#viet',
            },
          },
        },
        {
          //increase total number of employees
          Update: {
            TableName: 'vietaws-pk-sk-demo',
            Key: {
              PK: 'AWS',
              SK: 'total',
            },
            UpdateExpression: 'SET #currentValue =  #currentValue + :val',
            ExpressionAttributeNames: {
              '#currentValue': 'num',
            },
            ExpressionAttributeValues: {
              ':val': 1,
            },
          },
        },
      ],
      ReturnValue: 'UPDATED_NEW',
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(
      // `Created item successfully!`
      `Created item successfully! WCU: ${JSON.stringify(
        res.ConsumedCapacity[0].CapacityUnits
      )}`
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();
export { handler };
