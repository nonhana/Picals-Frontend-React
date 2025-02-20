import type { FavoriteItemInfo } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const favoriteStore = createSlice({
  name: 'favorites',
  initialState: {
    favoriteList: [] as FavoriteItemInfo[],
  },
  reducers: {
    setFavoriteList(state, action) {
      state.favoriteList = action.payload
    },
    reset(state) {
      state.favoriteList = []
    },
  },
})

const { setFavoriteList, reset } = favoriteStore.actions

const favoriteReducer = favoriteStore.reducer

export { reset, setFavoriteList }
export default favoriteReducer
