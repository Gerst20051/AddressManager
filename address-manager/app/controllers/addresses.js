const validate = require('validate.js');

const db = require('../db');
const models = require('../models');
const transformers = require('../transformers');

const constraints = {
  line1: {
    length: {
      minimum: 1,
    },
    presence: {
      allowEmpty: false,
    },
    type: 'string',
  },
  line2: {
    type: 'string',
  },
  city: {
    length: {
      minimum: 1,
    },
    presence: {
      allowEmpty: false,
    },
    type: 'string',
  },
  state: {
    length: {
      maximum: 3,
      minimum: 2,
    },
    presence: {
      allowEmpty: false,
    },
    type: 'string',
  },
  country: {
    length: {
      maximum: 3,
      minimum: 2,
    },
    type: 'string',
  },
  zip: {
    length: {
      maximum: 12,
      minimum: 1,
    },
    presence: {
      allowEmpty: false,
    },
    type: 'string',
  },
};

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

  this.putAddress = async (req, res) => {
    try {
      const validationErrors = validate(req.body, constraints, { format: 'flat' });
      if (validationErrors) {
        return res.status(400).send(validationErrors);
      }
      const { addressId } = req.params;
      if (addressId) {
        req.body.id = addressId;
      }
      const rawAddress = models.createAddress(req.body);
      await db.putAddress(rawAddress);
      const dbAddress = await db.getAddressById(rawAddress.id);
      const address = await transformers.address(dbAddress);
      res.send(address);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };

  this.seed = async (req, res) => {
    try {
      const seedAddresses = require('../../seeds/addresses.json');
      const rawAddresses = seedAddresses.map(models.createAddress);
      await Promise.all(rawAddresses.map(db.putAddress));
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };

  this.updateAddress = async (req, res) => {
    try {
      const validationConstraints = Object.keys(req.body).reduce(
        (bodyConstraints, key) => Object.assign(bodyConstraints, { [key]: constraints[key] }), {}
      );
      const validationErrors = validate(req.body, validationConstraints, { format: 'flat' });
      if (validationErrors) {
        return res.status(400).send(validationErrors);
      }
      const { addressId } = req.params;
      const rawAddress = models.createAddress({
        ...req.body,
        id: addressId,
      });
      await db.updateAddress(rawAddress);
      const dbAddress = await db.getAddressById(rawAddress.id);
      const address = await transformers.address(dbAddress);
      res.send(address);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };
}();
