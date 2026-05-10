import React, { useState } from 'react';
import { QrCode, CreditCard, Landmark, Banknote, CheckCircle } from 'lucide-react';

const PaymentPage = ({ orderDetails, onPaymentComplete }) => {
  const [method, setMethod] = useState('qr');

  // Logic: Mapping strings to match the expectation in BookingPage
  const paymentMapping = {
    'qr': 'QR Code',
    'card': 'Card',
    'netbanking': 'Net Banking',
    'cod': 'Cash on Delivery'
  };

  const handleConfirm = () => {
    // Logic: Passing the selected payment method back to the parent component
    onPaymentComplete(paymentMapping[method]);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '25px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '8px' }}>Select Payment Method</h2>
      
     {/* Logic: Price Display from Props */}
      <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        Total Amount: <strong>₹{orderDetails?.totalPrice || 0}</strong>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        {/* QR Code Option */}
        <div 
          onClick={() => setMethod('qr')} 
          style={method === 'qr' ? activeStyle : inactiveStyle}
        >
          <QrCode size={28} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>QR Code</span>
        </div>

        {/* Card Option */}
        <div 
          onClick={() => setMethod('card')} 
          style={method === 'card' ? activeStyle : inactiveStyle}
        >
          <CreditCard size={28} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Card</span>
        </div>

        {/* Net Banking Option */}
        <div 
          onClick={() => setMethod('netbanking')} 
          style={method === 'netbanking' ? activeStyle : inactiveStyle}
        >
          <Landmark size={28} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Net Banking</span>
        </div>

        {/* COD Option */}
        <div 
          onClick={() => setMethod('cod')} 
          style={method === 'cod' ? activeStyle : inactiveStyle}
        >
          <Banknote size={28} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Cash</span>
        </div>
      </div>

      {/* Dynamic UI sections based on selection */}
      <div style={{ minHeight: '100px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '15px', marginBottom: '20px' }}>
        {method === 'qr' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#ddd', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={40} color="#334155" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Scan QR to pay ₹{orderDetails?.totalPrice}</p>
          </div>
        )}

        {method === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Card Number" style={inputStyle} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="MM/YY" style={inputStyle} />
              <input type="password" placeholder="CVV" style={inputStyle} />
            </div>
          </div>
        )}

        {method === 'netbanking' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '12px', color: '#64748b' }}>Select Your Bank</label>
            <select style={inputStyle}>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          </div>
        )}

        {method === 'cod' && (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={40} color="#059669" style={{ margin: '0 auto 10px' }} />
            <p style={{ color: '#059669', fontWeight: 'bold' }}>Cash on Delivery</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Pay after delivery.</p>
          </div>
        )}
      </div>

      <button onClick={handleConfirm} style={payButton}>
        Confirm & Book Order
      </button>
    </div>
  );
};

// Styles Objects (Existing styles preserved)
const inactiveStyle = { padding: '15px', border: '2px solid #f1f5f9', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.2s', color: '#64748b' };
const activeStyle = { ...inactiveStyle, borderColor: '#0ea5e9', backgroundColor: '#f0f9ff', color: '#0369a1', transform: 'scale(1.02)' };
const payButton = { width: '100%', padding: '15px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };

// Ye line add karein agar missing hai 👇
const inputStyle = { 
  width: '100%', 
  padding: '10px', 
  marginTop: '5px', 
  borderRadius: '8px', 
  border: '1px solid #cbd5e1', 
  outline: 'none', 
  fontSize: '14px' 
};

export default PaymentPage;