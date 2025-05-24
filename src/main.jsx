import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css"; // Tilpass hvis du har global CSS
import { AuthProvider } from "./context/authContext";
import { router } from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
