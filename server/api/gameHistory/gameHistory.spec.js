'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function () {

  it('should respond with JSON array with created events for game', function (done) {
    var command =     {
      id : "1234",
      gameId:1,
      comm: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .get('/api/gameHistory/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "event": "GameCreated",
                "userName": "Gulli",
                "timeStamp": "2014-12-02T11:29:29",
                "game":{
                  "createTimeStamp":"2014-12-02T11:29:29",
                  "gameId":1,
                  "moves":[],
                  "name":"TheFirstGame",
                  "playerOne":"Gulli"
                }
              }]);
            done();
          });
      });
  });
});