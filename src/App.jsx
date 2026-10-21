import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

import { ButtonGrid } from './components/ButtonGrid';
import { WrongChoiceModal } from './components/WrongChoiceModal';
import { DiamondHeart } from './components/DiamondHeart';
import { GiftModal } from './components/GiftModal';

export default function App() {
    const [step, setStep] = useState(1); // 1: Grille, 2: Cœur, 3: Bouton Cadeau
    const [isWrongModalOpen, setIsWrongModalOpen] = useState(false);
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const [isHeartOpened, setIsHeartOpened] = useState(false);

    // Gestion du clic sur les chiffres
    const handleSelectNumber = (num) => {
        if (num !== 21) {
            setIsWrongModalOpen(true);
        } else {
            setStep(2);

            // Déclenche le feu d'artifice de confettis
            confetti({
                particleCount: 120,
                spread: 100,
                origin: { y: 0.6 },
            });

            // Ouvre le cœur progressivement après 1 sec
            setTimeout(() => {
                setIsHeartOpened(true);
            }, 1000);

            // Simule la fin du son après ~6 secondes
            setTimeout(() => {
                setStep(3);
            }, 6500);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
            {/* Éape 1 : Grille de boutons */}
            {step === 1 && <ButtonGrid onSelectNumber={handleSelectNumber} />}

            {/* Étape 2 & 3 : Cœur en diamant et cadeau */}
            {(step === 2 || step === 3) && (
                <div className="relative">
                    <DiamondHeart isOpened={isHeartOpened} />

                    {/* Étape 3 : Apparition du bouton cadeau */}
                    {step === 3 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 150 }}
                            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30"
                        >
                            <button
                                onClick={() => setIsGiftModalOpen(true)}
                                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 font-extrabold text-lg text-white shadow-[0_0_30px_rgba(244,114,182,0.6)] flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
                            >
                                <Gift className="w-6 h-6 animate-bounce" />
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Modales */}
            <WrongChoiceModal
                isOpen={isWrongModalOpen}
                onClose={() => setIsWrongModalOpen(false)}
            />

            <GiftModal
                isOpen={isGiftModalOpen}
                onClose={() => setIsGiftModalOpen(false)}
            />
        </main>
    );
}
