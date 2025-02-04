import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkout = () => {
    if (cartItems.length === 0) return; 

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
      id: orders.length + 1,
      date: new Date().toISOString().split('T')[0],
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      status: 'Pending'
    };

    const updatedOrders = [...orders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Clear cart after checkout
    localStorage.removeItem('cart');
    setCartItems([]);

    // Redirect to User Profile page
    navigate('/profile');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={checkout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
