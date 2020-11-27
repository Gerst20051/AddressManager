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
  getAddresses: async (search) => {
    const filters = [
      'contains(line1, :line1)',
      'contains(line2, :line2)',
      'contains(city, :city)',
      'contains(#state, :state)',
      'contains(zip, :zip)',
    ];
    const filter = {
      FilterExpression: filters.join(' or '),
      ExpressionAttributeNames: {
        '#state': 'state',
      },
      ExpressionAttributeValues: {
        ':line1': search,
        ':line2': search,
        ':city': search,
        ':state': search,
        ':zip': search,
      },
    };
    const result = await dynamoDb.scan({
      TableName: ADDRESSES_TABLE,
      ...(search ? filter : {}),
    }).promise();
    return result.Items;
  },
};
