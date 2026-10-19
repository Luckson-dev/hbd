import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ExternalLink,
  Sparkles,
  X,
  Gift,
  Heart,
} from 'lucide-react';

export const GiftModal = ({ isOpen, onClose }) => {
  const googleMapsUrl = 'https://maps.google.com/?q=-3.3822,29.3644';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-800 my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-modal-title"
          >
            {/* Image de couverture */}
            <div className="relative h-52 sm:h-60 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85"
                alt="Hôtel où se retrouver"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

              {/* Bouton de fermeture */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Petit badge */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-rose-600 text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                <Gift className="w-4 h-4" />
                Un petit cadeau t'attend
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-5 sm:p-7 space-y-5">
              {/* Titre */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
                  Une petite rencontre
                </p>

                <h2
                  id="gift-modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2"
                >
                  On se retrouve ici ? 😊
                </h2>

                <div className="flex items-start gap-3 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white text-rose-500 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      Hôtel Grand Palace & Spa
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      124 Avenue de la Plage, Vue sur Mer
                    </p>
                  </div>
                </div>
              </div>

              {/* Description simple et naturelle */}
              <div className="relative rounded-2xl bg-slate-50 p-4 sm:p-5 border border-slate-100">
                <Heart className="absolute top-4 right-4 w-5 h-5 text-rose-300" />

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed pr-5">
                  J'aimerais qu'on se retrouve un petit moment pour que je
                  puisse te remettre ton cadeau. 🎁
                  <br />
                  <br />
                  Rien de compliqué, juste une petite rencontre pour partager
                  ce moment ensemble.
                  <br />
                  <br />
                  J'espère que tu pourras venir. 😊
                </p>
              </div>

              {/* Bouton Google Maps */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MapPin className="w-5 h-5" />

                <span>Voir l'itinéraire</span>

                <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Petite note */}
              <p className="text-center text-xs text-slate-400">
                Au plaisir de se retrouver ! 💗
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};