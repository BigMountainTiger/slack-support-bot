//const axios = require('axios');

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
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      errors: errors
    })
  };
};

const collect = async (payload) => {
  let submission = payload.submission;

  let validationErrorResponse = validate(submission);
  if (validationErrorResponse) {
    return validationErrorResponse;
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    }, body: ''
  };
}

exports.collect = collect;
