const {validateToken} = require('../utils/jwt');

module.exports = (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.status(401).json({error: 'missing authorization header'});
        return;
    }
    const tokenArray = authorization.split(' ');
    if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
        res.status(401).json({error: 'invalid authorization header format'});
        return;
    }
    req.user = validateToken(tokenArray[1]);
    next();
};
