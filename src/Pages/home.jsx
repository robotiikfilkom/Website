import React from 'react';
import HeroSection from '../components/Homepage/HeroSection';
import AboutUs from '../components/Homepage/AboutUs';
import ImageMarquee from '../components/Homepage/ImageMarquee';
import TechnicalDivision from '../components/Homepage/TechnicalDivision';
import Achievementshome from '../components/Homepage/Achievementshome';
import Brandhome from '../components/Homepage/Brandhome';
import Newshome from '../components/Homepage/Newshome';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <AboutUs />
            <ImageMarquee />
            <TechnicalDivision />
            <Achievementshome />
            <Brandhome />
            <Newshome />
        </div>
    );
}

export default Home;
