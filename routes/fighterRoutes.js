const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const {
    createFighterValid,
    updateFighterValid,
} = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', getAllFightersRoute, responseMiddleware);
router.get('/:id', getFighterRoute, responseMiddleware);
router.post('/', createFighterValid, createFighterRoute, responseMiddleware);
router.put('/:id', updateFighterValid, updateFighterRoute, responseMiddleware);
router.delete('/:id', deleteFighterRoute, responseMiddleware);

function getAllFightersRoute(req, res, next) {
    try {
        const result = FighterService.getAll();
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

function getFighterRoute(req, res, next) {
    try {
        const result = FighterService.search({ id: req.params.id });
        if (result) {
            res.data = result;
        } else {
            throw new Error('Fighter not found');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

function createFighterRoute(req, res, next) {
    try {
        const result = FighterService.create(req.body);
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

function updateFighterRoute(req, res, next) {
    // Throwing 'Fighter not found' error is responsibility of FighterService
    try {
        const result = FighterService.update(req.params.id, req.body);
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

function deleteFighterRoute(req, res, next) {
    // Throwing 'Fighter not found' error is responsibility of FighterService
    try {
        const result = FighterService.delete(req.params.id);
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
