var BoardView = Backbone.View.extend({

  initialize: function() {
    this.render();

    //this handles the clicking: first click on piece stores its data. The next click, if on another piece,
    //switches the two; if the second click is made on an empty spot, the original piece is simple moved there.
    var X = Y = 0,
      config = this.model,
      that = this,
      chop = false;
    $('rect').on('click', function(event) {
      if (X === 0 && $(event.currentTarget).attr('fill') !== 'white') {
        X = Number($(event.currentTarget).attr('config_x'));
        Y = Number($(event.currentTarget).attr('config_y'));
      } else {
        if ($(event.currentTarget).attr('fill') === 'white') {
          var x = Number($(event.currentTarget).attr('config_x'));
          var y = Number($(event.currentTarget).attr('config_y'));
          config.moveToEmptySpot(X, Y, x, y);
          X = Y = 0;
          that.initialize(); //updates view and ensures the function will continue listening (maybe there's a better way)
        } else {
          var x = Number($(event.currentTarget).attr('config_x'));
          var y = Number($(event.currentTarget).attr('config_y'));
          if (x === X && y === Y) {
            if (chop) {
              config.removePiece(x, y);
              that.chop();
              chop = false;
              X = Y = 0;
              that.initialize();
            } else {
              chop = true;
            }
          } else {
            config.switchPieces(x, y, X, Y);
            X = Y = 0;
            that.initialize();
          }
        }
      }
    });

  },

  render: function() {
    this.$el.html('');

    this.spacing = 100;
    this.width = this.model.width;
    this.height = this.model.height;
    d3.select('body').append('svg')
      .attr({
        'width': this.spacing * this.width,
        'height': this.spacing * this.height,
      })
    // it's a twenty-by-twenty grid
    this.tileIt();
  },

  //this function simply updates the View based off the state of the Model (the three matrices in BoardModel.js)
  tileIt: function() {
    d3.selectAll('rect').remove();
    d3.selectAll('text').remove();
    var redCount = blueCount = letterCount = doubleCheck = 0;
    var letterMatrix = this.model.letterMatrix;
    var blueLetters = this.model.blueLetterMatrix;
    var redLetters = this.model.redLetterMatrix;
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        d3.select('svg').append('rect').attr({
          'x': x * this.spacing,
          'y': y * this.spacing,
          'height': this.spacing,
          'width': this.spacing,
          'fill': 'white',
          'config_y': y,
          'config_x': x
        });
        if (letterMatrix[y][x] !== 0) {
          letterCount++;
          //these two IF statements ensure lonely letters, in a column or row, will not be mistaken for invalid words
          if (this.model.matrix(x, y - 1) === 0 && this.model.matrix(x, y + 1) === 0) {
            redLetters[y][x] = 1;
            doubleCheck++;
          }
          if (this.model.matrix(x - 1, y) === 0 && this.model.matrix(x + 1, y) === 0) {
            blueLetters[y][x] = 1;
            doubleCheck++;
          }
          //this IF statement ensures that a letter completely on its own will stay yellow, and not be added to the total count of letters in valid places
          if (doubleCheck === 2) {
            redCount--;
            blueCount--;
            redLetters[y][x] = 0;
            blueLetters[y][x] = 0;
          }
          doubleCheck = 0;
          d3.select('svg').append('text').attr({
            'x': x * this.spacing + this.spacing * .15,
            'y': y * this.spacing + this.spacing * .80,
            'font-size': this.spacing
          }).text(letterMatrix[y][x]);
          d3.select('svg').append('rect').attr({
            'x': x * this.spacing,
            'y': y * this.spacing,
            'height': this.spacing,
            'width': this.spacing,
            'fill': 'yellow',
            'fill-opacity': .3,
            'rx': 15,
            'ry': 15,
            'config_y': y,
            'config_x': x
          });
          if (blueLetters[y][x] === 1) {
            blueCount++;
            d3.select('svg').append('rect').attr({
              'x': x * this.spacing,
              'y': y * this.spacing,
              'height': this.spacing,
              'width': this.spacing,
              'fill': 'blue',
              'fill-opacity': .3,
              'rx': 15,
              'rc': 15,
              'config_y': y,
              'config_x': x
            });
          }
          if (redLetters[y][x] === 1) {
            redCount++;
            d3.select('svg').append('rect').attr({
              'x': x * this.spacing,
              'y': y * this.spacing,
              'height': this.spacing,
              'width': this.spacing,
              'stroke-width': 2,
              'fill': 'red',
              'fill-opacity': .3,
              'rx': 15,
              'rc': 15,
              'config_y': y,
              'config_x': x
            });
          }
          if (y === 0) {
            JSON.stringify(this.model.redLetterMatrix);
            this.model.makeBigger('top');
            JSON.stringify(this.model.redLetterMatrix);
            this.tileIt();
          }
          if (x === 0) {
            this.model.makeBigger('left');
            this.tileIt();
          }
          // if (y >= this.height - 2) {
          //   this.model.makeBigger('bottom');
          //   this.tileIt();
          // }
          // if (x >= this.width -2) {
          //   this.model.makeBigger('right');
          //   this.tileIt();
          // }
        }
      }
    }
    //at the end of this long iteration, we check to see if the counts match,
    //which would imply that all words are valid
    if (redCount + blueCount === letterCount * 2) {
      this.checkIfConnected(letterCount);
    }
  },

  //after all the words have been validated, this step makes sure they are all a part of one big body (not separate)
  checkIfConnected: function(letters) {
    var letterMatrix = [];
    for (var i = 0; i < this.model.letterMatrix.length; i++) {
      letterMatrix.push(this.model.letterMatrix[i].slice());
    }

    for (i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if (letterMatrix[i][j] !== 0) {
          var startPoint = [j, i];
          i += this.height;
          j += this.width;
        }
      }
    }
    var count = 0;
    var model = this.model;

    function crawler(point) {
      var x = point[0],
        y = point[1];
      if (letterMatrix[y] && !!letterMatrix[y][x]) {
        count++;
        letterMatrix[y][x] = 0;
        crawler([x + 1, y]);
        crawler([x - 1, y]);
        crawler([x, y + 1]);
        crawler([x, y - 1]);
      }
    }
    crawler(startPoint);
    if (count === letters) {
      this.completed();
    }
  },

  //temporary
  completed: function() {
    this.bite();
  },

  //places new piece below lowest, most to-the-right, current piece
  bite: function() {
    for (var i = this.height - 1; i >= 0; i--) {
      for (var j = this.width - 1; j >= 0; j--) {
        if (this.model.letterMatrix[i][j] !== 0) {
          this.model.addPiece(2, i + 1, this.model.randomLetter());
          this.tileIt();
          return i + 1;
        }
      }
    }
  },

  chop: function() {
    var spot = this.bite();
    this.model.addPiece(3, spot, this.model.randomLetter());
    this.model.addPiece(4, spot, this.model.randomLetter());
    this.tileIt();
  }

});
