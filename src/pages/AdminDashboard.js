import React, { useState } from 'react';
import { products } from '../data/products';
import './AdminDashboard.css';

function AdminDashboard() {
  const [productList, setProductList] = useState(products);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    rating: 5
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      // Editing an existing product
      setProductList(productList.map(product => 
        product.id === editingProduct.id ? { ...editingProduct, ...newProduct, price: parseFloat(newProduct.price) } : product
      ));
      setEditingProduct(null);
    } else {
      // Adding a new product
      const product = {
        ...newProduct,
        id: Date.now(), // Unique ID
        price: parseFloat(newProduct.price)
      };
      setProductList([...productList, product]);
    }

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      rating: 5
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleDelete = (id) => {
    setProductList(productList.filter(product => product.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-section">
        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
        </form>
      </div>

      <div className="admin-section">
        <h3>Product List</h3>
        <div className="product-list">
          {productList.map(product => (
            <div key={product.id} className="admin-product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>${product.price.toFixed(2)}</p>
              </div>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
console.log("AdminDashboard component loaded");
