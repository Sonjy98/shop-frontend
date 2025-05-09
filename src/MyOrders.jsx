import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const API_BASE = import.meta.env.VITE_API_BASE;

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    fetch(`${API_BASE}/api/orders/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setOrders)
      .catch(err => console.error('❌ Failed to load orders:', err));
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.order_id}
              className="bg-white/10 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-2">
                Order #{order.order_id}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Placed on: {new Date(order.created_at).toLocaleString()}
              </p>
              <ul className="space-y-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-pink-400 mt-4">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default MyOrders;
