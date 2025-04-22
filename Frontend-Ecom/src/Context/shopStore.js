import {configureStore} from '@reduxjs/toolkit'
import shopReducer from './shopSlice'
import authReducer from './authSlice'
export const shopStore=configureStore({
    reducer:{
        shop:shopReducer,
        auth:authReducer}
})
