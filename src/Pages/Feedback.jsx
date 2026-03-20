import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [text,   setText]   = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    navigate("/final");
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-xl text-center">

        <h2 className="text-2xl font-black text-gray-800 mb-2">
          How was your experience? ⭐
        </h2>
        <p className="text-gray-400 text-sm mb-6">We'd love to hear what you think!</p>

        
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map(n => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={`text-4xl cursor-pointer transition-transform hover:scale-125 select-none
                ${rating >= n ? "opacity-100" : "opacity-25"}`}
            >
              ⭐
            </span>
          ))}
        </div>

        
        <textarea
          placeholder="Tell us about your shopping experience..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 resize-y min-h-24 mb-5 transition-colors"
        />

        <div className="flex gap-3 justify-center">
         
          <button
            onClick={() => navigate("/final")}
            className="px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 font-extrabold rounded-xl transition-colors"
          >
            Skip
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}