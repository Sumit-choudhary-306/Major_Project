import React from 'react';
import { ChevronRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Home = ({ onBookingClick }) => {
  return (
    <main className="home-wrapper">
      {/* Landing Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
               <Zap size={14} fill="#eab308" color="#eab308" /> Trusted by 500+ Fleets
            </div>
            
            <h1 className="hero-title">
              AI-Powered Fleet <br /> 
              <span className="gradient-text">Management</span>
            </h1>
            
            <p className="hero-subtitle">
              Route optimization • Real-time GPS tracking • Driver assignment • 35% cost reduction guaranteed
            </p>

            <div className="features-teaser">
              <span className="feature-tag"><ShieldCheck size={16} color="#22c55e" /> No Credit Card</span>
              <span className="feature-tag"><BarChart3 size={16} color="#22c55e" /> Admin Tracking</span>
              <span className="feature-tag"><Zap size={16} color="#22c55e" /> Instant Access</span>
            </div>

            {/* --- PRIMARY ACTION BUTTON --- */}
            <div className="hero-actions-container">
              <button 
                className="main-book-btn" 
                onClick={onBookingClick} // App.js ka logic yahan connect ho gaya
              >
                Book Your First Shipment <ChevronRight size={22} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements from your image */}
        <div className="cta-glow"></div>
        <div className="bg-blur-circle"></div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card glass-morph">
              <div className="stat-number">35%</div>
              <div className="stat-label">Fuel Savings</div>
            </div>
            <div className="stat-card glass-morph">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Fleets</div>
            </div>
            <div className="stat-card glass-morph">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Delivery Success</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;