// const logger = require('./utils/logger');
const ResponseWrapper = require('./response_wrapper');
const token = require('../utils/token');

let verify_token = function (req, res, next) {
    let responseWrapper = new ResponseWrapper(res);
    let path = ctx.request.path
    log.debug(__filename, __line(__filename), 'path: ' + path)
    //当path中包含admin和user时为false
    if (verifyPath(path)) {
        return next()
    } else {
        if (!req.header.authorization) {
            return responseWrapper.error('AUTH_ERROR', '没有token信息，请进行登录');
        } else {
            token.checkToke(req.header.authorization, res, (err, result) => {
                if (!err) {
                    next();
                }
            })
        }
    }
}





const verifyPath = function (path) {
    switch (true) {
        case /\/user\/login([\s\S])*?/.test(path):
            return true
        case /logout([\s\S])*?/.test(path):
            return true
        case /\/user\/comment\/show([\s\S])*?/.test(path):
            return true
        case /\/admin([\s\S])*?/.test(path):
            return false
        case /\/user([\s\S])*?/.test(path):
            return false
        default:
            return false;
    }
}

module.exports = verify_token;