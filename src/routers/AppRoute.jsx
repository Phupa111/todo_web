import { BrowserRouter, Routes, Route } from "react-router";
import Layoutlanding from "../Layout/layoutlanding";
import LandingPage from "../page/landingPage/landingPage";
import Login from "../page/login/login";
import SignUp from "../page/sing-Up/sing_up";
import ToDoPage from "../page/todoPage/ToDoPage";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layoutlanding />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="sing-up" element={<SignUp />} />
          <Route path="todo" element={<ToDoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
