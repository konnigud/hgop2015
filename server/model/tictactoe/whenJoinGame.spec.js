/**
 * Created by konni on 9.12.2015.
 */
var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('join game command', function(){
    var given, when, then;

    it('should join game',function(){
        given= [{
            id:"1234",
            gameId: "9999",
            playerOne: "Gulli",
            playerTwo:undefined,
            createTimeStamp: "2015.12.02T11:29:44",
            name:"TheFirstGame",
            moves:[]
        }];
        when={
            id:"12345",
            comm:"JoinGame",
            gameId: "9999",
            userName : "Halli",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:50"
        };
        then=[{
            id:"12345",
            event:"GameJoined",
            userName:"Halli",
            timeStamp:"2015.12.02T11:30:50",
            game: {
                gameId: "9999",
                name:"TheFirstGame",
                playerOne: "Gulli",
                playerTwo: "Halli",
                createTimeStamp: "2015.12.02T11:29:44",
                moves:[]
            }
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });


    it('should join the right game when there are more then one game',function (){

        given= [
        {
            id:"1234",
            gameId: "9999",
            playerOne: "Gulli",
            createTimeStamp: "2015.12.02T11:24:44",
            name:"TheFirstGame",
            moves:[]
        },
        {
            id:"12345",
            gameId: "9998",
            playerOne: "Halli",
            timeStamp: "2015.12.02T11:25:44",
            name:"TheSecondGame",
            moves:[]
        }
        ];
        when={
            id:"12345",
            comm:"JoinGame",
            gameId: "9999",
            userName : "Halli",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:50"
        };
        then=[{
            id:"12345",
            event:"GameJoined",
            userName:"Halli",
            timeStamp:"2015.12.02T11:30:50",
            game: {
                gameId: "9999",
                name:"TheFirstGame",
                playerOne: "Gulli",
                playerTwo: "Halli",
                createTimeStamp: "2015.12.02T11:24:44",
                moves:[]
            }
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
            userName : "Halli",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:55"
        };
        then=[{
            id:"123456",
            event:"GameDoesNotExist",
            userName: "Halli",
            timeStamp: "2015.12.02T11:30:55",
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

});

describe('should reject joining of a full game', function(){
    var given, when, then;


    it('should not join game',function(){
        given= [{
            id:"1234",
            gameId: "9999",
            playerOne: "Gulli",
            playerTwo: "Halli",
            timeStamp: "2015.12.02T11:29:44",
            name:"TheFirstGame"
        }];
        when={
            id:"123456",
            comm:"JoinGame",
            gameId: "9999",
            userName : "Konni",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:55"
        };
        then=[{
            id:"123456",
            event:"GameIsFull",
            gameId:"9999",
            userName: "Konni",
            timeStamp: "2015.12.02T11:30:55",
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

});
