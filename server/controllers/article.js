var express = require('express');
var router = express.Router();

router.get('/1', function (req, res) {
  res.send('hello article');
});

module.exports = router;
