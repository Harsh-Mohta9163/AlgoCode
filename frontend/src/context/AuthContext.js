import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:8000/auth/user/", {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
    }
  }, []);

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:8000/auth/login/", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.key);
    // Fetch user info after login
    const userRes = await axios.get("http://localhost:8000/auth/user/", {
      headers: { Authorization: `Token ${response.data.key}` }
    });
    setUser(userRes.data);
    return response.data;
  };

  const logout = async () => {
    await axios.post("http://localhost:8000/auth/logout/", {}, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    });
    setUser(null);
    localStorage.removeItem("token");
  };

  const signup = async (username, email, password1, password2) => {
    const response = await axios.post("http://localhost:8000/auth/registration/", {
      username,
      email,
      password1,
      password2,
    });
    setUser(response.data.user);
    localStorage.setItem("token", response.data.key);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};