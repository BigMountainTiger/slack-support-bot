require('dotenv').config();

const qs = require('qs');
const standardResponses = require('./handlers/standard-responses');
const dialogLauncher = require('./handlers/dialog_launcher');
const dataCollector = require('./handlers/data_collector');

exports.lambdaHandler = async (event, context) => {
  console.log('message - im');
  console.log(event.body);
  let body = JSON.parse(event.body || '{}');
  // message.im
  response = {
    'statusCode': 200,
    'body': JSON.stringify({
        message: body
    })
  };

  return response;

  //let body = qs.parse(event.body);
  let payload = JSON.parse(body.payload || '{}');
  if (payload.type === 'dialog_submission') {
    return await dataCollector.collect(payload);
  }

  let trigger_id = body.trigger_id
  if (trigger_id) {
    return await dialogLauncher.launch(trigger_id);
  }

  return standardResponses.UNSUPPORTED;
};