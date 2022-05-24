import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReRenderState {
  value: boolean;
}

const initialState: ReRenderState = {
  value: false,
};

const reRenderSlice = createSlice({
  name: "rerender",
  initialState,
  reducers: {
    reRenderHamster: (state, { payload }) => {
      console.log(payload);
      state.value = payload;
    },
  },
});

export const { reRenderHamster } = reRenderSlice.actions;

export default reRenderSlice.reducer;
