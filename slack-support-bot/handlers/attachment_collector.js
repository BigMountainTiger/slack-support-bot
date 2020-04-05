const sqs = require('./sqs_queue');

const getAttachmentData = (e) => {
  const files = [];
  for (let i = 0; i < e.files.length; i++) {
    let file = e.files[i];

    files.push({
      name: file.name,
      url_private: file.url_private,
      url_private_download: file.url_private_download
    });
  }

  let data = {
    type: 'ATTACHMENT',
    user: { id: e.user },
    jiraId: e.text,
    files: files
  };

  return data;
};

const sendAttachmentData = async (event) => {
  const data = getAttachmentData(event);
  await sqs.sendData(getAttachmentData(event));
};

exports.sendAttachmentData = sendAttachmentData;