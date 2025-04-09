import React, { useState } from 'react';
import EventList from './components/EventList';
import Cart from './components/Cart';
import './App.css';

// Sample Data - In a real app, this would come from an API
const initialEvents = [
  { id: 1, name: 'Rock Concert', description: 'Featuring The Rockers', price: 50, available: 100 },
  { id: 2, name: 'Jazz Festival', description: 'Smooth tunes all night', price: 75, available: 50 },
  { id: 3, name: 'Tech Conference', description: 'Latest in tech trends', price: 150, available: 200 },
  { id: 4, name: 'Art Exhibition Opening', description: 'Modern art showcase', price: 25, available: 80 },
];

function App() {
  const [events, setEvents] = useState(initialEvents); // Ideally fetched from backend
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (eventToAdd, quantity) => {
    if (quantity <= 0) {
      alert('Please select a valid quantity.');
      return;
    }

    // Check if enough tickets are available (simple check)
    // A real app needs more robust inventory management
    const eventInStock = events.find(e => e.id === eventToAdd.id);
    if (!eventInStock || eventInStock.available < quantity) {
         alert(`Sorry, only ${eventInStock?.available || 0} tickets remaining for ${eventToAdd.name}.`);
         return;
    }


    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === eventToAdd.id);

      if (itemExists) {
        // Increase quantity if item already in cart
        // Ensure not exceeding available tickets with the *new total* quantity
         const newQuantity = itemExists.quantity + quantity;
         if (eventInStock.available < newQuantity) {
            alert(`Cannot add ${quantity} tickets. Only ${eventInStock.available - itemExists.quantity} more available for ${eventToAdd.name}.`);
            return prevItems; // Return unchanged items
         }
        return prevItems.map(item =>
          item.id === eventToAdd.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...eventToAdd, quantity: quantity }];
      }
    });

    // Optional: Update available count locally (less reliable than backend)
    // setEvents(prevEvents =>
    //     prevEvents.map(event =>
    //         event.id === eventToAdd.id
    //         ? {...event, available: event.available - quantity}
    //         : event
    //     )
    // );

    alert(`${quantity} ticket(s) for "${eventToAdd.name}" added to cart.`);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    // Optional: Add back availability count - again, backend should handle this
  };

  const handleCheckout = () => {
      if (cartItems.length === 0) {
          alert("Your cart is empty.");
          return;
      }
      // In a real app:
      // 1. Send cartItems to backend
      // 2. Process payment
      // 3. Clear cart
      // 4. Show confirmation
      console.log("Processing checkout for:", cartItems);
      alert("Checkout initiated! (Check console for details). Clearing cart.");
      setCartItems([]);
      // Potentially update event availability based on backend response
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TicketMaster 🎫</h1>
      </header>
      <main className="App-main">
        <div className="event-section">
          <h2>Available Events</h2>
          <EventList events={events} onAddToCart={handleAddToCart} />
        </div>
        <div className="cart-section">
          <h2>Shopping Cart</h2>
          <Cart
             items={cartItems}
             onRemove={handleRemoveFromCart}
             onCheckout={handleCheckout}
          />
        </div>
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Ticket Sales Inc.</p>
      </footer>
    </div>
  );
}

export default App;