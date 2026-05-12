import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    destinationName: '',
    travelDate: '',
    numberOfTravelers: '',
    packageType: 'Silver',
    price: '',
    contactAddress: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (editingId) {
        await axios.put(`http://localhost:5000/api/bookings/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/bookings', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setFormData({
        destinationName: '',
        travelDate: '',
        numberOfTravelers: '',
        packageType: 'Silver',
        price: '',
        contactAddress: ''
      });
      setEditingId(null);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking) => {
    setFormData({
      destinationName: booking.destinationName,
      travelDate: new Date(booking.travelDate).toISOString().split('T')[0],
      numberOfTravelers: booking.numberOfTravelers,
      packageType: booking.packageType,
      price: booking.price,
      contactAddress: booking.contactAddress
    });
    setEditingId(booking._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBookings();
      } catch (err) {
        console.error('Error deleting booking:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Travel Booking Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="booking-form">
          <h2>{editingId ? 'Update Booking' : 'Add New Booking'}</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Destination Name:</label>
              <input
                type="text"
                name="destinationName"
                value={formData.destinationName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Travel Date:</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Travelers:</label>
              <input
                type="number"
                name="numberOfTravelers"
                value={formData.numberOfTravelers}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Package Type:</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                required
              >
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Address:</label>
              <input
                type="text"
                name="contactAddress"
                value={formData.contactAddress}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : (editingId ? 'Update Booking' : 'Add Booking')}
            </button>
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} className="cancel-btn">
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bookings-list">
          <h2>Your Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings found. Add your first booking!</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-item">
                <div className="booking-info">
                  <h3>{booking.destinationName}</h3>
                  <p><strong>Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
                  <p><strong>Travelers:</strong> {booking.numberOfTravelers}</p>
                  <p><strong>Package:</strong> {booking.packageType}</p>
                  <p><strong>Price:</strong> ${booking.price}</p>
                  <p><strong>Status:</strong> <span className={`status ${booking.bookingStatus.toLowerCase()}`}>{booking.bookingStatus}</span></p>
                  <p><strong>Address:</strong> {booking.contactAddress}</p>
                </div>
                <div className="booking-actions">
                  <button onClick={() => handleEdit(booking)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(booking._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
