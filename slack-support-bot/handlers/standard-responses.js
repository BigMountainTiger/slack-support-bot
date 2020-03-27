const UNSUPPORTED = {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify('This command is not recognized')
};

const EMPTY = {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  }, body: ''
};

const SUCCESSRESPONSE = (body) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  };
};

exports.UNSUPPORTED = UNSUPPORTED;
exports.EMPTY = EMPTY;
exports.SUCCESSRESPONSE = SUCCESSRESPONSE;
