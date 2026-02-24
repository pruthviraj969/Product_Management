export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-[1440px] mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              PRODUCT<span className="text-lime-500">HUB</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your one-stop destination for quality products at unbeatable prices.
              Shop smart. Shop fast. Shop easy.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">All Products</li>
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Best Sellers</li>
              <li className="hover:text-white cursor-pointer transition">Discount Offers</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Careers</li>
              <li className="hover:text-white cursor-pointer transition">Blog</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">Help Center</li>
              <li className="hover:text-white cursor-pointer transition">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer transition">Return Policy</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {currentYear} ProductHub. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="hover:text-white transition cursor-pointer">Visa</span>
            <span className="hover:text-white transition cursor-pointer">Mastercard</span>
            <span className="hover:text-white transition cursor-pointer">UPI</span>
            <span className="hover:text-white transition cursor-pointer">PayPal</span>
          </div>

        </div>

      </div>
    </footer>
  );
}