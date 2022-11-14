import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status:null,
  showTotalAmountSpinner:false,
  selectedProducts:[],
}

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload) =>{
    return await axios.post(`/api/cart/add`,payload)
  }
)

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload) =>{
    return await axios.delete(`/api/cart/delete/${payload}`)
  }
)

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async () =>{
    return await axios.delete(`/api/cart/delete/clear`)
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    setShowTotalAmountSpinner:(state,action)=>{
      state.showTotalAmountSpinner = action.payload
    },
    setSelectedProducts:(state,action)=>{
      state.selectedProducts = [...state.selectedProducts,action.payload]
    },
    removeFromSelectedProducts:(state,action)=>{
      state.selectedProducts = state.selectedProducts.filter((product)=> product.product_name !== action.payload)
    },
    clearSelectedProducts:(state,action)=>{
      state.selectedProducts = action.payload;
    }
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

// Action creators are generated for each case reducer function
export const { setShowTotalAmountSpinner,setSelectedProducts,removeFromSelectedProducts,clearSelectedProducts } = cartSlice.actions

export default cartSlice.reducer