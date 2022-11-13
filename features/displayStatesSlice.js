import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showLoginModal: false,
  showRegisterModal:false,
  showSpinnerPlaceholder:false,
}

export const displayStatesSlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload
    },
    setShowRegisterModal:(state,action)=>{
        state.showRegisterModal = action.payload
    },
    setShowSpinnerPlaceholder:(state,action)=>{
        state.showSpinnerPlaceholder = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowLoginModal,setShowRegisterModal,setShowSpinnerPlaceholder } = displayStatesSlice.actions

export default displayStatesSlice.reducer