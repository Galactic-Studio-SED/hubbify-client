import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    roles: [],
    id: null,
  });

  const login = (accessToken, roles, id) => {
    setAuth({ accessToken, roles, id });
  };

  const logout = () => {
    setAuth({ accessToken: null, roles: [], id: null });
  };

  const isLogged = () => {
    return auth.accessToken !== null;
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
