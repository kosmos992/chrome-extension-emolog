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

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
