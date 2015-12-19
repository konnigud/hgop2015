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
            gameId:"9999",
            user:{
              name: "Gulli",
              side: "X"
            },
            timeStamp:"2015.12.02T11:00:10",
            move:[0,0]
        };
        then=[{
            id:"1239",
            event:"GameDoesNotExist",
            user:{
              name: "Gulli",
              side: "X"
            },
            timeStamp:"2015.12.02T11:00:10",
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});

describe('Make move',function(){
    var given, when, then ;

  it('Player one makes first move',function(){
      given=[
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
        {
          id: "12345",
          gameId: "9999",
          event: "GameJoined",
          user: {
            name: "Konni",
            side: "O"
          },
          timeStamp: "2015.12.02T11:30:50",
          name: "TheFirstGame",
        }
      ];
      when={
          id:"1239",
          comm:"MakeMove",
          gameId:"9999",
          user:{
            name: "Gulli",
            side: "X"
          },
          timeStamp:"2015.12.02T11:00:10",
          move:[0,0]
      };
      then=[{
          id:"1239",
          gameId:"9999",
          event:"MoveMade",
          user:{
            name: "Gulli",
            side: "X"
          },
          timeStamp:"2015.12.02T11:00:10",
          name:"TheFirstGame",
          move:[0,0]
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Player two makes second move',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user:{
          name: "Gulli",
          side: "X"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
        move:[0,0]
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[0,1]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,1]
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});
/*
describe('Make move when not his turn',function(){
  var given, when, then ;

  it('Player one makes 2 moves in a row, should not work',function(){
    given=[{
      gameId: "9999",
      playerOne: "Gulli",
      playerTwo: "Halli",
      createTimeStamp: "2015.12.02T10:24:44",
      name:"TheFirstGame",
      moves:[[0,0]]
    }];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      userName:"Gulli",
      timeStamp:"2015.12.02T11:00:10",
      coordinates:[0,1]
    };
    then=[{
      id:"1239",
      event:"IllegalMove_NotYourTurn",
      userName:"Gulli",
      timeStamp:"2015.12.02T11:00:10",
      game:{
        gameId:"9999",
        name:"TheFirstGame",
        playerOne:"Gulli",
        playerTwo:"Halli",
        createTimeStamp:"2015.12.02T10:24:44",
        moves:[[0,0]]
      },
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Player two makes 2 consecutive moves, should not work',function(){
    given=[{
      gameId: "9999",
      playerOne: "Gulli",
      playerTwo: "Halli",
      createTimeStamp: "2015.12.02T10:24:44",
      name:"TheFirstGame",
      moves:[[0,0],[0,1]]
    }];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      userName:"Halli",
      timeStamp:"2015.12.02T11:00:10",
      coordinates:[0,2]
    };
    then=[{
      id:"1239",
      event:"IllegalMove_NotYourTurn",
      userName:"Halli",
      timeStamp:"2015.12.02T11:00:10",
      game:{
        gameId:"9999",
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
  it('Player two makes first move, should not work',function(){
    given=[{
      gameId:"9999",
      playerOne: "Gulli",
      playerTwo: "Halli",
      createTimeStamp: "2015.12.02T10:24:44",
      name:"TheFirstGame",
      moves:[]
    }];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      userName:"Halli",
      timeStamp:"2015.12.02T11:00:10",
      coordinates:[0,2]
    };
    then=[{
      id:"1239",
      event:"IllegalMove_NotYourTurn",
      userName:"Halli",
      timeStamp:"2015.12.02T11:00:10",
      game:{
        gameId:"9999",
        name:"TheFirstGame",
        playerOne:"Gulli",
        playerTwo:"Halli",
        createTimeStamp:"2015.12.02T10:24:44",
        moves:[]
      },
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
*/
describe('Illegal moves',function(){
  var given, when, then ;

  it('Move is out of bounds X-axis-to large, should not work',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[3,0]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"IllegalMove",
      user:{
        name: "Gulli",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp:"2015.12.02T11:00:10",
      move:[3,0]
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Move is out of bounds X-axis-to small, should not work',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[-1,0]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"IllegalMove",
      user:{
        name: "Gulli",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp:"2015.12.02T11:00:10",
      move:[-1,0]
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Move is out of bounds Y-axis-to large, should not work',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[2,4]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"IllegalMove",
      user:{
        name: "Gulli",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp:"2015.12.02T11:00:10",
      move:[2,4]
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Move is out of bounds Y-axis-to small, should not work',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[0,-5]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"IllegalMove",
      user:{
        name: "Gulli",
        side: "X"
      },
      name: "TheFirstGame",
      timeStamp:"2015.12.02T11:00:10",
      move:[0,-5]
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Move already played, should not work',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      },
      {
        id:"321",
        gameId:"9999",
        event:"MoveMade",
        user:{
          name:"Gulli",
          side:"X"
        },
        timeStamp:"2015.12.02T12:30:50",
        name: "TheFirstGame",
        move:[0,0]
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[0,0]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"IllegalMove",
      user:{
        name: "Konni",
        side: "O"
      },
      name: "TheFirstGame",
      timeStamp:"2015.12.02T11:00:10",
      move:[0,0]
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});

describe('End of game scenarios',function(){
  var given, when, then ;
  it('Player one wins',function(){
  given=[
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
    {
      id: "12345",
      gameId: "9999",
      event: "GameJoined",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp: "2015.12.02T11:30:50",
      name: "TheFirstGame",
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,1]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[1,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,2]
    }
  ];
  when={
    id:"1239",
    comm:"MakeMove",
    gameId:"9999",
    user:{
      name: "Gulli",
      side: "X"
    },
    timeStamp:"2015.12.02T11:00:10",
    move:[2,0]
  };
  then=[{
    id:"1239",
    gameId:"9999",
    event:"MoveMade",
    user: {
      name: "Gulli",
      side: "X"
    },
    timeStamp:"2015.12.02T11:00:10",
    name:"TheFirstGame",
    move:[2,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"Winner",
      user: {
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });


  it('Player two wins',function(){
    given=[
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
      {
        id: "12345",
        gameId: "9999",
        event: "GameJoined",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp: "2015.12.02T11:30:50",
        name: "TheFirstGame",
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user:{
          name: "Gulli",
          side: "X"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
        move:[0,0]
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
        move:[0,1]
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user:{
          name: "Gulli",
          side: "X"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
        move:[1,0]
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user: {
          name: "Konni",
          side: "O"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
        move:[1,1]
      },
      {
        id:"1239",
        gameId:"9999",
        event:"MoveMade",
        user:{
          name: "Gulli",
          side: "X"
        },
        timeStamp:"2015.12.02T11:00:10",
        move:[0,2]
      }
    ];
    when={
      id:"1239",
      comm:"MakeMove",
      gameId:"9999",
      user:{
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[2,1]
    };
    then=[{
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[2,1]
    },
      {
        id:"1239",
        gameId:"9999",
        event:"Winner",
        user:{
          name: "Konni",
          side: "O"
        },
        timeStamp:"2015.12.02T11:00:10",
        name:"TheFirstGame",
      }];


    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Draw',function(){
  given=[
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
    {
      id: "12345",
      gameId: "9999",
      event: "GameJoined",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp: "2015.12.02T11:30:50",
      name: "TheFirstGame",
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[0,1]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[1,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[1,1]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[0,2]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[2,0]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      move:[2,1]
    },
    {
      id:"1239",
      gameId:"9999",
      event:"MoveMade",
      user: {
        name: "Konni",
        side: "O"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
      move:[2,2]
    }
  ];
  when={
    id:"1239",
    comm:"MakeMove",
    gameId:"9999",
    user:{
      name: "Gulli",
      side: "X"
    },
    timeStamp:"2015.12.02T11:00:10",
    move:[1,2]
  };
  then=[{
    id:"1239",
    gameId:"9999",
    event:"MoveMade",
    user:{
      name: "Gulli",
      side: "X"
    },
    timeStamp:"2015.12.02T11:00:10",
    name:"TheFirstGame",
    move:[1,2]
  },
    {
      id:"1239",
      gameId:"9999",
      event:"Draw",
      user:{
        name: "Gulli",
        side: "X"
      },
      timeStamp:"2015.12.02T11:00:10",
      name:"TheFirstGame",
    }];


  var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
  JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});




