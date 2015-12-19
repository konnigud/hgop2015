var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('create game command', function() {
  var given, when, then;

  it('should create game', function () {
    given = [];
    when = {
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
    then = [{
      id: "1234",
      gameId: "9999",
      event: "GameCreated",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:29:44",
      name:"TheFirstGame",
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another user another time', function () {
    given = [];
    when = {
      id: "12347",
      comm: "CreateGame",
      gameId: "9999",
      user:{
        name: "Konni",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:20",
    };
    then = [{
      id: "12347",
      gameId: "9999",
      event: "GameCreated",
      user:{
        name: "Konni",
        side: "X"
      },
      timeStamp:"2015.12.02T11:29:20",
      name:"TheFirstGame",
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });


  it('Adding a new game when games already exists',function(){
    given = [
      {
        id: "1234",
        gameId: "9999",
        event: "GameCreated",
        user:{
          name: "Gulli",
          side: "X"
        },
        timeStamp: "2015.12.02T11:29:44",
        name: "TheFirstGame"
      },
    ];
    when = {
      id: "12349",
      gameId: "9997",
      comm: "CreateGame",
      user:{
        name: "Konni",
        side: "X"
      },
      name: "TheThirdGame",
      timeStamp: "2015.12.02T12:29:20"
    };
    then = [{
      id: "12349",
      gameId: "9997",
      event: "GameCreated",
      user:{
        name: "Konni",
        side: "X"
      },
      timeStamp:"2015.12.02T12:29:20",
      name:"TheThirdGame"
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});


