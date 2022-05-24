import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteState {
  value: boolean;
}

const initialState: DeleteState = {
  value: false,
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    showOrHideDelete: (state, { payload }) => {
      console.log(payload);
      state.value = payload;
    },
  },
});

export const { showOrHideDelete } = deleteSlice.actions;

export default deleteSlice.reducer;
