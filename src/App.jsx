import {
  createBrowserRouter,
  RouterProvider,
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
    children : [{path:'expence', element: <ExpenceTables />}]
  },
  { path: "/employee", element: <EmployeeTables /> },
  { path: "/scorecard", element: <ScoreCard /> },
  // { path: "/exp", element: <Exp /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
