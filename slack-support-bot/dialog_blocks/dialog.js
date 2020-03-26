let getDialog = () => {
  let date = new Date();
  date.setDate(date.getDate() + 14);

  let duedate = date.toLocaleDateString();

  let dialog = {
    "callback_id": "ryde-46e2b0",
    "title": "SUBMIT A REQUEST",
    "submit_label": "Request",
    "notify_on_cancel": false,
    "state": "Limo",
    "elements": [
      {
        "type": "textarea",
        "label": "ISSUE DESCRIPTION",
        "name": "txt_description",
        "placeholder": "Please give a description of the issue",
        "optional": false
      },
      {
        "label": "AFFECTED APPLICATION",
        "type": "select",
        "name": "sel_affected_application",
        "placeholder": "Please choose an affected application",
        "options": [
          {
            "label": "Accounting",
            "value": "Accounting"
          },
          {
            "label": "Admin",
            "value": "Admin"
          },
          {
            "label": "CRM",
            "value": "CRM"
          },
          {
            "label": "DMAP",
            "value": "DMAP"
          }
        ]
      },
      {
        "label": "PRIORITY",
        "type": "select",
        "value": "NORMAL",
        "name": "sel_priority",
        "placeholder": "Please choose a priority",
        "options": [
          {
            "label": "NORMAL",
            "value": "NORMAL"
          },
          {
            "label": "CRITICAL",
            "value": "CRITICAL"
          }
        ]
      },
      {
        "type": "text",
        "label": "DUE DATE",
        "value": duedate,
        "name": "txt_duedate",
        "placeholder": "MM/DD/YYYY"
      },
      {
          "type": "textarea",
          "label": "JUSTIFICATION",
          "name": "txt_justification",
          "optional": true
      },
    ]
  };

  return dialog;
}

exports = getDialog;