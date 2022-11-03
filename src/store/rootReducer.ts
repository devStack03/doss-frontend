import { combineReducers } from 'redux';
import apiReducer from './slices/api.slice';

export const rootReducer = combineReducers({
  api: apiReducer,
});
