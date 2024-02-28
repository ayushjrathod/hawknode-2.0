import "./App.css";
import Login from "./components/login";
import Test from "./components/test"; // Assuming you intend to use it later
import Compose from "./components/compose";
import Layout from "./components/layout";
import Home from "./components/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/compose", element: <Compose /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
