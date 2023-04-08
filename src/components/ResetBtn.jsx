import React from "react";
import { playAgain } from "../store/checkerSlice";
import { useDispatch } from "react-redux";

const ResetBtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="bg-[#1c1d1c] rounded-xl text-xl px-4 py-2 capitalize"
      onClick={() => dispatch(playAgain())}
    >
      reset game
    </button>
  );
};

export default ResetBtn;
