const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service')

module.exports = function(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return next(ApiError.UnauthoraizedError())
        }
        const accessToken = authorization.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnauthoraizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthoraizedError())
        }
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnauthoraizedError())
    }
}