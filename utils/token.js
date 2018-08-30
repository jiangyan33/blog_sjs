// const base64 = require('js-base64');
const token_secret = require('config').get('APP')['token_secret'];
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const util = require('util');
const redis = require('./redis');
const ResponseWrapper = require('../middlewares/response_wrapper');
/**
 * 数据库信息
 */
const mongodber = require('./mongodber');
const blog_sjs_db = mongodber.use('blog_sjs');
// token进行签名
function signToke(user) {
    //token 中存放的信息
    let payload = {
        userId: user._id,
        userType: user.type,
        username: user.name,
        avatar_url: user.avatar
    };
    const token = jwt.sign(payload, token_secret);
    redis.set(user['_id'], token);
    return token
}
// 验证token
function checkToke(authorization, res, callback) {
    let responseWrapper = new ResponseWrapper(res);
    jwt.verify(token, authorization, (error, decoded) => {
        if (error) {
            //token校验失败 invalid signature
            logger.error(error.message);
            responseWrapper.error('AUTH_ERROR', '用户信息认证失败');
        }
        //使用redis存储token
        redis.get(decoded.userId, (err, value) => {
            if (value) {
                return callback(null);
            } else {
                responseWrapper.error('AUTH_ERROR', '用户信息认证失败');
            }
        });
    })
}

// 删除token
function deleteToke(authorization, callback) {
    jwt.verify(token, authorization, (error, decoded) => {
        if (error) {
            logger.error(error.message);
            responseWrapper.error('AUTH_ERROR', '用户信息认证失败');
        }
        redis.del(decoded['userId']);
        callback(null);
    })

}
module.exports = {
    signToke,
    checkToke,
    deleteToke
}
const handleErr = (promise) => {
    return promise.then((data) => {
        return [null, data]
    }).catch(err => [err])
}