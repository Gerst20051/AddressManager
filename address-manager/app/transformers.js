module.exports = new function () {
  this.address = async address => ({
    id: address.id,
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });
};
