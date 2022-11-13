import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tickets } from './actions';
import httpService from '../../utils/axios';

export type PostDataType = {
  id: number,
  text: string
}

export type ResponseDataType = {
  id: number,
  text: string,
  translate: string
}

export type UserDataType = {
  id: string,
  email: string,
  phoneNumber: string,
  fullName: string
}

const blankData = [{
  text: '',
  translate: ''
}];

interface AuthSliceState {
  isLoading: boolean,
  registered: boolean,
  loggedin: boolean,
  data: Array<any>,
  user: UserDataType | null
}
const initialState: AuthSliceState = {
  isLoading: false,
  registered: false,
  loggedin: false,
  data: blankData,
  user: null
}

export function fetchDataList() {
  return httpService.get(`/data`);
}

export function addData(data: PostDataType) {
  return httpService.post(`/add`, data);
}

export const getDataListAsync = createAsyncThunk('data/fetch', async () => {
  const response: any = await fetchDataList();
  console.log(`response fetched: ${response.data}`);
  if (response.data.status === 1 && response.data.data.length > 0) {
    return (response.data.data).concat(blankData);
  }
  return blankData;
});

export const addDataAsync = createAsyncThunk('data/add', async (data: PostDataType) => {
  const response: any = await addData(data);
  if (response.data.status === 1 && response.data.data.length > 0) {
    return (response.data.data).concat(blankData);
  }
  return blankData;
})

export const apiSlice = createSlice({
  name: 'apiSlice',
  initialState,
  reducers: {
    resultLoaded: (state) => {
      state.isLoading = false;
    },
    fetchStarted: (state) => {
      state.isLoading = true;
    },
    userRegistered: (state) => {
      state.registered = true;
    },
    userLoggedin: (state, payload) => {
      state.loggedin = true;
      state.user = payload.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDataListAsync.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getDataListAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDataListAsync.rejected, (state) => {
        state.isLoading = false;
      })

    builder.addCase(addDataAsync.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addDataAsync.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const { resultLoaded, fetchStarted, userRegistered, userLoggedin } = apiSlice.actions

export default apiSlice.reducer;