// Header.js
import React, { useState } from "react";
import { useSelector } from 'react-redux'; // Import useSelector
import Cart from "./Cart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
const Header = () => {
  const cartItems = useSelector(state => state.cart.items); // Lấy state giỏ hàng từ Redux store
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="relative flex justify-between items-center bg-purple-700 text-white p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-bold">Ticket Master</h1>
      <div className="flex items-center">
        <button
          onClick={toggleCart}
          className="relative cursor-pointer focus:outline-none"
          aria-label="View Cart"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          )}
        </button>

        {isCartOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-md shadow-xl z-10 w-80">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Your Cart</h2>
              <Cart /> {/* Component Cart cũng có thể useSelector để lấy dữ liệu */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;