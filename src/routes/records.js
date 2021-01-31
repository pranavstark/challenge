"use strict";

const express = require("express");
const routes = express.Router();
const recordCont = require('../controllers/records');
const validationMiddleware = require('../middlewares/records');

routes.post('/', validationMiddleware.validateReqBody, recordCont.fetchRecords);

module.exports = routes;