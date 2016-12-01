const model = require('./article-model');
const httpMocks = require('node-mocks-http');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

function buildResponse() {
  return httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('Article model', function() {
  it('should fetch article from database', function (done) {
    model.getArticle('cow-says')
      .then(article => {
        try {
          expect(article.url).to.eql('cow-says');
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it('should fetch all articles from database', function (done) {
    model.getArticles()
      .then(articles => {
        try {
          expect(articles[0].url).to.eql('cow-says');
          expect(articles[1].url).to.eql('dog-says');
          done();
        } catch (err) {
          done(err);
        }
      });
  });
});
