import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. These imports are NOW at the top level of src/
import { AuthProvider, useAuth } from './components/AuthContext'; 
import { auth } from './components/firebase-config';

// 2. These imports are still in the components/ folder
import Login from './components/Login'; 
import Dashboard from './components/Dashboard'; 

import './App.css';

// ----------------------------------------------------------------------
// 1. Component to protect routes (Crucial for Authentication)
// ----------------------------------------------------------------------
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser, loading } = useAuth();

  // Show a loading state while Firebase initializes
  if (loading) {
    return <h1>Loading Authentication...</h1>; // Helpful feedback required
  }

  // If the user is logged in, show the component; otherwise, redirect to login
  return currentUser ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

// ----------------------------------------------------------------------
// 2. Main Routing Component
// ----------------------------------------------------------------------
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      {/* You can add a SignUp route here too */}
      
      {/* Protected Routes (Requires a logged-in user) */}
      <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />

      {/* Default route: redirect logged-out users to Login, logged-in users to Dashboard */}
      <Route path="/" element={<Navigate to={useAuth().currentUser ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

// ----------------------------------------------------------------------
// 3. Wrapper Component (App.jsx)
// ----------------------------------------------------------------------
function App() {
  return (
    // BrowserRouter handles routing
    <Router>
      {/* AuthProvider wraps everything to provide user state globally */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;