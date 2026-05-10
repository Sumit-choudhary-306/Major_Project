import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/drivers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
      });

      if (res.ok) {
        const driver = await res.json();
        // Key ko 'driver' rakha hai taaki App.js ise pehchan sake
        localStorage.setItem('driver', JSON.stringify(driver)); 
        navigate('/dashboard');
      } else {
        alert("Ghalat Email ya Password!");
      }
    } catch (err) {
      alert("Backend se connect nahi ho raha!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>Driver Login</h2>
          <input type="email" placeholder="Email" onChange={e => setCreds({...creds, email: e.target.value})} required />
          <input type="password" placeholder="Password" onChange={e => setCreds({...creds, password: e.target.value})} required />
          <button type="submit">Login Now</button>
          <p style={{marginTop: '15px'}}>New Driver? <Link to="/register">Register Here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;