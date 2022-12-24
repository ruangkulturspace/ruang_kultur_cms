import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnimating: false,
};

export const progressSlice = createSlice({
  name: "prohress",
  initialState,
  reducers: {
    setIsAnimating: (state, action) => ({
      ...state,
      isAnimating: action.payload,
    }),
  },
});

export const { setIsAnimating } = progressSlice.actions;
export default progressSlice.reducer;
