import React from 'react';
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from './navbar';
import Head from './head';
import Mid from './mid';
import Achievement from './Pages/achievement';
import Partners from './Pages/partners';
import About from './Pages/about';
import Footer from './footer';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1e3d] to-[#112a4c] text-white font-sans relative overflow-hidden">
      <Navbar />
      <Routes>
      <Route path="/" element={
        <>
          <Head />
          <Mid />
        </>
      } />
      <Route path="/achievement" element={<Achievement />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/about" element={<About />} />
    </Routes>
      <Footer />
      
      
    </div>
  );
}

export default App;