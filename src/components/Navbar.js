import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Foodie</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>

      </div>
    </nav>
  );
}

export default Navbar;