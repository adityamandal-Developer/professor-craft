// Custom HTTP Error Class which Extends Error. Use this to throw any HTTP Error only inside Controllers

class HttpError extends Error {
  constructor(status, msg, stack) {
    super(msg);
    this.status = status;
    this.name = "HttpError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.stack = stack;
  }
}

module.exports = HttpError;
