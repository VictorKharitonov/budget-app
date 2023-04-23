import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export const handler = async function (event, context) {
  const dbClient = new DynamoDBClient({ region: 'eu-central-1' });

  const getItemCommand = new GetItemCommand({
    TableName: 'Users',
    Key: marshall({
      'id ': 0,
    }),
  });

  let result;
  try {
    result = await dbClient.send(getItemCommand);
  } catch (err) {
    console.log(err);
    return null;
  }
  console.log(unmarshall(result.Item));
  return result;
};

await handler();
