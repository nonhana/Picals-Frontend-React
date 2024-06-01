import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './modules/user'
import favoriteReducer from './modules/favorites'
import imageReducer from './modules/image'

const rootReducer = combineReducers({
  user: userReducer,
  favorite: favoriteReducer,
  image: imageReducer,
})

// 持久化配置
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
