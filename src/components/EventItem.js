import React, { useState } from 'react';
import './EventItem.css';

function EventItem({ event, onAddToCart }) {
  const [quantity, setQuantity] = useState(1); // Default quantity to 1

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // Prevent negative or zero quantity, maybe cap at available?
    if (value >= 1 && value <= event.available) {
        setQuantity(value);
    } else if (value < 1) {
        setQuantity(1);
    } else {
        setQuantity(event.available); // Cap at max available
        alert(`Maximum available tickets: ${event.available}`);
    }
  };

  const handleAddToCartClick = () => {
    if (quantity > event.available) {
        alert(`Only ${event.available} tickets available for ${event.name}.`);
        setQuantity(event.available > 0 ? event.available : 1); // Reset quantity if needed
        return;
    }
    if (quantity <= 0) {
        alert("Please enter a valid quantity (at least 1).");
        return;
    }
    onAddToCart(event, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p className="event-description">{event.description}</p>
      <p className="event-price">Price: ${event.price.toFixed(2)}</p>
      <p className="event-availability">Available: {event.available > 0 ? event.available : 'Sold Out!'}</p>
      {event.available > 0 && (
        <div className="event-controls">
          <label htmlFor={`quantity-${event.id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${event.id}`}
            name="quantity"
            min="1"
            max={event.available} // Set max based on availability
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button onClick={handleAddToCartClick} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      )}
       {event.available <= 0 && (
           <p className="sold-out-message">Sold Out</p>
       )}
    </div>
  );
}

export default EventItem;