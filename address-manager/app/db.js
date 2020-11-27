const AWS = require('aws-sdk');

const {
  ADDRESSES_TABLE, IS_OFFLINE,
} = process.env;

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  IS_OFFLINE === 'true'
    ? {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    }
    : undefined,
);

module.exports = {
  getAddresses: async () => {
    const result = await dynamoDb.scan({
      TableName: ADDRESSES_TABLE,
    }).promise();
    return result.Items;
  },
};
