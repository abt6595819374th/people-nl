var MongoClient = require('mongodb').MongoClient;

// Connection URL
var connect = function (cb) {
  var url = 'mongodb://localhost:27017/people-nl';
  MongoClient.connect(url, function(err, db) {
    cb(err, db);
  });
};

exports.getArticle = function(url, cb) {
  connect(function(err, db){
    if (err) {
      return cb(err);
    }
    var col = db.collection('articles');
    col.findOne({url: url}, function(err, article) {
      cb(err, article);
    });
  });

};
