import { useState } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import './App.css';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/" element={<Layout/>}>
        <Route path="dashboard/:name" element={<Dashboard/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
