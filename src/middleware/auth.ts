import jwt from 'jsonwebtoken';

export = function (req, res, next) {
    const token = req.header('x-auth-header');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        req.user = jwt.verify(token, process.env.JWT_KEY);
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}
