const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('config');
const bodyParser = require('body-parser');
const thenjs = require('thenjs');
const logger = require('./utils/logger');
const mongodber = require('./utils/mongodber');
const cros = require('./middlewares/cros');
const ueditor = require('ueditor');
const path = require('path');
const ResponseWrapper = require('./middlewares/response_wrapper');
var app = express();

thenjs(function (cont) {
  // 初始化基础资源数据库
  var mongodbs = config.get('MONGODBS');
  mongodber.init(mongodbs, function (err) {
    if (err) {
      logger.error(err);
      process.exit(-1);
    }
    logger.info('mongodb init success');
    cont(null, null);
  });
}).then(function (cont, err) {
  // 设置日志配置
  app.use(logger.init(config.get('LOGGING')));
  app.use(bodyParser.json({
    type: 'application/json', limit: '20480kb'
  }));
  app.use(bodyParser.urlencoded({
    extended: false, limit: '20480kb'
  }));
  app.use(cookieParser());
  app.use(express.static('public'));
  //增加跨域请求验证
  app.all('*', cros(config.get('APP').Allow_Origin));
  //路由配置
  require('./routes/index')(app);

  /**富文本编辑器文件上传 */
  app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {

    // ueditor 客户发起上传图片请求

    if (req.query.action === 'uploadimage') {

      // 这里你可以获得上传图片的信息
      var foo = req.ueditor;
      console.log(foo.filename); // exp.png
      console.log(foo.encoding); // 7bit
      console.log(foo.mimetype); // image/png

      // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
      var img_url = '/img';
      res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
      var dir_url = '/img'; // 要展示给客户端的文件夹路径
      res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }// 客户端发起其它请求
    else {
      res.setHeader('Content-Type', 'application/json');
      // 这里填写 ueditor.config.json 这个文件的路径
      res.redirect('/ueditor/ueditor.config.json')
    }
  }));
  //未匹配api
  // catch 404 and forward to error handler
  //当匹配不到路由时走这里，如果不是图标提示出现404，路由不存在，如果是图标，不做出任何相应
  app.use(function (req, res, next) {
    if (req.path != '/favicon.ico' && req.path != '/%7B%7Bentity.pic%7D%7D') {
      var err = new Error('Not Found ' + (req ? req.path : ""));
      err.status = 404;
      next(err);
    } else {
      var resWrapper = new ResponseWrapper(res);
      return resWrapper.succ({});
    }
  });
  //异常处理
  app.use(function (err, req, res, next) {
    var resWrapper = new ResponseWrapper(res);
    if (err) {
      if (err.stack)
        logger.error(err.stack);
      else
        logger.error(err.message);

      if (404 == err.status) {
        return resWrapper.error('URL_ERROR', err.message);
      } else {
        return resWrapper.error('HANDLE_ERROR', err.message);
      }
    }
  });
})
module.exports = app;
