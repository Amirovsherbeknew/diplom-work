// backend/db/tenantConnection.js
const mongoose = require('mongoose');

const connections = {};

const getTenantConnection = (shop) => {
  if (!connections[shop]) {
    connections[shop] = mongoose.createConnection(
      `mongodb://127.0.0.1:27017/${shop}-auto-shop`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`Connection created for shop: ${shop}`);
  }
  return connections[shop];
};

module.exports = getTenantConnection;
