import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Initial state - cart
const initialState = {
  cart: localStorage.getItem("lbCart")
    ? JSON.parse(localStorage.getItem("lbCart"))
    : [],
  loading: true,
  status: "",
};

// Get cart by Customer ID
export const getCartAsync = createAsyncThunk(
  "cart/getCart",
  async (customerId, { rejectWithValue }) => {
    try {
      let option = { customerId: customerId };
      let carts = await axios.post("/cart/getCart", option);
      return carts.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Post individual item to cart
export const postToLocalStorageCart = createAsyncThunk(
  "cart/postToLocalStorageCart",
  async (data, { rejectWithValue }) => {
    try {
      let cart = localStorage.getItem("lbCart")
        ? JSON.parse(localStorage.getItem("lbCart"))
        : [];
      cart.push(data);
      localStorage.setItem("lbCart", JSON.stringify(cart));

      return "Cart updated successfully";
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Post individual item to cart
export const postToCartAsync = createAsyncThunk(
  "cart/postToCart",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put("/cart/add", data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Post multiple items to cart (from localStorage)
export const postMultipleToCartAsync = createAsyncThunk(
  "cart/postMultipleToCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log("postMultipleToCart", data);
      let response = await axios.put(
        "/cart/addMultiple",
        data?.cartData,
        data?.header
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Edit item in cart
export const putToCartAsync = createAsyncThunk(
  "cart/putToCart",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put("/cart/edit", data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Remove item from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.delete("/cart/delete", { data: data }); // note that payload should be sent as {data: payload} in axios.delete
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Calculate cart total
export const getCartTotal = (state) => {
  let cartTotal = 0;
  let cartGstAmount = 0;
  let gstPercent = import.meta.env.VITE_GST_PERCENT;
  if (state.length > 0) {
    cartTotal = state.reduce((cartTotal, cartItem) => {
      return (cartTotal +=
        parseFloat(cartItem.quantity) * parseFloat(cartItem.productPrice));
    }, 0);
  }

  cartGstAmount = (cartTotal / (1 + gstPercent / 100)) * (gstPercent / 100);

  return { cartTotal, cartGstAmount };
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(getCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });

    builder.addCase(postToLocalStorageCart.fulfilled, (state, action) => {
      state.cart = JSON.parse(localStorage.getItem("lbCart"));
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(postToLocalStorageCart.pending, (state, action) => {
      state.status = "pending";
      state.loading = true;
    });

    builder.addCase(postToLocalStorageCart.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });

    builder.addCase(postToCartAsync.fulfilled, (state, action) => {
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

    builder.addCase(postMultipleToCartAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(postMultipleToCartAsync.pending, (state, action) => {
      state.status = "pending";
      state.loading = true;
    });

    builder.addCase(postMultipleToCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });

    builder.addCase(putToCartAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(putToCartAsync.pending, (state, action) => {
      state.status = "pending";
      state.loading = true;
    });

    builder.addCase(putToCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });

    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
    });

    builder.addCase(removeFromCartAsync.pending, (state, action) => {
      state.status = "pending";
      state.loading = true;
    });

    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
    });
  },
});

export default slice.reducer;
