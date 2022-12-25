//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

// Call using full client.
try {
  const res = await ddbDocClient.put({
    TableName: 'User',
    Item: {
      id: new Date().toISOString(),
      content: 'content from Full Client',
    },
    ConditionExpression: `attribute_not_exists(id)`,
    ReturnConsumedCapacity: 'TOTAL',
  });
  console.log(
    `Created item successfully!`
    // `Created item successfully! ${res.ConsumedCapacity.CapacityUnits}`
  );
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}

// Bare-bones DynamoDB Client
// const client = new DynamoDBClient({});
// const ddbDocClient = DynamoDBDocumentClient.from(client);

//bare-bones client
// await ddbDocClient.send(
//   new PutCommand({
//     TableName: 'User',
//     Item: {
//       id: '1',
//       content: 'content from DynamoDBDocumentClient',
//     },
//   })
// );
