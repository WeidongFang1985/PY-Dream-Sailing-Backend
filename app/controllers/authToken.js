const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;


exports.auth = (req, res) => {
    const {token} = req.body;
    try {
        jwt.verify(token,JWT_KEY)
        res.status(201).json("Token is valid")
    } catch (e) {
        res.status(401).json('Token is expired')
    }
}