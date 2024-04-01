import { combineReducers } from "@reduxjs/toolkit";
import { currenciesReducer } from "./currencies/currenciesReducer";

export const rootReducer = combineReducers({
  currencies: currenciesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
