import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ScoreCard from './pages/ScoreCard';

const router = createBrowserRouter([{path:'/', element:<Login/>, errorElement: <PageNotFound/>}, {path:'/dashboard', element:<Dashboard/>}, {path:'/scorecard', element: <ScoreCard/>}])

function App() {
 
  return (
  <>
   <RouterProvider router={router}/>
  </>
  )
}

export default App
