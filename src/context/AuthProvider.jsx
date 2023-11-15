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

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
