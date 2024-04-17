class ErrorHandler {
  constructor(res, message, statusCode) {
    this.statusCode = statusCode;
    res.status(statusCode).json(message);
  }
}

module.exports = ErrorHandler;
