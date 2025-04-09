import React from "react";
import PropTypes from "prop-types";
import EventItem from "./EventItem";

const EventList = ({ events,  onAddToCard }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6"> {/* Added a container for the section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2> {/* Added a title */}
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Improved grid layout with spacing */}
        {events.map((event) => (
          <EventItem key={event.id} event={event} onClick={ onAddToCard}/>
        ))}
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onAddToCard:PropTypes.func
};

export default EventList;