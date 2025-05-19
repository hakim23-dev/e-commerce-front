import {createSlice } from "@reduxjs/toolkit"

const initialState={
    mode:'light'
}

const darkModeSlice=createSlice({
    name:'mode',
    initialState,
    reducers:{
        setMode:(state,action)=>{
            if(action.payload==='light'){
                state.mode='dark'
            }else {
                state.mode='light'
            }
        }
    }
})

export const {setMode}=darkModeSlice.actions;
export default darkModeSlice.reducer;