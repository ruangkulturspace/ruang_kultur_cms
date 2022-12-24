import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aiMain: {
    section1: {
      kodesurvey: "",
      kategori: "",
      kategorilainnya: "",
      namaPic: "",
      phonePic: "",
      tanggalPelaksanaan: "",
      namaLokasi: "",
      latitude: "",
      latInputType: "",
      longitude: "",
      longInputType: "",
      darat: [],
      daratinput: "",
      laut: [],
      lautinput: "",
      udara: [],
      udarainput: "",
      durasiPerjalanan: "",
      namaKotaKecamatan: "",
      elevation: "",
      tipeBisnis: "",
      alamatLokasi: "",
      idPelangganPLN: "",
      sumber_listrik: "",
      sumber_listriklainnya: "",
      kapasitas_listrik: "",
      sumber_cadangan: "",
      sumber_cadanganlainnya: "",
      jamOperasionalListrikmulai: "",
      jamOperasionalListrikselesai: "",
      jamOperasionalLokalmulai: "",
      jamOperasionalLokalselesai: "",
      adafixednetwork: "",
      fixednetwork: "",
      note: "",
    },
    section2: {
      pc: "",
      tablet: "",
      smartPhone: "",
      laptop: "",
      lainnya1Name: "",
      lainnya1Qty: "",
      lainnya2Name: "",
      lainnya2Qty: "",
    },
    section3: {
      fileAkses: "",
      filePlang: "",
      fileMarking: "",
      filePln: "",
      fileDenah: "",
      fileLanskap: "",
      download: "",
      upload: "",
      tipenetwork: "",
      fileAksesname: "",
      filePlangname: "",
      fileMarkingname: "",
      filePlnname: "",
      fileDenahname: "",
      fileLanskapname: "",
    },
  },
};

export const formaiSlice = createSlice({
  name: "formai",
  initialState,
  reducers: {
    setAiMain: (state, action) => ({
      ...state,
      aiMain: action.payload,
    }),
  },
});

export const { setAiMain } = formaiSlice.actions;
export default formaiSlice.reducer;
