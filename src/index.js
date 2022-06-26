import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) => {
  // const [value,setValue] = useState(null);

  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

const Board = () => {
  // const initialSquares = [null, null, null, null, null, null, null, null, null];
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext,setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    // 1. Make a copy of squares state array
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWinner(squares));
    const squareFilled = Boolean(newSquares[i]);

    if(winnerDeclared||squareFilled){
      return;
    }

    // 2. Mutate the copy, setting the i-th element to 'X'
    newSquares[i]= xIsNext ? 'X':'O';
    // 3. Call the setSquares function with the mutated copy
    setSquares(newSquares);
    // setting next value for x
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return <Square 
    value={squares[i]} 
    onClickEvent = {()=>handleClickEvent(i)}/>;
  };

  const winner = calculateWinner(squares);
  const status = winner? `Winner is player ${winner}`:`Next player: ${xIsNext? 'X':'O'} `;

  return (
    <div className="status">
      <div className="status-text">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-title">Tic-Tac-Toe</div>
      <Board />
      <button className="btn-game" onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],  //rows
    [0,3,6],[1,4,7],[2,5,8],  //columns
    [0,4,8],[2,4,6],
  ];

  for (let line of lines){
    const [a,b,c] = line;
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }

  return null;
}
