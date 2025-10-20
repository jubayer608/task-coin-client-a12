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
        <div className='w-full'>
           {/* Full-width sections */}
           <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
               <Banner />
           </div>
           
           {/* Alternating full-width and contained sections */}
           <div className='space-y-16 md:space-y-20 lg:space-y-24'>
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                   <FeaturedTasks />
               </div>
               
               <div className='bg-gray-50 dark:bg-gray-800 py-16 md:py-20 lg:py-24'>
                   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                       <TopWorkers />
                   </div>
               </div>
               
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                   <HowItWorks />
               </div>
               
               <div className='bg-white dark:bg-gray-900 py-16 md:py-20 lg:py-24'>
                   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                       <PlatformStatistics />
                   </div>
               </div>
               
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                   <EarningTips />
               </div>
               
               <div className='bg-gray-50 dark:bg-gray-800 py-16 md:py-20 lg:py-24'>
                   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                       <RecentActivity />
                   </div>
               </div>
               
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                   <SpecialOffers />
               </div>
               
               <div className='bg-white dark:bg-gray-900 py-16 md:py-20 lg:py-24'>
                   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                       <Testimonial />
                   </div>
               </div>
               
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                   <WhyChooseUsSection />
               </div>
           </div>
           
           {/* Newsletter - Full width */}
           <Newsletter />
        </div>
    );
};

export default Home;