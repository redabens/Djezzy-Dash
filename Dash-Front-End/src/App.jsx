import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {Layout,LayoutLoader} from './pages/Layout';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout/>} loader={LayoutLoader}>
        <Route path=":name" element={<Dashboard/>} />
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
