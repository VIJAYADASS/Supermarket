
function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">

        
        <div>
          <h3 className="text-lg font-black mb-2">🛒 FreshMart</h3>
          <p className="text-green-300 text-sm leading-relaxed">
            Your neighbourhood grocery store, now at your fingertips.
            Fresh, fast & affordable.
          </p>
        </div>

        
        {[
          { title: "Shop",    items: ["Produce", "Dairy & Eggs", "Bakery", "Meat & Seafood", "Pantry", "Beverages"] },
          { title: "Help",    items: ["FAQ", "Contact Us", "Delivery Info", "Returns"] },
          { title: "Company", items: ["About Us", "Careers", "Blog", "Privacy Policy"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-green-300 mb-3">
              {col.title}
            </h4>
            <ul className="space-y-1.5">
              {col.items.map(item => (
                <li
                  key={item}
                  className="text-green-400 text-sm hover:text-white cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-green-800 pt-5 text-center text-green-500 text-xs max-w-6xl mx-auto px-5">
        © 2026 FreshMart. Made with 💚 for fresh food lovers.
      </div>
    </footer>
  );
}
export default Footer