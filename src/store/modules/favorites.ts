import { createSlice } from '@reduxjs/toolkit'
import { favoriteList } from '@/test/data'
import type { FavoriteItemInfo } from '@/utils/types'

const favoriteStore = createSlice({
  name: 'favorites',
  initialState: {
    favoriteList: [...favoriteList] as FavoriteItemInfo[],
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
