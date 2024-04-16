import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/product/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "fetching product failed");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/product/getall",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "fetching All products failed");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/product/change",
        {
          method: "DELETE",
          body: JSON.stringify(id),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "deletion of product failed");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
const editProduct = createAsyncThunk(
  "product/editProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/product/change",
        {
          method: "PUT",
          body: JSON.stringify(productData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "deletion of product failed");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/product/",
        {
          method: "POST",
          body: JSON.stringify(productData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "creating product failed");
      }
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    singleProduct: {},
    error: null,
    message: "",
  },
  reducers: {
    signOutProduct: (state) => {
      state.loading = false;
      state.products = [];
      state.singleProduct = {};
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////////////
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////////////
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////////////
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////////////
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;

export {
  fetchProduct,
  createProduct,
  fetchAllProduct,
  deleteProduct,
  editProduct,
};
export const { signOutProduct } = productSlice.actions;
