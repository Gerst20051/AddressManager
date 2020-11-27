const { v4: uuidv4 } = require('uuid');

module.exports = {
  createAddress: () => ({
    id: uuidv4(),
  }),
};
