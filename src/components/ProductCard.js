import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const { name, price, image, description, rating } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'starfilled' : 'star'}>
              ★
            </span>
          ))}
        </div>
        <p className="price">${price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(product)} className="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;