import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Solving your logistics challenges, one delivery at a time.</p>
            <div className="info-details">
              <div className="info-item">
                <span className="icon">📍</span>
                <p>123 Logistics Way, Indore, MP</p>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <p>+91 9876543210</p>
              </div>
              <div className="info-item">
                <span className="icon">📧</span>
                <p>support@optifleet.pro</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required className="glass-input" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required className="glass-input" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we help you?" rows="5" className="glass-input"></textarea>
              </div>
              <button type="submit" className="btn btn-primary full-width">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;