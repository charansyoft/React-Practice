import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Components
import NavBar from "./ToDo Application/NavBar";
import SignUp from "./ToDo Application/SignUp";
import LogIn from "./ToDo Application/LogIn";
import FrontPage from "./ToDo Application/FrontPage";
import ToDo from "./ToDo Application/Todo";
import Cookies from "js-cookie";

// React Query setup
const queryClient = new QueryClient();

// Protected Route inline
function RequireAuth({ children }) {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/userFrontPage"
            element={
              <RequireAuth>
                <ToDo />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
