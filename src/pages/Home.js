import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Foodie</h1>
        <p>Order delicious homemade food online</p>
        <Link to="/menu" className="cta-button">
          View Menu
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Fresh Ingredients</h2>
          <p>All our meals are prepared with the freshest ingredients</p>
        </div>
        <div className="feature">
          <h2>Fast Delivery</h2>
          <p>Quick delivery to your doorstep</p>
        </div>
        <div className="feature">
          <h2>Best Quality</h2>
          <p>Guaranteed satisfaction with every order</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 