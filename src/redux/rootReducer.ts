import { combineReducers } from "@reduxjs/toolkit";
// import authSlice from "./api/authSlice";
import { baseApi } from "./api/baseApi";
//import storage from "redux-persist/lib/storage";
import { persistReducer} from "redux-persist";
import storageEngine from "./forPersistErrorSolve";
import authSlice from "./authSlice";


const persistConfig = {
  // only work for users slice
    key: 'users',
    version: 1,
    storage:storageEngine,
    // whitelist:["dasasd"]
   
  }


const reducer=combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    authUI:authSlice
   
})

export const persistedReducer = persistReducer(persistConfig, reducer)

