var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('create game command', function() {
  var given, when, then;

  it('should create game', function () {
    given = [];
    when = {
      id: "1234",
      comm: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };
    then = [{
      id: "1234",
      event: "GameCreated",
      gameId: 1,
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      name: "TheFirstGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another user another time', function () {
    given = [];
    when = {
      id: "12347",
      comm: "CreateGame",
      userName: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:20"
    };
    then = [{
      id: "12347",
      event: "GameCreated",
      gameId: 1,
      userName: "Halli",
      timeStamp: "2015.12.02T11:29:20",
      name: "TheFirstGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Adding a new game when games already exists',function(){
    given = [{
      id: "12347",
      comm: "CreateGame",
      playerOne: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T10:29:20"
      },
      {
        id: "12348",
        comm: "CreateGame",
        playerOne: "Halli",
        name: "TheSecondGame",
        timeStamp: "2015.12.02T11:15:20"
      }];
    when = {
      id: "12349",
      comm: "CreateGame",
      userName: "Konni",
      name: "TheThirdGame",
      timeStamp: "2015.12.02T12:29:20"
    };
    then = [{
      id: "12349",
      event: "GameCreated",
      gameId: 3,
      userName: "Konni",
      timeStamp: "2015.12.02T12:29:20",
      name: "TheThirdGame"
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});


