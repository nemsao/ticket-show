import React from 'react';
import './Cart.css';

function Cart({ items, onRemove, onCheckout }) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
                <span className="item-price">@ ${item.price.toFixed(2)}</span>
                <span className="item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => onRemove(item.id)} className="remove-item-btn">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <button onClick={onCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;