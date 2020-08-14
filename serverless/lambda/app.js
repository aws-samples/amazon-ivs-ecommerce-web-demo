// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10', region: process.env.AWS_REGION});

exports.handler = async event => {
  console.log(event.queryStringParameters);
  console.log(event.requestContext);

  if (event.queryStringParameters && event.queryStringParameters.productId) {

    const getParams = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: {S: `${event.queryStringParameters.productId}`}
      }
    };

    console.log(getParams);

    try {
      let records = await ddb.getItem(getParams).promise();
      console.log(records);
      return { 
        statusCode: 200, 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: JSON.stringify(records) 
      };
    } catch (err) {
      console.log(err);
      return { 
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: 'Failed to connect: ' + JSON.stringify(err) 
      };
    }  

  } else {

    try {
      let records = await ddb.scan({ TableName: process.env.TABLE_NAME }).promise();
      console.log(records);
      return { 
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: JSON.stringify(records) 
      };
    } catch (err) {
      console.log(err);
      return { 
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: 'Failed to connect: ' + JSON.stringify(err) 
      };
    } 

  } 
};
