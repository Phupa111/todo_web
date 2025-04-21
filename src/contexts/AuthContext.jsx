import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (userData, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    console.log("Logged in:", userData, "Remember me:", rememberMe);
  };

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
