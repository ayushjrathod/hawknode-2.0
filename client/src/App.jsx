import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import LandingPage from "./components/LandingPage/landingPage.jsx";
import RequireAuth from "./components/Auth/requireAuth.jsx";
import Layout from "./components/layout";
import Compose from "./components/Compose/compose";
import PostPage from "./components/postSection/postPage.jsx";
import Dashboard from "./components/Dashboard/dashboard.jsx";
import DashboardEdit from "./components/Dashboard/dashboardEdit.jsx";
import ChangePassword from "./components/Dashboard/changePassword.jsx";
import EditPost from "./components/Compose/editPost.jsx";
import DeletePost from "./components/Compose/deletePost.jsx";
import CombinePostSection from "./components/postSection/combinePostsSection.jsx";
import { SearchProvider } from "./context/SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes/Protected */}
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<CombinePostSection />} />
          </Route>
          <Route path="/compose">
            <Route index element={<Compose />} />
          </Route>
          <Route path="/post/:postID" element={<Layout />}>
            <Route index element={<PostPage />} />
          </Route>
          <Route path="/edit-post/:postID" element={<Layout />}>
            <Route index element={<EditPost />} />
          </Route>
          <Route path="/delete-post/:postID" element={<Layout />}>
            <Route index element={<DeletePost />} />
          </Route>
          <Route path="/user/:username">
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
    </SearchProvider>
  );
}
