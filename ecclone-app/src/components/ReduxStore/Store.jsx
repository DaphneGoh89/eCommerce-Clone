import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import cart from "./CartReducer";
import product from "./ProductReducer";

const reducer = combineReducers({ cart, product });
const store = configureStore({ reducer });
export default store;
