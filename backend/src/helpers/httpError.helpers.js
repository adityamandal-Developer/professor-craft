class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
    this.name = "HttpError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

module.exports = HttpError;
