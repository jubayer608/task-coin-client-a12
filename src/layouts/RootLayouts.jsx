import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import TitleManager from '../routes/TitleManager';

const RootLayouts = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <TitleManager />
            <Navbar />
            <main className="min-h-screen bg-base-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayouts;