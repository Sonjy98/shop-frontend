import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';
import { useCart } from './context/cartContext';
import Navbar from "./Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('auth_token'));
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateQuantity, clearCart, placeOrder } = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE;

  // fetch products on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then(data => {
        // show ALL products in the carousel; or do: data.filter(p=>p.featured)
        setProducts(data);
      })
      .catch(err => console.error('❌ Failed to load products:', err));
  }, []);

  return (
    <div className="flex flex-col bg-white min-h-screen text-gray-900">

      {/* 🧭 Navbar */}
      <Navbar />

      {/* everything between header and cart */}
      <main className="flex-grow">

        {/* 💥 Hero Section */}
        <section className="text-center py-20 px-4 bg-pink-50">
          <h2 className="text-4xl font-bold mb-4">Discover handmade treasures near you</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Support local artisans, find unique goods, and make your shopping meaningful.
          </p>
          <Link to="/browse">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              Browse Marketplace
            </button>
          </Link>
        </section>

        {/* 🛒 Featured Products */}
        <section className="py-16 px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Items</h3>
          <div className="max-w-6xl mx-auto px-4">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!px-10"
            >
              {products.map(product => (
                <SwiperSlide key={product.id}>
                  <div className="h-full">
                    <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition h-full flex flex-col">
                      <div className="bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                        {product.image_url
                          ? <img src={product.image_url} alt={product.name} className="h-full object-contain" />
                          : <span className="text-gray-400">No Image</span>
                        }
                      </div>
                      <div className="p-4 flex-grow">
                        <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                        {product.vendor_name && (
                          <div className="flex items-center space-x-2 mb-2">
                            {product.vendor_avatar && (
                              <img
                                src={product.vendor_avatar}
                                alt={product.vendor_name}
                                className="h-6 w-6 rounded-full object-cover"
                              />
                            )}
                            <p className="text-sm text-gray-400">Sold by: {product.vendor_name}</p>
                          </div>
                        )}

                        <p className="text-pink-600 font-bold">${product.price}</p>
                      </div>
                      <button
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-b"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

      </main>

      {/* 🧺 Shopping Cart */}
      <section className="py-12 px-6 bg-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-pink-600 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 hover:bg-gray-300 rounded">+</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right font-bold text-lg pt-2">
              Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
            </div>

            <div className="text-right">
              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600">Clear Cart</button>
            </div>
            {cart.length > 0 && (
              <div className="text-right mt-4">
                <button onClick={placeOrder} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold">
                  Place Order
                </button>
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}

export default App;
