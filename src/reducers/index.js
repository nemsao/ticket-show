// reducers/cartReducer.js
const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingItemIndex = state.items.findIndex(
          item => item.eventId === action.payload.eventId && item.type === action.payload.type
        );
  
        if (existingItemIndex >= 0) {
          // Nếu sản phẩm đã có, tăng số lượng
          const updatedItems = state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return {
            ...state,
            items: updatedItems,
          };
        } else {
          // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng là 1
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
          };
        }
  

  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;