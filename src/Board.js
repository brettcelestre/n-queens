// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        // console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        // console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        // console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    // This function returns the whole row
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
    // Toggles the squares value between 1 and 0
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    // Moves down diagonally to the right one square
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
    // Moves down diagonally to the left one square
    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },
    // Checks all of the squares in a row
    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },
    // Checks both rook and diagonal conflicts
    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var result = false;   // Creates a flag
      var allRows = this.rows();    // Sets allRows to all of the rows using .rows()
      var inspectionRow = allRows[rowIndex];  
      var counter = 0;    // Creates a counter
      // loop through parent array
      for (var i = 0; i < inspectionRow.length; i++) {    // Iterate over all rows
        // // if any indexs are set to 1,
        if (inspectionRow[i] === 1) {   // Checks
          //console.log('inspectionRow[i]', inspectionRow[i]);
          counter++;
        }
      }
      console.log('Counter', counter);
      return counter >= 2; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;
      var allRows = this.rows();
      //loop through array of rows
      for (var i = 0; i < allRows.length; i++) {
        //make counter to increment for each row
        var rowCounter = 0;
        //loop through inner array (row)
        for (var j = 0; j < allRows[i].length; j++) {
          //if any rows has a '1', then increment rowCounter
          if (allRows[i][j] === 1) {
            rowCounter++;
          }
        }
        if (rowCounter >= 2) {
          result = true;
        }
      }
      return result; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Review hasAnyColConflict's function, take out recursive subroutine
      // and replace rowCount with colIndex and just iterate once over that
      var result = false;
      //boardLength stores the width of the board
      var boardLength = this.get('n');
      //make an array of the board rows
      var allRows = this.rows();
      for( var i = 0; i < allRows.length; i++) {
        var currentCount = 0;
        if (allRows[i][colIndex] === 1) {
          currentCount++;
        }
        if (currentCount >= 2) {
          result = true;
        }
      }
      return result;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      //boardLength stores the width of the board
      var boardLength = this.get('n');
      //the current row we are checking as we go through the rows
      var rowCount = 0;
      //make an array of the board rows
      var allRows = this.rows();
      //loop through all of the rows (uses rowCount)
      //'i' = the current column spot
      for( var i = 0; i < allRows.length; i++) {
        //checks the amount of queens in the curent column
        var currentCount = 0;
        //subroutine that iterates through the rows and checks the same column
        var colCheck = function(num) {
          //base case
          if (num === 0) {
            return;
          }
          //checks whether current column in this row = 1.
          if (allRows[rowCount][i] === 1) {
            currentCount++;
          }
          //increments the row forward by one index
          rowCount++;
          num--;
          colCheck(num);
        };
        //invoke colCheck with boardLength which decides how many times to recurse
        colCheck(boardLength);
        if (currentCount >= 2) {
          result = true;
        }
        //reset to '0' before the loop's next iteration
        rowCount = 0;
      }
      return result;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var result = false;




      return false; // fixme
    },

      // [0, 1, 0, 0],
      // [0, 0, 1, 0],
      // [0, 0, 0, 1],
      // [0, 0, 0, 0]

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var result = false;   // Sets up a results boolean
      var allRows = this.rows();    // Saves all of the boards rows in allRows
      var colIndex = 0;   // Stores colIndex
      var rowIndex = 0;   // Stores rowIndex
      var rowCount = 0;
      var colCount = 0;
      var boardLength = this.get('n');  // Stores the length of of the board
      var rowIncrementSystem = function(amount) {
        if ( amount === boardLength ){
          return;
        }
        for( var i = 0; i < allRows.length; i++) {    // Iterate over all of the rows
          // Stores the current amount of queens in this column
          var currentCount = 0;
          colCount = i;
          //var colCount = parseInt(colCountHolder);
          // Checks if any of the top rows contain any 1's
          if (allRows[rowIndex][i] === 1) {

            // Subroutine that iterates through the rows
            var colCheck = function(num) {
              // Base case, checks if num is zero or if we've run off the board
              if (num === 0 || allRows[rowCount][colCount] === undefined) {
                return;
              }
              // Checks whether current column in this row = 1.
              if (allRows[rowCount][colCount] === 1) {
                currentCount++;   // Increments the current number of queens
              }
              colCount++;   // Increments the col forward by one index
              rowCount++;   // Increments the row forward by one index
              num--;        // Decrements num
              colCheck(num);  // Recursivily calls colCheck with the current num amount
            };
            //invoke colCheck with boardLength which decides how many times to recurse
            colCheck(boardLength);
            if (currentCount >= 2) {    // Checks if there are more than 1 queens in the 
              result = true;            // diagonal row, sets results to true
            }
          }
          // colCount++;
        }
        
        rowIndex++;
        rowIncrementSystem(rowIndex);
      };
      rowIncrementSystem(rowIndex);
      return result; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var result = false;


      return result;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var result = false;
      var result = false;   // Sets up a results boolean
      var allRows = this.rows();    // Saves all of the boards rows in allRows
      var colIndex = allRows.length - 1;   // Stores colIndex
      var rowIndex = 0;   // Stores rowIndex
      var rowCount = 0;
      var colCount = allRows.length - 1;
      var boardLength = this.get('n');  // Stores the length of of the board
      for( var i = allRows.length-1; i > 0; i--) {    // Iterate over all of the rows
        // Stores the current amount of queens in this column
        var currentCount = 0;
        // Checks if any of the top rows contain any 1's
        if (allRows[rowIndex][colIndex] === 1) {
          // Subroutine that iterates through the rows and checks the next column down
          var colCheck = function(num) {
            // Base case, checks if num is zero or if we've run off the board
            if (num === 0 || allRows[rowCount][colCount] === undefined) {
              return;
            }
            // Checks whether current column in this row = 1.
            if (allRows[rowCount][colCount] === 1) {
              currentCount++;   // Increments the current number of queens
            }
            colCount--;   // Decrements the col forward by one index
            rowCount++;   // Increments the row forward by one index
            num--;        // Decrements num
            colCheck(num);  // Recursivily calls colCheck with the current num amount
          };
          //invoke colCheck with boardLength which decides how many times to recurse
          colCheck(boardLength);
          if (currentCount >= 2) {    // Checks if there are more than 1 queens in the 
            result = true;            // diagonal row, sets results to true
          }
        }
        colIndex--;
      }
      return result; // fixme
    }


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
