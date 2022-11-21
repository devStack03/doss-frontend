import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import stripeService from '../../services/stripe.service';
import userService from '../../services/user.service';
import { isValidToken, setSession } from '../../utils';
import httpService from '../../utils/axios';

export interface StripeCustomerType {
  cancel_at?: number | null;
  cancel_at_period_end?: boolean;
  canceled_at?: number;
  collection_method?: string;
  created?: number;
  currency?: string;
  current_period_end?: number;
  current_period_start?: number;
  customer?: string | null;
  days_until_due?: null;
  default_payment_method?: null;
  default_source?: null;
  default_tax_rates?: any[];
  description?: string | null;
  discount?: null;
  ended_at?: number | null;
  id?: string | null;
  object?: string;
  plan?: any | null;
  quantity?: number;
  start_date?: number;
  status?: string;
  trial_end?: number | null;
  trial_start?: any | null;
}

export type StripeState = {
  data: StripeCustomerType,
  loading: boolean,
  status: string,

}

const initialState: StripeState = {
  data: {
    id: null,
    status: 'active',
    customer: null,
    current_period_end: 0,
    current_period_start: 0,
    created: 0,
    cancel_at: 0,
    cancel_at_period_end: false,
    canceled_at: 0
  },
  status: 'active',
  loading: false,
}

export function fetchStripeCustomerInfo() {
  const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';
  if (isValidToken(token!)) {
    setSession(token);
    return userService.getCustomerDetail();
  }
  return null;
}

export const getStripeCustomerDetailAsync = createAsyncThunk('stripe/customer', async () => {
  const response = await fetchStripeCustomerInfo();
  if (response && response.data.status === 1) {
    return response.data.data;
  }
  return initialState;
})

export const stripeSlice = createSlice({
  name: 'stripeSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getStripeCustomerDetailAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
      .addCase(getStripeCustomerDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStripeCustomerDetailAsync.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default stripeSlice.reducer; 