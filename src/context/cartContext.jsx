import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    let updated;
    if (existing) {
      updated = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updated);
  };

  const updateQuantity = (id, newQty) => {
    const updated = cart
      .map(item => (item.id === id ? { ...item, quantity: newQty } : item))
      .filter(item => item.quantity > 0);
    setCart(updated);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
