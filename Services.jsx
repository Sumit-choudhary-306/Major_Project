const serviceData = [
  { icon: "🗺️", title: "Route Optimization", features: ["AI TSP Solver", "Real-time traffic", "35% fuel savings"] },
  { icon: "📡", title: "Real-Time Tracking", features: ["GPS every 10s", "WebSocket updates", "ETA predictions"] },
  { icon: "📊", title: "Admin Dashboard", features: ["Full Analytics", "User Monitoring", "Export Reports"] }
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Complete Logistics Solution</h2>
        <div className="services-grid">
          {serviceData.map((s, i) => (
            <div key={i} className="service-card featured">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <ul className="service-features">
                {s.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}