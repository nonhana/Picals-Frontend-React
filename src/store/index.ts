import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './modules/user'
import favoriteReducer from './modules/favorites'
import imageReducer from './modules/image'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedFavoriteReducer = persistReducer(persistConfig, favoriteReducer)
const persistedImageReducer = persistReducer(persistConfig, imageReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    favorite: persistedFavoriteReducer,
    image: persistedImageReducer,
  },
})

export const persistor = persistStore(store)
export default store
