import { createSlice } from "@reduxjs/toolkit"

const initialState={
    products:[],
    searchTherme:'',
    searchProducts:[],
}

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            state.products=[...action.payload]
        },
        searchProducts:(state,action)=>{
            if(action.payload!==''){
                state.searchTherme=action.payload.toLowerCase();
                state.searchProducts=state.products.filter(ele=>ele.name.toLowerCase().includes(state.searchTherme))
            }else {
                state.searchProducts=0
            }
        }
    }
});

export const {setProducts,searchProducts}=productSlice.actions;
export default productSlice.reducer