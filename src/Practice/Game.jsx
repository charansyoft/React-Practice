import { useState } from "react";

function Square({ value, onSquareClick }) {
  const squareStyle = {
    width: "60px",
    height: "60px",
    padding: 0,
    fontSize: "50px",
    outline: "none",
    boxSizing: "border-box",
    verticalAlign: "middle",
    borderWidth: "0.5px",
    border: "1px solid black",
    backgroundColor: "rgb(251, 225, 225)",
    margin: "1px",
  };

  return (
    <button onClick={onSquareClick} style={squareStyle}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  function CalculateWinner(squares) {
    const Pattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < Pattern.length; i++) {
      const [a, b, c] = Pattern[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = CalculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
  };

  return (
    <div style={{ margin: 10, textAlign: "center" }}>
      <h5>{status}</h5>
      <h4>{JSON.stringify(squares)}</h4>

      <div style={rowStyle}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div style={rowStyle}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div style={rowStyle}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function JumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to move " + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => JumpTo(move)}>{description}</button>
      </li>
    );
  });

  const gameContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    border: "1px solid #999",
    margin: 20,
  };

  return (
    <div style={gameContainer}>
      <h1>Current Move: {currentMove}</h1>
      <h3>Move History</h3>
      <ol>{moves}</ol>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
  );
}
