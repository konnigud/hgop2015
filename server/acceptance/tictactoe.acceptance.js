'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    console.log(acceptanceUrl);
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1234",
      gameId: "9999",
      comm: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/9999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "event": "GameCreated",
                "timeStamp": "2014-12-02T11:29:29",
                "userName": "Gulli",
                "game":{
                  "createTimeStamp":"2014-12-02T11:29:29",
                  "gameId":"9999",
                  "moves":[],
                  "name":"TheFirstGame",
                  "playerOne":"Gulli"
                }
              }]);
            done();
          });
      });
  });

   it('Should execute fluid API test', function (done) {
     var gameId = "9998";
     var pOne = "Konni";
     var pTwo = "Gulli";
     given(user(pOne).createsGame().withId(gameId).name("TheFirstGame"))
       .joinGame(user(pTwo).joinsGame(gameId))
       .expect("GameCreated")
       .isOk(done);
   });
  /*
   given(user("YourUser").createsGame("GameIdOne").named("TheFirstGame"))
   .and(user("OtherUser").joinsGame("GameIdOne"))
   .and(user("YourUser").placesMove(0,0))
   .and(user("OtherUser").placesMove(1,1))
   .andSomeMoreMovesThatLeadToVictory
   .expect("GameDraw").byUser("OtherUser").isOk(done);

   */

});
