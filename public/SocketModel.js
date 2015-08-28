var SocketModel = Backbone.Model.extend({


  initialize: function() {
    var context = this;

    // var socket = io.connect('https://hidden-chamber-2140.herokuapp.com/');
    var socket = io.connect('http://localhost:3000');
    var userId = null;
    context.startingPieces = null;

    //keeps log of all peels, most recent piece pushed to end
    context.peels = [];

    //keeps log of all splits, most recent pieces pushed to end
    context.splits = [];

    this.peeling = function() {
      console.log('client peeling');
      socket.emit('peeling');
    };

    this.splitting = function(pieceToRemove) {
      socket.emit('splitting', pieceToRemove);
    };

    this.updateTableInfo = function(userObj) {
      console.log('client', userObj);
      socket.emit('updateTableInfo', userObj);
    }

    //array containing starting pieces
    socket.on('joined', function(startingBoard) {
      console.log('socketModel recieved board: ', startingBoard);
      context.startingPieces = startingBoard;
      context.trigger('joined', startingBoard);
      //trigger show board event
    });

    //stores unique player ID, used for retrieving peel
    socket.on('userId', function(data) {
      context.userId = data;
      context.trigger('userId', data);
    });

    socket.on('peeled', function(pieceToAdd) {
      console.log('the server peeled');

      context.peels.push(pieceToAdd[userId - 1]);
      //trigger peel evepent
      context.trigger('peel', pieceToAdd);
    });

    socket.on('split', function(PiecesToAdd) {
      console.log('split was sent back from server');
      context.splits = context.splits.concat(PiecesToAdd);
      context.trigger('split', PiecesToAdd);
    });

    socket.on('another player has joined', function() {
      console.log('another player joined');
      context.trigger('playerJoined');
    });

    socket.on('peelToWin', function() {
      //display "Next peel wins!!!"
      context.trigger('peelToWin');
    });

    socket.on('You Win', function() {
      context.trigger('win');
    });

    socket.on('You Lose', function(winningBoard) {
      context.trigger('lose', winningBoard);
    });


    socket.on('player disconnected', function() {
      console.log('other player disconnected');
      context.trigger('playerDisconnected');
    });
  }

});
