import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RemoveState {
  value: string;
}

const initialState: RemoveState = {
  value: "",
};

const removeHamsterSlice = createSlice({
  name: "remove",
  initialState,
  reducers: {
    removeHamster: (state, { payload }) => {
      console.log(payload);
      state.value = payload;
    },
  },
});

export const { removeHamster } = removeHamsterSlice.actions;

export default removeHamsterSlice.reducer;
