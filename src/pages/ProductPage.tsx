import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isInCart) {
      addToCart(product);
      setIsInCart(true);
      toast.success('Product added to cart');
    } else {
      navigate('/cart');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={500} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li>/</li>
            <li><p onClick={() => navigate(-1)} className="hover:text-blue-600">Products</p></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-w-1 aspect-h-1 mb-4">
              <div
                className={`relative cursor-zoom-in overflow-hidden rounded-lg ${isZoomed ? 'cursor-zoom-out' : ''
                  }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-[300px] sm:h-[400px] md:h-[350px] object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : ''
                    }`}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-16 sm:h-20 md:h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info - Enhanced */}
          <div className="mt-4 md:mt-0">
            <div className="sticky top-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price and Stock Status */}
              <div className="flex items-center space-x-4 mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                  Rs.{product.price.toFixed(2)}
                </p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  In Stock
                </span>
              </div>

              {/* Short Description */}
              <div className="prose prose-sm text-gray-600 mb-8">
                <p className="text-lg">{product.description}</p>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  )) || <li>Features not available</li>}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button
                className={`w-full ${isInCart ? 'bg-[#263b54]' : 'bg-[#f9bf56]'} 
                text-white py-3 px-7 rounded-lg text-lg font-medium 
                ${isInCart ? 'hover:bg-[#385c87]' : 'hover:bg-[#e8b24d]'} 
                transition-colors shadow-lg hover:shadow-xl`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Go to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Product Description</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{product.longDescription || product.description}</p>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Specifications</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <dl className="space-y-4">
                  {product.specifications?.map((spec, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-600 font-medium">{spec.name}</dt>
                      <dd className="text-gray-900 col-span-2">{spec.value}</dd>
                    </div>
                  )) || (
                      <div className="text-gray-600">Specifications not available</div>
                    )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}