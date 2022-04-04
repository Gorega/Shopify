import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload) =>{
    return await axios.post(`/api/cart/add`,payload)
    .then(res => console.log(res))
    .catch(err=> console.log(err))
  }
)

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload) =>{
    return await axios.delete(`/api/cart/delete/${payload}`)
    .then(res => console.log(res))
    .catch(err=> console.log(err))
  }
)

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async () =>{
    return await axios.delete(`/api/cart/delete/clear`)
    .then(res => console.log(res))
    .catch(err=> console.log(err))
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    status:null,
  },
  extraReducers: {
      [addToCart.pending]:(state)=>{
        state.status = "loading"
      },
      [addToCart.fulfilled]:(state)=>{
        state.status = "done"
      },
      [addToCart.rejected]:(state)=>{
        state.status = "failed"
      },
      [removeFromCart.pending]:(state)=>{
        state.status = "loading"
      },
      [removeFromCart.fulfilled]:(state)=>{
        state.status = "done"
      },
      [removeFromCart.rejected]:(state)=>{
        state.status = "failed"
      },
      [clearCart.pending]:(state)=>{
        state.status = "loading"
      },
      [clearCart.fulfilled]:(state)=>{
        state.status = "done"
      },
      [clearCart.rejected]:(state)=>{
        state.status = "failed"
      }
  },
})

export default cartSlice.reducer