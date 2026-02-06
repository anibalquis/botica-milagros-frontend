import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/ui/Toast';

export default function Checkout() {
    const { items, subtotal, discountAmount, total, clearCart } = useCart();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        telefono: '',
        email: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion: '',
        numero: '',
        referencia: '',
        metodoPago: 'yape',
        aceptaTerminos: false,
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
        if (!formData.aceptaTerminos) {
            showToast('Debes aceptar los términos y condiciones', 'error');
            return;
        }
        // Simulate order processing
        showToast('¡Pedido realizado con éxito!', 'success');
        clearCart();
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-6">Agrega productos para continuar con la compra.</p>
                <Link
                    to="/productos"
                    className="inline-block px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                >
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:text-green-600">Inicio</Link>
                <span className="mx-2">&gt;</span>
                <Link to="/carrito" className="hover:text-green-600">Carrito</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-green-600">Pagar</span>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal data */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                Datos personales
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                                    <input
                                        type="text"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        value={formData.apellidos}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                                    <select
                                        name="tipoDocumento"
                                        value={formData.tipoDocumento}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="CE">Carnet de extranjería</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de documento</label>
                                    <input
                                        type="text"
                                        name="numeroDocumento"
                                        value={formData.numeroDocumento}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery address */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                                ¿Dónde te gustaría recibir tu pedido?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                                    <select
                                        name="departamento"
                                        value={formData.departamento}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Selecciona...</option>
                                        <option value="lima">Lima</option>
                                        <option value="arequipa">Arequipa</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                                    <select
                                        name="provincia"
                                        value={formData.provincia}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Selecciona...</option>
                                        <option value="lima">Lima</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        placeholder="Ejemplo: Av. Los Olivos 123"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                                    <input
                                        type="text"
                                        name="referencia"
                                        value={formData.referencia}
                                        onChange={handleChange}
                                        placeholder="Ejemplo: Frente al parque"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4">Resumen del pedido</h3>

                            {/* Items summary */}
                            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                        <span>S/{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal:</span>
                                    <span>S/ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Envío:</span>
                                    <span>S/ 10.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Descuento:</span>
                                    <span className="text-green-500">-S/ {discountAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                                    <span>Total:</span>
                                    <span className="text-green-600">S/ {(total + 10).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment method */}
                            <div className="mt-6">
                                <h4 className="font-medium text-gray-800 mb-3">Método de pago</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-green-500">
                                        <input
                                            type="radio"
                                            name="metodoPago"
                                            value="yape"
                                            checked={formData.metodoPago === 'yape'}
                                            onChange={handleChange}
                                            className="accent-green-500"
                                        />
                                        <span className="text-sm">Yape o Plin</span>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Yape-logo.png" alt="Yape" className="h-6 ml-auto" />
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-green-500">
                                        <input
                                            type="radio"
                                            name="metodoPago"
                                            value="transferencia"
                                            checked={formData.metodoPago === 'transferencia'}
                                            onChange={handleChange}
                                            className="accent-green-500"
                                        />
                                        <span className="text-sm">Transferencia bancaria</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-green-500">
                                        <input
                                            type="radio"
                                            name="metodoPago"
                                            value="tarjeta"
                                            checked={formData.metodoPago === 'tarjeta'}
                                            onChange={handleChange}
                                            className="accent-green-500"
                                        />
                                        <span className="text-sm">Tarjeta de crédito</span>
                                    </label>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-2 mt-4 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="aceptaTerminos"
                                    checked={formData.aceptaTerminos}
                                    onChange={handleChange}
                                    className="mt-1 accent-green-500"
                                />
                                <span>
                                    He leído y acepto los <a href="#" className="text-green-600 underline">Términos y condiciones</a> y la <a href="#" className="text-green-600 underline">política de privacidad</a>
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full mt-4 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
                            >
                                Realizar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
