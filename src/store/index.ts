import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import favoriteReducer from './modules/favorites'

export default configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
  },
})
