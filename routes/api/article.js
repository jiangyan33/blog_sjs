var express = require('express');
var router = express.Router();
const article = require('../../module/article/article');
const verify=require('../../middlewares/token_middewares');


router.get('/articles',verify, article.findAll);
router.get('/articles/:id', article.findOne);
router.post('/articles', article.add);
module.exports = router;