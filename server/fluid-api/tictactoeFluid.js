var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _userApi = userApi;
  var _expectedEvents= [];
  var _currentEvent = 0;
  var expectApi = {
    withName: function (gameName) {
      _expectedEvents[_currentEvent-1].name = gameName;
      return expectApi;
    },
    withId: function(gameId){
      _expectedEvents[_currentEvent-1].gameId = gameId;
      return expectApi;
    },
    withMove:function(x,y){
      _expectedEvents[_currentEvent-1].move = [x,y];
      return expectApi;
    },
    expect: function (eventName) {
      _expectedEvents.push({
        "id": _userApi._command.id,
        "gameId":_userApi._command.gameId,
        "user": _userApi._command.user,
        "event":eventName,
        "timeStamp": _userApi._command.timeStamp,
      });
      _currentEvent++;
      return expectApi;
    },
    and: function(userApi){
      _userApi = userApi;
      return expectApi;
    },
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
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
      return expectApi;
    },
  };

  return expectApi;
}

function user(user) {
  var now = new Date().toISOString();
  var userApi = {
    _command: [],
    createsGame: function (gameId, gameName) {
      userApi._command = {
        id: "1234",
        gameId: gameId,
        comm: "CreateGame",
        user:user,
        timeStamp: now,
        name: gameName
      };
      request(acceptanceUrl)
        .post('/api/createGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return err;
          for(var i = 0; i<res.body.length;i++){
            userApi.response.push(res.body);
          }
        });
      return userApi;
    },
    joinsGame: function(gameId){
      userApi._command = {
        id: "1235",
        gameId: gameId,
        comm: "JoinGame",
        user:user,
        timeStamp: now,
      };
      request(acceptanceUrl)
        .post('/api/joinGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return (err);
        });
      return userApi;
    },
    makesMove: function(gameId,x,y){
      userApi._command = {
        id: "12356",
        gameId: gameId,
        comm: "MakeMove",
        user:user,
        timeStamp: now,
        move:[x,y]
      };
      request(acceptanceUrl)
        .post('/api/placeMove')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return (err);
        });
      return userApi;
    },
    response:[]
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
