import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveStone, selectStone } from "../store/checkerSlice";

const Board = () => {
  const gameBoard = useSelector((state) => state.game.gameBoard);

  const movableTiles = useSelector((state) => state.game.movableTiles);
  console.log(movableTiles);

  const selectedStone = useSelector((state) => state.game.selectedStone);
  console.log(selectedStone);

  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  console.log(currentPlayer);

  const greenTilesId = movableTiles.map((tile) => tile.moveTo);
  console.log(greenTilesId);

  const dispatch = useDispatch();

  return (
    <div
      className={`border-4 border-zinc-600 flex-1 w-full h-full grid grid-cols-8 grid-rows-8`}
    >
      {gameBoard.map((item, i) => (
        <div
          key={i}
          className={
            greenTilesId.includes(item.id)
              ? "bg-green-300 grid place-items-center"
              : item.id === selectedStone
              ? "bg-red-300 grid place-items-center"
              : item.className
          }
          onClick={() =>
            greenTilesId.includes(item.id) && dispatch(moveStone(item.id))
          }
        >
          {item.isFull && (
            <div
              className={`w-2/3 h-2/3 rounded-3xl cursor-pointer ${
                item.isDama && "border-4 border-sky-500"
              }`}
              style={{ background: item.stoneColor }}
              onClick={() =>
                currentPlayer === item.stoneColor &&
                dispatch(selectStone(item.id))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
