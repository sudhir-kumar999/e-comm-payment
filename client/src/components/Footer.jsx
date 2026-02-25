import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-3">BookStore</h2>
            <p className="text-sm text-gray-600">
              Your one stop destination for buying books online with best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-blue-600">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Help</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <p className="text-sm text-gray-600">
              Email: support@bookstore.com
            </p>
            <p className="text-sm text-gray-600">
              Phone: +91 9876543210
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-4 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} BookStore. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
