// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.isLoading = true;
//     },
//     loginSuccess(state, action) {
//       state.isLoading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.error = null;
//     },
//     loginFailure(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    userError:false
}


const authSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.userError=false
            console.log("From authslice",state.currentUser);
        },
        signInFailure:(state)=>{
            state.currentUser=null
            state.loading=false
            state.userError=false
            
        },
        signOut_user:(state)=>{
            state.currentUser=null
            state.loading=false
            state.userError=false
            
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,signOut_user}=authSlice.actions;
export default authSlice.reducer
