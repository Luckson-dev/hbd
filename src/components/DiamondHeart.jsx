import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_PATH =
    'M256 464 C220 430 48 305 48 180 C48 100 105 48 175 48 C214 48 242 70 256 103 C270 70 298 48 337 48 C407 48 464 100 464 180 C464 305 292 430 256 464 Z';

const FLOWERS = ['🌸', '🌺', '💖', '🌹', '✨', '💎', '🌷', '💕', '⚜️'];

const createFallingItems = () =>
    Array.from({ length: 60 }, (_, id) => ({
        id,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        left: Math.random() * 100,
        duration: 5 + Math.random() * 4,
        delay: Math.random() * 4,
        size: 16 + Math.random() * 20,
        drift: -60 + Math.random() * 120,
        rotation: 180 + Math.random() * 360,
    }));

const CoverHalf = ({ side, isOpened }) => {
    const isLeft = side === 'left';
    const halfClipId = `heart-half-${side}`;
    const gradientId = `cover-gradient-${side}`;
    const shineId = `cover-shine-${side}`;

    return (
        <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
                rotateY: isOpened ? (isLeft ? -180 : 180) : 0,
            }}
            transition={{
                duration: 2.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                transformOrigin: isLeft ? '0% 50%' : '100% 50%',
                transformStyle: 'preserve-3d',
                zIndex: isOpened ? 10 : 30,
                pointerEvents: 'none',
            }}
        >
            {/* Recto de la couverture (Visible quand le cœur est fermé) */}
            <svg
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
                style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                <defs>
                    <clipPath id={halfClipId}>
                        <rect
                            x={isLeft ? 0 : 256}
                            y="0"
                            width="256"
                            height="512"
                        />
                    </clipPath>

                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffc5e2" />
                        <stop offset="25%" stopColor="#ff91c7" />
                        <stop offset="55%" stopColor="#e74494" />
                        <stop offset="80%" stopColor="#bd2679" />
                        <stop offset="100%" stopColor="#79134f" />
                    </linearGradient>

                    <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
                        <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0.65"
                        />
                        <stop
                            offset="55%"
                            stopColor="#ffffff"
                            stopOpacity="0.12"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                <g clipPath={`url(#${halfClipId})`}>
                    <path d={HEART_PATH} fill={`url(#${gradientId})`} />

                    {isLeft ? (
                        <path
                            d="M175 65 C125 65 80 103 80 160 C80 211 114 255 143 283 C116 218 120 143 175 65 Z"
                            fill={`url(#${shineId})`}
                        />
                    ) : (
                        <path
                            d="M337 65 C387 65 432 103 432 160 C432 211 398 255 369 283 C396 218 392 143 337 65 Z"
                            fill={`url(#${shineId})`}
                        />
                    )}

                    <path
                        d={
                            isLeft
                                ? 'M150 116 L156 134 L174 140 L156 146 L150 164 L144 146 L126 140 L144 134 Z'
                                : 'M362 116 L368 134 L386 140 L368 146 L362 164 L356 146 L338 140 L356 134 Z'
                        }
                        fill="#fff8dc"
                        opacity="0.9"
                    />

                    <circle
                        cx={isLeft ? 188 : 324}
                        cy="102"
                        r="4"
                        fill="#fff8dc"
                    />
                </g>

                <g clipPath={`url(#${halfClipId})`}>
                    <path
                        d={HEART_PATH}
                        fill="none"
                        stroke="#f4d58b"
                        strokeWidth="8"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>

            {/* Verso de la couverture (Visible sur le dos des volets ouverts) */}
            <svg
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
                style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                <defs>
                    <clipPath id={`${halfClipId}-back`}>
                        <rect
                            x={isLeft ? 0 : 256}
                            y="0"
                            width="256"
                            height="512"
                        />
                    </clipPath>
                    <linearGradient
                        id={`${gradientId}-back`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#fff0f8" />
                        <stop offset="55%" stopColor="#e9a9ca" />
                        <stop offset="100%" stopColor="#a94b7c" />
                    </linearGradient>
                </defs>
                <g clipPath={`url(#${halfClipId}-back)`}>
                    <path d={HEART_PATH} fill={`url(#${gradientId}-back)`} />
                    <path
                        d={HEART_PATH}
                        fill="none"
                        stroke="#f4d58b"
                        strokeWidth="8"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>
        </motion.div>
    );
};

export const DiamondHeart = ({ isOpened }) => {
    const [fallingItems, setFallingItems] = useState([]);
    const [openingComplete, setOpeningComplete] = useState(false);

    useEffect(() => {
        if (!isOpened) {
            setOpeningComplete(false);
            setFallingItems([]);
            return;
        }

        setFallingItems(createFallingItems());

        const timer = setTimeout(() => {
            setOpeningComplete(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isOpened]);

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#100817]">
            {/* Lumière d'ambiance */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/15 blur-[80px] sm:h-96 sm:w-96" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-[70px]" />
            </div>

            {/* Pluie de fleurs */}
            <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
                <AnimatePresence>
                    {openingComplete &&
                        fallingItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{
                                    x: 0,
                                    y: '-12vh',
                                    opacity: 0,
                                    rotate: 0,
                                }}
                                animate={{
                                    x: item.drift,
                                    y: '112vh',
                                    opacity: [0, 1, 1, 0.8],
                                    rotate: [0, item.rotation],
                                }}
                                transition={{
                                    x: {
                                        duration: item.duration,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    y: {
                                        duration: item.duration,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    rotate: {
                                        duration: item.duration,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    opacity: {
                                        duration: item.duration,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        times: [0, 0.15, 0.8, 1],
                                    },
                                }}
                                style={{
                                    position: 'absolute',
                                    left: `${item.left}%`,
                                    top: 0,
                                    fontSize: `clamp(14px, ${item.size}px, 36px)`,
                                    willChange: 'transform, opacity',
                                }}
                                className="select-none"
                            >
                                {item.emoji}
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* CŒUR UNIQUE */}
            <motion.div
                className="relative z-20"
                initial={false}
                style={{
                    width: 'min(86vw, 430px)',
                    aspectRatio: '1 / 1',
                    perspective: '2000px',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* PAGES INTÉRIEURES : restent fixes en dessous, affichant 2 et 1 quand la couverture s'ouvre */}
                <div className="absolute inset-0 z-10">
                    <svg
                        viewBox="0 0 512 512"
                        className="h-full w-full"
                        aria-hidden="true"
                    >
                        <defs>
                            <clipPath id="inside-heart-clip">
                                <path d={HEART_PATH} />
                            </clipPath>
                            <linearGradient
                                id="left-page-gradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#fffaf0" />
                                <stop offset="55%" stopColor="#f8e8cd" />
                                <stop offset="100%" stopColor="#e6c69a" />
                            </linearGradient>
                            <linearGradient
                                id="right-page-gradient"
                                x1="1"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#fffaf0" />
                                <stop offset="55%" stopColor="#f6e4c5" />
                                <stop offset="100%" stopColor="#dfbd8b" />
                            </linearGradient>
                            <linearGradient
                                id="gold-number-gradient"
                                x1="0"
                                y1="0"
                                x2="0.8"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#fff4b0" />
                                <stop offset="25%" stopColor="#e9c65e" />
                                <stop offset="55%" stopColor="#bd8421" />
                                <stop offset="78%" stopColor="#ffed9d" />
                                <stop offset="100%" stopColor="#9f6513" />
                            </linearGradient>
                        </defs>

                        <g clipPath="url(#inside-heart-clip)">
                            <rect
                                x="0"
                                y="0"
                                width="256"
                                height="512"
                                fill="url(#left-page-gradient)"
                            />
                            <rect
                                x="256"
                                y="0"
                                width="256"
                                height="512"
                                fill="url(#right-page-gradient)"
                            />

                            <rect
                                x="249"
                                y="90"
                                width="14"
                                height="350"
                                fill="#ad854c"
                                opacity="0.16"
                            />
                            <path
                                d="M256 105 L256 420"
                                stroke="#c6a15a"
                                strokeWidth="2"
                                opacity="0.65"
                            />

                            <path
                                d="M80 230 Q150 190 220 230"
                                stroke="#c6a15a"
                                strokeWidth="1.5"
                                fill="none"
                                opacity="0.4"
                            />
                            <path
                                d="M292 230 Q362 190 432 230"
                                stroke="#c6a15a"
                                strokeWidth="1.5"
                                fill="none"
                                opacity="0.4"
                            />

                            {/* Chiffre 2 (dans le lobe supérieur gauche) */}
                            <text
                                x="170"
                                y="180"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontFamily="Georgia, 'Times New Roman', serif"
                                fontSize="120"
                                fontWeight="bold"
                                fill="url(#gold-number-gradient)"
                                stroke="#b17a20"
                                strokeWidth="1"
                                paintOrder="stroke"
                            >
                                2
                            </text>

                            {/* Chiffre 1 (dans le lobe supérieur droit) */}
                            <text
                                x="342"
                                y="180"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontFamily="Georgia, 'Times New Roman', serif"
                                fontSize="120"
                                fontWeight="bold"
                                fill="url(#gold-number-gradient)"
                                stroke="#b17a20"
                                strokeWidth="1"
                                paintOrder="stroke"
                            >
                                1
                            </text>
                        </g>

                        <path
                            d={HEART_PATH}
                            fill="none"
                            stroke="#e7c77d"
                            strokeWidth="4"
                        />
                    </svg>
                </div>

                {/* Volets de la couverture qui s'ouvrent */}
                <CoverHalf side="left" isOpened={isOpened} />
                <CoverHalf side="right" isOpened={isOpened} />
            </motion.div>
        </div>
    );
};
