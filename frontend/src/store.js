import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  // Add all reducers here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
});


export default store;
