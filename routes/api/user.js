var express = require('express');
var router = express.Router();
const type=require('../../module/type/type');
router.post('/users', type.login);

module.exports = router;