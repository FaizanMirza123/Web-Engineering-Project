import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import xssreducer from "../features/auth/xssSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    xss:xssreducer
  },
});
