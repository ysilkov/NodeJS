const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    if (res.err) {
        if (res.err.message.includes('not found')) {
            res.status(404);
        } else {
            res.status(400);
        }
        res.send({ error: true, message: res.err.message });
    } else if (res.data) {
        res.status(200).send(res.data);
    } else {
        next();
    }
};

exports.responseMiddleware = responseMiddleware;

