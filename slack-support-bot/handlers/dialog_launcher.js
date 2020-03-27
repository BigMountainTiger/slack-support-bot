const axios = require('axios');
const dialog = require('../dialog_blocks/dialog');

const launch = async (trigger_id) => {
  const token = process.env.BOT_TOKEN;
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
    headers: {
      'Content-Type': 'application/json'
    }, body: ''
  };
}

exports.launch = launch;
