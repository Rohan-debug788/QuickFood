import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || {
      name: '',
      email: '',
      phone: '',
      address: '',
      profilePicture: ''
    };
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('orders')) || [];
  });

  const [isEditing, setIsEditing] = useState(user.name === '');
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReorder = (order) => {
    const newOrder = { ...order, id: orders.length + 1, date: new Date().toISOString().split('T')[0] };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>My Profile</h2>
        {!isEditing ? (
          <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
        ) : (
          <button onClick={handleSave} className="save-btn">Save Changes</button>
        )}
      </div>

      <div className="profile-info">
        <div className="profile-picture">
          <img src={user.profilePicture || 'default-avatar.png'} alt="Profile" />
          {isEditing && (
            <input
              type="text"
              name="profilePicture"
              value={editedUser.profilePicture}
              onChange={handleChange}
              placeholder="Enter profile picture URL"
            />
          )}
        </div>

        {isEditing ? (
          <>
            <input type="text" name="name" value={editedUser.name} onChange={handleChange} placeholder="Enter name" />
            <input type="email" name="email" value={editedUser.email} onChange={handleChange} placeholder="Enter email" />
            <input type="tel" name="phone" value={editedUser.phone} onChange={handleChange} placeholder="Enter phone number" />
            <textarea name="address" value={editedUser.address} onChange={handleChange} placeholder="Enter address"></textarea>
          </>
        ) : (
          <>
            <h3>{user.name || 'No Name'}</h3>
            <p>{user.email || 'No Email'}</p>
            <p>{user.phone || 'No Phone Number'}</p>
            <p>{user.address || 'No Address'}</p>
          </>
        )}
      </div>

      <section className="order-history">
        <h3>Order History</h3>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Order #{order.id}</span>
                <span>{order.date}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span>Total: ${order.total.toFixed(2)}</span>
                <button onClick={() => handleReorder(order)} className="reorder-btn">Reorder</button>
                <button onClick={() => handleCancelOrder(order.id)} className="cancel-btn">Cancel Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfile;
