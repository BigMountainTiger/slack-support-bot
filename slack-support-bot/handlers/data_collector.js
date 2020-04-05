const standardResponses = require('./standard-responses');
const sqs = require('./sqs_queue');

const validate = (submission) => {
  let txt_duedate = submission.txt_duedate;

  let errors = [];
  let date = Date.parse(txt_duedate);
  if (! date) {
    errors.push({
      name: 'txt_duedate',
      error: 'This is not a valid date'
    });
  } else {
    let today = new Date();
    if (date < today) {
      errors.push({
        name: 'txt_duedate',
        error: 'You need to give a future due date'
      });
    }
  }

  if (errors.length === 0) {
    return null; 
  } else {
    return { errors: errors };
  }
};

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

const collect = async (payload) => {
  let submission = payload.submission || {};

  let validationErrors = validate(submission);
  if (validationErrors) { return standardResponses.SUCCESSOBJECTRESPONSE(validationErrors); }

  const dialogData =  getDialogData(payload);
  try {
    await sqs.sendData(dialogData);
  } catch(e) {
    console.log('Unable to send dialog data to the queue\n' + JSON.stringify(dialogData));
  }
  
  return standardResponses.EMPTY;
};

exports.collect = collect;
