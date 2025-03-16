import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '20px' }}>
        <a href="/cart" style={{ fontSize: '20px', textDecoration: 'none', color: '#333' }}>🛒 Giỏ hàng</a>
      </header>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Danh sách sản phẩm</h1>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: 0 }}>
        {products.map(product => (
          <li key={product._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
            <h3 style={{ marginTop: '10px', fontSize: '1.2em', color: '#333' }}>{product.name}</h3>
            <p style={{ fontSize: '1.1em', color: '#666' }}>${product.price}</p>
            <div>
              <a href={`/products/${product._id}`} style={{ marginRight: '10px', color: '#007BFF', textDecoration: 'none' }}>Xem chi tiết</a>
              <a href={`/cart/add/${product._id}`} style={{ color: '#28A745', textDecoration: 'none' }}>Thêm vào giỏ hàng</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
