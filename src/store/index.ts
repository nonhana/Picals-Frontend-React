import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import favoriteReducer from './modules/favorites'
import imageReducer from './modules/image'

export default configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
    image: imageReducer,
  },
})
