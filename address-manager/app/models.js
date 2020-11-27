const { v4: uuidv4 } = require('uuid');

module.exports = {
  createAddress: ({ line1, line2, city, state, zip }) => ({
    id: uuidv4(),
    line1,
    line2,
    city,
    state,
    zip,
  }),
};
