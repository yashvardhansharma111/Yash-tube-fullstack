import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import channelReducer from '../features/channelSlice';
import uiReducer from '../features/uiSlice';
import videoReducer from '../features/videoSlice';

const store = configureStore({
    reducer : {
      auth : authReducer,
      ui : uiReducer,
      video : videoReducer,
      channel : channelReducer
    },
});

export default store