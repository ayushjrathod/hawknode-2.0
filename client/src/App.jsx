import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import PreLoginPage from "./components/Auth/preLoginPage";
import RequireAuth from "./components/Auth/requireAuth.jsx";
import Home from "./components/Hero/home";
import Layout from "./components/layout";
import Compose from "./components/Compose/compose";
import PostPage from "./components/postSection/postPage.jsx";
import Dashboard from "./components/Dashboard/dashboard.jsx";
import DashboardEdit from "./components/Dashboard/dashboardEdit.jsx";
import ChangePassword from "./components/Dashboard/changePassword.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PreLoginPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes/Protected */}
      {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/compose" element={<Layout />}>
            <Route index element={<Compose />} />
          </Route>
          <Route path="/post/:postID" element={<Layout />}>
            <Route index element={<PostPage />} />
          </Route>
          <Route path="/user/:username" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/user/edit/:username" element={<Layout />}>
            <Route index element={<DashboardEdit />} />
          </Route>
          <Route path="/user/change-password/:username" element={<Layout />}>
            <Route index element={<ChangePassword />} />
          </Route>
        </Route>
      {/* </Route> */}
    </Routes>
  );
}
