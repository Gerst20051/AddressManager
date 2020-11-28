const { v4: uuidv4 } = require('uuid');

const removeEmpty = obj => Object.keys(obj).reduce((cleanObj, key) => {
  if (obj[key] === undefined || obj[key] === null) return cleanObj;
  return Object.assign(cleanObj, { [key]: obj[key] });
}, {});

module.exports = {
  createAddress: ({
    id, line1, line2, city, state, zip, country,
  }) => removeEmpty({
    id: id || uuidv4(),
    line1,
    line2,
    city,
    state,
    zip,
    country,
  }),
};
