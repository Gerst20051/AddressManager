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
    : undefined
);

module.exports = {
  deleteAddressById: async id => {
    const result = await dynamoDb.delete({
      TableName: ADDRESSES_TABLE,
      Key: { id },
      ReturnValues: 'ALL_OLD',
    }).promise();
    return result.Attributes;
  },
  getAddressById: async id => {
    const result = await dynamoDb.get({
      TableName: ADDRESSES_TABLE,
      Key: { id },
    }).promise();
    return result.Item;
  },
  getAddresses: async search => {
    const filters = [
      'contains(line1, :line1)',
      'contains(line2, :line2)',
      'contains(city, :city)',
      'contains(#state, :state)',
      'contains(zip, :zip)',
      'contains(country, :country)',
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
        ':country': search,
      },
    };
    const result = await dynamoDb.scan({
      TableName: ADDRESSES_TABLE,
      ...(search ? filter : {}),
    }).promise();
    return result.Items;
  },
  putAddress: async address => {
    const params = {
      TableName: ADDRESSES_TABLE,
      Item: address,
    };
    await dynamoDb.put(params).promise();
  },
  updateAddress: async address => {
    const { id, ...addressParams } = address;
    const keys = Object.keys(addressParams);
    const keysToRemove = keys.filter(param => address[param] === undefined || address[param] === '');
    const keysToSet = keys.filter(param => address[param] !== undefined && address[param].length);
    const updateExpressions = [];
    if (keysToSet.length) {
      updateExpressions.push(`set ${keysToSet.reduce((arr, key) => [...arr, `#${key} = :new${key}`], []).join(', ')}`);
    }
    if (keysToRemove.length) {
      updateExpressions.push(`remove ${keysToRemove.reduce((arr, key) => [...arr, `#${key}`], []).join(', ')}`);
    }
    const params = {
      TableName: ADDRESSES_TABLE,
      Key: { id },
      UpdateExpression: updateExpressions.join(' '),
      ExpressionAttributeNames: keys.reduce((obj, key) => Object.assign(obj, { [`#${key}`]: key }), {}),
    };
    if (keysToSet.length) {
      params.ExpressionAttributeValues = keysToSet.reduce(
        (obj, key) => Object.assign(obj, { [`:new${key}`]: addressParams[key] }), {}
      );
    }
    await dynamoDb.update(params).promise();
  },
};
