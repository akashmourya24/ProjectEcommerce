import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#283b53] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="order-first sm:order-last">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" />
                <a href="tel:+91-7500343758" className="text-gray-400 hover:text-white">
                  +91 7500343758
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <a href="mailto:contact@shophub.com" className="text-gray-400 hover:text-white">
                  arun@saffron.com
                </a>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4 mt-6">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div className="order-2 sm:order-first">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm sm:text-base text-gray-400">
              ShopHub is your one-stop destination for all your shopping needs. We provide quality products at competitive prices.
            </p>
          </div>
          
          <div className="order-3 hidden md:block">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              {/* <li><a href="/shipping" className="text-gray-400 hover:text-white">Shipping Info</a></li> */}
              {/* <li><a href="/returns" className="text-gray-400 hover:text-white">Returns</a></li> */}
            </ul>
          </div>
          
          <div className="order-4">
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="/track-order" className="text-gray-400 hover:text-white">Track Order</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-5  text-sm sm:text-base">
          <p className="text-gray-400">&copy; 2025 Kashmiricart.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}