import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-tl-2xl rounded-br-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
          <p className="text-base sm:text-lg font-bold text-emerald-600">₹{product.price.toFixed(2)}</p>
       
          <button 
            className="mt-4 w-full bg-[#f9bf56] text-white py-2.5 px-4 rounded-tl-lg rounded-br-lg text-sm sm:text-base hover:bg-[#e8b24d] transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2" 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              navigate(`/product/${product.id}`);
            }}
          >
            View Product
          </button>
        </div>
      </div>
    </Link>
  );
}