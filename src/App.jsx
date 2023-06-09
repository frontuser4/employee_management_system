import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ScoreCard from "./pages/ScoreCard";
import EmployeeTables from "./pages/EmployeeTables";
import ExpenceTables from "./pages/ExpenceTables";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Login />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { path: "/employee", element: <EmployeeTables /> },
  { path: "/expence/:id", element: <ExpenceTables /> },
  { path: "/scorecard", element: <ScoreCard /> }

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
