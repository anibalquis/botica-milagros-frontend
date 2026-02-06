import { useState, useEffect } from 'react';

export default function Toast({ message, isVisible, onClose, type = 'success' }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';

    return (
        <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-up`}>
            <i className={`fas ${icon} text-xl`}></i>
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:text-gray-200 transition-colors">
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}

// Global toast hook
import { createContext, useContext, useState as useStateHook, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useStateHook({ isVisible: false, message: '', type: 'success' });

    const showToast = useCallback((message, type = 'success') => {
        setToast({ isVisible: true, message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={hideToast}
                type={toast.type}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
