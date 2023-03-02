import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import RequestState from './types/RequestState';
import Requiest from './types/Requiest';

const initialState: RequestState = {
  requests: [],
};

export const dbLoaded = createAsyncThunk('dbLoaded', async () => {
  const requiests = await api.getRequiest();
  return requiests;
});

export const requestAdd = createAsyncThunk('requestAdd', async (data: any) => {
  const newRequest = await api.addRequest(data);
  return data;
});

export const requestDeleted = createAsyncThunk('requestDeleted', async (id: string) => {
  const deleted = await api.deletedRequest(id);
  return id;
});

export const requestChange = createAsyncThunk('requestChange', async (newRequest: {}) => {
  const change = await api.changeRequest(newRequest);
  return newRequest;
});

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dbLoaded.fulfilled, (state, action) => {
        const allRequests = action.payload;

        state.requests = allRequests;
      })
      .addCase(requestAdd.fulfilled, (state, action) => {
        const newRequest = action.payload;
        state.requests.push(newRequest);
      })
      .addCase(requestDeleted.fulfilled, (state, action) => {
        const id = action.payload;
        state.requests = state.requests.map((el) => (el.id === id ? { id, status: 'deleted' } : el));
      })
      .addCase(requestChange.fulfilled, (state, action) => {
        const changeData = action.payload;
        state.requests = state.requests.map((el) => (el.id === changeData.id ? changeData : el));
      });
  },
});
export default requestSlice.reducer;
