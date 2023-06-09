import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ScoreCard from './pages/ScoreCard';
import Admin from './pages/Admin';
import Employee from './pages/Employee';

const router = createBrowserRouter(
  [
    { path: '/login', element: <Login />, errorElement: <PageNotFound /> },
    { path: '/', element: <Dashboard />, children: [{path:'/admin', element: <Admin/>}, {path:'/employee/:id', element: <Employee/>}] },
    { path: '/scorecard', element: <ScoreCard /> }, 
  ]
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
