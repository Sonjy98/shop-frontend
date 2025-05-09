import { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/api/vendors`)
      .then(res => res.json())
      .then(data => setVendors(data))
      .catch(err => console.error('Failed to load vendors:', err));
  }, []);

  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Meet the Vendors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white border rounded-xl shadow p-6 text-center">
            {vendor.avatar_url && (
              <img
                src={vendor.avatar_url}
                alt={vendor.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
            )}
            <h2 className="text-xl font-bold">{vendor.name}</h2>
            <p className="text-gray-500">{vendor.description || 'No description available'}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Vendors;
