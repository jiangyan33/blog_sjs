

const ResponseWrapper = require('../../middlewares/response_wrapper');
const logger = require('../../utils/logger');
const ThenJs = require('thenjs');

/**数据库
 */
const mongodber = require('../../utils/mongodber');
const blog_sjs_db = mongodber.use('blog_sjs');
/**
 * 查询所有博客
 * @param {*} req 
 * @param {*} res 
 */
function findAll(req, res) {
    let responseWrapper = new ResponseWrapper(res);
    let return_data = { total: 0, rows: [] };
    let { current_page, page_size, name } = req.query;
    if (!current_page && !page_size) {
        logger.error('参数有误');
        return responseWrapper.error('PARAMETERS_ERROR');
    }
    ThenJs(cont => {
        let skip = (current_page - 1) * page_size;
        let query = { status: true };
        if (name && name != 'undefined') {
            query['name'] = new RegExp(name, 'g');
        }
        let options = {
            "_id": 1,
            "name": 1,
            "content": 1,
            "pic": 1,
            "desc": 1,
        };
        blog_sjs_db.collection('article').find(query, options).sort({ utime: -1 }).skip(parseInt(skip)).limit(parseInt(page_size)).toArray((err, article_data) => {
            if (err) {
                logger.error('findAll:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            return_data['rows'] = article_data;
            cont(null,query);
        })
    }).then((cont, query) => {
        blog_sjs_db.collection('article').count(query, (err, count) => {
            if (err) {
                logger.error('findAll:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            return_data['total'] = count;
            return responseWrapper.succ(return_data);
        })
    }).fail((cont, err) => {
        if (err) {
            logger.error('findAll:' + err);
            return responseWrapper.error(err);
        }
    })
}
/**
 * 查询单个博客
 * @param {*} req 
 * @param {*} res 
 */
function findOne(req, res) {
    let responseWrapper = new ResponseWrapper(res);
    let id = req.params.id ? parseInt(req.params.id) : undefined;
    ThenJs(cont => {
        blog_sjs_db.collection('article').findOne({ '_id': id, status: true }, (err, article_result) => {
            if (err) {
                logger.error('findOne:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            cont(null, article_result);
        })
    }).then((cont, article_result) => {
        blog_sjs_db.collection('type').findOne({ "_id": parseInt(article_result['type_id']) }, { _id: 0, name: 1 }, (err, type_result) => {
            if (err) {
                logger.error('findOne:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            article_result['typename'] = type_result['name'];
            article_result['utime'] = article_result['utime'].toLocaleString();
            return responseWrapper.succ(article_result);
        })
    }).fail((cont, err) => {
        if (err) {
            logger.error('findOne:' + err);
            return responseWrapper.error(err);
        }
    })
}
/**
 * 添加博客
 * @param {*} req 
 * @param {*} res 
 */
function add(req, res) {
    let responseWrapper = new ResponseWrapper(res);
    let { content, lable, name, type_id } = req.body;
    let img_path = content.split('<img src=\"')[1].split('" alt')[0];
    if (img_path.search('" title')) {
        img_path = img_path.split('" title')[0];
    }
    let article = {
        name: name,
        lable: lable,
        content: content,
        ctime: new Date(),
        utime: new Date(),
        status: true,
        type_id: parseInt(type_id),
        read_num: 0,
        desc: '',
        pic: img_path,
        author: '石江山'
    }
    ThenJs(cont => {
        blog_sjs_db.collection('counter').findOneAndUpdate({ _id: 'article' }, { $inc: { number: 1 } }, (err, count) => {
            if (err) {
                logger.error('add:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            article['_id'] = count.value.number;
            cont(null);
        })
    }).then(cont => {
        blog_sjs_db.collection('article').insert(article, (err, result) => {
            if (err) {
                logger.error('add:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            if (result.ops.length == 0) {
                logger.error('add:添加博客失败');
                return responseWrapper.error('HANDLE_ERROR');
            }
            cont(null);
        })
    }).then(cont => {
        //往分类中添加一条记录
        blog_sjs_db.collection('type').findOneAndUpdate({ '_id': parseInt(type_id) }, { $inc: { count: 1 } }, (err) => {
            if (err) {
                logger.error('add:' + err);
                return responseWrapper.error('HANDLE_ERROR');
            }
            return responseWrapper.succ({});
        })
    })
}
module.exports = {
    findAll,
    findOne,
    add
}