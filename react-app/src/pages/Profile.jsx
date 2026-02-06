import { Link } from 'react-router-dom';

export default function Profile() {
    // Mock user data
    const user = {
        name: 'María López',
        email: 'maria.lopez@email.com',
        phone: '987-654-321',
        address: 'Av. Grau 123, Lima',
        memberSince: '2022',
        profileImage: 'https://randomuser.me/api/portraits/women/45.jpg',
        paymentMethod: 'Visa •••• 2234',
        lastPayment: 150.00,
        totalOrders: 32,
        points: 540,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:text-green-600">Inicio</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-green-600">Mi Perfil</span>
            </nav>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Profile card */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
                        <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-4 object-cover"
                        />
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-blue-100 text-sm">Miembro desde {user.memberSince}</p>
                    </div>

                    <button className="w-full mt-4 py-3 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors">
                        <i className="fas fa-sign-out-alt"></i>
                        Cerrar Sesión
                    </button>
                </div>

                {/* Info boxes */}
                <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                    {/* Personal data */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">👤</span> Datos Personales
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fas fa-envelope text-green-500"></i> Correo
                                </span>
                                <span className="text-gray-800">{user.email}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fas fa-phone text-green-500"></i> Teléfono
                                </span>
                                <span className="text-gray-800">{user.phone}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-green-500"></i> Dirección
                                </span>
                                <span className="text-gray-800">{user.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payments */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">💳</span> Pagos
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fas fa-credit-card text-green-500"></i> Método
                                </span>
                                <span className="text-gray-800">{user.paymentMethod}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fas fa-receipt text-green-500"></i> Último Pago
                                </span>
                                <span className="text-gray-800">S/ {user.lastPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">📊</span> Estadísticas
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">🛒 Pedidos</span>
                                <span className="text-gray-800 font-bold">{user.totalOrders}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">⭐ Puntos</span>
                                <span className="text-gray-800 font-bold">{user.points} pts</span>
                            </div>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">⚙️</span> Opciones
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                                <i className="fas fa-edit"></i>
                                Editar Perfil
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
                                <i className="fas fa-lock"></i>
                                Cambiar Contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
