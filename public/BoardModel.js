var Board = Backbone.Model.extend({

  split: function(letter) {
    console.log('split', letter);
    this.get('socket').splitting(letter);

    this.storage.pieces.splice(this.storage.pieces.indexOf(letter), 1);
    this.storage.splits++;
  },

  peel: function() {
    this.get('socket').peeling();
    this.storage.peels++;

  },

  sendTableInfo: function(userObj) {
    this.get('socket').updateTableInfo(userObj);
  },

  initialize: function() {
    var context = this;

    this.storage = {};

    //creates new instance of socketIO to sync individual client events with server
    this.set('socket', new SocketModel());
    var socket = this.get('socket');

    $('.user-form').submit(function(event) {
      event.preventDefault();
      var username = $('.username').val().replace(/</g, '');
      if (username.length > 30) {
        context.storage.username = username.slice(0, 30) + '...';
      } else {
        context.storage.username = username.slice(0, 30);
      }
      $('.user-form-container').remove();
      $('.dashboard-container').show();

      context.storage.peels = 0;
      context.storage.splits = 0;

      setInterval(function() {
        context.sendTableInfo(context.storage)
      }, 1000);

    });


    //*listening for socket events
    socket.on('joined', function(startingBoard) {
      this.storage.pieces = startingBoard;

      //need to arrange storage.pieces to the board and make BoardView Rerender
      for (var i = 0; i < 3; i++) {
        this.letter(7 + i * 2, 4, this.storage.pieces[i]);
      }

      for (i = 0; i < 4; i++) {
        this.letter(6 + i * 2, 5, this.storage.pieces[i + 3]);
      }

      this.trigger('start');

    }, this);

    socket.on('userId', function(id) {
      this.storage.userId = id;
    }, this);

    socket.on('peel', function(pieceToAdd) {
      console.log('board piece added', pieceToAdd[this.storage.userId - 1])
      this.addPeel(pieceToAdd[this.storage.userId - 1]);
    }, this);

    socket.on('split', function(PiecesToAdd) {
      console.log('new pieces', PiecesToAdd);
      var spot = this.addPeel(PiecesToAdd[0]);
      this.addPiece(3, spot, PiecesToAdd[1]);
      this.addPiece(4, spot, PiecesToAdd[2]);
      this.storage.pieces = this.storage.pieces.concat(PiecesToAdd);
    }, this);

    socket.on('updateTableInfo', function(tableInfo, lettersLeft) {

      $(".table-rows").detach();

      $(".pool").html('Letters remaining: ' + lettersLeft);

      for (var key in tableInfo) {

        var username = tableInfo[key]['username'];
        var peels = tableInfo[key]['peels'];
        var splits = tableInfo[key]['splits'];
        var row = $('<tr class="table-rows">' +
          '<td class="user">' + username + '</td>' +
          '<td class="peels">' + peels + '</td>' +
          '<td class="splits">' + splits + '</td>' +
          '< /tr>');


        $('.dashboard-table').append(row);

      }
    }, this);

    socket.on('playerJoined', function() {

    }, this);

    socket.on('peelToWin', function() {

    }, this);

    socket.on('win', function() {

    }, this);

    socket.on('lose', function(winningBoard) {

    }, this);

    socket.on('playerDisconnected', function() {

    }, this);






    //These functions operate on one or all of the three 10 - by - 10 matrices used as our Models, and built at the bottom of initialize(scroll down).
    // (0,0) is the coordinate of the top-left-most spot in each matrix.
    //The most important matrix is the "letterMatrix," which holds a value of zero where there are no tiles placed, and values of the letter itself, where it is placed
    //The redLetterMatrix keeps track of valid column-wise words, each letter of each valid is a '1'. The blueLetterMatrix does the same for row-wise words.

    this.width = 20;
    this.height = 15;

    this.switchPieces = function(x, y, X, Y) {
      var hold = this.letter(x, y);
      this.addPiece(x, y, this.letter(X, Y));
      this.addPiece(X, Y, hold);
    };

    this.moveToEmptySpot = function(x, y, X, Y) {
      var hold = this.removePiece(x, y);
      this.addPiece(X, Y, hold);
    };

    this.addPiece = function(x, y, value) {
      this.letter(x, y, value);
      this.colorWord(x, y);
    };

    this.addPeel = function(value) {
      for (var i = this.height - 1; i >= 0; i--) {
        for (var j = this.width - 1; j >= 0; j--) {
          if (this.matrix[i][j].letter !== 0) {
            this.letter(2, i + 1, value);
            this.colorWord(2, i + 1);
            return i + 1;
          }
        }
      }
    }

    this.removePiece = function(x, y) {
      var piece = this.letter(x, y);
      this.letter(x, y, 0);
      this.matrix[y][x].row = 0;
      this.matrix[y][x].col = 0;
      this.updateWords(x, y);
      return piece;
    };

    //updateWords is used by the removePiece function, as, when a piece is removed from the board, any piece that was in contact with it is effected...
    this.updateWords = function(x, y) {
      this.colorWord(x + 1, y);
      this.colorWord(x - 1, y);
      this.colorWord(x, y + 1);
      this.colorWord(x, y - 1);
    };

    this.words = lexicon;
    
    this.checkWord = function(word) {
      for (var i = 0; i < this.words.length; i++) {
        if (this.words[i] === word) {
          return true;
        }
      }
      return false;
    };

    //an important function for the matrix: works as both GET and SET for letters, depending on whether a third argument is passed
    this.letter = function(x, y, value) {
      if (value !== undefined) {
        this.matrix[y][x].letter = value;
      } else if (x < this.width && x > -1 && y < this.height && y > -1) {
        return this.matrix[y][x].letter;
      } else {
        return 0;
      }
    };

    //these four functions take in the output of the 'grab' functions below, using the data to properly alter the two ancillary matrices (redLetterMatrix and blueLetterMatrix)

    this.deactivateCol = function(word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0],
          y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].col = 0;
        }
      }
    };
    this.activateCol = function(word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0],
          y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].col = 1;
        }
      }
    };

    this.deactivateRow = function(word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0],
          y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].row = 0;
        }
      }
    };

    this.activateRow = function(word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0],
          y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].row = 1;
        }
      }
    };

    // counts the amount of letters on the board that have not passed both the row- and column-wise word inspection tests
    this.countLettersLeft = function() {
      var count = 0;
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          if (this.matrix[y][x].letter !== 0 && !(this.matrix[y][x].row === 1 && this.matrix[y][x].col === 1)) {
            count++;
          }
        }
      }
      return count;
    };


    //takes in the coordinates of a piece, and checks the scrabble-validity of both the row- and column- word of which it is a part, and colors them accordingly.
    this.colorWord = function(x, y) {
      var rowWord = this.grabRowWord(x, y);
      var colWord = this.grabColWord(x, y);
      if (rowWord) {
        if (this.checkWord(rowWord[0])) {
          this.activateRow(rowWord);
        } else {
          this.deactivateRow(rowWord);
        }
      }
      if (colWord) {
        if (this.checkWord(colWord[0])) {
          this.activateCol(colWord);
        } else {
          this.deactivateCol(colWord);
        }
      }
    };


    //first while loop moves to the first letter in the potential word in which the letter (x, y) sits
    //second while loop iterates from the first letter to last, building the letters into a string, which is placed as the first element in the returned array.
    //the other elements of the array are tuples of the position of each letter in the potential word (this can be done more efficiently)
    this.grabRowWord = function(x, y) {
      if (this.letter(x, y) === 0) {
        return;
      }
      var atFirstLetter = this.letter(x - 1, y) === 0 ? true : false;
      while (atFirstLetter === false) {
        x--;
        atFirstLetter = this.letter(x - 1, y) === 0 ? true : false;
      }
      var string = this.letter(x, y);
      var result = [string, [x, y]];
      var atLastLetter = this.letter(x + 1, y) === 0 ? true : false;
      while (atLastLetter === false) {
        x++;
        result[0] += this.letter(x, y);
        result.push([x, y]);
        atLastLetter = this.letter(x + 1, y) === 0 ? true : false;
      }
      return result;
    };
    this.grabColWord = function(x, y) {
      if (this.letter(x, y) === 0) {
        return;
      }
      var atFirstLetter = this.letter(x, y - 1) === 0 ? true : false;
      while (atFirstLetter === false) {
        y--;
        atFirstLetter = this.letter(x, y - 1) === 0 ? true : false;
      }
      var string = this.letter(x, y);
      var result = [string, [x, y]];
      var atLastLetter = this.letter(x, y + 1) === 0 ? true : false;
      while (atLastLetter === false) {
        y++;
        result[0] += this.letter(x, y);
        result.push([x, y]);
        atLastLetter = this.letter(x, y + 1) === 0 ? true : false;
      }
      return result;
    };


    this.makeEmptyMatrix = function(width, height) {
      var i, j, matrix = [];
      for (i = 0; i < height; i++) {
        var row = [];
        for (j = 0; j < width; j++) {
          row.push({
            letter: 0,
            row: 0,
            col: 0
          });
        }
        matrix.push(row);
      }
      return matrix;
    }

    this.makeBigger = function(type) {
      if (type === 'top') {
        for (var y = this.height - 1; y >= 0; y--) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y + 1][x] = this.matrix[y][x];
              this.matrix[y][x] = {
                letter: 0,
                row: 0,
                col: 0
              };
            }
          }
        }
      } else if (type === 'bottom') {
        for (var y = 0; y <= this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y - 1][x] = this.matrix[y][x];
              this.matrix[y][x] = {
                letter: 0,
                row: 0,
                col: 0
              };
            }
          }
        }
      } else if (type === 'left') {
        for (var y = this.height - 1; y >= 0; y--) {
          for (var x = this.width - 1; x >= 0; x--) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y][x + 1] = this.matrix[y][x];
              this.matrix[y][x] = {
                letter: 0,
                row: 0,
                col: 0
              };
            }
          }
        }
      } else if (type === 'right') {
        for (var y = this.height - 1; y >= 0; y--) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y][x - 1] = this.matrix[y][x];
              this.matrix[y][x] = {
                letter: 0,
                row: 0,
                col: 0
              };
            }
          }
        }
      }
    }

    this.frequency = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z"];
    this.randomLetter = function() {
      return this.frequency[Math.floor(Math.random() * this.frequency.length)];
    };

    this.matrix = this.makeEmptyMatrix(this.width, this.height);

  }
});
