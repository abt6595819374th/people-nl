const express = require('express');
const router = express.Router();
const http = require('http');
const config = require('config');

const staticFiles = config.get('staticFiles');

router.get('/', function (req, res) {
  'use strict';

  http.get('http://localhost:3000/api/article/', (apiRes) => {
    // TODO: refactor into a service
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
        res.render('index', {articles: parsedData, staticFilesUrl: staticFiles.url});
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
});

module.exports = router;

