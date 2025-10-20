import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedTasks from '../FeaturedTasks/FeaturedTasks';
import TopWorkers from '../TopWorkers/TopWorkers';
import HowItWorks from '../HowItWorks/HowItWorks';
import PlatformStatistics from '../PlatformStatistics/PlatformStatistics';
import EarningTips from '../EarningTips/EarningTips';
import RecentActivity from '../RecentActivity/RecentActivity';
import SpecialOffers from '../SpecialOffers/SpecialOffers';
import Testimonial from '../Testimonial/Testimonial';
import WhyChooseUsSection from '../WhyChooseUsSection/WhyChooseUsSection';
import Newsletter from '../Newsletter/Newsletter';


const Home = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8'>
           <Banner />
           <FeaturedTasks />
           <TopWorkers />
           <HowItWorks />
           <PlatformStatistics />
           <EarningTips />
           <RecentActivity />
           <SpecialOffers />
           <Testimonial />
           <WhyChooseUsSection />
           <Newsletter />
        </div>
    );
};

export default Home;