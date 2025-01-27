function errorsHandler(err, req, res, next) {
    res.status(500).json({ message: err.message, details: err.stack })
}

module.exports = errorsHandler;
