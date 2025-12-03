// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from './firebase-config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between Login/Sign Up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSigningUp) {
        // --- SIGN UP LOGIC ---
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User successfully signed up.");
        // Firebase Auth automatically logs the user in after creation
      } else {
        // --- LOG IN LOGIC ---
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User successfully logged in.");
      }
      
      // Navigate to the dashboard on success
      navigate('/dashboard'); 

    } catch (err) {
      // Graceful error handling with messaging is required
      console.error("Authentication Error:", err.message);
      
      // Display user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isSigningUp ? 'Create Account' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        
        <button type="submit" disabled={loading} style={styles.button}>
          {/* Helpful feedback for asynchronous operations required */}
          {loading ? 'Processing...' : (isSigningUp ? 'Sign Up' : 'Log In')}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
      
      <button 
        onClick={() => setIsSigningUp(!isSigningUp)} 
        style={styles.toggleButton}
      >
        {isSigningUp 
          ? 'Already have an account? Log In' 
          : "Need an account? Sign Up"
        }
      </button>
    </div>
  );
};

// Basic Inline Styles (You should use CSS for better responsiveness/design)
const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginTop: '10px',
    },
    toggleButton: {
        marginTop: '20px',
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default Login;