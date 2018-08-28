const type = require('./api/type');
const article = require('./api/article')
function routes(app) {
    //路由模块
    //分类信息
    app.use('/api', type);
    app.use('/api', article);
}

module.exports = routes;