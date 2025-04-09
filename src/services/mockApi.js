import EventDTO from "../dtos/EventDTO";

let mockEvents = [
  new EventDTO({
    id: 1,
    title: "Summer Music Festival",
    date: "July 15, 2023",
    location: "Central Park",
    tickets: [
      { type: "General Admission", price: 50, available: 100 },
      { type: "VIP", price: 150, available: 20 },
    ],
  }),
  new EventDTO({
    id: 2,
    title: "Comedy Night",
    date: "August 5, 2023",
    location: "City Theater",
    tickets: [
      { type: "Standard", price: 25, available: 50 },
      { type: "Premium", price: 40, available: 30 },
    ],
  }),
  new EventDTO({
    id: 3,
    title: "Tech Conference",
    date: "September 20, 2023",
    location: "Convention Center",
    tickets: [
      { type: "Early Bird", price: 99, available: 75 },
      { type: "Regular", price: 149, available: 100 },
      { type: "Workshop Pass", price: 199, available: 30 },
    ],
  }),
];

// Fetch all events
export const fetchEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEvents);
    }, 500); // Simulate network delay
  });
};

// Add an item to the cart
export const addToCart = async (item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// Update a cart item
export const updateCartItem = async (id, item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};