import React, { useEffect, useState } from 'react';
import { Users, LayoutDashboard, LogOut, Trash2, Package, MapPin, Truck, Phone, Scale, Wallet } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  const API_BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [userRes, orderRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/users`),
        fetch(`${API_BASE_URL}/orders`) 
      ]);

      if (!userRes.ok || !orderRes.ok) throw new Error("Data fetch incomplete");

      const userData = await userRes.json();
      const orderData = await orderRes.json();

      setUsers(userData);
      setOrders(orderData);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Confirm to delete User data")) {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setUsers(users.filter(u => u.id !== id));
          alert("User Successfully Deleted ✅");
        }
      } catch (err) {
        alert("Not Deleted ❌");
      }
    }
  };

 // 🔥 ONLY CHANGE HERE: Logic updated to use DELETE method
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
          method: 'DELETE', // Backend @DeleteMapping mapping
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          // Update UI immediately after successful deletion
          setOrders(orders.filter(order => order.id !== id));
          alert("Order Deleted Successfully!");
        } else {
          alert(response.status === 405 ? "Method Not Allowed: Check Backend Controller" : "Delete failed");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Backend Not Connected!");
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7fe' }}>
      
      {/* --- Sidebar --- */}
      <div style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '40px', textAlign: 'center' }}>OptiFleet Pro</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div onClick={() => setActiveTab('users')} style={activeTab === 'users' ? activeNavStyle : navStyle}>
            <Users size={20} /> Manage Users
          </div>
          <div onClick={() => setActiveTab('bookings')} style={activeTab === 'bookings' ? activeNavStyle : navStyle}>
            <Package size={20} /> Recent Bookings
          </div>
        </nav>

        <div onClick={onLogout} style={logoutStyle}>
          <LogOut size={20} /> Logout Admin
        </div>
      </div>

      {/* --- Main Content --- */}
      <div style={{ flex: 1, padding: '30px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e293b' }}>{activeTab === 'users' ? "User Control" : "Order Logistics"}</h1>
          <div style={badgeStyle}>👑 System Root Admin</div>
        </header>

        {/* Stats Section */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: '14px', color: '#64748b' }}>Total Users</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{users.length}</p>
          </div>
          <div style={{ ...cardStyle, borderLeftColor: '#10b981' }}>
            <h3 style={{ fontSize: '14px', color: '#64748b' }}>Total Bookings</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{orders.length}</p>
          </div>
          <div style={{ ...cardStyle, borderLeftColor: '#f59e0b' }}>
            <h3 style={{ fontSize: '14px', color: '#64748b' }}>Revenue</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Table Content */}
        <div style={tableContainer}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Bhai ruko, data load ho raha hai...</div>
          ) : activeTab === 'users' ? (
            /* --- USERS TABLE --- */
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={thRow}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={trStyle}>
                    <td style={tdStyle}>#{u.id}</td>
                    <td style={tdStyle}>{u.fullName}</td>
                    <td style={tdStyle}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                         <Phone size={14} color="#64748b"/> {u.contactNumber || 'N/A'}
                       </span>
                    </td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}><span style={roleBadge}>{u.role}</span></td>
                    <td style={tdStyle}><Trash2 onClick={() => handleDeleteUser(u.id)} size={18} color="#ef4444" style={{cursor:'pointer'}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* --- BOOKINGS TABLE --- */
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={thRow}>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Product</th>
                  <th style={thStyle}>Weight</th>
                  <th style={thStyle}>Route</th>
                  <th style={thStyle}>Vehicle</th>
                  <th style={thStyle}>Fare</th>
                  <th style={thStyle}>Payment</th> {/* New Column */}
                  <th style={thStyle}>Status</th> 
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={trStyle}>
                    <td style={tdStyle}>#{o.id}</td>
                    <td style={tdStyle}><strong>{o.category}</strong><br/><small>{o.itemDescription}</small></td>
                    
                    <td style={tdStyle}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0ea5e9', fontWeight: 'bold' }}>
                        <Scale size={14}/> {o.weight || 0} KG
                      </span>
                    </td>

                    <td style={tdStyle}><MapPin size={12}/> {o.pickup} ➡️ {o.dropLocation}</td>
                    <td style={tdStyle}><Truck size={14}/> {o.vehicle}</td>
                    <td style={tdStyle}><span style={{fontWeight:'bold'}}>₹{o.totalPrice?.toFixed(2)}</span></td>

                    {/* Payment Method Column */}
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#475569' }}>
                        <Wallet size={14} color="#6366f1"/>
                        {o.paymentMethod || 'COD'}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <span style={{ 
                        ...statusBadge, 
                        backgroundColor: (o.status === 'Pending' || !o.status) ? '#fef3c7' : '#d1fae5', 
                        color: (o.status === 'Pending' || !o.status) ? '#92400e' : '#065f46' 
                      }}>
                        {o.status || 'Pending'}
                      </span>
                    </td>
                    
                    <td style={tdStyle}>
                      <Trash2 
                        onClick={() => handleDeleteOrder(o.id)} 
                        size={18} 
                        color="#ef4444" 
                        style={{cursor:'pointer'}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles 
const navStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', cursor: 'pointer', borderRadius: '8px', transition: '0.3s' };
const activeNavStyle = { ...navStyle, backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold' };
const logoutStyle = { ...navStyle, marginTop: 'auto', color: '#fb7185', border: '1px solid #fb7185' };
const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderLeft: '6px solid #38bdf8' };
const tableContainer = { backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflowX: 'auto' };
const thRow = { borderBottom: '2px solid #f1f5f9', textAlign: 'left' };
const thStyle = { padding: '15px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' };
const trStyle = { borderBottom: '1px solid #f1f5f9' };
const tdStyle = { padding: '15px', fontSize: '14px', verticalAlign: 'middle' };
const roleBadge = { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
const statusBadge = { padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' };
const badgeStyle = { backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '14px' };

export default AdminDashboard;