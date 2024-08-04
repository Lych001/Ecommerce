import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item.id_producto === product.id_producto);
            if (existingProduct) {
                return prevItems.map(item => 
                    item.id_producto === product.id_producto
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id_producto !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id_producto === productId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
