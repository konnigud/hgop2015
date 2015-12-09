/**
 * Created by konni on 9.12.2015.
 */

var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('Make move on a non existing game',function(){
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

/*
describe('Make move',function(){
    var given, when, then ;

    it('Player one makes first move',function(){

    });

});
*/