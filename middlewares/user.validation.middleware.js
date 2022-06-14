const { user } = require('../models/user');
const {
    checkWithModel,
    checkRequiredKeys,
    checkAtLeastOneKey,
} = require('./helper.validation.middleware');
const { responseMiddleware } = require('./response.middleware');

const valueChecker = {
    password: password => {
        if (password.length < 3) {
            throw new Error(`Insecure password: must be at least 3 symbols`);
        }
    },
    phoneNumber: phoneNumber => {
        if (!phoneNumber.match(/^[+]380(?=[0-9]{9}$)/)) {
            throw new Error(`Wrong format: phoneNumber must be '+380XXXXXXXXX`);
        }
    },
    email: email => {
        if (!email.toLowerCase().match(/^[a-z0-9_.+]+(?=@gmail.com$)/)) {
            throw new Error(`Wrong format: email must be @gmail.com`);
        }
    },
};

const userValid = body => {
    const prohibitedKeys = ['id'];
    checkWithModel(body, user, prohibitedKeys);
    const valueCheckerKeys = Object.keys(valueChecker).filter(key => body[key]);
    valueCheckerKeys.forEach(key => valueChecker[key](body[key]));
};

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {
        const requiredKeys = ['firstName', 'lastName', 'email', 'phoneNumber', 'password'];
        checkRequiredKeys(req.body, requiredKeys);
        userValid(req.body);
        next();
    } catch (err) {
        res.err = err;
        responseMiddleware(req, res, next);
    }
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    try {
        const optionalKeys = ['firstName', 'lastName', 'email', 'phoneNumber', 'password'];
        checkAtLeastOneKey(req.body, optionalKeys);
        userValid(req.body);
        next();
    } catch (err) {
        res.err = err;
        responseMiddleware(req, res, next);
    }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
