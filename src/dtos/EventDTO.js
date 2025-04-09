// src/dtos/EventDTO.js
export default class EventDTO {
    constructor({ id, title, date, location, tickets }) {
      this.id = id; // Event ID (unique identifier)
      this.title = title; // Event name/title
      this.date = date; // Event date
      this.location = location; // Event location
      this.tickets = tickets || []; // Array of tickets
    }
  
    // Static validation method to ensure data integrity
    static validate(data) {
      if (typeof data.id !== "number") {
        throw new Error("Invalid or missing `id` (number required).");
      }
      if (typeof data.title !== "string" || !data.title.trim()) {
        throw new Error("Invalid or missing `title` (non-empty string required).");
      }
      if (typeof data.date !== "string" || !data.date.trim()) {
        throw new Error("Invalid or missing `date` (non-empty string required).");
      }
      if (typeof data.location !== "string" || !data.location.trim()) {
        throw new Error("Invalid or missing `location` (non-empty string required).");
      }
      if (!Array.isArray(data.tickets)) {
        throw new Error("Invalid or missing `tickets` (array required).");
      }
      data.tickets.forEach((ticket, index) => {
        if (typeof ticket.type !== "string" || !ticket.type.trim()) {
          throw new Error(`Invalid or missing ticket type at index ${index}.`);
        }
        if (typeof ticket.price !== "number") {
          throw new Error(`Invalid or missing ticket price at index ${index}.`);
        }
        if (typeof ticket.available !== "number") {
          throw new Error(`Invalid or missing ticket availability at index ${index}.`);
        }
      });
    }
  }