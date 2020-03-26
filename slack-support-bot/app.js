const axios = require('axios');
const qs = require('qs');
const dialog = require('./dialog_blocks/dialog');

require('dotenv').config()
const token = process.env.BOT_TOKEN;

exports.lambdaHandler = async (event, context) => {
  let body = qs.parse(event.body);
  let trigger_id = body.trigger_id;


  let url = 'https://slack.com/api/dialog.open';
  let data = {
    "trigger_id": trigger_id,
    "dialog": dialog()
  };

  const options = {
    method: 'post',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  await axios(options);

  return {
    statusCode: 200,
    body: ''
  };
};