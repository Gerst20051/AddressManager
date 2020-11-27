const db = require('../db');
// const models = require('../models');
const transformers = require('../transformers');

module.exports = new function () {
  this.getAddresses = async (req, res) => {
    try {
      const dbAddresses = await db.getAddresses(req.query.search);
      const addresses = await Promise.all(dbAddresses.map(transformers.address));
      res.send(addresses);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };
};
