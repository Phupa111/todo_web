import LandingPage from "../page/landingPage/landingPage";
import Login from "../page/login/login";
import SignUp from "../page/sing-Up/sing_up";
import ToDoPage from "../page/todoPage/ToDoPage";
import ProtectRoute from "./ProtectRoute";
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
        <Route
          path="user"
          element={<ProtectRoute children={<Layoutlanding />} />}
        >
          <Route path="todo" element={<ToDoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
