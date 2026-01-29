import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/modules/auth/store/auth.slice';
import dashboardReducer from '@/modules/dashboard/store/dashboard.slice';
import orderReducer from '@/modules/orders/store/orders.slice';
import sharedReducer from '@/shared/store/shared.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  orders: orderReducer,
  shared: sharedReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'dashboard', 'orders'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resettableRootReducer = (state: any, action: any) => {
  if (action.type === 'authSlice/logout') {
    // Match the action type from your logout action
    storage.removeItem('persist:root'); // Clear the persisted data
    localStorage.clear();
    return rootReducer(undefined, action); // Reset the state to initial
  }
  return persistedReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
