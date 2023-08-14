import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ScoreCard from "./pages/ScoreCard";
import EmployeeTables from "./pages/EmployeeTables";
import EmployeeTablesTwo from "./pages/EmployeeTableTwo";
import Card from "./component/Card";
import UpdateTable from "./pages/UpdateTable";
import Loader from "./component/loader/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Component {...rest} />;
  } else {
    // Redirect to the login page
    navigate("/");
    return null;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route
            index
            path="/"
            element={<Login />}
            errorElement={<PageNotFound />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="expence" element={<EmployeeTablesTwo />} />
          <Route path="/employee" element={<EmployeeTables />} />
          <Route path="/scorecard" element={<ScoreCard />} />
          <Route path="/cards" element={<Card />} />
          <Route path="/updatetable" element={<UpdateTable />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
