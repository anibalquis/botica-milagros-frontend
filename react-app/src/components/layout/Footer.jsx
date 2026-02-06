import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo section */}
                    <div className="lg:col-span-1">
                        <img src={logoImg} alt="Botica Milagros" className="h-16 mb-4 brightness-0 invert" />
                        <p className="text-sm text-gray-400">
                            Comprometidos con tu salud y bienestar desde siempre.
                        </p>
                    </div>

                    {/* Products column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Productos</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/productos/medicamentos" className="hover:text-green-400 transition-colors">Medicamentos</Link></li>
                            <li><Link to="/productos/bebes" className="hover:text-green-400 transition-colors">Productos para bebé</Link></li>
                            <li><Link to="/productos" className="hover:text-green-400 transition-colors">Primeros auxilios</Link></li>
                            <li><Link to="/productos/cuidado-personal" className="hover:text-green-400 transition-colors">Higiene personal</Link></li>
                        </ul>
                    </div>

                    {/* Explore column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Explorar</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-green-400 transition-colors">Inicio</Link></li>
                            <li><Link to="/productos" className="hover:text-green-400 transition-colors">Catálogo</Link></li>
                            <li><Link to="/carrito" className="hover:text-green-400 transition-colors">Mi carrito</Link></li>
                            <li><Link to="/perfil" className="hover:text-green-400 transition-colors">Mi cuenta</Link></li>
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone text-green-400"></i>
                                <span>987-654-321</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope text-green-400"></i>
                                <span>info@boticamilagros.pe</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-map-marker-alt text-green-400"></i>
                                <span>Av. Grau 123, Lima</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Social icons */}
                    <div className="flex justify-center gap-4 mb-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-gray-500">
                        <p>© 2025 Botica Milagros. Todos los derechos reservados.</p>
                        <p className="mt-1">Ofrecemos atención personalizada, medicamentos de calidad y productos naturales para toda la familia.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
