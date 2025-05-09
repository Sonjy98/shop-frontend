import { useState, useEffect } from 'react';
import { useCart } from "./context/cartContext";
import MiniCart from "./miniCart";
import Navbar from "./Navbar";




function Browse() {
    const API_BASE = import.meta.env.VITE_API_BASE;
    const [products, setProducts] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const { cart, addToCart, updateQuantity, clearCart } = useCart();


    useEffect(() => {
        fetch(`${API_BASE}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                const tags = new Set();
                data.forEach(p => (p.tags || []).forEach(tag => tags.add(tag)));
                setAvailableTags(Array.from(tags));
            })
            .catch(err => console.error("❌ Failed to load products:", err));
    }, []);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const filteredProducts = selectedTags.length === 0
        ? products
        : products.filter(p =>
            (p.tags || []).some(tag => selectedTags.includes(tag))
        );

    return (
        <>
            <Navbar />
            {/* 🛍️ Main Layout */}
            <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-10 w-full">
                {/* Sidebar */}
                <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow space-y-2">
                    <h2 className="font-bold text-lg mb-4">🧩 Filter by Tags</h2>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`block w-full text-left px-4 py-2 rounded-lg border 
                        ${selectedTags.includes(tag)
                                    ? 'bg-pink-500 text-white border-pink-500'
                                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'}
                      `}
                        >
                            {tag}
                        </button>
                    ))}
                    {selectedTags.length > 0 && (
                        <button
                            onClick={() => setSelectedTags([])}
                            className="mt-4 text-sm text-red-400 hover:text-red-600"
                        >
                            Clear Filters
                        </button>
                    )}
                </aside>

                {/* Product Grid */}
                <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-min content-start">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="border rounded-xl shadow p-4 hover:shadow-lg transition">
                            {/* 🖼️ Image */}
                            {product.image_url ? (
                                <div className="h-48 bg-gray-100 mb-3 flex items-center justify-center overflow-hidden rounded">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="h-48 bg-gray-100 mb-3 flex items-center justify-center rounded text-gray-400">
                                    No Image
                                </div>
                            )}

                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                            <p className="text-pink-600 font-bold">${product.price}</p>
                            {product.vendor_name && (
                                <p className="text-sm text-gray-400 mb-1">Sold by: {product.vendor_name}</p>
                            )}
                            {product.vendor_logo && (
                                <img
                                    src={product.vendor_logo}
                                    alt={product.vendor_name}
                                    className="h-6 w-6 inline-block mr-2 rounded-full object-cover"
                                />
                            )}

                            <button
                                onClick={() => addToCart(product)}
                                className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                            >
                                Add to Cart
                            </button>

                            <div className="mt-2 text-xs text-gray-400">
                                Tags: {(product.tags || []).join(', ')}
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* 🧺 Floating Cart */}
            <MiniCart />
        </>
    );

}

export default Browse;
