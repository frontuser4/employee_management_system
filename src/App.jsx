import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([{path:'/', element:<Login/>, errorElement: <PageNotFound/>}, {path:'/dashboard', element:<Dashboard/>}])

function App() {
 
  return (
  <>
   <RouterProvider router={router}/>
  </>
  )
}

export default App
