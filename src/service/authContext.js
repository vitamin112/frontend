// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const login = (user) => {
    setIsLoggedIn(user);
    localStorage.setItem("isLoggedIn", user);
  };

  const logout = () => {
    setIsLoggedIn();
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
