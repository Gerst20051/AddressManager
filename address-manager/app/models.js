const { v4: uuidv4 } = require('uuid');

module.exports = {
  createAddress: ({ id, line1, line2, city, state, zip }) => ({
    id: id || uuidv4(),
    line1,
    line2,
    city,
    state,
    zip,
  }),
};
