var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var path = require('path');

app.use(require('./controllers'));

app.engine('handlebars', exphbs({defaultLayout: path.join(__dirname, '/views/layouts/main')}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// TODO: set up port in config file
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
