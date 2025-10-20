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
        <div className='bg-base-100 transition-colors duration-300'>
           {/* Hero Section */}
           <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <Banner />
           </div>
           
           {/* Featured Tasks Section */}
           <FeaturedTasks />
           
           {/* Top Workers Section */}
           <TopWorkers />
           
           {/* How It Works Section */}
           <HowItWorks />
           
           {/* Platform Statistics Section */}
           <PlatformStatistics />
           
           {/* Earning Tips Section */}
           <EarningTips />
           
           {/* Recent Activity Section */}
           <RecentActivity />
           
           {/* Special Offers Section */}
           <SpecialOffers />
           
           {/* Testimonials Section */}
           <Testimonial />
           
           {/* Why Choose Us Section */}
           <WhyChooseUsSection />
           
           {/* Newsletter Section */}
           <Newsletter />
        </div>
    );
};

export default Home;