import { useCart } from "./context/cartContext";
import { useState } from 'react';

function MiniCart() {
  const { cart, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close Cart' : `🛒 (${cart.length})`}
      </button>

      {open && (
        <div className="mt-2 w-80 bg-white text-black rounded-lg shadow-lg p-4">
          <h3 className="font-bold text-lg mb-2">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
              <p className="text-right font-bold mt-4">Total: ${total}</p>
              <button
                className="mt-2 text-sm text-red-500 hover:text-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MiniCart;
