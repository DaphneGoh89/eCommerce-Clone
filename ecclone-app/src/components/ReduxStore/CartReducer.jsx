import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  cart: localStorage.getItem("lbCart")
    ? JSON.parse(localStorage.getItem("lbCart"))
    : [],
  loading: true,
  status: "",
};

export const getCartAsync = createAsyncThunk(
  "cart/getCart",
  async (customerId, { rejectWithValue }) => {
    try {
      let option = { customerId: customerId };
      let carts = await axios.post(
        "http://127.0.0.1:5005/cart/getCart",
        option
      );
      return carts.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const postToCartAsync = createAsyncThunk(
  "cart/postToCart",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put("http://127.0.0.1:5005/cart/add", data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      console.log("extrabuilder", action);
      state.cart = action.payload;
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(getCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });

    builder.addCase(postToCartAsync.fulfilled, (state, action) => {
      console.log("postCartAsync - fulfilled", action);
      //   state.cart.push(action.payload);
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(postToCartAsync.pending, (state, action) => {
      state.status = "pending";
      state.loading = true;
    });

    builder.addCase(postToCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });
  },
});

export default slice.reducer;
const { fetchCartSuccess } = slice.actions;
