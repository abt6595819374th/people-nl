var express = require('express');
var router = express.Router();
var Article = require('../models/article-model');

router.get('/:url', function (req, res) {
  Article.getArticle(req.params.url, function (err, article) {
    if (err) {
      res.send(500, err);
    } else if(!article) {
      res.send(404, 'Article not found');
    } else {
      res.send(article);
    }
  });
});

module.exports = router;
