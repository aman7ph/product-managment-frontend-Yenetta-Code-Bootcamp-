import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { userReducer } from "./userSlice";
import { productReducer } from "./productSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReduce = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
