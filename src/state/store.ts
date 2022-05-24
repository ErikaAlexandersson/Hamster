import { configureStore } from "@reduxjs/toolkit";
import hamsterReducer from "../state/features/hamsterSlice";
import deleteReducer from "./features/deleteSlice";
import removeReducer from "./features/removeHamsterSlice";
import reRender from "./features/reRenderSlice";

const store = configureStore({
  reducer: {
    hamster: hamsterReducer,
    delete: deleteReducer,
    remove: removeReducer,
    reRender: reRender,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
