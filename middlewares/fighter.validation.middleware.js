const { fighter } = require('../models/fighter');
const isValidName = (username) => {
    const regex = /^[a-zA-Z\-]+$/;
    return !!username && regex.test(username);
}

const isValidPower = (power) => {
    return typeof(power) === 'number' && power < 100;
}
const compareLists = (a, b) => a.filter(v => !b.includes(v));

const validate = (fighterData) => {
    const { name, power } = fighterData;

    const requestFields = Object.keys(fighterData);
    const modelFields = Object.keys(fighter);

    const fieldDifference = compareLists(requestFields, modelFields);
    
    const validations = [
        !fieldDifference.length,
        !requestFields.includes('id'),
        isValidName(name),
        isValidPower(power),
    ];
    
    return validations.every(item => item === true);
}

const createFighterValid = (req, res, next) => {
    if (req.method !== 'POST') {
        return next();
    }

    const fighterData = req.body;

    const isValid = validate(fighterData);
    
    if (!isValid) {
        const err = new Error('Fighter entity to create isn\'t valid');
        err.type = 'validation';
        res.err = err;
    }

    next();
}


const updateFighterValid = (req, res, next) => {
    if (req.method !== 'PUT') {
        return next();
    }

    const fighterData = req.body;

    const isValid = validate(fighterData);
    
    if (!isValid) {
        const err = new Error('Fighter entity to update isn\'t valid');
        err.type = 'validation';
        res.err = err;
    }

    next();
}
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
