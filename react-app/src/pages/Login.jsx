import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import loginImg from '../assets/images/loginimagen.png';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nombres: '',
        sexo: '',
        fechaNacimiento: '',
        telefono: '',
        autoLogin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle login/register logic
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/">
                        <img src={logoImg} alt="Botica Milagros" className="h-10" />
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                        <i className="fas fa-arrow-left"></i>
                        <span>Retroceder</span>
                    </Link>
                </div>
            </div>

            {/* Main container */}
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex mt-16">
                {/* Image side */}
                <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-green-400 to-green-600 relative">
                    <img
                        src={loginImg}
                        alt="Login"
                        className="w-full h-full object-cover mix-blend-overlay opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Bienvenido a Botica Milagros</h2>
                            <p className="text-lg opacity-90">Tu salud es nuestra prioridad</p>
                        </div>
                    </div>
                </div>

                {/* Form side */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="relative">
                                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleChange}
                                        placeholder="Nombres y Apellidos"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <i className="fas fa-venus-mars absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <select
                                            name="sexo"
                                            value={formData.sexo}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 appearance-none bg-white"
                                        >
                                            <option value="">Sexo</option>
                                            <option value="mujer">Mujer</option>
                                            <option value="hombre">Hombre</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <i className="fas fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="date"
                                            name="fechaNacimiento"
                                            value={formData.fechaNacimiento}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="Celular"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative">
                            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="relative">
                            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirmar contraseña"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="autoLogin"
                                        checked={formData.autoLogin}
                                        onChange={handleChange}
                                        className="accent-green-500"
                                    />
                                    <span>Recordarme</span>
                                </label>
                                <a href="#" className="text-green-600 hover:underline">¿Olvidaste tu contraseña?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                        >
                            {isLogin ? 'Ingresar' : 'Registrar'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            {isLogin ? 'Crear cuenta nueva' : '← Volver a iniciar sesión'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
