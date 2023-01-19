import { configureStore } from '@reduxjs/toolkit';
import usertListReducer from './usersList-slice';

const store = configureStore({
  reducer: {
    usertData: usertListReducer,
  },
});

export default store;
