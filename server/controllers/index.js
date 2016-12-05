var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/article', require('./api-article'));

router.use('/article', require('./view-article'));

router.get('/', require('./view-index'));

module.exports = router;
