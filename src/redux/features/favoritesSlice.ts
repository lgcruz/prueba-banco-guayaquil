import { Product } from "@/interfaces/generalInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [
    {
      nombre: "",
      id: 0,
      descripcion: "",
      precio: 0,
      imageSrc: "",
    },
  ],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoriteProducts: (state, action) => {
      state = action.payload;
      return state;
    },
    addFavoriteProduct: (state, action) => {
      const newProduct: Product = action.payload;
      const exists = state.favorites.some(
        (product) => product.id === newProduct.id
      );
      state.favorites = [...state.favorites, ...(!exists ? [newProduct] : [])];
      // return state;
    },
    removeFavoriteProduct: (state, action) => {
      const temporalArray = state.favorites.filter(
        (p) => p.id !== action.payload
      );
      state.favorites = [...temporalArray];
      // return state;
    },
  },
});
export const {
  setFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
