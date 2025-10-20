import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import TitleManager from '../routes/TitleManager';
import { useTheme } from '../contexts/ThemeContext/ThemeContext';

const RootLayouts = () => {
    const { isDark } = useTheme();
    
    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <TitleManager />
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayouts;