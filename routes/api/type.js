var express = require('express');
var router = express.Router();
const type=require('../../module/type/type');
router.get('/types', type.findAll)

module.exports = router;