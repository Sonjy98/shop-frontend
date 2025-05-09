import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      alert('Registered! Please log in.');
      window.location.href = '/login';
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-400">Register</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
