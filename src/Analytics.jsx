// src/Analytics.jsx
import React from 'react';

function Analytics() {
  const downloadCSV = () => {
    const token = localStorage.getItem('auth_token');
    fetch(`${import.meta.env.VITE_API_BASE}/api/analytics/orders.csv`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        console.error('❌ Failed to download CSV:', err);
        alert('Download failed');
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4">📊 Analytics</h1>
      <p className="text-gray-600 mb-6">Export raw order data as CSV for analysis.</p>
      <button
        onClick={downloadCSV}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Download Order CSV
      </button>
    </div>
  );
}

export default Analytics;
