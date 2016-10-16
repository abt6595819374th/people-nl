var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/people-nl';

exports.getArticle = function(url) {
  return MongoClient.connect(dbUrl)
    .then(db => {
      return db.collection('articles')
        .findOne({url: url})
        .then(article => {
          db.close();
          return article;
        })
        .catch(err => {
          db.close();
          return err;
        });
    });
};
