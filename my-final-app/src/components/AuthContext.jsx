import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config'; // Import the service you created

// 1. Create the Context
const AuthContext = createContext();

// 2. Custom Hook to use the Auth Context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. The Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks initial Firebase load

  // Listen for changes in authentication state (This is the Firebase magic!)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // user is null if logged out, or the user object if logged in
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
    // Add login/logout functions here later
  };

  // Only render children once the initial authentication state is known
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};