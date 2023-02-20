import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import authReducer from './slices/auth'
import alertReducer from './slices/alert'
import themeReducer from './slices/theme'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['alert']
}

const rootReducer = combineReducers({
  alert: alertReducer,
  theme: themeReducer,
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

const persistor = persistStore(store)

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
