import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Success() {
  const navigate    = useNavigate();
  const { total }   = useCart();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-5">

     
      <style>{`
        @keyframes pop {
          0%   { transform: scale(0);   }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1);   }
        }
        .pop { animation: pop 0.5s ease; }
      `}</style>

      <div className="bg-white rounded-3xl p-12 text-center max-w-sm w-full shadow-2xl">
        <span className="text-8xl block mb-5 pop">🎉</span>
        <h2 className="text-3xl font-black text-green-600 mb-3">Payment Successful!</h2>
        <p className="text-gray-500 text-base mb-7">
          Your order of{" "}
          <strong className="text-gray-800">${total}</strong>{" "}
          has been placed.<br />
          Estimated delivery: 30–45 minutes 🚀
        </p>
        <button
          onClick={() => navigate("/feedback")}   
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all hover:-translate-y-0.5"
        >
          Leave Feedback →
        </button>
      </div>
    </div>
  );
}