import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const DiamondHeart = ({ isOpened }) => {
  const [fallingItems, setFallingItems] = useState([]);

  // Génération des cœurs et fleurs qui tombent
  useEffect(() => {
    const items = ['🌸', '🌺', '💖', '🌹', '✨', '💎', '🌷', '💕'];
    const generated = Array.from({ length: 30 }).map((_, id) => ({
      id,
      emoji: items[Math.floor(Math.random() * items.length)],
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 20
    }));
    setFallingItems(generated);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Pluie de fleurs et cœurs */}
      {fallingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '-10vh', left: `${item.left}%`, opacity: 1 }}
          animate={{ y: '110vh', rotate: 360 }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear'
          }}
          style={{ fontSize: `${item.size}px` }}
          className="absolute z-10 pointer-events-none"
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Cœur Diamant 3D */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Côté Gauche du Cœur */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpened ? -140 : 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left center' }}
            className="w-1/2 h-full bg-gradient-to-bl from-pink-300 via-rose-400 to-purple-600 rounded-l-full shadow-[0_0_50px_rgba(244,114,182,0.8)] border-l-2 border-t-2 border-white/50 flex items-center justify-end pr-4 text-white font-extrabold text-6xl md:text-7xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            2
          </motion.div>

          {/* Côté Droit du Cœur */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpened ? 140 : 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'right center' }}
            className="w-1/2 h-full bg-gradient-to-br from-pink-300 via-rose-400 to-purple-600 rounded-r-full shadow-[0_0_50px_rgba(244,114,182,0.8)] border-r-2 border-t-2 border-white/50 flex items-center justify-start pl-4 text-white font-extrabold text-6xl md:text-7xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            1
          </motion.div>

        </div>
      </div>
    </div>
  );
};