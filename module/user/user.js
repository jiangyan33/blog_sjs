

const ResponseWrapper = require('../../middlewares/response_wrapper');
const logger = require('../../utils/logger');
const token_util = require('../../utils/token');
/**数据库
 * 
 */
const mongodber = require('../../utils/mongodber');
const blog_sjs_db = mongodber.use('blog_sjs');

function login(req, res) {
    let responseWrapper = new ResponseWrapper(res);
    let { name, password } = req.body;
    if (!name || !password) {
        return responseWrapper.error('PARAMETERS_ERROR', '请求参数错误');
    }
    let query = {
        name: name,
        password: password
    }
    blog_sjs_db.collection('user').findOne(query, (error, user_data) => {
        if (error) {
            logger.error('login:' + reject);
            return responseWrapper.error('HANDLE_ERROR');
        }
        if (user_data) {
            //登陆成功,返回客户端一个token信息
            let token = token_util.signToke(user_data);
            user_data['token'] = token;
            return responseWrapper.succ(user_data);
        } else {
            return responseWrapper.error('AUTH_FAILURE', '用户名或者密码有误');
        }
    });
}
module.exports = {
    login
}