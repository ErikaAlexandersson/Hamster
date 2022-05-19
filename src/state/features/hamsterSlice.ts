import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hamster } from "../../Interfaces";

interface HamsterState {
  value: Hamster[];
}

const initialState: HamsterState = {
  value: [],
};

const hamsterSlice = createSlice({
  name: "hamster",
  initialState,
  reducers: {
    addHamster: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { addHamster } = hamsterSlice.actions;

export default hamsterSlice.reducer;
