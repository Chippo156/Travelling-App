// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSLice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
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
  },
});

// Export actions để sử dụng trong các component
export const { login, logout } = userSLice.actions;

// Export reducer để tích hợp vào store
export default userSLice.reducer;
