// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

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
      // create a variable to store current row
      var row = this.get(rowIndex);

      // create a count variable
      var count = 0;

      // iterate over the row
      // add current element to count
      for (var i = 0; i < row.length; i++) {
        count += row[i];
      }

      // return whether count is greater than 1
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      if (this.get(0) === undefined) {
        return false;
      }
      // create a variable to store all the rows
      var rows = this.rows();

      // iterate over each row
      // hasRowConflictAt for each row
      // if hasRowConflictAt returns true
      // return true
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // get all the rows of the board
      var rows = this.rows();
      // create an empty array to store the colIndex from each row
      var counter = 0;
      // iterate over rows array
      for (var i = 0; i < rows.length; i++ ) {
        //for each one, push to the array the colIndex value
        counter += rows[i][colIndex];
      }
      //return whether counter is greater than one
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      if (this.get(0) === undefined) {
        return false;
      }
      // get a random row
      var row = this.get(0);
      // store length of random row
      var length = row.length;
      // while the length is greater than 0
      // call hasCol... on length variable
      // if call returns true
      // return true
      // otherwise
      // decrease length variable by 1
      while (length >= 0) {
        if (this.hasColConflictAt(length)) {
          return true;
        } else {
          length--;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //get all rows
      var allRows = this.rows();
      //count
      var count = 0;
      //iterate for each row j = row index
      for (var j = 0; j < allRows.length; j++) {
        //for each column within that row (i = colindex)
        for (var i = 0; i < allRows[j].length; i++) {
          //if colIndex - rowIndex = major........parameter (use method)
          if (i - j === majorDiagonalColumnIndexAtFirstRow) {
            //increment count
            count += allRows[j][i];
          }
        }
      }
      //return count > 1
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      if (this.get(0) === undefined) {
        return false;
      }
      // get row at 0
      var row = this.get(0);
      // NUM get length of row
      var num = row.length;

      // for (var i = -(num - 1); i < num; i++)
      for (var i = -(num - 1); i < num; i++) {
        // if this.hasMajorDiagonalConflictAt(i) is true
        if (this.hasMajorDiagonalConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //get all rows
      var allRows = this.rows();
      //count
      var count = 0;
      //iterate for each row j = row index
      for (var j = 0; j < allRows.length; j++) {
        //for each column within that row (i = colindex)
        for (var i = 0; i < allRows[j].length; i++) {
          //if colIndex - rowIndex = major........parameter (use method)
          if (i + j === minorDiagonalColumnIndexAtFirstRow) {
            //increment count
            count += allRows[j][i];
          }
        }
      }
      //return count > 1
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      if (this.get(0) === undefined) {
        return false;
      }
      // get row at 0
      var row = this.get(0);
      // num: store length of row
      var num = row.length;

      // for (var i = 0; i < 2*num - 1; i++)
      for (var i = 0; i < 2 * num - 1; i++) {
        // if this.hasMinorDiagonalConflictAt(i) is true
        if (this.hasMinorDiagonalConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false;
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
