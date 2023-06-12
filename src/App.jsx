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
import ExpTable from "./components/expence/ExpTable";
import TabTables from "./pages/TabTables";


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
  { path: "/expence", element: <ExpenceTables /> },
  { path: "/scorecard", element: <ScoreCard /> },
  { path: "/exp", element: <ExpTable /> },
  { path: "/tab", element: <TabTables /> }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
