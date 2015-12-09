/**
 * Created by konni on 9.12.2015.
 */

var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('Make move when no game exists',function(){
    var given, when, then;

    it('should not make move',function(){
        given=[];
        when={
            id:"1239",
            comm:"MakeMove",
            gameId:1,
            userName:"Gulli",
            timeStamp:"2015.12.02T11:00:10",
            coordinates:[0,0]
        };
        then=[{
            id:"1239",
            event:"GameDoesNotExist",
            userName:"Gulli",
            timeStamp:"2015.12.02T11:00:10",
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
describe('Make move on a non existant game',function(){
    var given, when, then;

    it('should not make move',function(){
        given=[{
            id:"1234",
            playerOne: "Gulli",
            createTimeStamp: "2015.12.02T11:24:44",
            name:"TheFirstGame"
        }];
        when={
            id:"1239",
            comm:"MakeMove",
            gameId:2,
            userName:"Gulli",
            timeStamp:"2015.12.02T11:00:10",
            coordinates:[0,0]
        };
        then=[{
            id:"1239",
            event:"GameDoesNotExist",
            userName:"Gulli",
            timeStamp:"2015.12.02T11:00:10",
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});

describe('Make move',function(){
    var given, when, then ;

  it('Player one makes first move',function(){
      given=[{
          playerOne: "Gulli",
          createTimeStamp: "2015.12.02T10:24:44",
          name:"TheFirstGame",
          moves:[]
      }];
      when={
          id:"1239",
          comm:"MakeMove",
          gameId:1,
          userName:"Gulli",
          timeStamp:"2015.12.02T11:00:10",
          coordinates:[0,0]
      };
      then=[{
          id:"1239",
          event:"MovedMade",
          game:{
              gameId:1,
              name:"TheFirstGame",
              playerOne:"Gulli",
              createTimeStamp:"2015.12.02T10:24:44",
              moves:[[0,0]]
          },
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Player two makes second move',function(){
    given=[{
      playerOne: "Gulli",
      playerTwo: "Halli",
      createTimeStamp: "2015.12.02T10:24:44",
      name:"TheFirstGame",
      moves:[[0,0]]
    }];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:1,
      userName:"Halli",
      timeStamp:"2015.12.02T11:00:10",
      coordinates:[0,1]
    };
    then=[{
      id:"1239",
      event:"MovedMade",
      game:{
        gameId:1,
        name:"TheFirstGame",
        playerOne:"Gulli",
        playerTwo:"Halli",
        createTimeStamp:"2015.12.02T10:24:44",
        moves:[[0,0],[0,1]]
      },
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});
