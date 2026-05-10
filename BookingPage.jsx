import React, { useState, useEffect } from 'react';
import { Truck, Bike, Car, MapPin, Package, ChevronRight, Laptop, Sofa, FileText, Box, AlertCircle, Clock, Scale } from 'lucide-react';
import PaymentPage from './Payment'; 

const BookingPage = () => {
  const [formData, setFormData] = useState({
    itemDescription: '',
    category: '',
    pickup: '',
    drop: '',
    vehicle: 'bike',
    distance: 0,
    weight: 1
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const rates = { bike: 10, van: 25, truck: 50 };
  const times = { bike: '45 mins', van: '1.5 hours', truck: '3 hours' };
  
  // Weight Limits
  const weightLimits = { bike: 20, van: 500, truck: 2500 };

  const categories = [
    { name: 'Documents', icon: <FileText size={24} /> },
    { name: 'Electronics', icon: <Laptop size={24} /> },
    { name: 'Furniture', icon: <Sofa size={24} /> },
    { name: 'Others', icon: <Box size={24} /> },
  ];

  // Auto-switch vehicle if current one becomes invalid due to weight
  useEffect(() => {
    if (formData.weight > weightLimits[formData.vehicle]) {
      if (formData.weight <= weightLimits.bike) setFormData(prev => ({...prev, vehicle: 'bike'}));
      else if (formData.weight <= weightLimits.van) setFormData(prev => ({...prev, vehicle: 'van'}));
      else if (formData.weight <= weightLimits.truck) setFormData(prev => ({...prev, vehicle: 'truck'}));
    }
  }, [formData.weight]);

 const handleConfirmOrder = () => {
    if (formData.distance > 0 && formData.itemDescription !== '') {
      setShowPayment(true); // Sirf modal open karega, backend call nahi
    } else {
      alert("Please enter valid details and distance.");
    }
  };

 // Logic: Is function ka naam wahi hai jo browser dhund raha hai
  const handleFinalPaymentComplete = async (paymentMethod) => {
    const orderToSave = {
      itemDescription: formData.itemDescription,
      pickup: formData.pickup,
      dropLocation: formData.drop, // Backend alignment
      weight: formData.weight,
      totalPrice: totalPrice,
      status: paymentMethod === 'Cash on Delivery' ? 'Unpaid' : 'Paid',
      driverStatus: 'Inactive'
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderToSave)
      });

      if (response.ok) {
        alert(`Order successful via ${paymentMethod}! ✅`);
        setShowPayment(false);
        window.location.reload(); 
      } else {
        alert("Booking failed at server side.");
      }
    } catch (error) {
      alert("Backend not connected!");
    }
  };
  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      return data && data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
    } catch (e) { return null; }
  };

  const calculateRealDistance = async () => {
    if (formData.pickup.length > 3 && formData.drop.length > 3) {
      setIsCalculating(true);
      const start = await getCoordinates(formData.pickup);
      const end = await getCoordinates(formData.drop);
      if (start && end) {
        try {
          const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`);
          const osrmData = await osrmRes.json();
          if (osrmData.routes && osrmData.routes.length > 0) {
            const roadDistance = (osrmData.routes[0].distance / 1000).toFixed(2);
            setFormData(prev => ({ ...prev, distance: parseFloat(roadDistance) }));
          }
        } catch (err) { console.error("OSRM Error:", err); }
      }
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { calculateRealDistance(); }, 2000);
    return () => clearTimeout(timer);
  }, [formData.pickup, formData.drop]);

  useEffect(() => {
    const baseFare = 50;
    const distanceCost = formData.distance * rates[formData.vehicle];
    const weightCost = (formData.weight || 0) * 5;
    setTotalPrice(parseFloat((baseFare + distanceCost + weightCost).toFixed(2)));
  }, [formData.distance, formData.vehicle, formData.weight]);

  const isFormReady = formData.pickup && formData.drop && formData.category && formData.distance > 0 && formData.weight <= 2500;

  if (showPayment) {
    return (
      <div className="booking-dashboard">
         <PaymentPage 
           orderDetails={currentOrder} 
           onPaymentComplete={handleFinalPaymentComplete} 
         />
      </div>
    );
  }

  return (
    <div className="booking-dashboard">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Smart Booking <span className="neon-text">⚡</span></h1>
          <p>OptiFleet: Real-time Road Distance Tracking</p>
        </div>

        <div className="booking-grid">
          <div className="input-section">
            <div className="glass-panel">
              <h3 className="panel-title"><Package className="neon-icon" /> Shipment Details</h3>
              <div className="category-grid">
                {categories.map((cat) => (
                  <div key={cat.name} 
                    onClick={() => setFormData({...formData, category: cat.name})}
                    className={`cat-item ${formData.category === cat.name ? 'active' : ''}`}>
                    {cat.icon}
                    <span>{cat.name}</span>
                  </div>
                ))}
              </div>
              <input 
                className="dark-input" 
                placeholder="Describe your item..." 
                value={formData.itemDescription}
                onChange={(e) => setFormData({...formData, itemDescription: e.target.value})}
              />
              <div style={{marginTop: '15px'}}>
                <label style={{color: '#94a3b8', fontSize: '0.8rem', marginLeft: '5px'}}><Scale size={14}/> Weight (KG)</label>
                <input 
                  type="number"
                  className="dark-input" 
                  placeholder="Weight in KG" 
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="glass-panel">
              <h3 className="panel-title"><MapPin className="neon-icon" /> Route Details</h3>
              <div className="route-inputs">
                <input className="dark-input" placeholder="Pickup Address" value={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.value})} />
                <div className="route-line"></div>
                <input className="dark-input" placeholder="Drop Address" value={formData.drop} onChange={(e) => setFormData({...formData, drop: e.target.value})} />
              </div>
              {isCalculating && <div className="loader-text" style={{color: '#0ea5e9'}}>🚀 Fetching Exact Road Route...</div>}
            </div>

            <div className="glass-panel">
              <h3 className="panel-title"><Truck className="neon-icon" /> Fleet Selection</h3>
              <div className="vehicle-selection">
                {['bike', 'van', 'truck'].map((v) => {
                  const isOverweight = formData.weight > weightLimits[v];
                  return (
                    <div key={v} 
                      onClick={() => !isOverweight && setFormData({...formData, vehicle: v})}
                      className={`vehicle-card ${formData.vehicle === v ? 'active' : ''} ${isOverweight ? 'disabled-vehicle' : ''}`}
                      style={{
                        opacity: isOverweight ? 0.4 : 1,
                        pointerEvents: isOverweight ? 'none' : 'auto',
                        cursor: isOverweight ? 'not-allowed' : 'pointer',
                        filter: isOverweight ? 'grayscale(1)' : 'none'
                      }}>
                      <div className="v-name">{v.toUpperCase()}</div>
                      <div className="v-time"><Clock size={12} /> {times[v]}</div>
                      <div style={{fontSize: '0.65rem', marginTop: '4px', color: isOverweight ? '#ef4444' : '#94a3b8'}}>
                        Max: {weightLimits[v]}kg
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="summary-section">
            {isFormReady ? (
              <div className="glass-panel summary-card">
                <h2>Fare Summary</h2>
                <div className="summary-row"><span>Road Distance</span> <span>{formData.distance} KM</span></div>
                <div className="summary-row"><span>Total Weight</span> <span>{formData.weight} KG</span></div>
                <div className="summary-row"><span>Vehicle Type</span> <span style={{color: '#0ea5e9'}}>{formData.vehicle}</span></div>
                <div className="divider"></div>
                <div className="total-row">
                  <span>Grand Total</span>
                  <span className="price-text">₹{totalPrice}</span>
                </div>
                <button className="confirm-btn" onClick={handleConfirmOrder}>
                  Confirm Shipment <ChevronRight />
                </button>
              </div>
            ) : (
              <div className="glass-panel empty-summary">
                <AlertCircle size={50} className="faded-icon" />
                <p>
                  {formData.weight > 2500 
                    ? "Weight exceeds maximum capacity (2500kg)!" 
                    : "Enter valid details to calculate fare."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;