import { createSlice } from "@reduxjs/toolkit"

const initialState={
    wishList:[],
}

const wishListSlice=createSlice({
    name:'wishList',
    initialState,
    reducers:{
        addToList:(state,action)=>{
            state.wishList=[...action.payload]
        },
        removeFromList:(state,action)=>{
            let productID=action.payload;
            let foundProduct=state.wishList.find(ele=>ele.id===productID)
            if(foundProduct){
                state.wishList=state.wishList.filter(ele=>ele.id!==productID)
            }
        },
    }
})

export const {addToList,removeFromList}=wishListSlice.actions;
export default wishListSlice.reducer