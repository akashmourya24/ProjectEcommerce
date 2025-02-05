import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// Add interface for cart item


export const Cart = () => {
  const navigate = useNavigate()
  // const [cartItems, setCartItems] = useState<any[]>([])
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 sm:p-8 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Shopping Cart</h1>

        {cart?.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="max-w-[180px] mx-auto mb-8 opacity-80">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
                alt="Empty shopping cart" 
                className="w-full h-auto"
              />
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty!</p>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#283b53] text-white px-8 py-3 rounded-lg hover:bg-[#385c87] transition duration-300 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="space-y-0 divide-y divide-gray-200">
                  {cart?.map((item) => (
                    <div key={item.id} className="hover:bg-gray-50 transition duration-300">
                      <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={item.images[0]} 
                            alt={item.name} 
                            className="w-28 h-28 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                        <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0 text-center sm:text-left">
                          <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                          <p className="text-2xl font-medium text-[#283b53]">Rs.{item.price}</p>
                          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mt-4 space-y-4 sm:space-y-0">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                              <button
                                onClick={() => {
                                  if (item.quantity && item.quantity > 1) {
                                    updateQuantity(item.id, item.quantity - 1);
                                  }
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition duration-200 font-medium"
                              >
                                −
                              </button>
                              <span className="px-6 py-2 border-x-2 border-gray-200 font-medium">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition duration-200 font-medium"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-0 sm:ml-6 text-red-500 hover:text-red-600 transition duration-200 flex items-center bg-red-50 px-4 py-2 rounded-lg"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs.{cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs.{cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#283b53] text-white px-8 py-3 rounded-lg hover:bg-[#385c87] transition duration-300 flex items-center justify-center font-medium"
                  >
                    <span>Proceed to Checkout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
