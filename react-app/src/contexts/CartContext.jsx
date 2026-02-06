import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [couponCode, setCouponCode] = useState(null);
    const [discount, setDiscount] = useState(0);

    const addToCart = useCallback((product, quantity = 1) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, [removeFromCart]);

    const applyCoupon = useCallback((code) => {
        // Simulate coupon validation
        if (code.toUpperCase() === 'MILAGROS20') {
            setCouponCode(code);
            setDiscount(20);
            return true;
        }
        return false;
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        setCouponCode(null);
        setDiscount(0);
    }, []);

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        items,
        couponCode,
        discount,
        subtotal,
        discountAmount,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartContext;
