import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../actions'; 
import { useSelector } from 'react-redux'; // Import useSelector

const Cart = () => {
    const dispatch = useDispatch(); 
    const handleRemoveToCart = (product) => {
        // Gọi action creator để tạo action object
        const action = removeFromCart(product);
        // Dispatch action đến Redux store
        dispatch(action);
      };
    
      const cartItems = useSelector(state => state.cart.items); 
  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-6">
      <h2 className="text-lg font-bold text-purple-700 mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-medium">{item.type}</h3>
                <p className="text-sm text-gray-500">{item.eventTitle}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${parseFloat(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="text-red-500 underline text-sm mt-2"
                  onClick={() => handleRemoveToCart(item)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      eventTitle: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default Cart;