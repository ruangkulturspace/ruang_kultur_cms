import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rawTextTentangKami: "",
  rawTextRilisMedia: "",
  rawTextTambahArticle: "",
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
    setRawTextTambahArticle: (state, action) => ({
      ...state,
      rawTextTambahArticle: action.payload,
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
  setRawTextTambahArticle,
  setRawTextTambahPengumuman,
} = textEditorSlice.actions;
export default textEditorSlice.reducer;
