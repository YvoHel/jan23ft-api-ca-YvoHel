module.exports = (req, res, next) => {
    res.success = (result) => {
        res.json({ status: 'success', data: { statusCode: 200, result } });
    };

    res.fail = (message) => {
        res.json({ status: 'fail', data: { statusCode: 400, message } });
    };

    res.error = (message) => {
        res.json({ status: 'error', data: { statusCode: 500, message } });
    };

    next();
};
