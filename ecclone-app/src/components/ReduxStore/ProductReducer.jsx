import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  status: "",
  product: {},
};

// get product state - from initial page load
export const getProductByIdAsync = createAsyncThunk(
  "product/getProduct",
  async (data, { rejectWithValue }) => {
    try {
      const { productName, productCode } = data;
      let product = await axios.post(`/product/${productName}`, {
        productCode: productCode,
      });

      return product.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getProductQtyByColor = (state) => {
  let productQtyByColor = [];
  if (state.stockOnHand) {
    productQtyByColor = state.stockOnHand.reduce(
      (quantityByColor, currentLine) => {
        if (
          quantityByColor.findIndex(
            (element) => element.hexColor === currentLine.hexColor
          ) === -1
        ) {
          quantityByColor.push({
            hexColor: currentLine.hexColor,
            quantity: parseInt(currentLine.quantity),
          });
        } else {
          let i = quantityByColor.findIndex(
            (element) => element.hexColor === currentLine.hexColor
          );
          quantityByColor[i] = {
            ...quantityByColor[i],
            quantity:
              parseInt(quantityByColor[i].quantity) +
              parseInt(currentLine.quantity),
          };
        }
        return quantityByColor;
      },
      []
    );
  }

  return productQtyByColor;
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.product = action.payload;
    });
    builder.addCase(getProductByIdAsync.pending, (state, action) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getProductByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
    });
  },
});

export default slice.reducer;
