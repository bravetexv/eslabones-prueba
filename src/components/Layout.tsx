import React from 'react';
import Header from './Header';
import StarBackground from './StarBackground';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white">
            <StarBackground />
            <Header />
            <main className="relative z-10 container mx-auto px-4 pt-24 pb-12 flex flex-col items-center min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
