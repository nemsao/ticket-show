import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import EventList from "./components/EventList";
import Cart from "./components/Cart";
import { fetchEvents } from "./services/mockApi";
import EventDTO from "./dtos/EventDTO";
import { useDispatch } from 'react-redux';
import { addToCart } from './actions';


const App = () => {
  const [events, setEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        data.forEach(EventDTO.validate);
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);
 
  const addToCart = (eventId, ticketType) => {

    const event = events.find((e) => e.id === eventId);
    const ticket = event.tickets.find((t) => t.type === ticketType);
    const existingItem = cart.find((item) => item.eventId === eventId && item.type === ticketType);
    if (existingItem) {
    
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.eventId === eventId && item.type === ticketType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      
      dispatch(addToCart({ id: Date.now(),
        eventId,
        eventTitle: event.title,
        type: ticket.type,
        price: ticket.price,
        quantity: 1, }));
    } else {
      dispatch(addToCart({id: Date.now(),
        eventId,
        eventTitle: event.title,
        type: ticket.type,
        price: ticket.price,
        quantity: 1, }));
      setCart((prevCart) => [
        ...prevCart,
        {
          id: Date.now(),
          eventId,
          eventTitle: event.title,
          type: ticket.type,
          price: ticket.price,
          quantity: 1,
        },
      ]);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header cartCount={cart.length} />
      <main>
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <EventList events={events} onAddToCard={addToCart}/>
          )}
        </section>
        <Cart/>
      </main>
    </div>
  );
};

export default App;