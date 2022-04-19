
export = function (req, res, next) {
    // AUTH(Authorization) middleware sets req.user, so we can access user here directly.
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}
