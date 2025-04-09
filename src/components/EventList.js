import React from 'react';
import EventItem from './EventItem';
import './EventList.css';

function EventList({ events, onAddToCart }) {
  if (!events || events.length === 0) {
    return <p>No events available at the moment.</p>;
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <EventItem
          key={event.id}
          event={event}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default EventList;