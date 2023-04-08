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
    selectStone: (state, { payload, type }) => {
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
            //Todo: 🆗 burada isimlendirme de sıkıntı var => bg-color adı ile currentPlayer adı uyuşmuyor!
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
            //Todo: 🆗 burada isimlendirme de sıkıntı var => bg-color adı ile currentPlayer adı uyuşmuyor!
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

        if (hAxis !== "a") {
          const leftTile = state.gameBoard.find(
            (tile) => tile.id === vAxis + horizontalAxis[hIndex - 1]
          );
          const nextTile = state.gameBoard.find(
            (tile) => tile.id === vAxis + horizontalAxis[hIndex - 2]
          );
          if (leftTile?.isFull) {
            if (
              leftTile.stoneColor !== state.currentPlayer &&
              !nextTile?.isFull
            )
              state.movableTiles.push({
                moveTo: vAxis + horizontalAxis[hIndex - 2],
                delete: vAxis + horizontalAxis[hIndex - 1],
              });
          } else
            state.movableTiles.push({
              moveTo: vAxis + horizontalAxis[hIndex - 1],
              delete: "",
            });
        }

        if (hAxis !== "h") {
          const rightTile = state.gameBoard.find(
            (tile) => tile.id === vAxis + horizontalAxis[hIndex + 1]
          );
          const nextTile = state.gameBoard.find(
            (tile) => tile.id === vAxis + horizontalAxis[hIndex + 2]
          );
          if (rightTile?.isFull) {
            if (
              rightTile.stoneColor !== state.currentPlayer &&
              !nextTile?.isFull
            )
              state.movableTiles.push({
                moveTo: vAxis + horizontalAxis[hIndex + 2],
                delete: vAxis + horizontalAxis[hIndex + 1],
              });
          } else
            state.movableTiles.push({
              moveTo: vAxis + horizontalAxis[hIndex + 1],
              delete: "",
            });
        }
      }
    },

    moveStone: (state, { payload, type }) => {
      const selectedTile = state.movableTiles.find(
        (tile) => tile.moveTo === payload
      );
      let changePlayer = true;

      state.gameBoard = state.gameBoard.map((tile) => {
        if (tile.id === state.selectedStone) {
          tile.isFull = false;
          tile.stoneColor = "";
        } else {
          if (tile.id === selectedTile?.moveTo) {
            tile.isFull = true;
            tile.stoneColor = state.currentPlayer;
            if (
              selectedTile.moveTo.startsWith("8") ||
              selectedTile.moveTo.startsWith("1")
            )
              tile.isDama = true;
            else {
              tile.isDama =
                state.gameBoard.find((tile) => tile.id === state.selectedStone)
                  ?.isDama || false;
            }
          } else {
            if (tile.id === selectedTile?.delete) {
              changePlayer = false;
              tile.isFull = false;
              tile.stoneColor = "";

              if (state.currentPlayer === "white") {
                if (state.userBlackScore === 1) {
                  state.winnerPlayer = "white";
                }
                if (state.userBlackScore === 2 && state.userWhiteScore === 1) {
                  state.winnerPlayer = "";
                }

                state.userBlackScore = state.userBlackScore - 1;
              } else {
                if (state.userWhiteScore === 1) {
                  state.winnerPlayer = "black";
                }

                if (state.userWhiteScore === 2 && state.userBlackScore === 1) {
                  state.winnerPlayer = "";
                }

                state.userWhiteScore = state.userWhiteScore - 1;
              }
            }
          }
        }

        return tile;
      });

      state.selectedStone = "";
      if (changePlayer) {
        state.currentPlayer === "white"
          ? (state.currentPlayer = "black")
          : (state.currentPlayer = "white");
      }
      state.movableTiles = [];
    },

    playAgain: (state, { type, payload }) => {
      state.gameBoard = gameBoard;
      state.currentPlayer = "white";
      state.userWhiteScore = 16;
    },
  },
});

export const { selectStone, moveStone, playAgain } = checkerSlice.actions;
export default checkerSlice.reducer;
