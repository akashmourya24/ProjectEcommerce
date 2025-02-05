import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { AllProduct } from '../pages/AllProduct';

interface CategoryCircleProps {
  category: Category;
}

export default function CategoryCircle({ category }: CategoryCircleProps) {
  const navigate = useNavigate()

  return (
    <Link to='' className="text-center group" >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-44 md:h-44 mx-auto rounded-full overflow-hidden 
        before:absolute before:inset-0 before:z-10 before:rounded-full before:border-4 before:border-white/50
        after:absolute after:inset-0.5 after:z-0 after:rounded-full after:bg-gradient-to-br after:from-white/90 after:to-white/20
        shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 
        group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <img
          src={category.image}
          alt={category.name}
          className="relative z-20 w-full h-full object-cover rounded-full transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="mt-4 text-lg sm:text-base text-gray-800 font-bold transition-colors duration-300 group-hover:text-gray-600">{category.name}</p>
    </Link>
  );
}