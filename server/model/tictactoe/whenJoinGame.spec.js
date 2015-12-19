/**
 * Created by konni on 9.12.2015.
 */
var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('join game command', function() {
  var given, when, then;

  it('should join game', function () {
    given = [{
      id: "1234",
      gameId: "9999",
      event: "GameCreated",
      user: {
        name: "Gulli",
        side: "X",
      },
      createTimeStamp: "2015.12.02T11:29:44",
      name: "TheFirstGame",
    }];
    when = {
      id: "12345",
      comm: "JoinGame",
      gameId: "9999",
      user: {
        name: "Konni",
        side: "O"
      },
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };
    then = [{
      id: "12345",
      gameId: "9999",
      event: "GameJoined",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp: "2015.12.02T11:30:50",
      name: "TheFirstGame",
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

describe('should reject joining of a non_existing game', function(){
    var given, when, then;

    it('should not join the game',function(){
        given= [];
        when={
            id:"123456",
            comm:"JoinGame",
            gameId: "9999",
            user: {
              name: "Halli",
              side: "O"
            },
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:55"
        };
        then=[{
            id:"123456",
            event:"GameDoesNotExist",
            user: {
              name: "Halli",
              side: "O"
            },
            timeStamp: "2015.12.02T11:30:55",
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

});


