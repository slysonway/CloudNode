'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('../controller').UserController;

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    const user = await UserController.getAll();
    if (user === undefined) {
        return res.status(404).end();
    }
    res.send(user);
});

module.exports = router;
