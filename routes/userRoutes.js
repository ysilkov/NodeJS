const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', getAllUsersRoute, responseMiddleware);
router.get('/:id', getUserRoute, responseMiddleware);
router.post('/', createUserValid, createUserRoute, responseMiddleware);
router.put('/:id', updateUserValid, updateUserRoute, responseMiddleware);
router.delete('/:id', deleteUserRoute, responseMiddleware);

function getAllUsersRoute(req, res, next) {
    try {
        const result = UserService.getAll();
        if (result) {
            res.data = result;
        } else {
            throw new Error('Unexpected service error');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

function getUserRoute(req, res, next) {
    try {
        const result = UserService.search({ id: req.params.id });
        if (result) {
            res.data = result;
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

function createUserRoute(req, res, next) {
    try {
        const result = UserService.create(req.body);
        if (result) {
            res.data = { ok: true };
        } else {
            throw new Error('Unexpected service error');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

function updateUserRoute(req, res, next) {
    // Throwing 'User not found' error is responsibility of UserService
    try {
        const result = UserService.update(req.params.id, req.body);
        if (result) {
            res.data = { ok: true };
        } else {
            throw new Error('Unexpected service error');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

function deleteUserRoute(req, res, next) {
    // Throwing 'User not found' error is responsibility of UserService
    try {
        const result = UserService.delete(req.params.id);
        if (result) {
            res.data = { ok: true };
        } else {
            throw new Error('Unexpected service error');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

module.exports = router;
