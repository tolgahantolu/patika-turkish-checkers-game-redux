import { createSlice } from "@reduxjs/toolkit";
import gameBoard, { horizontalAxis, verticalAxis } from "./helpers/board";

const checkerSlice = createSlice({
  name: "checker",
  initialState: {
    gameBoard,
    selectedStone: "",
    movableTiles: [],
    currentPlayer: "black",
    winnerPlayer: "",
    userWhiteScore: 16,
    userBlackScore: 16,
  },
  reducers: {
    selecStone: (state, { payload, type }) => {
      const selectedStone = payload;
      state.selectedStone = selectedStone;
      state.movableTiles = [];

      const vAxis = selectedStone[0];
      const hAxis = selectedStone[1];
      const vIndex = verticalAxis.indexOf(vAxis);
      const hIndex = horizontalAxis.indexOf(hAxis);

      if (state.gameBoard.find((tile) => tile.id === selectedStone)?.isDama) {
        // !V loop 1
        for (let i = vIndex - 1; i >= 0; i--) {
          if (
            state.gameBoard.find((tile) => tile.id === verticalAxis[i] + hAxis)
              ?.isFull
          ) {
            //Todo: burada isimlendirme de sıkıntı var => bg-color adı ile currentPlayer adı uyuşmuyor!
            if (
              state.gameBoard.find(
                (tile) => tile.id === verticalAxis[i] + hAxis
              )?.stoneColor !== state.currentPlayer &&
              !state.gameBoard.find(
                (tile) => tile.id === verticalAxis[i - 1] + hAxis
              )?.isFull
            ) {
              state.movableTiles.push({
                moveTo: verticalAxis[i - 1] + hAxis,
                delete: verticalAxis[i] + hAxis,
              });
              break;
            }
          } else {
            state.movableTiles.push({
              moveTo: verticalAxis[i] + hAxis,
              delete: "",
            });
          }
        }

        // !V loop 2
        for (let i = vIndex + 1; i <= 7; i++) {
          if (
            state.gameBoard.find((tile) => tile.id === verticalAxis[i] + hAxis)
              ?.isFull
          ) {
            //Todo: burada isimlendirme de sıkıntı var => bg-color adı ile currentPlayer adı uyuşmuyor!
            if (
              state.gameBoard.find(
                (tile) => tile.id === verticalAxis[i] + hAxis
              )?.stoneColor !== state.currentPlayer &&
              !state.gameBoard.find(
                (tile) => tile.id === verticalAxis[i + 1] + hAxis
              )?.isFull
            ) {
              state.movableTiles.push({
                moveTo: verticalAxis[i + 1] + hAxis,
                delete: verticalAxis[i] + hAxis,
              });
              break;
            }
          } else {
            state.movableTiles.push({
              moveTo: verticalAxis[i] + hAxis,
              delete: "",
            });
          }
        }

        // !H loop1
        for (let i = hIndex - 1; i >= 0; i--) {
          if (
            state.gameBoard.find(
              (tile) => tile.id === vAxis + horizontalAxis[i]
            )?.isFull
          ) {
            if (
              state.gameBoard.find(
                (tile) => tile.id === vAxis + horizontalAxis[i]
              )?.stoneColor !== state.currentPlayer &&
              !state.gameBoard.find(
                (tile) => tile.id === vAxis + horizontalAxis[i - 1]
              )?.isFull
            ) {
              state.movableTiles.push({
                moveTo: vAxis + horizontalAxis[i - 1],
                delete: vAxis + horizontalAxis[i],
              });
              break;
            }
          } else {
            state.movableTiles.push({
              moveTo: vAxis + horizontalAxis[i],
              delete: "",
            });
          }
        }

        // !H loop1
        for (let i = hIndex + 1; i <= 7; i++) {
          if (
            state.gameBoard.find(
              (tile) => tile.id === vAxis + horizontalAxis[i]
            )?.isFull
          ) {
            if (
              state.gameBoard.find(
                (tile) => tile.id === vAxis + horizontalAxis[i]
              )?.stoneColor !== state.player &&
              !state.gameBoard.find(
                (tile) => tile.id === vAxis + horizontalAxis[i + 1]
              )?.isFull
            ) {
              state.movableTiles.push({
                moveTo: vAxis + horizontalAxis[i + 1],
                delete: vAxis + horizontalAxis[i],
              });
              break;
            }
          } else {
            state.movableTiles.push({
              moveTo: vAxis + horizontalAxis[i],
              delete: "",
            });
          }
        }
      } else {
        if (state.currentPlayer === "white" && vAxis !== 8) {
          const frontTile = state.gameBoard.find(
            (tile) => tile.id === verticalAxis[vIndex - 1] + hAxis
          );
          const nextTile = state.gameBoard.find(
            (tile) => tile.id === verticalAxis[vIndex - 2] + hAxis
          );

          if (frontTile?.isFull) {
            if (
              frontTile.stoneColor !== state.currentPlayer &&
              !nextTile?.isFull
            ) {
              state.movableTiles.push({
                moveTo: verticalAxis[vIndex - 2] + hAxis,
                delete: verticalAxis[vIndex - 1] + hAxis,
              });
            } else {
              state.movableTiles.push({
                moveTo: verticalAxis[vIndex - 1] + hAxis,
                delete: "",
              });
            }
          }
        } else {
          if (vAxis !== 1) {
            const backTile = state.gameBoard.find(
              (tile) => tile.id === verticalAxis[vIndex + 1] + hAxis
            );
            const nextTile = state.gameBoard.find(
              (tile) => tile.id === verticalAxis[vIndex + 2] + hAxis
            );
            if (backTile?.isFull) {
              if (
                backTile.stoneColor !== state.currentPlayer &&
                !nextTile?.isFull
              ) {
                state.movableTiles.push({
                  moveTo: verticalAxis[vIndex + 2] + hAxis,
                  delete: verticalAxis[vIndex + 1] + hAxis,
                });
              }
            } else {
              state.movableTiles.push({
                moveTo: verticalAxis[vIndex + 1] + hAxis,
                delete: "",
              });
            }
          }
        }
      }
    },
  },
});

export default checkerSlice.reducer;
