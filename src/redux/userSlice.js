// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    QrCode: null,
    q_code:null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout : (state) => {
      state.user = null;
    },
    setQr: (state, action) => {
      state.QrCode = action.payload.QrCode
      state.q_code = action.payload.code
    },
    clearQr : (state) => {
      state.QrCode = null
      state.q_code = null
    }
  },
});

export const { setUser, logout, setQr, clearQr } = userSlice.actions;

export const selectUser = (state) => state.user;
export const getQr = (state) => state.QrCode;
export const getCode = (state) => state.q_code;

export default userSlice.reducer;
