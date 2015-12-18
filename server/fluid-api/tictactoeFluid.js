var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _expectedEvents=[{
    "id": userApi._command.id,
    "userName": userApi._command.userName,
    "timeStamp": userApi._command.timeStamp,
    "game":{
      "gameId":userApi._command.gameId,
      "createTimeStamp":userApi._command.timeStamp,
      "moves":[],
      "playerOne":userApi._command.userName,
      "name":userApi._command.name
    }
  }];
  var _currentEvent = 0;
  var expectApi = {
    withName: function (gameName) {
      _expectedEvents[_currentEvent].game.name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
      //_expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    joinGame: function(command){
      //_expectedEvents[_currentEvent].game.playerTwo = command.userName;
      return expectApi;
    },
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .post('/api/joinGame')
            .type('json')
            .send({
              "id": "2345",
              "comm": "JoinGame",
              "gameId": "9998",
              "userName": "Gulli",
              "timeStamp" : "2014-12-02T11:29:29"
              //"timeStamp": now
            })
          .end(function (err, res) {
            if (err) return done(err);
            request(acceptanceUrl)
              .get('/api/gameHistory/' + userApi._command.gameId)
              .expect(200)
              .expect('Content-Type', /json/)
              .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                _expectedEvents);
              done();
              });
          });
        });
      return expectApi;
    },
  };

  return expectApi;
}

function user(userName) {
  var now = new Date().toISOString();
  var userApi = {
    _command: undefined,
    createsGame: function () {
      userApi._command = {
        id: "1234",
        comm: "CreateGame",
        userName: userName,
        timeStamp: now,
      };
      return userApi;
    },
    withId : function(gameId){
      userApi._command.gameId = gameId;
      return userApi;
    },
    name : function(gameName){
      userApi._command.name = gameName;
      return userApi;
    },
    joinsGame : function (gameId){
      userApi._command = {
        "id": "2345",
        "comm": "JoinGame",
        "gameId": gameId,
        "userName": userName,
        "timeStamp" : "2014-12-02T11:29:29"
        //"timeStamp": now
      };
      return userApi;
    }

  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
