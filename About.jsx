import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">Why Choose OptiFleet?</h2>
          
          <div className="about-text-wrapper">
            <p className="about-lead">
              We are revolutionizing last-mile logistics by bridging the gap between 
              <span className="text-highlight"> AI precision</span> and 
              <span className="text-highlight"> human execution</span>.
            </p>
            <p>
              OptiFleet Pro is a comprehensive fleet management ecosystem designed to 
              empower logistics companies with real-time data and automated decision-making.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">35%</div>
              <div className="stat-label">Fuel Savings</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Fleets</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Delivery Success</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Expert Support</div>
            </div>
          </div>

          <div className="about-vision">
            <h3>Our Mission</h3>
            <p>
              To make global logistics more sustainable, efficient, and transparent through 
              cutting-edge technology and intelligent route optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;