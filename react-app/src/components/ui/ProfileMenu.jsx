import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';

export default function ProfileMenu() {
    const { profileMenuOpen, toggleProfileMenu, closeAllDropdowns } = useUI();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                if (profileMenuOpen) closeAllDropdowns();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileMenuOpen, closeAllDropdowns]);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleProfileMenu}
                className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                    alt="Perfil"
                    className="w-6 h-6"
                />
                <span className="text-xs mt-1">Perfil</span>
            </button>

            {/* Dropdown */}
            {profileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <Link
                        to="/login"
                        onClick={closeAllDropdowns}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                        <i className="fas fa-sign-in-alt text-green-500"></i>
                        <span>Iniciar sesión</span>
                    </Link>
                    <Link
                        to="/perfil"
                        onClick={closeAllDropdowns}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                        <i className="fas fa-user text-green-500"></i>
                        <span>Ver perfil</span>
                    </Link>
                    <button
                        onClick={closeAllDropdowns}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <i className="fas fa-sign-out-alt text-red-500"></i>
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            )}
        </div>
    );
}
