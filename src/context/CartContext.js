import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    try {
      // Update cart count and total
      const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
      const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      setCartCount(count);
      setCartTotal(total.toFixed(2));
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;

    setCartItems(prevItems => {
      // Tam olarak aynı ürünü bul (id ve diğer özellikleri kontrol et)
      const existingItem = prevItems.find(item => 
        item.originalId === product.id && 
        item.name === product.name && 
        item.price === product.price
      );
      
      if (existingItem) {
        // Eğer tam olarak aynı ürün varsa miktarını artır
        toast.info(`Quantity increased for ${product.name}`);
        return prevItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      // Yeni ürün ekle
      const newItem = {
        id: Date.now(),
        name: product.name,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        originalId: product.id,
        quantity: 1
      };

      toast.success(`${product.title} added to cart`);
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from cart`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 