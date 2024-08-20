import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/Slices/UserSlice';


const store = configureStore({
  reducer: {
    user: userReducer
  },
});

export default store;