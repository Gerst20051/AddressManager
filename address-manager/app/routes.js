module.exports = app => {
  const addresses = require('./controllers/addresses');

  app.get('/', (req, res) => {
    res.send('WELCOME TO THE ADDRESS MANAGER REST API');
  });

  app.delete('/addresses/:addressId', addresses.deleteAddress);
  app.get('/addresses', addresses.getAddresses);
  app.get('/addresses/:addressId', addresses.getAddress);
  app.patch('/addresses/:addressId', addresses.updateAddress);
  app.post('/addresses', addresses.putAddress);
  app.put('/addresses/:addressId', addresses.putAddress);

  app.get('/seed', addresses.seed);
  app.get('/swagger', (req, res) => {
    res.send(require('../swagger.json'));
  });
};
