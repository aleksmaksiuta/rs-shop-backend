import { APIGatewayEvent } from 'aws-lambda';

const logger = (handler, event: APIGatewayEvent) => {
  const {
        httpMethod,
        path,
        pathParameters,
        queryStringParameters,
        body,
    } = event;
  console.log(handler, JSON.stringify({
    httpMethod,
    path,
    pathParameters,
    queryStringParameters,
    body,
  }));
};

export default logger;
