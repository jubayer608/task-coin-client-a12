import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div data-theme="microtasktheme" className="inter-font">
     <QueryClientProvider client={queryClient}>
        <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
     </QueryClientProvider>
    </div>
  </StrictMode>
);
