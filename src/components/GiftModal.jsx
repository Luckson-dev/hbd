import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ExternalLink, Sparkles } from 'lucide-react';

export const GiftModal = ({ isOpen, onClose }) => {
  const googleMapsUrl = "https://maps.google.com/?q=-3.3822,29.3644"; // Exemple de position GPS

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            className="bg-neutral-900 border border-amber-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] text-white"
          >
            {/* Image de l'hôtel */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Hôtel d'anniversaire"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 bg-amber-500/80 backdrop-blur-md text-black font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Rendez-vous spécial
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
                  Rendez-vous sur
                </h2>
                <h3 className="text-2xl font-black text-white mt-1">
                  Hôtel Grand Palace & Spa
                </h3>
                <p className="text-neutral-400 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-pink-500" /> 124 Avenue de la Plage, Vue sur Mer
                </p>
              </div>

              {/* Description sur 4 lignes */}
              <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-amber-500/50 pl-3">
                Pour fêter tes 21 ans comme il se doit, un moment inoubliable t'attend dans cet endroit d'exception.<br />
                N'hésite pas à suivre scrupuleusement la position GPS ci-dessous si tu ne connais pas le trajet.<br />
                Prépare-toi à passer une soirée magique remplie de surprises et de rires.<br />
                On t'attend avec impatience pour célébrer ce jour si unique ! 🎉
              </p>

              {/* Bouton Google Maps */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 hover:opacity-95 transition-opacity mt-2"
              >
                <span>Ouvrir sur Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};