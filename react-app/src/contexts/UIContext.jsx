import { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const openCartDrawer = useCallback(() => {
        setCartDrawerOpen(true);
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
    }, []);

    const closeCartDrawer = useCallback(() => {
        setCartDrawerOpen(false);
    }, []);

    const toggleCartDrawer = useCallback(() => {
        setCartDrawerOpen(prev => !prev);
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
    }, []);

    const toggleProfileMenu = useCallback(() => {
        setProfileMenuOpen(prev => !prev);
        setNotificationsOpen(false);
    }, []);

    const toggleNotifications = useCallback(() => {
        setNotificationsOpen(prev => !prev);
        setProfileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev);
    }, []);

    const closeAllDropdowns = useCallback(() => {
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
    }, []);

    const value = {
        cartDrawerOpen,
        profileMenuOpen,
        notificationsOpen,
        mobileMenuOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        toggleProfileMenu,
        toggleNotifications,
        toggleMobileMenu,
        closeAllDropdowns,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}

export default UIContext;
