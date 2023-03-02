import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import NavBar from '../features/navBar/NavBar';
import NewRequest from '../features/newRequest/NewRequest';
import Requests from '../features/requests/Requests';
import { useAppDispatch } from '../store';
import { dbLoaded } from '../features/requests/requestsSlice';
import { useSelector } from 'react-redux';
import { selectRequests } from '../features/requests/selectors';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dbLoaded());
  }, [dispatch]);

  const requests = useSelector(selectRequests);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route path='/new-request' element={<NewRequest />} />
        <Route path='/all-requests' element={<Requests requests={requests} />} />
      </Route>
    </Routes>
  );
}

export default App;
