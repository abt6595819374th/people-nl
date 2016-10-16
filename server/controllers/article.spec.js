const controller = require('./article');
const httpMocks = require('node-mocks-http');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

function buildResponse() {
  return httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('Article controller', function() {
  it ('should return 200 OK', (done) => {
    var response = buildResponse();
    var request  = httpMocks.createRequest({
      method: 'GET',
      url: '/cow-says'
    });

    response.on('end', function() {
      expect(response.statusCode).to.eql(200);
      done();
    });

    controller.handle(request, response);
  });

  it ('should return 404 Not Found', (done) => {
    var response = buildResponse();
    var request  = httpMocks.createRequest({
      method: 'GET',
      url: '/cat-says'
    });

    response.on('end', function() {
      expect(response.statusCode).to.eql(404);
      done();
    });

    controller.handle(request, response);
  });

  // TODO: add test for 500 error
});
