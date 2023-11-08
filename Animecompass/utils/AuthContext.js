import React, { createContext, useState, useEffect } from "react";
import { auth } from "../config"; // Make sure this is the correct path to your Firebase config

export const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe; // The unsubscribe function provided by onAuthStateChanged is the cleanup function
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
