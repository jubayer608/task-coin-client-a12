import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import TopWorkers from '../TopWorkers/TopWorkers';
import HowItWorks from '../HowItWorks/HowItWorks';
import PlatformStatistics from '../PlatformStatistics/PlatformStatistics';
import SuccessStories from '../SuccessStories/SuccessStories';
import TrustedBy from '../TrustedBy/TrustedBy';
import PricingPlans from '../PricingPlans/PricingPlans';
import Testimonial from '../Testimonial/Testimonial';
import WhyChooseUsSection from '../WhyChooseUsSection/WhyChooseUsSection';
import GetStarted from '../GetStarted/GetStarted';


const Home = () => {
    return (
        <div className='max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
           <div className='space-y-0'>
              <Banner />
              <FeaturedCategories />
              <TopWorkers />
              <HowItWorks />
              <PlatformStatistics />
              <SuccessStories />
              <TrustedBy />
              <PricingPlans />
              <Testimonial />
              <WhyChooseUsSection />
              <GetStarted />
           </div>
        </div>
    );
};

export default Home;