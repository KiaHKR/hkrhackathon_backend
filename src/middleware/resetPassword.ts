
/* Middleware used as auth guard, check if token is reset token. */
export default function (req, res, next) {
    if (!req.user.isReset) return res.status(403).send('Access denied.');
    next();
}
