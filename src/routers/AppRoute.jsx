import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "../page/landingPage/landingPage";
import Login from "../page/login/login";
import SignUp from "../page/sing-Up/sing_up";
import ToDoPage from "../page/todoPage/ToDoPage";
import ProtectRoute from "./ProtectRoute";
import Layoutlanding from "../Layout/layoutlanding";
import { useAuth } from "../contexts/AuthContext";

const AppRoute = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a user in sessionStorage or localStorage
    const user = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (user) {
      // Redirect to ToDoPage if a user is found
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route element={<Layoutlanding />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="sing-up" element={<SignUp />} />

        {/* Protected Routes */}
        {isLoggedIn && <Route path="todo" element={<ToDoPage />} />}

        {/* For protected routes with authentication */}
        {!isLoggedIn && (
          <Route
            path="user"
            element={<ProtectRoute children={<Layoutlanding />} />}
          >
            <Route path="todo" element={<ToDoPage />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoute;
