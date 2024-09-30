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
            // console.log("From authslice",state.currentUser);
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
