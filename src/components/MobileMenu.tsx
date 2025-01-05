import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, User, ShoppingBag } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; subcategories: string[] }[];
}

export function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-gray-100 rounded-full"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 p-4 border-b">
          <User className="h-5 w-5" />
          <Link to="/login" onClick={onClose} className="text-lg">Log-In/Sign-Up</Link>
        </div>

        <nav className="mt-4">
          {categories.map((category) => (
            <div key={category.name} className="border-b">
              <Link
                to={`/products?category=${category.name}`}
                onClick={onClose}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <span className="text-lg">{category.name}</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-8">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-2 p-4 border-t border-b"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-lg">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}