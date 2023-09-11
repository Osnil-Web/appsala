import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/AuthReducer';
import userReducer from './Reducers/userReducer';
 
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
  });
  
  export default store;