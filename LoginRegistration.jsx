import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Phone } from 'lucide-react';

const LoginRegistration = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    
    // Payload preparation
    const payload = isLogin 
      ? { email, password } 
      : { fullName, email, password, contactNumber };

    // --- DEBUGGING: Console mein check karo data sahi hai ya nahi ---
    console.log("Sending Payload to Backend:", payload);

    try {
      const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // Data ko parse kar lo pehle hi

      if (response.ok) {
        if (isLogin) {
          if (onLogin) onLogin(data);
        } else {
          alert("Registration Successful! Please Login. 🎉");
          setIsLogin(true);
          // Resetting fields
          setFullName('');
          setEmail('');
          setPassword('');
          setContactNumber('');
        }
      } else if (response.status === 409) {
        alert(data.body || "Bhai, ye Email ya Number pehle se register hai! 🛑");
      } else {
        alert("Invalid credentials or server error.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Backend server not connected. Check if Spring Boot is running on 8080.");
    }
  };

  return (
    <div className="modern-auth-wrapper">
      <div className="glass-card">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Join OptiFleet Pro'}</h2>
          <p>{isLogin ? 'Enter your credentials to access your account' : 'Start your logistics journey with us'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name"
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group">
                <Phone className="input-icon" size={20} />
                <input 
                  type="tel" 
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={contactNumber} 
                  onChange={(e) => setContactNumber(e.target.value)} 
                  required 
                />
              </div>
            </>
          )}
          
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn">
            {isLogin ? 'Sign In' : 'Register Now'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="auth-footer">
          <p onClick={() => {
            setIsLogin(!isLogin);
            setContactNumber(''); // Toggle karte waqt clear kar do
          }} style={{cursor: 'pointer'}}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={{color: 'var(--primary-gold)', fontWeight: 'bold'}}>
                {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;