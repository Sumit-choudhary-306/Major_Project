import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [data, setData] = useState({ fullName: '', email: '', licenseNumber: '', password: '', vehicleInfo: 'Truck' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/drivers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert("Registration Successful! Please Login.");
        navigate('/');
      }
    } catch (error) {
      alert("Registration failed. Check Backend!");
    }
  };

  // Register.jsx ka return part
return (
          <div className="register-container"> {/* CSS class yahan match honi chahiye */}
            <div className="register-box">
                <form onSubmit={handleRegister}>
                   <h2>Driver Registration</h2>
                   <input type="text" placeholder="Full Name" onChange={e => setData({...data, fullName: e.target.value})} required />
                   <input type="email" placeholder="Email" onChange={e => setData({...data, email: e.target.value})} required />
                   <input type="text" placeholder="License Number" onChange={e => setData({...data, licenseNumber: e.target.value})} required />
                
                    <select onChange={e => setData({...data, vehicleInfo: e.target.value})}>
                        <option value="Truck">Truck</option>
                        <option value="Van">Van</option>
                        <option value="Bike">Bike</option>
                    </select>

                    <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} required />
                
                    <button type="submit">Register Now</button>
                
                    <div style={{textAlign: 'center', marginTop: '15px'}}>
                      Already have an account? <Link to="/">Login here</Link>
                    </div>
                </form>
              </div>
           </div>
          );
};

export default Register;