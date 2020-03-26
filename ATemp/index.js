const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const app = express();

require('dotenv').config()

const token = process.env.BOT_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ response: 'Running'})
});

app.post('/ok', async (req, res) => {

  let body = req.body || {};
  let text = body.text;

  let blocks = [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: text
      }
		}
  ];
  
  const message = {
    response_type: 'in_channel',   
    blocks: blocks
  };

  res.json(message);
});

app.post('/actions', async (req, res) => {
  let body = req.body || {};
  let payload = JSON.parse(body.payload || '{}');

  console.log(payload);

  if (payload.type !== 'dialog_submission') {
    res.send('');
    return;
  }

  let submission = payload.submission;
  let txt_duedate = submission.txt_duedate;
  
  if (! Date.parse(txt_duedate)) {
    let validation = {
      errors: [
        {
          name: 'txt_duedate',
          error: 'This is not a valid date'
        }
      ]
    };
  
    res.json(validation);
    return;
  }

  res.send('');
});


let blocks = require('./test_blocks/block3');

app.post('/inline', async (req, res) => {
  let body = req.body || {};
  let text = body.text;

  if (! text) {
    res.json({
      response_type: 'in_channel',   
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Please give a description of the issue:* _/support dscriptions ..._'
          }
        }
      ]
    });

    return;
  }

  blocks[1].text.text = text;

  const message = {
    response_type: 'in_channel',   
    blocks: blocks
  };

  res.json(message);
});

app.post('/modal', async (req, res) => {
  let body = req.body || {};
  let trigger_id = body.trigger_id;

  let url = 'https://slack.com/api/views.open';
  let data = {
    "trigger_id": trigger_id,
    "view": require('./test_modal_blocks/view1')
  }

  const options = {
    method: 'post',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  axios(options);

  let blocks = [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: trigger_id
      }
		}
  ];
  
  const message = {
    response_type: 'in_channel',   
    blocks: blocks
  };

  res.json(message);
});

app.post('/dialog', async (req, res) => {
  let body = req.body || {};
  let trigger_id = body.trigger_id;

  let url = 'https://slack.com/api/dialog.open';
  let data = {
    "trigger_id": trigger_id,
    "dialog": require('./test_dialog-blocks/dialog1')()
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

  axios(options);
  res.send('');
});

console.log('http://localhost:5000');
const server = app.listen(5000);

