import { Product } from "@/interfaces/generalInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      nombre: "",
      id: 0,
      descripcion: "",
      precio: 0,
      imageSrc: "",
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      console.log(action.payload);

      state.products = [...action.payload];
      // console.log(state);
      // return state;
    },
  },
});

export const { setProductList } = productsSlice.actions;

export default productsSlice.reducer;
