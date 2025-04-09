// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers'; // Tạo reducer cho giỏ hàng

const store = configureStore({
  reducer: {
    cart: cartReducer, // Khai báo reducer cho slice 'cart'
    // Các reducer khác nếu có
  },
});

export default store;