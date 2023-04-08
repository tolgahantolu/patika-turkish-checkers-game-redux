export const verticalAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const gameBoard = [];

const sharedClasses = "col-span-1 row-span-1 grid place-items-center";
verticalAxis.forEach((v, i) => {
  horizontalAxis.forEach((h, j) => {
    (j + i) % 2 === 0
      ? gameBoard.push({
          id: `${v}${h}`,
          className: `${sharedClasses} bg-[#eecf9f]`,
          isFull: v === "2" || v === "3" || v === "6" || v === "7",
          stoneColor: `${
            //prettier-ignore
            (v === "2" || v === "3" ? "white" : "") || 
            (v === "6" || v === "7" ? "black" : "")
          }`,
          isDama: false,
        })
      : gameBoard.push({
          id: `${v}${h}`,
          className: `${sharedClasses} bg-[#b58863]`,
          isFull: v === "2" || v === "3" || v === "6" || v === "7",
          stoneColor: `${
            //prettier-ignore
            (v === "2" || v === "3" ? "white" : "") || 
            (v === "6" || v === "7" ? "black" : "")
          }`,
          isDama: false,
        });
  });
});

export default gameBoard;
