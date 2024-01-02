import React from "react";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Auth from "./pages/Auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/edit/:id" Component={Edit} />
        <Route path="/auth" Component={Auth} />
        <Route path="/*" Component={NotFound} />
      </Routes>
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
    </BrowserRouter>
  );
}

export default App;
