import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rawTextTentangKami: "",
  rawTextRilisMedia: "",
  rawTextTambahKelas: "",
  rawTextTambahPengumuman: "",
};

export const textEditorSlice = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    setRawTextTentangKami: (state, action) => ({
      ...state,
      rawTextTentangKami: action.payload,
    }),
    setRawTextRilisMedia: (state, action) => ({
      ...state,
      rawTextRilisMedia: action.payload,
    }),
    setRawTextTambahKelas: (state, action) => ({
      ...state,
      rawTextTambahKelas: action.payload,
    }),
    setRawTextTambahPengumuman: (state, action) => ({
      ...state,
      rawTextTambahPengumuman: action.payload,
    }),
  },
});

export const {
  setRawTextTentangKami,
  setRawTextRilisMedia,
  setRawTextTambahKelas,
  setRawTextTambahPengumuman,
} = textEditorSlice.actions;
export default textEditorSlice.reducer;
