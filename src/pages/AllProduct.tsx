import React, { useState } from 'react'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export const AllProduct = () => {
    const [sortOrder, setSortOrder] = useState('default')
    
    // Get the first product's category name by matching IDs
    const categoryName = categories.find(
        (category) => category.id === products[0]?.id
    )?.name || 'All Products'

    // Sort products based on selected order
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortOrder) {
            case 'a-z':
                return a.name.localeCompare(b.name)
            case 'z-a':
                return b.name.localeCompare(a.name)
            case 'low-high':
                return a.price - b.price
            case 'high-low':
                return b.price - a.price
            default:
                return 0
        }
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Sidebar - Filter Section */}
                <div className="w-full md:w-[20%] bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Filters</h3>
                    <div className="space-y-4">
                        {/* Sort Options */}
                        <div>
                            <label className="block text-gray-700 mb-2">Sort By</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full border rounded-md px-3 py-2.5 text-gray-700 
                                bg-white border-gray-300 shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-[#263b54] focus:border-[#263b54]
                                hover:border-[#263b54] hover:bg-gray-50
                                appearance-none cursor-pointer
                                transition-colors duration-200
                                pr-10"
                            >
                                <option value="default">Default</option>
                                <option value="a-z">Product Name (A-Z)</option>
                                <option value="z-a">Product Name (Z-A)</option>
                                <option value="low-high">Price (Low to High)</option>
                                <option value="high-low">Price (High to Low)</option>
                            </select>
                        </div>

                        {/* Categories */}
                        <div className='hidden md:block' >
                            <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            className="rounded border-gray-300 text-[#263b54] 
                                            focus:ring-[#263b54] hover:border-[#263b54]
                                            cursor-pointer transition-colors duration-200"
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="ml-2 text-gray-600 hover:text-[#263b54] 
                                            cursor-pointer transition-colors duration-200"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Products Section */}
                <div className="w-full md:w-[75%] ">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {categoryName}
                        </h2>
                        <span className="text-gray-500 border font-bold  p-1 md:px-2 text-sm focus:bg-[#f9bf56] rounded-xl bg-[#f1d269]">
                           Total Products: {products.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
