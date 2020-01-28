'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const AuthController = require('../controller').AuthController;

const router = express.Router();
router.use(bodyParser.json());

router.post('/register', async (req, res, next) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.date || !req.body.password) {
        return res.status(400).end();
    }
    const auth = await AuthController.register(req.body.firstname, req.body.lastname, req.body.email, req.body.date, req.body.password);
    if (auth === undefined) {
        return res.status(409).end();
    }

    res.status(201).json(auth);
});

router.post('/login', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).end();
    }

    const auth = await AuthController.login(req.body.email, req.body.password);

    if (auth === undefined) {
        return res.status(409).end();
    }
    res.send(auth);
});

module.exports = router;
