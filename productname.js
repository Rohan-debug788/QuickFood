import React, { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://themewagon.github.io/feane/");
      const data = await response.json();
      setProducts(data.products || data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <button onClick={fetchProducts} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Products"}
      </button>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;