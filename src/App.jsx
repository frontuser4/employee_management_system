import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ScoreCard from "./pages/ScoreCard";
import EmployeeTables from "./pages/EmployeeTables";
import EmployeeTablesTwo from './pages/EmployeeTableTwo';
import Card from './component/Card';

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
  {path:'expence', element: <EmployeeTablesTwo />},
  { path: "/employee", element: <EmployeeTables /> },
  { path: "/scorecard", element: <ScoreCard /> },
  { path: "/cards", element: <Card /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
