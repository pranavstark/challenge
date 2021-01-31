"use strict";

/**
 * Request validation
 */

const validator = require("../helpers/validator");
const code = require("../helpers/constants").code;
const HttpHelper = require("../helpers/http").HttpHelper;
const http = new HttpHelper();


const validateReqBody = (req, res, next) => {
    const rules = {
        'startDate': 'required|date',
        'endDate': `required|date|after:startDate`,
        'minCount': 'required|integer',
        'maxCount': 'required|integer|after:minCount'
    }
    validateRequest(req.body, rules, {}, res, next);
}

const validateRequest = (body, rules, customMsgs = {}, res, next) => {
    validator(body, rules, customMsgs, (err, status) => {
        if (!status) {
            /* show first error in case of multiple errors */
            let errorMsg = Object.values(err.errors)[0][0].toString();
            http.setError(code.STATUS400, 1, errorMsg);
            http.send(res);
        } else {
            next();
        }
    });
};

module.exports = {
    validateReqBody
}