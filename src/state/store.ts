
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  blacklist: [],
  key: 'root',
  storage
};


const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  middleware: getDefaultMiddleware({ serializableCheck: false }), reducer: persistedReducer
});
const persistor = persistStore(store);

export { store, persistor }