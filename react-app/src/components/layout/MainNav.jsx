import { NavLink } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';
import { categories } from '../../data/products';

export default function MainNav() {
    const { mobileMenuOpen, toggleMobileMenu } = useUI();

    const navItems = [
        { path: '/', label: 'Inicio', icon: 'fa-home' },
        ...categories.map(cat => ({
            path: cat.path,
            label: cat.name,
            icon: cat.icon,
        })),
    ];

    return (
        <nav className={`bg-white border-b border-gray-200 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-1 lg:gap-0 py-2 lg:py-0">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={() => mobileMenuOpen && toggleMobileMenu()}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 lg:py-4 text-sm font-medium transition-colors border-b-2 ${isActive
                                        ? 'text-green-600 border-green-600 bg-green-50 lg:bg-transparent'
                                        : 'text-gray-600 border-transparent hover:text-green-600 hover:bg-gray-50 lg:hover:bg-transparent'
                                    }`
                                }
                            >
                                <i className={`fas ${item.icon} text-lg`}></i>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
