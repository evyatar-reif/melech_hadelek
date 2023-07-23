import settingsReducer from './settingsReducer';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage,
// };

const rootReducer = combineReducers({
  settingsState: settingsReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

// export const persistor = persistStore(store);
