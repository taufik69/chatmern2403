import { configureStore } from "@reduxjs/toolkit";
import friendSlice from "./slices/friendSlice";
export default configureStore({
  reducer: {
    friend: friendSlice,
  },
});
