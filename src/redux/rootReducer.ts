import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer} from "redux-persist";
import storageEngine from "./forPersistErrorSolve";
import authSlice from "./slice/authSlice";
import { baseApi } from "./api/baseApi";


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

