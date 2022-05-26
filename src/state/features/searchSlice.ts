import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  value: "";
}

const initialState: SearchState = {
  value: "",
};

const searchSlice = createSlice({
  name: "rerender",
  initialState,
  reducers: {
    searchHamster: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { searchHamster } = searchSlice.actions;

export default searchSlice.reducer;
