"use strict";

require('dotenv').config();
const AN_ENV_VARIABLE = process.env.AN_ENV_VARIABLE;
const AWS = require('aws-sdk');

const putObjectToS3 = async (key, data) => {
    const bucket = 'logs.huge.head.li';
    
    const s3 = new AWS.S3();
    const params = { Bucket : bucket, Key : key, Body : data };
    
    await new Promise((rs, rj) => {
        s3.putObject(params, (e, r) => { if (e) { rj(e); } else { rs(r); } });
    });
    
};

const getDateString = (d) => {

  const checkZero = (data) => {
    if(data.length === 1){ data = '0' + data; }
    return data;
  };

  const day = checkZero(d.getDate().toString());
  const month = checkZero(d.getMonth().toString());
  const year = checkZero(d.getFullYear().toString());
  const hour = checkZero(d.getHours().toString());
  const minutes = checkZero(d.getMonth().toString());
  const seconds = checkZero(d.getSeconds().toString());
  const milliseconds = d.getMilliseconds().toString();

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}:${milliseconds}`;
};

exports.handler = async function(event) {
  
  const date = new Date();
  await putObjectToS3(`TECH_SUPPORT_BOT/U01023BN1MX/CREATE/${getDateString(date)}`, JSON.stringify(event));

  return {
    'statusCode': 200,
    'body': JSON.stringify({
        message: 'This is the ' + AN_ENV_VARIABLE,
        event: event
    })
  };
};