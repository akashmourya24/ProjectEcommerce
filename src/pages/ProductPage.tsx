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
                className={`w-full mb-4 ${isInCart ? 'bg-[#263b54]' : 'bg-[#f9bf56]'} 
                text-white py-3 px-7 rounded-lg text-lg font-medium 
                ${isInCart ? 'hover:bg-[#385c87]' : 'hover:bg-[#e8b24d]'} 
                transition-colors shadow-lg hover:shadow-xl`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Go to Cart' : 'Add to Cart'}
              </button>

              {/* Share Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name}: ${window.location.href}`)}`, '_blank')}
                  className="flex-1 bg-[#25D366] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Share</span>
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="flex-1 bg-[#1877F2] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Share</span>
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.name}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="flex-1 bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Tweet</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <h2 className="text-2xl text-center font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              {
                question: "Where is Local Sparrow's saffron from?",
                answer: "Our saffron is sourced directly from the pristine valleys of Kashmir, known for producing the world's finest quality saffron."
              },
              {
                question: "What is special about Local Sparrow's Kashmir Kesar?",
                answer: "Our Kashmir Kesar is distinguished by its deep red color, intense aroma, and superior quality. Each strand is carefully hand-picked and processed to maintain its natural properties."
              },
              {
                question: "Is this kesar pesticide free?",
                answer: "Yes, our saffron is 100% organic and pesticide-free. We maintain strict quality control throughout the cultivation and processing stages."
              },
              {
                question: "How do I use Kashmi Kesar?",
                answer: "For best results, soak the saffron strands in warm milk or water for 15-20 minutes before use. This helps release the flavor, aroma, and color effectively."
              }
            ].map((faq, index) => (
              <details key={index} className="border rounded-lg">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-pink-500 text-2xl">+</span>
                </summary>
                <div className="px-6 py-4 text-gray-600 border-t">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}