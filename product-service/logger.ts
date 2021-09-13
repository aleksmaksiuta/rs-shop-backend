const logger = (handler: any, event: any) => {
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
