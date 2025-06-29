import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import NavBar from "./ToDo Application/NavBar";
import SignUp from "./ToDo Application/SignUp";
import LogIn from "./ToDo Application/LogIn";
import FrontPage from "./ToDo Application/FrontPage";
import ToDo from "./ToDo Application/Todo";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/userFrontPage" element={<ToDo/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
