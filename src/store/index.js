import { configureStore } from "@reduxjs/toolkit";
import checkerSlice from "./checkerSlice";

const store = configureStore({
  reducer: {
    game: checkerSlice,
  },
});

export default store;
