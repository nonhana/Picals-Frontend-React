import { createSlice } from '@reduxjs/toolkit'
import type { FavoriteItemInfo } from '@/utils/types'

const favoriteStore = createSlice({
  name: 'favorites',
  initialState: {
    favoriteList: [] as FavoriteItemInfo[],
  },
  reducers: {
    setFavoriteList(state, action) {
      state.favoriteList = action.payload
    },
  },
})

const { setFavoriteList } = favoriteStore.actions

const favoriteReducer = favoriteStore.reducer

export { setFavoriteList }
export default favoriteReducer
