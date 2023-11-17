import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RequireLogin from "./components/RequireLogin.jsx";
import RequireAuth from "./components/RequireAuth";
import RedirectToLanding from "./components/RedirectToLanding";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  ADMIN: import.meta.env.VITE_ADMIN_ROLE,
  USER: import.meta.env.VITE_USER_ROLE,
  SUPER_ADMIN: import.meta.env.VITE_SUPER_ADMIN_ROLE,
};

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/landing" element={<LandingPage />}></Route>

      {/* protected routes (only logged in users can access) */}
      <Route element={<RedirectToLanding />}>
        <Route path="/" element={<HomePage />}></Route>
      </Route>
      <Route element={<RequireLogin />}>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>

      {/* private routes */}
      <Route element={<RequireAuth roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />}>
        <Route path="/users" element={<UsersPage />} />
      </Route>

      {/* not found route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
