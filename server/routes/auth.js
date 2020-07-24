const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
router.post(
    '/',
    [
        check('email', 'Add a valid Email').isEmail(),
        check('password', 'The Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    authController.authUser
);
router.get('/', auth, authController.getAuthUser);
module.exports = router;
