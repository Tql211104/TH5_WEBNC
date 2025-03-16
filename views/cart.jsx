import React from 'react';

const Cart = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px' }}>
        <a href="/products" style={{ fontSize: '20px', textDecoration: 'none', color: '#007BFF' }}>🏠 Trang chủ</a>
      </header>

      <h1 style={{ textAlign: 'center', color: '#333' }}>Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {cart.map(item => (
              <li key={item.product._id} style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                <img src={item.product.image} alt={item.product.name} width="100" style={{ borderRadius: '8px', marginRight: '20px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px', color: '#333' }}>{item.product.name}</h3>
                  <p style={{ margin: '0', color: '#666' }}>Giá: ${item.product.price} | Số lượng: {item.quantity}</p>
                  <a href={`/cart/remove/${item.product._id}`} style={{ display: 'block', marginTop: '10px', color: '#FF5733', textDecoration: 'none' }}>Xóa</a>
                </div>
              </li>
            ))}
          </ul>

          <h3 style={{ textAlign: 'center', color: '#333' }}>Tổng tiền: <span style={{ fontSize: '1.5em', color: '#28A745' }}>${total}</span></h3>
        </>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/products" style={{ fontSize: '18px', textDecoration: 'none', color: '#007BFF' }}>Tiếp tục mua hàng</a>
      </div>
    </div>
  );
};

export default Cart;
