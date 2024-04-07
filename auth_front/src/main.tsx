import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";
import { AuthProvider } from "./Auth/AuthProvider";
import "./App.css";

import i18next from "i18next";
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router}></RouterProvider>
      </I18nextProvider>
    </AuthProvider>
  </React.StrictMode>
);
