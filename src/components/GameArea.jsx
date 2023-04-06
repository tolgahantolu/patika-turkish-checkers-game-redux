import React from "react";
import { Board } from "../components";
import { useSelector } from "react-redux";

const GameArea = () => {
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  return (
    <>
      <div className="w-full h-full mt-10 flex justify-between items-center gap-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          {/* white rock user */}
          <div
            className={`w-[200px] h-[100px] flex items-center gap-2 font-bold justify-center bg-white text-[#1c1d1c] rounded-xl capitalize ${
              currentPlayer === "white" &&
              "shadow-2xl shadow-black-900/60 scale-110"
            }`}
          >
            <span className="text-2xl uppercase">white</span>-
            <span className="text-4xl">16</span>
          </div>

          {/* black rock user */}
          <div
            className={`w-[200px] h-[100px] flex items-center gap-2 font-bold justify-center bg-white text-[#1c1d1c] rounded-xl capitalize ${
              currentPlayer === "black" &&
              "shadow-2xl shadow-black-900/60 scale-110"
            }`}
          >
            <span className="text-2xl uppercase">black</span>-
            <span className="text-4xl">16</span>
          </div>

          <p className="text-2xl font-semibold uppercase">
            {currentPlayer}'s turn!
          </p>
        </div>

        {/* board */}
        <Board />
      </div>
    </>
  );
};

export default GameArea;
