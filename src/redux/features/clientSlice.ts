import { Client } from "@/interfaces/generalInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    nombre: "Luis Gino",
    id: 1,
    email: "luisginocruz_95@hotmail.com",
    telefono: "0992802988",
  },
};

export const clientSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default clientSlice.reducer;
