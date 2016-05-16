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
    
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);           // Isolates the specific row, returns an array
      var counter = 0;                        // Creates a counter
      for (var i = 0; i < row.length; i++) {  // Iterate over all spots in the inspectionRow
        counter += row[i];                    // Adds both 1's and 0's to counter
      }
      return counter > 1;   // Return true or false if counter is greater than one
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var size = this.get('n');           // Stores the length of the board
      for (var i = 0; i < size; i++) {    // Loop through array of rows
        if ( this.hasRowConflictAt(i)) {  // Check if this row has a conflict
          return true;                    // If true, return true
        }
      }
      return false;   // If nothing is found, return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var allRows = this.rows(),          // Makes an array of the board rows
          count = 0;                      // Creates a counter
          
      for( var i = 0; i < allRows.length; i++) {  // Iterates for the length of the board
        if (allRows[i][colIndex] === 1) {         // Checks the same column but uses i to iterate down every row
          count++;                                // Increments count
        }
        if (count >= 2) {   // Checks if there are more than two 1's
          return true;      // Returns true
        }
      }
      return false;    // If nothing is found, return false
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var size = this.get('n');           // Stores length of board
      for( var i = 0; i < size; i++ ){    // Iterate for the length of the board
        if ( this.hasColConflictAt(i) ){  // Checks if each column has a conflict
          return true;                    // Returns true if it does
        }
      }
      return false;   // Otherwise, returns false
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var size = this.get('n');     // Stores size of board
      var count = 0;                // Creates counter
      var rowIdx = 0;               // Creates row index counter
      var colIdx = majorDiagonalColumnIndexAtFirstRow;    // Sets column index counter from first row

      for( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ){    // Iterates as long as col/row index < size of board
                                                                      // Increments col/row index by 1 each loop
        if( colIdx >= 0 ) {               // If col index is greater than 0
          var row = this.get(rowIdx);     // Declare row equal to this.get(rowIdx), creates array of current row
          count += row[colIdx];           // adds the current colIndx of that row to counter
        }                                 // This repeats through the whole diagonal 
      }

      return count > 1;   // Returns result of count > 1
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');                     // Stores the length of the board
      
      for( var i = 1 - size; i < size; i++ ) {      // I have no idea why this starts from 1 - size
        if ( this.hasMajorDiagonalConflictAt(i) ){  // Checks if each column has a conflict
          return true;                              // Return true
        }
      }
      
      return false;     // If no conflicts, return false
      
      /* FIRST ATTEMPT BELOW
      var conflicts = false,            // Sets up a results boolean
          allRows = this.rows(),        // Saves all of the boards rows in allRows
          colIndex = 0,                 // Stores colIndex
          rowIndex = 0,                 // Stores rowIndex
          boardLength = this.get('n');  // Stores the length of of the board
      
      var rowIncrementSystem = function(amount) {
        if ( amount === boardLength-1 ){
          return;
        }
        for( var i = 0; i < allRows.length; i++) {    // Iterate over all of the rows
          var currentCount = 0;               // Stores the current amount of queens in this column
          if (allRows[rowIndex][i] === 1) {   // Checks if any of the top rows contain any 1's
            var rowCount = rowIndex,          // 
                colCount = i;
                
            var colCheck = function(num) {  // Subroutine that iterates through the rows
              // Base case, checks if num is zero or if we've run off the board
              if (num === 0 || rowCount > (boardLength - 1) ){
                return;
              }
              if (allRows[rowCount][colCount] === 1) {  // Checks whether current column in this row = 1.
                currentCount++;   // Increments the current number of queens
              }
              colCount++;       // Increments the col forward by one index
              rowCount++;       // Increments the row forward by one index
              colCheck(--num);  // Recursivily calls colCheck with the current num amount
            };
            colCheck(boardLength - colCount); // Invoke colCheck with boardLength minus colCount
                                              // which results in how many spots left on board to recurse
            if (currentCount >= 2) {    // Checks if there are more than 1 queens in the 
              conflicts = true;         // diagonal row, sets results to true
            }
          } // End if
        }   // End loop
        rowIndex++;
        rowIncrementSystem(rowIndex);
      };  // End function
      rowIncrementSystem(rowIndex);
      return conflicts;     // If nothing is found, return noConflicts (false)
      */
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var size = this.get('n'),     // Stores the length of the board
          count = 0,                // Sets a count
          rowIdx = 0,               // Sets rowIdx to 0
          colIdx = minorDiagonalColumnIndexAtFirstRow;    // Sets colIdx to targeted column in top row

      for ( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ){   // Iterates down to the left through matrix
        if ( colIdx < size ){             // As long as colIdx is within board size
          var row = this.get(rowIdx);     // Sets row to an array of that whole row
          count += row[colIdx];           // Adds whatever value is at that row to count
        }
      }
      
      return count > 1;     // Returns the result of count > 1
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');               // Stores board length

      for( var i = size + 1; i >= 0; i-- ) {        // Iterates size + 1 down to 0
        if ( this.hasMinorDiagonalConflictAt(i) ){  // Checks if each i has a minor conflict
          return true;                              // Returns true
        }
      }
      
      return false;     // If no conflicts, returns false
      
      /* FIRST ATTEMPT BELOW
      var result = false;   // Sets up a results boolean
      var allRows = this.rows();    // Saves all of the boards rows in allRows
      var colIndex = allRows.length - 1;   // Stores colIndex
      var rowIndex = 0;   // Stores rowIndex
      var rowCount = 0;
      var colCount = allRows.length - 1;
      var boardLength = this.get('n');  // Stores the length of of the board
      var rowDecrementSystem = function(amount) {
        if ( amount === boardLength-1 ){
          return;
        }
       for( var i = 0; i < allRows.length; i++) {    // Iterate over all of the rows
          // Stores the current amount of queens in this column
          var currentCount = 0;
          // Checks if any of the top rows contain any 1's
          if (allRows[rowIndex][i] === 1) {
            var rowCount = rowIndex;
            var colCount = i;

            // Subroutine that iterates through the rows
            var colCheck = function(num) {
              // Base case, checks if num is zero or if we've run off the board
              if (num === 0 || rowCount > (boardLength - 1) || colCount < 0 ||allRows[rowCount][colCount] === undefined ){
                return;
              }
              // Checks whether current column in this row = 1.
              if (allRows[rowCount][colCount] === 1) {
                currentCount++;   // Increments the current number of queens
              }
              colCount--;       // Increments the col forward by one index
              rowCount++;       // Increments the row forward by one index
              colCheck(--num);  // Recursively calls colCheck with the current num amount
            };
            //invoke colCheck with boardLength which decides how many times to recurse
            colCheck(boardLength - rowCount);
            if (currentCount >= 2) {    // Checks if there are more than 1 queens in the 
              result = true;            // diagonal row, sets results to true
            }
          }//end if statement
        }//end for loop
        rowIndex++;
        rowDecrementSystem(rowIndex);
      };

      rowDecrementSystem(rowIndex);
      return result; // fixme
      */
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
