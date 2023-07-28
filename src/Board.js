import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game.
 *   Note: chanceLightStartsOn must be between 0 (inclusive) and 1 (exclusive)
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // Create array-of-arrays of true/false values
    // Rows
    for(let rIdx=0; rIdx<nrows; rIdx++){
      const row = []
      // Cells in rows
      for(let cIdx=0; cIdx<ncols; cIdx++){
        // If randomly generated number < chanceLightStartsOn, cell starts on 
        row.push( Math.random() < chanceLightStartsOn ? true : false )
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  // Check the board in state to determine whether the player has won.
  function hasWon() {
    return board.every(r => r.every(c=> c===true ))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const deepCopyBoard =  oldBoard.map(rows => [...rows])

      // In the copy, flip this cell .....
      flipCell(y, x, deepCopyBoard)
      // ..... and the cells around it
      flipCell(y, x+1, deepCopyBoard)
      flipCell(y, x-1, deepCopyBoard)
      flipCell(y+1, x, deepCopyBoard)
      flipCell(y-1, x, deepCopyBoard)

      // TODO: return the copy
      return deepCopyBoard;
    });
  }

  return (
    // if the game is won, just show a winning msg & render nothing else
    hasWon() ?  <h1>WINNER</h1> :
      // make table board
      <table>
        {board.map((row, rIdx) => {
          return (
            <tr>
            { row.map((cell, cIdx) => {
              return <Cell flipCellsAroundMe={()=>flipCellsAround(`${rIdx}-${cIdx}`)} isLit={board[rIdx][cIdx]}/>
            })}
            </tr>
            )
        })}
      </table>
    )
  
}

export default Board;
