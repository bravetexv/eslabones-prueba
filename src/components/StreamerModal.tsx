import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Youtube, Twitch, MessageSquare, ExternalLink } from 'lucide-react';
import { Streamer } from '../data/streamers';

interface StreamerModalProps {
    streamer: Streamer;
    onClose: () => void;
}

const StreamerModal: React.FC<StreamerModalProps> = ({ streamer, onClose }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'links' | 'chat'>('links');
    const [chatPlatform, setChatPlatform] = useState<string>(
        streamer.platforms.twitch ? 'twitch' :
            streamer.platforms.kick ? 'kick' : 'youtube'
    );

    // Helper to get chat URL
    const getChatUrl = (platform: string) => {
        switch (platform) {
            case 'twitch':
                const twitchUser = streamer.platforms.twitch?.split('/').pop();
                return `https://www.twitch.tv/embed/${twitchUser}/chat?parent=${window.location.hostname}&parent=localhost&darkpopout`;
            case 'kick':
                // Kick embedding is restricted and causes 419 errors. We use a popout button instead.
                return null;
            case 'youtube':
                // YouTube chat embedding requires a specific video ID usually. 
                // For now we'll show a placeholder or link.
                return null;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1a1a1a] w-full max-w-6xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sidebar / Header */}
                <div className={`p-8 md:w-1/3 bg-gradient-to-br ${streamer.color} relative flex flex-col items-center text-center`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <img
                        src={streamer.image}
                        alt={streamer.name}
                        className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl mb-4"
                    />
                    <h2 className="text-3xl font-bold text-white mb-2">{streamer.name}</h2>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setActiveTab('links')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'links' ? 'bg-white text-black' : 'bg-black/20 text-white hover:bg-black/30'}`}
                        >
                            {t('links')}
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'chat' ? 'bg-white text-black' : 'bg-black/20 text-white hover:bg-black/30'}`}
                        >
                            {t('chat')}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:w-2/3 bg-[#121212] overflow-y-auto">
                    {activeTab === 'links' ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ExternalLink size={20} />
                                {t('official_channels')}
                            </h3>

                            {streamer.platforms.youtube && (
                                <a
                                    href={streamer.platforms.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#FF0000]/20 border border-white/5 hover:border-[#FF0000]/50 transition-all group"
                                >
                                    <div className="p-3 rounded-full bg-[#FF0000]/10 group-hover:bg-[#FF0000] transition-colors">
                                        <Youtube className="text-[#FF0000] group-hover:text-white" />
                                    </div>
                                    <span className="font-bold text-lg">YouTube</span>
                                </a>
                            )}

                            {streamer.platforms.twitch && (
                                <a
                                    href={streamer.platforms.twitch}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#9146FF]/20 border border-white/5 hover:border-[#9146FF]/50 transition-all group"
                                >
                                    <div className="p-3 rounded-full bg-[#9146FF]/10 group-hover:bg-[#9146FF] transition-colors">
                                        <Twitch className="text-[#9146FF] group-hover:text-white" />
                                    </div>
                                    <span className="font-bold text-lg">Twitch</span>
                                </a>
                            )}

                            {streamer.platforms.kick && (
                                <a
                                    href={streamer.platforms.kick}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#53FC18]/20 border border-white/5 hover:border-[#53FC18]/50 transition-all group"
                                >
                                    <div className="p-3 rounded-full bg-[#53FC18]/10 group-hover:bg-[#53FC18] transition-colors">
                                        <MessageSquare className="text-[#53FC18] group-hover:text-black" />
                                    </div>
                                    <span className="font-bold text-lg">Kick</span>
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {Object.keys(streamer.platforms).map((platform) => (
                                    <button
                                        key={platform}
                                        onClick={() => setChatPlatform(platform)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${chatPlatform === platform ? 'bg-white text-black' : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'}`}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 bg-black rounded-xl overflow-hidden border border-white/10 relative min-h-[500px]">
                                {getChatUrl(chatPlatform) ? (
                                    <iframe
                                        src={getChatUrl(chatPlatform)!}
                                        className="w-full h-full border-none"
                                        title={`${streamer.name} ${chatPlatform} chat`}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                                        <MessageSquare size={48} className="mb-4 opacity-50" />
                                        <p>Chat embed not available for {chatPlatform}.</p>

                                        {chatPlatform === 'kick' ? (
                                            <button
                                                onClick={() => {
                                                    const kickUser = streamer.platforms.kick?.split('/').pop();
                                                    if (kickUser) {
                                                        window.open(
                                                            `https://kick.com/${kickUser}/chatroom`,
                                                            'kick_chat',
                                                            'width=400,height=600,menubar=no,toolbar=no,location=no,status=no'
                                                        );
                                                    }
                                                }}
                                                className="mt-4 flex items-center gap-2 bg-[#53FC18] text-black px-6 py-3 rounded-full font-bold hover:bg-[#42ca12] transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                                Open Popout Chat
                                            </button>
                                        ) : (
                                            <a
                                                href={streamer.platforms[chatPlatform as keyof typeof streamer.platforms]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 text-blue-400 hover:underline"
                                            >
                                                Open in new tab
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StreamerModal;
