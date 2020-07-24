const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// login user
exports.authUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'user does not exist' });
        }

        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ msg: 'Incorrect password' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;

                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
    }
};
exports.getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'something is wrong' });
    }
};
