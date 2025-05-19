import { createSlice } from "@reduxjs/toolkit"

const initialState={
    cart:[],
    totalPrice:0,
    totalQuantity:0,
}

const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            /* let product=action.payload;
            let productFound=state.cart.find(ele=>ele.id === product.id)
            if(productFound){
                productFound.productQuantity++
                productFound.totalPrice+=product.price
            }else {
                state.cart.push({
                    id:product.id,
                    name:product.name,
                    price:product.price,
                    productQuantity:1,
                    totalPrice:product.price,
                    image:[...product.image],
                })
            }
            state.totalPrice+=product.price;
            state.totalQuantity++; */
            state.cart=[...action.payload.products]
            state.totalPrice=action.payload.totalPrice
        },
        removeFromCart:(state,action)=>{
            let product=action.payload
            let productFound=state.cart.find(ele=>ele.id===product);
            if(productFound){
                state.cart=state.cart.filter(ele=>ele.id!==productFound.id)
            }
        },
        increaseQunatity:(state,action)=>{

        },
        decreaseQunatity:(stae,action)=>{

        },
    }
})

export const {addToCart,removeFromCart,increaseQunatity,decreaseQunatity}=CartSlice.actions;
export default CartSlice.reducer