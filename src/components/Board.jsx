import React from "react";
import { useSelector } from "react-redux";

const Board = () => {
  const gameBoard = useSelector((state) => state.game.gameBoard);
  console.log(gameBoard);
  return (
    <div
      className={`border-4 border-zinc-600 flex-1 w-full h-full grid grid-cols-8 grid-rows-8`}
    >
      {gameBoard.map((item, i) => (
        <div key={i} className={item.className}>
          {item.isFull && (
            <div
              className={`w-2/3 h-2/3 rounded-full cursor-pointer`}
              style={{ background: item.stoneColor }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
