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
    <div className="w-full overflow-x-hidden">
      <div className="">
        <Banner />
      </div>

      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedCategories />
        <TopWorkers />

        <div className="my-16">
          <HowItWorks />
        </div>

        <div className="my-16">
          <PlatformStatistics />
        </div>

        <div className="my-16">
          <SuccessStories />
        </div>

        <TrustedBy />

        <div className="mb-16">
          <PricingPlans />
        </div>

        <div className="mb-16">
          <Testimonial />
        </div>

        <div className="mb-16">
          <WhyChooseUsSection />
        </div>

        <div className="mb-20">
          <GetStarted />
        </div>
      </div>
    </div>
  );
};


export default Home;