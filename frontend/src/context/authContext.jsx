import { createContext, useState } from "react";

import authApi from "../api/authApi";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const login = async ({ username, password }) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + authApi.loginApi,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login Failed");
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async ({ email, username, password }) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + authApi.registerApi,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration Failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
