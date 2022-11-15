import { combineReducers } from 'redux';
import authReducer from './slices/api.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
