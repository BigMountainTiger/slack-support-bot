let response = {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify('This command is not recognized')
};

module.exports = response;
