
import { Navigate } from "react-router-dom";

import DashboardLayouts from "../layouts/DashboardLayout";
import PageNotFound from "../pages/PageNotFound";
import Login from '../pages/Login';
import Dashboard from "../pages/Dashboard";
import Expense from "../pages/ExpenceTables";
import Employee from "../pages/EmployeeTables";
import ScoreCard from "../pages/ScoreCard";
import UpdateExpense from "../pages/UpdateTable";
import SummaryExpense from "../pages/SummaryTable";



const AuthGuard = ({ children }) => {
  const auth = localStorage.getItem("token");
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

const GuestGuard = ({children})=> {
  const auth = localStorage.getItem("token");
  return auth ? <Navigate to="/dashboard" /> : <>{children}</>
}



const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <GuestGuard><Login /></GuestGuard> ,
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayouts />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "scorecard",
        element: <ScoreCard />,
      },
      {
        path: "summary-expense",
        element: <SummaryExpense />,
      },
      {
        path: "update-expence",
        element: <UpdateExpense />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
