import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { streamers, Streamer } from '../data/streamers';
import StreamerModal from './StreamerModal';

const StreamerGrid: React.FC = () => {
    const { t } = useTranslation();
    const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(null);

    return (
        <>
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl font-bold mb-8 text-center">{t('streamers')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {streamers.map((streamer, index) => (
                        <motion.div
                            key={streamer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => setSelectedStreamer(streamer)}
                            className={`
                relative group cursor-pointer rounded-2xl overflow-hidden
                bg-gradient-to-br ${streamer.color} p-1
              `}
                        >
                            <div className="bg-black/90 h-full w-full rounded-xl p-6 flex flex-col items-center justify-center gap-4 relative z-10 transition-colors group-hover:bg-black/80">
                                <img
                                    src={streamer.image}
                                    alt={streamer.name}
                                    className="w-32 h-32 rounded-full border-4 border-white/10 shadow-xl"
                                />
                                <h3 className="text-2xl font-bold">{streamer.name}</h3>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sm font-medium">{t('click_view')}</span>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedStreamer && (
                    <StreamerModal
                        streamer={selectedStreamer}
                        onClose={() => setSelectedStreamer(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default StreamerGrid;
