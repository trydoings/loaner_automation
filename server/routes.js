var express = require('express');
var router = express.Router();
var users = require('./schema');

// get one user
router.get( '/:id', ...);

// add one new user
router.post( '/', ...);

module.exports = router;
