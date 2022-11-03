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

const blankData = [{
  text: '',
  translate: ''
}];

interface AuthSliceState {
  isLoading: boolean,
  data: Array<any>,
}
const initialState: AuthSliceState = {
  isLoading: false,
  data: blankData
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

export default apiSlice.reducer;