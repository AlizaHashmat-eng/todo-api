# Serverless Function for To-Do List API

## Overview
This serverless function is implemented using Node.js and AWS Lambda. It retrieves a list of tasks from a DynamoDB table named `TasksTable` and returns them as a JSON response.

## Implementation Details

### lambdaFunction.ts
- **Language:** TypeScript
- **AWS SDK:** Used to interact with DynamoDB
- **Error Handling:** Basic error handling is implemented to catch and log errors, returning a 500 Internal Server Error response if an exception occurs.

### Setup Instructions
1. **Install Dependencies**
   ```bash
   npm install @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb
