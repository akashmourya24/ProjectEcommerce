import React, { useState } from 'react';
import { CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CheckOut() {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
   
    interface AddressForm {
        fullName: string;
        email: string;
        phoneNumber: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    }

    // Add address state
    const [address, setAddress] = useState<AddressForm>({
        fullName: '',
        email: '',
        phoneNumber:'',
        address: '',
        city: '',
        postalCode: '',
        country: ''

    });

    // Add validation state
    const [isFormValid, setIsFormValid] = useState(false);

    // Update handleInputChange to validate form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev: AddressForm) => ({ ...prev, [name]: value }));
        
        // Check if all required fields are filled after state update
        setTimeout(() => {
            const updatedAddress = { ...address, [name]: value };
            const isValid = Object.values(updatedAddress).every(field => field.trim() !== '');
            setIsFormValid(isValid);
        }, 0);
    };

    const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    // Add function to handle continue shopping
    const handleContinueShopping = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:5000/pay", {
                amount: total,
                currency: "INR",
                name: address.fullName,
                email: address.email,
                phone: address.phoneNumber,
            });

            if (!data.success) {
                toast.error("Payment order failed!");
                return;
            }

            const options = {
                key: "rzp_test_TzvW09QmOilcyv",
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Kashmiricart.com",
                description: "Purchase Payment",
                image: "https://as1.ftcdn.net/v2/jpg/09/04/14/00/1000_F_904140009_nW9RiXqcmgz4qTl34wygfkCqU2WYSllW.jpg",
                order_id: data.order.id,
                handler: async function (response: any) {
                    console.log("Payment Success:", response);
                    setShowSuccessModal(true);
                    toast.success("Payment completed successfully!");
                },
                prefill: {
                    name: address.fullName,
                    email: address.email,
                    contact: address.phoneNumber,
                },
                theme: { color: "#283b53" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast.error("Payment Failed: " + response.error.description);
            });
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return <h2>Your Cart is Empty</h2>;
      }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8" />
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cart Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-gray-600">RS.{item.price.toFixed(2)}</p>
                                        {/* <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div> */}
                                    </div>
                                    {/* <div className="text-right">
                                        <p className="font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t">
                            <div className="flex justify-between text-xl font-semibold">
                                <span>Total</span>
                                <span>Rs.{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Address Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name Field */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={address.fullName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                {/* Email and Phone Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={address.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="johndoe@example.com"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={address.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+91 1234567890"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                {/* Address Field */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={address.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="123 Main Street, Apt 4B"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                {/* City, Postal Code, and Country Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Mumbai"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="400001"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={address.country}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="India"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !isFormValid}
                                className={`w-full mt-6 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium text-base transition-all duration-300
                                    ${isFormValid 
                                        ? 'bg-[#283b53] text-white hover:bg-[#385c87] transform hover:scale-[1.02]' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin">⌛</span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>
                            {!isFormValid && (
                                <p className="text-red-500 text-sm text-center mt-2">
                                    Please fill in all required fields to proceed
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Add Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-[#283b53] text-white py-3 px-4 rounded-md hover:bg-[#385c87] font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckOut;