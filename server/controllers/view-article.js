var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/:url', function (req, res) {
  'use strict';

  http.get('http://localhost:3000/api/article/' + req.params.url, (apiRes) => {
    const statusCode = apiRes.statusCode;
    const contentType = apiRes.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.log(error.message);
      // consume response data to free up memory
      apiRes.resume();
      res.render('error', {message: error.message});
      return;
    }

    apiRes.setEncoding('utf8');
    let rawData = '';
    apiRes.on('data', (chunk) => rawData += chunk);
    apiRes.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);
        res.render('article', parsedData);
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
});

module.exports = router;

