import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Update the path as per your file structure
import '../../index.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setUser(userCredential.user);

      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/phone-verification'); // Navigate after successful login
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'The email or password is incorrect.', // Simplified error message for the user
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="form-style">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" name="Login" />
      </form>
    </div>
  );
};

export default Login;
