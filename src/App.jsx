import React from 'react';
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Routes, Route } from 'react-router-dom';

import Navbar from './navbar';
import Footer from './footer';
import ScrollToTop from './ScrollToTop';

import Home from './Pages/home';
import Achievement from './Pages/achievement';
import Partners from './Pages/partners';
import About from './Pages/about';

import Executive from '../src/components/division/Executive';
import HRD from '../src/components/division/HRD';
import GeneralAffair from '../src/components/division/GeneralAffair';
import MIT from '../src/components/division/MIT';
import RND from '../src/components/division/RND';
import Humanoid from '../src/components/division/Humanoid';
import Amarine from '../src/components/division/Amarine';
import Quadcopter from '../src/components/division/Quadcopter';


const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--main-blue)] to-[#0B1E3D] text-[var(--white)] font-sans relative">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />

          <Route path="/division/executive" element={<Executive />} />
          <Route path="/division/hrd" element={<HRD />} />
          <Route path="/division/general-affair" element={<GeneralAffair />} />
          <Route path="/division/mit" element={<MIT />} />
          <Route path="/division/rnd" element={<RND />} />
          <Route path="/division/humanoid" element={<Humanoid />} />
          <Route path="/division/amarine" element={<Amarine />} />
          <Route path="/division/quadcopter" element={<Quadcopter />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;