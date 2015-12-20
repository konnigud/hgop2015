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
      user:{
        name: "Gulli",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
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
                id: "1234",
                gameId: "9999",
                event: "GameCreated",
                user:{
                  name: "Gulli",
                  side: "X"
                },
                timeStamp:"2015.12.02T11:29:44",
                name:"TheFirstGame",
              }]);
            done();
          });
      });
  });

   it('Should execute fluid API test', function (done) {
     var gameId = "9998";
     var gameName = "TheFirstGame";
     var pOne = {
       name:"Konni",
       side:"X"
     };
     var pTwo = {
       name:"Gulli",
       side:"O"
     };
     given(user(pOne).createsGame(gameId,gameName)).expect("GameCreated").withName(gameName)
       .and(user(pTwo).joinsGame(gameId)).expect("GameJoined")
       .and(user(pOne).makesMove(gameId,0,0)).expect("MoveMade").withName(gameName).withMove(0,0)
       .and(user(pTwo).makesMove(gameId,1,0)).expect("MoveMade").withName(gameName).withMove(1,0)
       .and(user(pOne).makesMove(gameId,0,1)).expect("MoveMade").withName(gameName).withMove(0,1)
       .and(user(pTwo).makesMove(gameId,1,1)).expect("MoveMade").withName(gameName).withMove(1,1)
       .and(user(pOne).makesMove(gameId,1,2)).expect("MoveMade").withName(gameName).withMove(1,2)
       .and(user(pTwo).makesMove(gameId,0,2)).expect("MoveMade").withName(gameName).withMove(0,2)
       .and(user(pOne).makesMove(gameId,2,0)).expect("MoveMade").withName(gameName).withMove(2,0)
       .and(user(pTwo).makesMove(gameId,2,2)).expect("MoveMade").withName(gameName).withMove(2,2)
       .and(user(pOne).makesMove(gameId,2,1)).expect("MoveMade").withName(gameName).withMove(2,1)
       .expect("Draw").withName(gameName)
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
