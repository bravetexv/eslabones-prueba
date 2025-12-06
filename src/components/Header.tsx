import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Globe } from 'lucide-react';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
                <a
                    href="https://discord.gg/3FWuJvnG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-[#5865F2]/20 hover:bg-[#5865F2] backdrop-blur-sm border border-[#5865F2]/50 px-4 py-2 rounded-full transition-all duration-300"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                    <span className="font-bold text-white group-hover:scale-105 transition-transform">
                        Discord
                    </span>
                </a>
            </div>

            <div className="pointer-events-auto">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full transition-all duration-300"
                >
                    <Globe className="w-5 h-5" />
                    <span className="uppercase font-bold">{i18n.language}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
