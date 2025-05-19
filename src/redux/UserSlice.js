import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:null,
    token:null,
}

const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        updateUser:(state,action)=>{
            state.user=action.payload;
        },
        logout:()=>initialState,
    }
})

export const {login,updateUser,logout}=UserSlice.actions;
export default UserSlice.reducer;