// https://api.slack.com/tutorials/working-with-files

require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const Readable = require('stream').Readable;

const BOT_TOKEN = process.env.BOT_TOKEN;

// const { WebClient } = require('@slack/web-api');
// const web = new WebClient(BOT_TOKEN);


(async () => {
  let url = 'https://files.slack.com/files-pri/T010BMADEAY-F0117H5QZCM/a.jpeg';
  //url = 'https://files.slack.com/files-pri/T010BMADEAY-F0117H5QZCM/download/a.jpeg';
  let options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + BOT_TOKEN
    },
    responseType: 'stream',
    url: url,
  };
  
  let res = await axios(options);
  let data = res.data;

  let form = new FormData();

  form.append('file', data);
  url = 'https://song-li-experiment.atlassian.net/rest/api/2/issue/SLE-57/attachments';
  options = {
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'nocheck',
      'content-type': `multipart/form-data; boundary=${form._boundary}`
    },
    auth: { username: 'da_tou_li@yahoo.com', password: 'BQBR3jOpcPRnnwqiuek28358' },
    data: form,
    url: url,
  };
  
  res = await axios(options);

  console.log(res.data);  

})();
