const BASE_URL = "http://localhost:5000/api";

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Add an item to the cart
export const addToCart = async (item) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to add item to cart");
    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update cart item
export const updateCartItem = async (id, item) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to update cart item");
    return await response.json();
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};