// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const CartContext = createContext();

// Custom Hook to use the Cart Context easily
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Load initial state from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If new item, add with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item completely
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity (increase or decrease)
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          // Don't allow quantity less than 1
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total items
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Toggle Cart Drawer
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}