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

const sendData = async (data) => {
  let sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  let params = {
    DelaySeconds: 0,
    MessageAttributes: {
      "Type": { DataType: "String", StringValue: "TECH_SUPPORT_REQUEST" }
    },
    MessageBody: JSON.stringify(data),
    QueueUrl: process.env.SUPPORT_QUEUE_URL
  };

  let request = new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) { reject(err); } else { resolve(data.MessageId) }
    });
  });

  await request;
};

const sendDialogData = async (payload) => {
  await sendData(getDialogData(payload));
};

exports.sendData = sendData;
exports.sendDialogData = sendDialogData;