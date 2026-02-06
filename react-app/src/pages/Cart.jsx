import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
    const { items, subtotal, discountAmount, total, updateQuantity, removeFromCart, applyCoupon, couponCode } = useCart();
    const [activeTab, setActiveTab] = useState('cart');
    const [couponInput, setCouponInput] = useState('');

    // Mock purchase history
    const purchaseHistory = [
        { id: 1, name: 'Agua Oxigenada Volumen 10 – 250 ml', category: 'Primeros auxilios', date: '04/01/2025', price: 67.90 },
        { id: 2, name: 'Paracetamol 500mg', category: 'Medicamentos', date: '03/01/2025', price: 21.20 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:text-green-600">Inicio</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-green-600">{activeTab === 'cart' ? 'Carrito' : 'Historial de compras'}</span>
            </nav>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('cart')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${activeTab === 'cart'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <i className="fas fa-shopping-cart"></i>
                    Mi carrito
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${activeTab === 'history'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <i className="fas fa-clock-rotate-left"></i>
                    Historial de compras
                </button>
            </div>

            {/* Cart View */}
            {activeTab === 'cart' && (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-2">
                        {items.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                                <p className="text-xl text-gray-500 mb-4">Tu carrito está vacío</p>
                                <Link
                                    to="/productos"
                                    className="inline-block px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                                >
                                    Explorar productos
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Table header */}
                                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-medium text-gray-600 text-sm hidden md:grid">
                                    <div className="col-span-6">Producto</div>
                                    <div className="col-span-3 text-center">Cantidad</div>
                                    <div className="col-span-3 text-right">Precio</div>
                                </div>

                                {/* Items */}
                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-t border-gray-100 items-center">
                                        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                                            />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">{item.category}</p>
                                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-green-600 md:hidden font-bold">S/{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-8 md:col-span-3 flex justify-center">
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 flex items-center justify-end gap-4">
                                            <span className="font-bold text-gray-800 hidden md:block">S/{(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    {items.length > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                                <h3 className="font-bold text-gray-800 mb-4">Resumen del pedido</h3>

                                {/* Coupon */}
                                <div className="mb-4">
                                    <label className="text-sm text-gray-600 mb-2 block">¿Tienes un cupón?</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            placeholder="Código de cupón"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <button
                                            onClick={() => applyCoupon(couponInput)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                    {couponCode && <p className="text-green-500 text-xs mt-1">Cupón aplicado ✓</p>}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal:</span>
                                        <span>S/ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Descuento:</span>
                                        <span className="text-green-500">-S/ {discountAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                                        <span>Total:</span>
                                        <span className="text-green-600">S/ {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                                    <i className="fas fa-info-circle"></i>
                                    El costo de envío no está incluido.
                                </p>

                                <Link
                                    to="/checkout"
                                    className="block w-full mt-4 py-3 bg-green-500 text-white text-center rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                >
                                    Ir a pagar
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* History View */}
            {activeTab === 'history' && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {purchaseHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-box text-gray-400"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">S/{item.price.toFixed(2)}</p>
                                <button className="text-sm text-blue-500 hover:text-blue-600">Volver a pedir</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
