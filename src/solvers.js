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
  var solution = undefined;
  // var rookBoard = new Board(n);   // Creates a new Board
  // var rookRows = rookBoard.rows();    // Creates an array of rookBoards rows
  // var boardLength = rookBoard.get('n');   //boardLength stores the width of the board
  // var rowIndex = 0;
  // var colIndex = 0;
  // // Iterate through our rookRows.length
  // //for (var i = 0; i < rookRows.length; i++) {
  // //subroutine that iterates through the rows and checks the same column
  // var colCheck = function(num) {
  //   //base case
  //   if (num === 0) {
  //     return;
  //   }
  //   // Check if hasRowConflictAt(i) !== true && hasColConflictAt(i)
  //   if (rookBoard.hasRowConflictAt(rowIndex) && rookBoard.hasColConflictAt(colIndex)) {
  //     rookBoard.togglePiece(rookBoard[rowIndex][colIndex]);
  //   }
  //   colIndex++;
  //   rowIndex++;
  //   //increments the row forward by one index
  //   num--;
  //   colCheck(num);
  // };
  // //invoke colCheck with boardLength which decides how many times to recurse
  // colCheck(boardLength);
  
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //console.log('Single solution for ' + n + ' rooks:', solution);
  return rookBoard;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
