const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post(
    '/login',
    (req, res, next) => {
        try {
            // TODO: Implement login action (get the user if it exist with entered credentials)
            const email = req.body.email;
            const password = req.body.password;
            if (email && password) {
                res.data = AuthService.login({ email, password });
            } else {
                throw new Error('Please enter email and password');
            }
        } catch (err) {
            res.err = err;
        } finally {
            next();
        }
    },
    responseMiddleware,
);

module.exports = router;

