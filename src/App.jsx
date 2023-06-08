import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ScoreCard from './pages/ScoreCard';
import Employee from './pages/Employee';

const router = createBrowserRouter([{path:'/', element:<Login/>, errorElement: <PageNotFound/>}, {path:'/dashboard', element:<Dashboard/>}, {path:'/scorecard', element: <ScoreCard/>}, {path:'/employee/:id', element: <Employee/>}])

function App() {
 
  return (
  <>
   <RouterProvider router={router}/>
  </>
  )
}

export default App
