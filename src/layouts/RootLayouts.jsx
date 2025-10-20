import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import TitleManager from '../routes/TitleManager';

const RootLayouts = () => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
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