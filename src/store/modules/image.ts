import { createSlice } from '@reduxjs/toolkit'

const imageStore = createSlice({
  name: 'image',
  initialState: {
    isDisplaying: false,
    imgSrc: '',
  },
  reducers: {
    setDisplayStatus(state, action) {
      state.isDisplaying = action.payload
    },
    setImgSrc(state, action) {
      state.imgSrc = action.payload
    },
  },
})

const { setDisplayStatus, setImgSrc } = imageStore.actions

const imageReducer = imageStore.reducer

export { setDisplayStatus, setImgSrc }
export default imageReducer
