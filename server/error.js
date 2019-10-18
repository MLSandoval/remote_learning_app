class ServerError {
    constructor(message, status){
        this.message = message;
        this.status = error;
    }
};

const errorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        return res.status(err.status).json({
            error: err.message
        });
    }
    console.error(err);
    res.status(500).json({
        error: 'An unexpected error occured.'
    });
};

exports.ServerError = ServerError;
exports.errorHandler = errorHandler;