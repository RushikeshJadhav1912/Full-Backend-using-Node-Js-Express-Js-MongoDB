class ErrorHandler extends Error {
    constructor(message = "Internal Server Error", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
