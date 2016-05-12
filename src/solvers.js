/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  //console.log(n);
  var rookBoard = new Board({'n':n});   // Creates a new Board
  console.log('rookBoard', rookBoard);
  var boardLength = rookBoard.get('n');   //boardLength stores the width of the board
  var rowIndex = 0;
  var colIndex = 0;
  //Iterate through our rookRows.length
  //for (var i = 0; i < rookRows.length; i++) {
  //subroutine that iterates through the rows and checks the same column
  var colCheck = function(num) { //num is boardLength
    
    //base case
    if (num === 0 || colIndex > (boardLength - 1) || rowIndex > (boardLength - 1) ) {
      return;
    }
    //console.log('true?', rookBoard.hasRowConflictAt(rowIndex));
    // Check if hasRowConflictAt(i) !== true && hasColConflictAt(i)
    if (!rookBoard.hasRowConflictAt(rowIndex) && !rookBoard.hasColConflictAt(colIndex)) {
      //console.log('test');
      rookBoard.togglePiece(rookBoard[rowIndex][colIndex]);
    }
    colIndex++;
    rowIndex++;
    //increments the row forward by one index
    num--;
    colCheck(num);
  };
  //invoke colCheck with boardLength which decides how many times to recurse
  colCheck(boardLength - 1);
  
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //console.log('Single solution for ' + n + ' rooks:', solution);
  var rookRows = rookBoard.rows();    // Creates an array of rookBoards rows
  console.log('rookRows', rookRows);
  console.log('solution', rookBoard._currentAttributes);
  return rookBoard._currentAttributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solution;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solution;
};
