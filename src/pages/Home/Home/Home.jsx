import React from 'react';
import Banner from '../Banner/Banner';
import Testimonial from '../Testimonial/Testimonial';
import WhyChooseUsSection from '../WhyChooseUsSection/WhyChooseUsSection';
import EarningTips from '../EarningTips/EarningTips';
import PlatformStatistics from '../PlatformStatistics/PlatformStatistics';
import TopWorkers from '../TopWorkers/TopWorkers';


const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
           <Banner></Banner>
           <TopWorkers></TopWorkers>
           <Testimonial></Testimonial>
           <EarningTips></EarningTips>
           
           <PlatformStatistics></PlatformStatistics>
           <WhyChooseUsSection></WhyChooseUsSection>
            
        </div>
    );
};

export default Home;