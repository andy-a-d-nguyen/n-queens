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
  var solution = new Board({'n': n});

  //Recursive 'Add Piece' function
  var addPiece = function(row) {
    //BASE CASE
    // If there are no more rows, return solution
    if (row === n) {
      return solution.rows();
    }

    //RECURSIVE CASE
    //Add a piece to current row
    //Check for any rook conflicts
    //if No conflict, this is a good placement, proceed to next row and activate 'Add Piece' function
    for (var col = 0; col < n; col++) {
      //Toggle a piece
      solution.togglePiece(row, col);
      //Check if no conflict (valid piece)
      if (!solution.hasAnyRooksConflicts()) {
        addPiece(row + 1);
      } else {
        //If conflict, untoggle piece and move on
        solution.togglePiece(row, col);
      }
    }
  };

  addPiece(0);
  //return solution?
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
