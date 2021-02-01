class HttpHelper {
  constructor() {
    this.statusCode = null;
    this.code = null;
    this.msg = null;
    this.records = null;
  }

  setSuccess(statusCode, code, msg, records) {
    this.statusCode = statusCode;
    this.code = code;
    this.msg = msg;
    this.records = records;
  }

  setError(statusCode, code, msg) {
    this.statusCode = statusCode;
    this.code = code;
    this.msg = msg;
  }

  send(res) {
    const result = {
      code: this.code,
      msg: this.msg,
    };
    if (this.code === 0 && Array.isArray(this.records)) result.records = this.records;
    return res.status(this.statusCode).json(result);
  }
}

module.exports = {
  HttpHelper,
};
