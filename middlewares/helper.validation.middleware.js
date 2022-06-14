const checkNonZeroArrayError = (arr, subject, reason) => {
    if (arr.length > 0) {
        throw new Error(`${subject}: [${arr.join(', ')}] ${reason}`);
    }
};

const checkWithModel = (body, model, modelProhibitedKyes) => {
    const modelKeys = Object.keys(model);
    const bodyKeys = Object.keys(body);
    checkNonZeroArrayError(
        bodyKeys.filter(key => modelProhibitedKyes.includes(key)),
        'Wrong fields',
        'must not be used',
    );
    checkNonZeroArrayError(
        bodyKeys.filter(key => !modelKeys.includes(key)),
        'Wrong fields',
        'not in the model',
    );
    checkNonZeroArrayError(
        bodyKeys.filter(key => !body[key]),
        'Missing value',
        'must be not empty',
    );
    checkNonZeroArrayError(
        bodyKeys
            .filter(key => !(typeof body[key] == typeof model[key]))
            .map(key => `${key}(${typeof model[key]})`),
        'Wrong type',
        'must be correct',
    );
};

const checkRequiredKeys = (body, modelRequiredKeys) => {
    const bodyKeys = Object.keys(body);
    checkNonZeroArrayError(
        modelRequiredKeys.filter(key => !bodyKeys.includes(key)),
        'Missing fields',
        'must be present',
    );
};

const checkAtLeastOneKey = (body, optionalKeys) => {
    const optionalKeysInBody = Object.keys(body).filter(key => optionalKeys.includes(key));
    if (optionalKeysInBody.length == 0) {
        checkNonZeroArrayError(optionalKeys, 'Missing fields', 'must be present at least one');
    }
};

exports.checkWithModel = checkWithModel;
exports.checkRequiredKeys = checkRequiredKeys;
exports.checkAtLeastOneKey = checkAtLeastOneKey;
