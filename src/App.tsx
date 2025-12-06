import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import StreamerGrid from './components/StreamerGrid';
import CommentsSection from './components/CommentsSection';

function App() {
    const { t } = useTranslation();

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-[linear-gradient(to_right,#0ea5e9,#67e8f9,#22c55e,#ef4444)] animate-gradient-x uppercase">
                    {t('title')}
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </motion.div>

            <StreamerGrid />

            <CommentsSection />
        </Layout>
    );
}

export default App;
