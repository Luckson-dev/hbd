import React from 'react';
import { motion } from 'framer-motion';

export const ButtonGrid = ({ onSelectNumber }) => {
  // Génère un dégradé de couleur unique pour chaque bouton
  const getGradient = (num) => {
    const gradients = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-fuchsia-500 to-pink-500'
    ];
    return gradients[num % gradients.length];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-8"
      >
        Trouve ton âge exact pour continuer 🎂
      </motion.h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-4xl">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((num) => (
          <motion.button
            key={num}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: num * 0.03, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelectNumber(num)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${getGradient(
              num
            )} shadow-lg hover:shadow-2xl text-white font-bold text-xl md:text-2xl flex items-center justify-center border-2 border-white/20 backdrop-blur-sm cursor-pointer`}
          >
            {num}
          </motion.button>
        ))}
      </div>
    </div>
  );
};