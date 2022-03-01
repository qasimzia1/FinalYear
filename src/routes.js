// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import History from "views/History";
import SignUp from "views/SignUp";
import SignIn from "views/SignIn";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "boy",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "History",
    rtlName: "قائمة الجدول",
    icon: "history",
    component: History,
    layout: "/admin",
  },
  {
    path: "/signIn",
    name: "Sign In",
    rtlName: "قائمة الجدول",
    icon: "login",
    component: SignIn,
    layout: "/admin",
  },
  {
    path: "/signUp",
    name: "Sign Up",
    rtlName: "قائمة الجدول",
    icon: "personAddAltIcon",
    component: SignUp,
    layout: "/admin",
  },
];

export default dashboardRoutes;
