"use strict";

require("dotenv").config();

const express = require("express"),
    mongoose = require("mongoose"),
    fs = require("fs"),
    join = require("path").join,
    bodyParser = require("body-parser"),
    cors = require("cors"),
    morgan = require("morgan"),
    apiVersion = "/api/v1/",
    models = join(__dirname, 'src/models/'),
    PORT = process.env.PORT || 4000,
    ENV = process.env.NODE_ENV || "local",
    DB_URI = process.env.DATABASE_URI || "http://localhost:27017",
    DB_CONN_TIMEOUT = process.env.DB_CONN_TIMEOUT || 2500; //default connection timeout


const app = express();

//load models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));


//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

//logger
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));


//Register api routes
app.use(apiVersion, require('./src/routes/'));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

//connect database
connectDb();

function listen() {
    app.listen(PORT, () => {
        console.log(`Environment: ${ENV}\napp listening on port ${PORT}`);
    });
}

function connectDb() {
    mongoose.connection
        .on("error", error => {
            console.log(`Error occured while connecting database: ${error.stack}`);
            process.exit(1);
        })
        .on("disconnected", connectDb)
        .once("open", listen);
    return mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: DB_CONN_TIMEOUT
    })
}