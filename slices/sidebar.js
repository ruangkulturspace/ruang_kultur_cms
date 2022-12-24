import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapse: false,
  selectedKey: "",
};

export const sidebarCollapseSlice = createSlice({
  name: "sidebarCollapse",
  initialState,
  reducers: {
    setSidebarCollapse: (state, action) => ({
      ...state,
      sidebarCollapse: action.payload,
    }),
    setSelectedKey: (state, action) => ({
      ...state,
      selectedKey: action.payload,
    }),
  },
});

export const { setSidebarCollapse, setSelectedKey } =
  sidebarCollapseSlice.actions;
export default sidebarCollapseSlice.reducer;
