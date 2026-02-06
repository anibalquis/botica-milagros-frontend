import { Link } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';
import { useCart } from '../../contexts/CartContext';
import SearchBar from '../ui/SearchBar';
import NotificationsDropdown from '../ui/NotificationsDropdown';
import ProfileMenu from '../ui/ProfileMenu';
import logoImg from '../../assets/images/logo.png';

export default function Header() {
    const { toggleCartDrawer, toggleMobileMenu, mobileMenuOpen } = useUI();
    const { itemCount } = useCart();

    return (
        <>
            {/* Top announcement bar */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-1 text-sm overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    🎉 Envío gratis en pedidos mayores a S/50 • Ofertas especiales todos los días • ¡Cuida tu salud con Botica Milagros!
                </div>
            </div>

            {/* Main header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-3 gap-4">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img src={logoImg} alt="Botica Milagros" className="h-12 md:h-14" />
                        </Link>

                        {/* Hamburger menu for mobile */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 text-gray-600 hover:text-green-600 text-2xl"
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>

                        {/* Search bar */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                            <SearchBar />
                        </div>

                        {/* Navigation icons */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* Notifications */}
                            <NotificationsDropdown />

                            {/* Cart */}
                            <button
                                onClick={toggleCartDrawer}
                                className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors relative"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                                    alt="Carrito"
                                    className="w-6 h-6"
                                />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                                <span className="text-xs mt-1">Carrito</span>
                            </button>

                            {/* Profile */}
                            <ProfileMenu />
                        </div>
                    </div>

                    {/* Mobile search bar */}
                    <div className="md:hidden pb-3">
                        <SearchBar />
                    </div>
                </div>
            </header>
        </>
    );
}
