import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Initialize theme before render - default to light
const savedTheme = localStorage.getItem('theme') || 'light';

const rootElement = document.getElementById("root");
const html = document.documentElement;
const body = document.body;

if (rootElement) rootElement.setAttribute('data-theme', savedTheme);
if (html) html.setAttribute('data-theme', savedTheme);
if (body) body.setAttribute('data-theme', savedTheme);

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <div className="poppins-font min-h-screen bg-base-100 text-base-content">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  </StrictMode>
);
