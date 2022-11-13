import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProducts: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilteredProducts } = filterSlice.actions

export default filterSlice.reducer