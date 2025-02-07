import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const clientId = process.env.REACT_APP_GCLIENT_ID;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.exp * 1000 > Date.now()) {
        return parsedUser; // Token is still valid
      } else {
        localStorage.removeItem("user"); // Token expired, remove it
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    console.log("User in AuthContext:", user);
  }, [user]);

  const login = (res) => {
    console.log(res.credential);
    const userData = jwtDecode(res.credential);

    if (userData.exp * 1000 > Date.now()) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.warn("Token is already expired!");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isTokenExpired = () => {
    if (!user || !user.exp) return true;
    return user.exp * 1000 < Date.now();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
