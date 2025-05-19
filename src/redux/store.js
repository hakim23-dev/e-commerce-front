import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer, 
    persistStore,
} from "redux-persist";
import storageSession  from 'redux-persist/lib/storage/session'

import productReducer from "./ProductsSlice";
import modeReducer from './darkModeSlice';
import cartReducer from './CartSlice';
import wishListReducer from './wishlistSlice'
import userReducer from './UserSlice'

const rootRducer=combineReducers({
    products:productReducer,
    mode:modeReducer,
    cart:cartReducer,
    wishList:wishListReducer,
    user:userReducer,
});

const persisrConfig={
    key:"root",
    storage:storageSession ,
    version:1
}

const persistedState=persistReducer(persisrConfig,rootRducer);

export const store=configureStore({
    reducer:persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);