import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  ADMIN: "Adm",
  USER: "Usr",
  SUPER_ADMIN: "Sdm",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* private routes */}
      <Route element={<RequireAuth roles={[ROLES.ADMIN]} />}>
        <Route path="/users" element={<div>Users</div>} />
      </Route>

      {/* not found route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
