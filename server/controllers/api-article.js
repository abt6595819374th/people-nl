var express = require('express');
var router = express.Router();
var Article = require('../models/article-model');

router.get('/:url', function (req, res) {
  Article.getArticle(req.params.url)
    .then(article => {
      if(!article) {
        res.status(404).send('Article not found');
      } else {
        res.send(article);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/', (req, res) => {
  Article.getArticles()
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({err: err.toString()});
    });
});


module.exports = router;
