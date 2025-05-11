import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import xssreducer from "../features/auth/xssSlice";
import sqlreducer from "../features/auth/sqlSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    xss:xssreducer,
    sql:sqlreducer
  },
});
