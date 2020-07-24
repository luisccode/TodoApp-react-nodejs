const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "There isn't token, invalid permission" });
    }
    try {
        const encryption = jwt.verify(token, process.env.SECRET_KEY);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'invalid token' });
    }
};
