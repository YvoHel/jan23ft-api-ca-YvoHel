module.exports = (req, res, next) => {
    res.success = (result, statusCode = 200) => {
        res.status(statusCode).json({ status: 'success', data: { statusCode, result } });
    };

    res.fail = (message, statusCode = 400) => {
        res.status(statusCode).json({ status: 'fail', data: { statusCode, message } });
    };

    res.error = (message, statusCode = 500) => {
        res.status(statusCode).json({ status: 'error', data: { statusCode, message } });
    };

    next();
};


