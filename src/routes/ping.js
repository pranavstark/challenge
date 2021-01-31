"use strict";

const express = require("express");
const routes = express.Router();
const pingCont = require("../controllers/ping");

routes.get('/', pingCont.getApiServerStatus);

module.exports = routes;