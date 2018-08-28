

const ResponseWrapper = require('../../middlewares/response_wrapper');
const logger = require('../../utils/logger');

/**数据库
 * 
 */
const mongodber = require('../../utils/mongodber');
const blog_sjs_db = mongodber.use('blog_sjs');

function findAll(req, res) {
    let responseWrapper = new ResponseWrapper(res);
    blog_sjs_db.collection('type').find({ status: true }, { name: 1, count: 1 }).toArray().then(function (resolve, reject) {
        if (reject) {
            logger.error('type_findAll:' + reject);
            return responseWrapper.error('HANDLE_ERROR');
        }
        return responseWrapper.succ(resolve);
    });
}
module.exports = {
    findAll
}