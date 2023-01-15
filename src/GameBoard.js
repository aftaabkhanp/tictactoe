import React, { useState } from "react";
import "./GameBoard.css";
import InputTap from "./InputTap";
import TurnText from "./TurnText";

const winController = (arr, idx, val) => {
  //check row
  var leftBoundary = Math.floor(idx / 3) * 3;
  var count = 0;
  for (var l = leftBoundary; l < leftBoundary + 3; l++) {
    if (arr[l] === val) count++;
  }
  if (count === 3) return true;
  //check col
  count = 0;
  var topBoundary = idx % 3;
  for (var t = topBoundary; t <= topBoundary + 6; t += 3) {
    if (arr[t] === val) count++;
  }
  if (count === 3) return true;

  //if val in diagonals
  var result = false;
  if (idx === 0 || idx === 4 || idx === 8) {
    result = result || (val === arr[0] && val === arr[4] && val === arr[8]);
  }
  if (idx === 2 || idx === 4 || idx === 6) {
    result = result || (val === arr[2] && val === arr[4] && val === arr[6]);
  }

  return result;
};

const GameBoard = () => {
  const [xTurn, setXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [moves, setMoves] = useState(0);

  var text = "";
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const tapHandler = (idx) => {
    if (isCompleted) {
      return;
    }
    if (xTurn) {
      setMoves((prev) => prev + 1);
      const newArr = [...board];
      newArr[idx] = "X";
      var didXWin = winController(newArr, idx, "X");
      setBoard(newArr);
      if (didXWin) {
        setIsCompleted(true);
        setXScore((prev) => prev + 1);
      } else {
        setXTurn((prev) => !prev);
      }
    } else {
      setMoves((prev) => prev + 1);
      const newArr = [...board];
      newArr[idx] = "O";
      var didOWin = winController(newArr, idx, "O");
      setBoard(newArr);
      if (didOWin) {
        setIsCompleted(true);
        setOScore((prev) => prev + 1);
      } else {
        setXTurn((prev) => !prev);
      }
    }
  };
  const resetGameController = () => {
    setXTurn(true);
    setIsCompleted(false);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setMoves(0);
  };

  if (!isCompleted && xTurn) {
    text = "Player X Turn";
  } else if (!isCompleted && !xTurn) {
    text = "Player O Turn";
  }

  return (
    <div className="GameBoard">
      <h1>Tic Tac Toe - Leaderboard</h1>
      <div className="score-card">
        <h1>Player X: {xScore}</h1>
        <h1>Player O: {oScore}</h1>
      </div>
      <div className="playing-area">
        {board.map((val, idx) => (
          <InputTap val={val} idx={idx} key={idx} tapHandler={tapHandler} />
        ))}
      </div>

      <TurnText txt={text} />
      {(moves >= 9 || isCompleted) && (
        <button onClick={resetGameController}>Reset</button>
      )}
    </div>
  );
};

export default GameBoard;
