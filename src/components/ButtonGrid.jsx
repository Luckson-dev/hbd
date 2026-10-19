import React from 'react';
import { motion } from 'framer-motion';

export const ButtonGrid = ({ onSelectNumber }) => {
    // Dégradés de couleurs
    const gradients = [
        'from-pink-500 to-rose-500',
        'from-purple-500 to-indigo-500',
        'from-cyan-500 to-blue-500',
        'from-emerald-500 to-teal-500',
        'from-amber-500 to-orange-500',
        'from-fuchsia-500 to-pink-500',
        'from-violet-500 to-purple-500',
        'from-sky-500 to-indigo-500',
        'from-lime-500 to-green-500',
    ];

    const getGradient = (num) => gradients[(num - 1) % gradients.length];

    // Génère des paramètres de mouvement différents pour chaque bouton
    const getRandomAnimation = (num) => {
        const seed = num * 123.456;

        const random = (value) => {
            const x = Math.sin(seed + value) * 10000;
            return x - Math.floor(x);
        };

        return {
            x: [
                0,
                (random(1) - 0.5) * 100,
                (random(2) - 0.5) * 100,
                (random(3) - 0.5) * 100,
                0,
            ],
            y: [
                0,
                (random(4) - 0.5) * 80,
                (random(5) - 0.5) * 80,
                (random(6) - 0.5) * 80,
                0,
            ],
            rotate: [0, (random(7) - 0.5) * 30, (random(8) - 0.5) * 30, 0],
            transition: {
                duration: 5 + random(9) * 5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: random(10) * 3,
            },
        };
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 py-12 text-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Décoration lumineuse */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 text-slate-300 mb-12 text-sm sm:text-base"
            >
                Choisis un nombre pour découvrir la suite ✨
            </motion.p>

            {/* Zone des boutons animés */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 sm:gap-7 max-w-5xl mx-auto">
                {Array.from({ length: 21 }, (_, i) => i + 1).map((num) => (
                    <motion.button
                        key={num}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            ...getRandomAnimation(num),
                            scale: 1,
                            opacity: 1,
                        }}
                        whileHover={{
                            scale: 1.2,
                            rotate: 8,
                            zIndex: 50,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{
                            scale: 0.85,
                        }}
                        onClick={() => onSelectNumber(num)}
                        aria-label={`Choisir le nombre ${num}`}
                        className={`
              relative flex-shrink-0
              w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
              rounded-full
              bg-gradient-to-br ${getGradient(num)}
              shadow-lg shadow-purple-900/30
              hover:shadow-2xl hover:shadow-pink-500/30
              text-white font-bold text-lg sm:text-xl md:text-2xl
              border border-white/30
              cursor-pointer select-none
              transition-shadow duration-300
            `}
                        style={{ zIndex: 1 }}
                    >
                        {num}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
