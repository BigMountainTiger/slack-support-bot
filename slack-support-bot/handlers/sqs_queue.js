const AWS = require('aws-sdk');
AWS.config.update({region: process.env.SUPPORT_QUEUE_REGION});

const getDialogData = (payload) => {
  
  let sb = payload.submission;
  let data = {
    type: 'DIALOG',
    user: payload.user,
    time: Date.now(),
    request: {
      summary: sb.txt_summary,
      description: sb.txt_description,
      affected_application: sb.sel_affected_application,
      priority: sb.sel_priority,
      duedate: sb.txt_duedate,
      justification: sb.txt_justification
    }
  };

  return data;
};

const sendDialogData = async (payload) => {
  let sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  let params = {
    DelaySeconds: 0,
    MessageAttributes: {
      "Type": { DataType: "String", StringValue: "TECH_SUPPORT_REQUEST" }
    },
    MessageBody: JSON.stringify(getDialogData(payload)),
    QueueUrl: process.env.SUPPORT_QUEUE_URL
  };

  let request = new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) { reject(err); } else { resolve(data.MessageId) }
    });
  });

  await request;
};

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
    user: e.user,
    jiraId: e.text,
    files: files
  };

  return data;
};

const sendAttachmentData = async (event) => {
  let sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  let params = {
    DelaySeconds: 0,
    MessageAttributes: {
      "Type": { DataType: "String", StringValue: "TECH_SUPPORT_REQUEST" }
    },
    MessageBody: JSON.stringify(getAttachmentData(event)),
    QueueUrl: process.env.SUPPORT_QUEUE_URL
  };

  let request = new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) { reject(err); } else { resolve(data.MessageId) }
    });
  });

  await request;
};

exports.sendDialogData = sendDialogData;
exports.sendAttachmentData = sendAttachmentData;