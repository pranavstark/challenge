"use strict";

const mongoose = require("mongoose");
const records = mongoose.model("records");
const HttpHelper = require("../helpers/http").HttpHelper;
const http = new HttpHelper();
const code = require("../helpers/constants").code;
const responseMsgs = require("../helpers/constants").responseMsgs;

exports.getApiServerStatus = async (req, res) => {
    try {
        const db = mongoose.connection.readyState;
        if(db){
            http.setSuccess(code.STATUS200, 0, responseMsgs.common.success);
            http.send(res);
        } else {
            throw new Error(`Database connection is down`)
        }
    } catch (error){
        http.setError(code.STATUS500, 1, responseMsgs.common.error);
        http.send(res);
    }
    
}