import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../../contexts/UIContext';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';

export default function CartDrawer() {
    const { cartDrawerOpen, closeCartDrawer } = useUI();
    const { items, subtotal, discountAmount, total, couponCode, applyCoupon } = useCart();
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = () => {
        if (applyCoupon(couponInput)) {
            setCouponError('');
        } else {
            setCouponError('Cupón inválido');
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${cartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeCartDrawer}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-500 text-white">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-shopping-cart text-xl"></i>
                        <h2 className="text-lg font-semibold">Carrito ({items.length})</h2>
                    </div>
                    <button
                        onClick={closeCartDrawer}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-[calc(100%-80px)]">
                    {/* Coupon section */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-percent text-green-500"></i>
                            <span className="text-sm text-gray-600">¿Tienes un cupón de descuento?</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                placeholder="Ingresa tu cupón"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                                Aplicar
                            </button>
                        </div>
                        {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                        {couponCode && <p className="text-green-500 text-xs mt-1">Cupón {couponCode} aplicado ✓</p>}
                    </div>

                    {/* Products list */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500">Tu carrito está vacío</p>
                                <Link
                                    to="/productos"
                                    onClick={closeCartDrawer}
                                    className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
                                >
                                    Ver productos
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span>S/ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Descuento:</span>
                                    <span className="text-green-500">-S/ {discountAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                    <span>Total:</span>
                                    <span className="text-green-600">S/ {total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 space-y-2">
                                <Link
                                    to="/checkout"
                                    onClick={closeCartDrawer}
                                    className="block w-full py-3 bg-green-500 text-white text-center rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                >
                                    Ir a pagar
                                </Link>
                                <Link
                                    to="/carrito"
                                    onClick={closeCartDrawer}
                                    className="block w-full py-3 bg-gray-200 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                >
                                    Ver carrito
                                </Link>
                            </div>

                            <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                                <i className="fas fa-info-circle"></i>
                                El costo de envío no está incluido en el total.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
