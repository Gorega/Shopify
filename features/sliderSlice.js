import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sliderValue: 0,
}

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSliderValue } = sliderSlice.actions

export default sliderSlice.reducer