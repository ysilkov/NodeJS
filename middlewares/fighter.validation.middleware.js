const { fighter } = require('../models/fighter');
const {
    checkWithModel,
    checkRequiredKeys,
    checkAtLeastOneKey,
} = require('./helper.validation.middleware');
const { responseMiddleware } = require('./response.middleware');

const valueChecker = {
    power: power => {
        if (power <= 1 || power >= 100) {
            throw new Error(`Wrong value: required range 1 < power < 100`);
        }
    },
    defense: defense => {
        if (defense <= 1 || defense >= 10) {
            throw new Error(`Wrong value: required range 1 < defense < 10`);
        }
    },
    health: health => {
        if (health <= 80 || health >= 120) {
            throw new Error(`Wrong value: required range 80 < health < 120`);
        }
    },
};

const fighterValid = body => {
    const prohibitedKeys = ['id'];
    const valueCheckerKeys = Object.keys(valueChecker).filter(key => body[key]);
    checkWithModel(body, fighter, prohibitedKeys);
    valueCheckerKeys.forEach(key => valueChecker[key](body[key]));
};

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        const requiredKeys = ['name', 'power', 'defense'];
        checkRequiredKeys(req.body, requiredKeys);
        fighterValid(req.body);
        next();
    } catch (err) {
        res.err = err;
        responseMiddleware(req, res, next);
    }
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        const optionalKeys = ['name', 'power', 'defense', 'health'];
        checkAtLeastOneKey(req.body, optionalKeys);
        fighterValid(req.body);
        next();
    } catch (err) {
        res.err = err;
        responseMiddleware(req, res, next);
    }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
