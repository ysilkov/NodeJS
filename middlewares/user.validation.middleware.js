const { user } = require('../models/user');


    const isValidName = (username) => {
        const regex = /^[a-zA-Z\-]+$/;
        return !!username && regex.test(username);
    }
    
    const isValidEmail = (email) => {
        const regex = /^[a-z0-9._]+\@gmail\.com$/;
        return !!email && regex.test(email.toLowerCase());
    }
    
    const isValidPhone = (phone) => {
        const regex = /^(\+380)\d{9}$/;
        return !!phone && regex.test(phone);
    }
    
    const isValidPwd = (pwd) => {
        const regex = /^[0-9a-zA-Z!@#$%^&*]{3,}$/;
        return !!pwd && regex.test(pwd);
    }
    const compareLists = (a, b) => a.filter(v => !b.includes(v));

const validate = (userData) => {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
    } = userData;
    const requestFields = Object.keys(userData);
    const modelFields = Object.keys(user);

    const fieldDifference = compareLists(requestFields, modelFields);
    
    const validations = [
        !fieldDifference.length,
        !requestFields.includes('id'),
        isValidName(firstName),
        isValidName(lastName),
        isValidEmail(email),
        isValidPhone(phoneNumber),
        isValidPwd(password),
    ];
    
    return validations.every(item => item === true);
}

// Validatior for user entity during creation
const createUserValid = (req, res, next) => {
    if (req.method !== 'POST') {
        return next();
    }

    const userData = req.body;

    const isValid = validate(userData);
    
    if (!isValid) {
        const err = new Error('User entity to create isn\'t valid');
        err.type = 'validation';
        res.err = err;
    }

    next();
}


const updateUserValid = (req, res, next) => {
    if (req.method !== 'PUT') {
        return next();
    }

    const userData = req.body;

    const isValid = validate(userData);

    if (!isValid) {
        const err = new Error('User entity to update isn\'t valid');
        err.type = 'validation';
        res.err = err;
    }
    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
