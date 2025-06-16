"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X,
  Heart,
  Apple
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-15 h-15 rounded-lg ">
                <img 
                  src="https://endlessicons.com/wp-content/uploads/2012/11/apple-icon-614x460.png"
                  alt="Apple Store Logo"
                  className="w-15 h-15 object-contain drop-shadow-sm"
                />
              </div>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/store" 
                  className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
              >
              Store
            </Link>
            <Link 
              href="/store/?category=mac" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              Mac
            </Link>
            <Link 
              href="/store/?category=ipad" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              iPad
            </Link>
            <Link 
              href="/store/?category=iphone" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              iPhone
            </Link>
            <Link 
              href="/store/?category=apple-watch" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              Watch
            </Link>
            <Link 
              href="/store/?category=air-pods" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              AirPods
            </Link>
            <Link 
              href="/store/?category=accessories" 
              className="text-gray-700 hover:text-gray-900 px-3 text-sm font-medium transition-colors"
            >
              Accessories
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={toggleSearch}
              className="px-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Shopping Bag */}
            <button className="px-2 text-gray-700 hover:text-gray-900 transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/mac"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mac
            </Link>
            <Link
              href="/ipad"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              iPad
            </Link>
            <Link
              href="/iphone"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              iPhone
            </Link>
            <Link
              href="/watch"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Watch
            </Link>
            <Link
              href="/airpods"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AirPods
            </Link>
            <Link
              href="/accessories"
              className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accessories
            </Link>
            
            {/* Mobile-only links */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                href="/account"
                className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                href="/favorites"
                className="block px-6 py-2 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}