import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';

const router = createBrowserRouter([{path:'/', element:<Login/>, errorElement: <PageNotFound/>}, {path:'/dashboard', element:<Dashboard/>}, {path:'/profile', element:<Profile/>}])

function App() {
 
  return (
  <>
   <RouterProvider router={router}/>
  </>
  )
}

export default App
