import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

class TaskService {
  private dbClient: DynamoDBClient;
  private tableName: string;

  constructor(tableName: string) {
    this.dbClient = new DynamoDBClient({});
    this.tableName = tableName;
  }

  async getTasks(): Promise<any[]> {
    const command = new ScanCommand({ TableName: this.tableName });
    const response = await this.dbClient.send(command);
    return response.Items?.map(item => unmarshall(item)) || [];
  }
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const taskService = new TaskService('TasksTable');
    const tasks = await taskService.getTasks();

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};