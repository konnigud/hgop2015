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
      userName:"Gulli",
      timeStamp:"2015.12.02T11:29:44",
      game:{
        gameId:1,
        name:"TheFirstGame",
        playerOne:"Gulli",
        createTimeStamp:"2015.12.02T11:29:44",
        moves:[]
      }
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
      timeStamp: "2015.12.02T11:29:20",
      moves:[]
    };
    then = [{
      id: "12347",
      event: "GameCreated",
      userName:"Halli",
      timeStamp:"2015.12.02T11:29:20",
      game:{
        gameId:1,
        name:"TheFirstGame",
        playerOne:"Halli",
        createTimeStamp:"2015.12.02T11:29:20",
        moves:[]
      }
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });


  it('Adding a new game when games already exists',function(){
    given = [
      {
        playerOne: "Gulli",
        name: "TheFirstGame",
        createTimeStamp: "2015.12.02T10:29:20"
      },
      {
        playerOne: "Halli",
        name: "TheSecondGame",
        createTimeStamp: "2015.12.02T11:15:20"
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
      userName:"Konni",
      timeStamp:"2015.12.02T12:29:20",
      game:{
        gameId:3,
        name:"TheThirdGame",
        playerOne:"Konni",
        createTimeStamp:"2015.12.02T12:29:20",
        moves:[]
      }
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});


