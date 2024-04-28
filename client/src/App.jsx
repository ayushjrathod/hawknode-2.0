import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Compose from "./components/compose";
import Layout from "./components/layout";
import Home from "./components/home";
import PreLoginPage from "./components/preLoginPage";
import PersistLogin from "./components/persistLogin.jsx";
import RequireAuth from "./components/requireAuth.jsx";
import { Routes, Route } from "react-router-dom";
import PostPage from "./components/postPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PreLoginPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes/Protected */}
      <Route element={<PersistLogin />}>
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
        </Route>
      </Route>
    </Routes>
  );
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/compose", element: <Compose /> },
//     ]
//   },
//   {path:"/login",element:<Login />},
//   {path:"/register",element:<Register />},
//   {path:"/",element:<PreLoginPage />}

// ]);

// export default router;
