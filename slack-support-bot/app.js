exports.lambdaHandler = async (event, context) => {
  let response = {
    'statusCode': 200,
    'body': JSON.stringify({
      message: 'hello world',
      })
    };

  return response
};