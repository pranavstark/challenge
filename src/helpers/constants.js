"use strict";

const HTTP_CODES = {
    'STATUS200': 200,
    'STATUS201': 201,
    'STATUS202': 202,
    'STATUS204': 204,
    'STATUS250': 250,
    'STATUS261': 261,
    'STATUS262': 262,
    'STATUS400': 400,
    'STATUS401': 401,
    'STATUS403': 403,
    'STATUS404': 404,
    'STATUS405': 405,
    'STATUS406': 406,
    'STATUS409': 409,
    'STATUS410': 410,
    'STATUS420': 420,
    'STATUS421': 421,
    'STATUS422': 422,
    'STATUS428': 428,
    'STATUS429': 429,
    'STATUS500': 500,
    'STATUS412': 412
};

const RESP_MSGS = {
    common:{
        success: 'Success',
        error: 'Failure'
    }
};

module.exports = {
    code: HTTP_CODES,
    responseMsgs: RESP_MSGS
}