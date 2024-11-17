// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSLice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    loadingTrue: (state) => {
      state.isLoading = true;
    },
    loadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions để sử dụng trong các component
export const { login, logout, loadingTrue, loadingFalse } = userSLice.actions;

// Export reducer để tích hợp vào store
export default userSLice.reducer;
