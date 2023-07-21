import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  login : loginReducer
})

const persistReducers = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistReducers
})