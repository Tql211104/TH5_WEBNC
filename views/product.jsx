import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px' }}>
        <a href="/products" style={{ fontSize: '20px', textDecoration: 'none', color: '#007BFF' }}>🏠 Trang chủ</a>
      </header>
      <h1 style={{ textAlign: 'center', color: '#333' }}>{product.name}</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src={product.image} alt={product.name} style={{ width: '300px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} />
      </div>

      <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#666', maxWidth: '800px', margin: '0 auto',  textAlign: 'center' }}>{product.description}</p>

      <h3 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>Giá: <span style={{ fontSize: '1.5em', color: '#28A745' }}>${product.price}</span></h3>
    </div>
  );
}

export default ProductDetail;
