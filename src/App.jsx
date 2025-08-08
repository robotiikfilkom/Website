import React from 'react';
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from './navbar.jsx';
import Head from './head.jsx';
import Footer from './footer';
import Mid from './mid.jsx';
import { Routes, Route } from 'react-router-dom';
import Achievement from './achievement.jsx';
import partners from './partners.jsx';
import PartnerPage from './partners.jsx';

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
      <Route path="/partners" element={<PartnerPage />} />
    </Routes>
      <Footer />
      <div className="absolute w-40 h-40 bg-blue-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-32 h-32 bg-blue-400 opacity-20 blur-2xl rounded-full top-1/3 right-10"></div>
      <div className="absolute w-24 h-24 bg-blue-300 opacity-10 blur-2xl rounded-full bottom-1/4 left-1/4"></div>
      <div className="absolute w-28 h-28 bg-blue-400 opacity-10 blur-2xl rounded-full bottom-10 right-1/3"></div>
      
    </div>
  );
}

export default App;