import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import requestsSlice from './features/requests/requestsSlice';

const store = configureStore({
  reducer: {
    requests: requestsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
