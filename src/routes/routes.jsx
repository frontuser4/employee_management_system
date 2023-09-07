import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../component/loader/Loader";
import DashboardLayouts from "../layouts/DashboardLayout";
import PageNotFound from "../pages/PageNotFound";

const AuthGuard = ({ children }) => {
  const auth = localStorage.getItem("token");
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

const GuestGuard = ({children})=> {
  const auth = localStorage.getItem("token");
  return auth ? <Navigate to="/dashboard" /> : <>{children}</>
}

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loadable(lazy(() => import("../pages/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Expense = Loadable(lazy(() => import("../pages/ExpenceTables")));
const Employee = Loadable(lazy(() => import("../pages/EmployeeTables")));
const ScoreCard = Loadable(lazy(() => import("../pages/ScoreCard")));
const UpdateExpense = Loadable(lazy(() => import("../pages/UpdateTable")));
const SummaryExpense = Loadable(lazy(() => import("../pages/SummaryTable")));

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
