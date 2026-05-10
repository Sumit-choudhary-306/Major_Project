import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [driver, setDriver] = useState(JSON.parse(localStorage.getItem('driver')));
    const navigate = useNavigate();

    // 1. Fetch Pending Orders
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/orders/pending');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!driver) {
            navigate('/'); 
        } else {
            fetchOrders();
        }
    }, [driver, navigate]);

    // 2. Accept Order Logic
    const acceptOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}/accept`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ driverId: driver.id })
            });

            if (response.ok) {
                alert("Order Accepted! 🚚");
                fetchOrders(); // Refresh list
            } else {
                alert("Could not accept order. ❌");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('driver');
        navigate('/');
    };

    if (loading && orders.length === 0) {
        return <div className="dashboard-container"><h3>Loading available shipments...</h3></div>;
    }

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <header className="dashboard-header">
                <div className="welcome-text">
                    <h2>OptiFleet Driver</h2>
                    <p>Welcome back, <strong>{driver?.fullName}</strong>! 👋</p>
                    <span className="status-online">Online 🟢</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <hr className="divider" />
            
            <h3 className="section-title">Available Shipments</h3>

            {/* Orders Grid */}
            <div className="orders-grid">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="card-header">
                                <span className="order-id">ID: #{order.id}</span>
                                <span className={`status-tag ${order.status.toLowerCase()}`}>
                                    {order.status} {order.status === 'Paid' ? '✅' : '⏳'}
                                </span>
                            </div>
                            
                            <div className="card-body">
                                <p><strong>📦 Item:</strong> {order.itemDescription}</p>
                                <p><strong>📍 From:</strong> {order.pickup}</p>
                                <p><strong>🏁 To:</strong> {order.dropLocation}</p>
                                <p><strong>⚖️ Weight:</strong> {order.weight} kg</p>
                                <p className="price-tag">Total: ₹{order.totalPrice}</p>
                            </div>

                            <button 
                                className="accept-btn"
                                onClick={() => acceptOrder(order.id)}
                            >
                                Accept Shipment 🚚
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">
                        <p>No new shipments available right now. We'll notify you when something pops up! 🔔</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;