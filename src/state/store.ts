import { configureStore } from "@reduxjs/toolkit";
import hamsterReducer from "../state/features/hamsterSlice";
import removeReducer from "./features/removeHamsterSlice";
import reRenderReducer from "./features/reRenderSlice";
import searchSliceReducer from "./features/searchSlice";
import addMatchesReducer from "./features/matchesSlice";

const store = configureStore({
  reducer: {
    hamster: hamsterReducer,
    remove: removeReducer,
    reRender: reRenderReducer,
    searchSlice: searchSliceReducer,
    matches: addMatchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
