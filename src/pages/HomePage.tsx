import React from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCircle from '../components/CategoryCircle';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../videos/14319209-uhd_3840_2160_60fps.mp4';

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-15 flex items-center justify-center px-4">
          <div className="text-center text-[#f4f7f9]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to Kashmiricart</h1>
            <p className="text-lg sm:text-xl mb-8">Discover Amazing Products at Great Prices</p>
            <button className="bg-[#263b54] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-[#385c87] transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-12">
        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-900 md:mb-12 sm:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8" onClick={() => navigate('/allProduct')}>
          {categories.map((category) => (
            <CategoryCircle key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 ">
        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-900 md:mb-14 sm:mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}