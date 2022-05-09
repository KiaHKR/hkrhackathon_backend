
/* Wrapper function for centralised error catching for routes. */
export default function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        }
        catch (ex) {
            next(ex);
        }
    }
}
