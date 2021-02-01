const express = require('express');

const routes = express.Router();

routes.use('/ping', require('./ping')); // check app status
routes.use('/records', require('./records'));

module.exports = routes;
