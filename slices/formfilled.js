import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formFilled: false,
};

export const formFilledSlice = createSlice({
  name: "formFilled",
  initialState,
  reducers: {
    setFormFilled: (state, action) => ({
      ...state,
      formFilled: action.payload,
    }),
  },
});

export const { setFormFilled } = formFilledSlice.actions;
export default formFilledSlice.reducer;
