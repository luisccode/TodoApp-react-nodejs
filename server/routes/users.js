const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post(
    '/',
    [
        check('name', 'The Name is required').not().isEmpty(),
        check('email', 'Add a valid Email').isEmail(),
        check('password', 'The Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    userController.createUser
);

module.exports = router;
