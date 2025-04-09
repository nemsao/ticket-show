import React from "react";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions'; // Make sure the path is correct

const EventItem = ({ event }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (ticketType, ticketPrice) => {
    dispatch(
      addToCart({
        id: Date.now(),
        eventId: event.id,
        eventTitle: event.title,
        type: ticketType,
        price: ticketPrice,
        quantity: 1, // Initially add one ticket
      })
    );
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
      <h3 className="text-lg font-bold text-purple-700">{event.title}</h3>
      <p className="text-gray-500 text-sm">{event.date}</p>
      <p className="text-gray-500 text-sm mb-4">{event.location}</p>
      <ul className="space-y-2">
        {event.tickets.map((ticket, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{ticket.type}</span>
            <div className="flex items-center">
              <span className="text-gray-800 font-semibold mr-2">
                ${ticket.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(ticket.type, ticket.price)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={`Add ${ticket.type} ticket to cart`}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        available: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  // onClick prop is removed as we are using Redux
};

export default EventItem;