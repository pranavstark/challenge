require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { join } = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const apiVersion = '/api/v1/';
const models = join(__dirname, 'src/models/');
const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'local';
const DB_URI = process.env.DATABASE_URI || 'http://localhost:27017';
const DB_CONN_TIMEOUT = process.env.DB_CONN_TIMEOUT || 2500; // default connection timeout

const app = express();

// load models
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

// middlewares
app.use(cors()); //on prduction origin check can be enforced
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// logger
process.env.NODE_ENV !== 'prod' && app.use(morgan('dev'));

// Register api routes
app.use(apiVersion, require('./src/routes'));

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

// connect database
connectDb();

function connectDb() {
  mongoose.connection
    .on('error', (error) => {
      console.log(`Error occured while connecting database: ${error.stack}`);
      process.exit(1);
    })
    .on('disconnected', connectDb)
    .once('open', listen);
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: DB_CONN_TIMEOUT,
  });
}

function listen(){
  if(ENV !== 'test'){
    app.listen(PORT, () => {
      console.log(`Environment: ${ENV}\napp listening on port ${PORT}`);
    });
  }
}

/**
 * Expose app
 */

module.exports = app;