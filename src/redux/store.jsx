import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from "localforage";
import { combineReducers } from 'redux';
import userSlice from "./userSlice";
import enterpriseDataSlice from "./enterpriseDataSlice";
import consumerDataSlice from "./consumerDataSlice";
import deliveryboyDataSlice from "./deliveryboyDataSlice";
import commonDataSlice from "./commonDataSlice";
import adminSlice from "./adminSlice";
import authSlice from './authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: localforage,
};

// Root reducer
const rootReducer = combineReducers({
  commonData: commonDataSlice,
  auth: authSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
