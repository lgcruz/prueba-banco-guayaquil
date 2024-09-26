import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./features/productsSlice";
import ClientReducer from "./features/clientSlice";
import FavoritesReducer from "./features/favoritesSlice";

export const store = configureStore({
  reducer: {
    ProductsReducer,
    ClientReducer,
    FavoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
