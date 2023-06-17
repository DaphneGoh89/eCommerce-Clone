import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import cart from "./CartReducer";

const reducer = combineReducers({ cart });
const store = configureStore({ reducer });
export default store;
