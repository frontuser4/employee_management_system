import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import BadgeIcon from '@mui/icons-material/Badge';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';

const index = [
  {
    title: "Dashboard",
    Icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    title: "Expense",
    Icon: TableChartIcon,
    path: "/dashboard/expense",
  },
  {
    title: "Employee",
    Icon: BadgeIcon,
    path: "/dashboard/employee",
  },
  {
    title: "ScoreCard",
    Icon: ScoreboardIcon,
    path: "/dashboard/scorecard",
  },
  {
    title: "Logout",
    Icon: LogoutIcon,
    path: "/login",
  },
];

export default index;
