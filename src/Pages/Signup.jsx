import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Signup() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const navigate    = useNavigate();
  const { setUser } = useCart();

  function handleSignup() {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    
    setUser(name);

    
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-600 via-green-700 to-green-900 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">

         
        <div className="text-center mb-7">
          <span className="text-5xl block mb-2">🛒</span>
          <h1 className="text-2xl font-black text-green-600">FreshMart</h1>
          <p className="text-gray-400 text-sm mt-1">Your neighbourhood grocery store</p>
        </div>

        <h2 className="text-xl font-extrabold text-gray-800 mb-5">Create account 🌿</h2>
 
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-semibold mb-4">
            {error}
          </div>
        )}

         
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors"
          />
        </div>

         
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors"
          />
        </div>

         
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="At least 4 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl text-base transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          Create Account
        </button>

         
        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}