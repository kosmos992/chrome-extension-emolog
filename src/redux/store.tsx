import { configureStore, combineReducers } from '@reduxjs/toolkit';
import palettes from './slice';
import modal from './modalSlice';

const rootReducer = combineReducers({
  palettes,
  modal,
});

const store = configureStore({
  reducer: rootReducer,
});

// export const persistor = persistStore(store);
export default store;
