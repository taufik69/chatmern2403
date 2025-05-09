import database from "../Database/Firebase.config.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { CounterProvider } from "./context/CountContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />

    <App />
  </StrictMode>
);
