import { createSlice } from "@reduxjs/toolkit";
import { Matches } from "../../Interfaces";

interface MatchesState {
  value: Matches[];
}

const initialState: MatchesState = {
  value: [],
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    addMatches: (state, { payload }) => {
      state.value = payload;
      console.log(payload);
    },
  },
});

export const { addMatches } = matchesSlice.actions;

export default matchesSlice.reducer;
