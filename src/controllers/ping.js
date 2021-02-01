const mongoose = require('mongoose');
const { HttpHelper } = require('../helpers/http');

const http = new HttpHelper();
const { code } = require('../helpers/constants');
const { responseMsgs } = require('../helpers/constants');

/**
* Check if server accessible and database is up.
*/

exports.getApiServerStatus = async (req, res) => {
  try {
    const db = mongoose.connection.readyState;
    if (db) {
      http.setSuccess(code.STATUS200, 0, responseMsgs.common.success);
      http.send(res);
    } else {
      throw new Error('Database connection is down');
    }
  } catch (error) {
    http.setError(code.STATUS500, 1, responseMsgs.common.error);
    http.send(res);
  }
};
