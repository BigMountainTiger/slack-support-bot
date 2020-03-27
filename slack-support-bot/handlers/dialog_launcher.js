const axios = require('axios');
const dialog = require('../dialog_blocks/dialog');
const standardResponses = require('./standard-responses');

const launch = async (trigger_id) => {
  const token = process.env.BOT_TOKEN;
  let url = process.env.DIALOG_URL;
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
  return standardResponses.EMPTY;
}

exports.launch = launch;
