import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WrongChoiceModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 50 }}
                        className="bg-neutral-900 border border-red-500/30 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-6"
                    >
                        {/* Emojis animés rigolots autour du doigt */}
                        <div className="relative w-full h-32 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-7xl z-10"
                            >
                                🖕🏾
                            </motion.div>

                            {/* Emojis rigolots satellites */}
                            {['🤣', '😂', '😜', '🤪', '🤡'].map(
                                (emoji, idx) => (
                                    <motion.span
                                        key={idx}
                                        animate={{
                                            y: [0, -15, 0],
                                            rotate: [0, 20, -20, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5 + idx * 0.2,
                                            delay: idx * 0.1,
                                        }}
                                        className={`absolute text-3xl ${
                                            idx === 0
                                                ? '-top-2 left-4'
                                                : idx === 1
                                                  ? 'top-2 right-4'
                                                  : idx === 2
                                                    ? 'bottom-0 left-6'
                                                    : idx === 3
                                                      ? 'bottom-0 right-6'
                                                      : '-top-4 left-1/2 -translate-x-1/2'
                                        }`}
                                    >
                                        {emoji}
                                    </motion.span>
                                ),
                            )}
                        </div>

                        <p className="text-white font-medium text-lg">
                            Mauvais choix ! Tu ne connais même pas ton
                            âge ? 😜
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg shadow-pink-500/25 cursor-pointer"
                        >
                            Réessayer
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
