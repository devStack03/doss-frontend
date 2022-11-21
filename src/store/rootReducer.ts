import { combineReducers } from 'redux';
import authReducer from './slices/api.slice';
import stripeReducer from './slices/stripe.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  stripe: stripeReducer
});
