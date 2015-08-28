var SocketModel = Backbone.Model.extend({


  initialize: function() {
    var context = this;

    // var socket = io.connect('https://pacific-caverns-9735.herokuapp.com/');
    var socket = io.connect('http://localhost:3000');

    this.peeling = function() {
      console.log('client peeling');
      socket.emit('peeling');
    };

    this.splitting = function(pieceToRemove) {
      socket.emit('splitting', pieceToRemove);
    };

    this.updateTableInfo = function(userObj) {
      socket.emit('updateTableInfo', userObj);
    }

    //array containing starting pieces
    socket.on('joined', function(startingBoard) {
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
      context.trigger('peel', pieceToAdd);
    });

    socket.on('split', function(piecesToAdd) {
      console.log('split was sent back from server', piecesToAdd);
      context.trigger('split', piecesToAdd);
    });

    socket.on('dashboardUpdate', function(data) {
      console.log(data);
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
