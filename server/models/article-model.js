var MongoClient = require('mongodb').MongoClient;

// Connection URL
var connect = function () {
  var url = 'mongodb://localhost:27017/people-nl';
  return MongoClient.connect(url);
};

exports.getArticle = function(url) {
  return new Promise((resolve, reject) => {
      connect()
        .then(function (db) {
          db.collection('articles')
            .findOne({url: url})
            .then(article => {
              resolve(article);
            })
            .catch(err => {
              reject (err);
            });
        })
        .catch(function (err) {
          reject(err);
        });
    });
};
