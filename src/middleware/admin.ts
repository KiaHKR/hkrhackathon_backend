
/* Middleware used as auth guard, check if token belongs to admins. */
export default function (req, res, next) {
    // AUTH(Authorization) middleware sets req.user, so we can access user here directly.
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}
