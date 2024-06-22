import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Error from "./Pages/Error/Error";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Stock from "./Pages/Stock/Stock";
import Itens from "./Pages/Itens/Itens";
import Users from "./Pages/Users/Users";
import History from "./Pages/History/History";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/login", element: <Login /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/estoques",
        element: (
          <ProtectedRoute>
            <Stock />
          </ProtectedRoute>
        ),
      },
      {
        path: "/itens",
        element: (
          <ProtectedRoute>
            <Itens />
          </ProtectedRoute>
        ),
      },
      {
        path: "/usuarios",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/historico",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
