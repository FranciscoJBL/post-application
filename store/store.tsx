import { configureStore } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // almacenamiento local como destino por defecto

const tokenReducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };