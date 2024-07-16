import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './modules/user'
import favoriteReducer from './modules/favorites'
import searchHistoryReducer from './modules/searchHistory'
import uploadFormReducer from './modules/uploadForm'
import viewListReducer from './modules/viewList'

const rootReducer = combineReducers({
  user: userReducer,
  favorite: favoriteReducer,
  searchHistory: searchHistoryReducer,
  uploadForm: uploadFormReducer,
  viewList: viewListReducer,
})

// Redux 持久化
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
