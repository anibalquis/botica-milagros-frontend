import { useCart } from '../../contexts/CartContext';

export default function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleDecrease = () => {
        updateQuantity(item.id, item.quantity - 1);
    };

    const handleIncrease = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    return (
        <div className="flex gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
            />
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase">{item.category}</p>
                <h3 className="font-medium text-gray-800 text-sm truncate">{item.name}</h3>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={handleDecrease}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                    >
                        -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                    >
                        +
                    </button>
                </div>

                <p className="mt-1 font-bold text-green-600">S/ {(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
                onClick={() => removeFromCart(item.id)}
                className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
    );
}
