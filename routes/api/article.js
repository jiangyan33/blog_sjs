var express = require('express');
var router = express.Router();
const article = require('../../module/article/article');
router.get('/articles', article.findAll);

router.get('/articles/:id', article.findOne);
router.post('/articles', article.add);
module.exports = router;