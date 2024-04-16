import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/user/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "Signin failed");
      }
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://inventory-uoaa.onrender.com/api/user/",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data?.error || "Signin failed");
      }
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    currentUser: {},
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.currentUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////////////
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;

export { fetchUser, signupUser };
export const { signOut } = userSlice.actions;
