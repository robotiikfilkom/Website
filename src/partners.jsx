import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Data partner statis
const partnersData = [
  { title: 'PT', image: '', description: 'Leading technology partner specializing in innovative solutions', className: 'md:row-start-1 md:col-start-1 md:col-span-2' },
  { title: 'Robo', image: '', description: 'Robotics engineering company focused on automation and AI', className: 'md:row-start-1 md:col-start-3 md:col-span-3' },
  { title: 'Innov', image: '', description: 'Innovation hub driving technological advancement and research', className: 'md:row-start-1 md:col-start-6 md:col-span-3' },
  { title: 'Tech', image: '', description: 'Technology solutions provider for modern digital transformation', className: 'md:row-start-2 md:col-start-1 md:col-span-3' },
  { title: 'Future', image: '', description: 'Future-focused company building tomorrow\'s technology today', className: 'md:row-start-2 md:col-start-4 md:col-span-2' },
  { title: 'Pioneer', image: '', description: 'Pioneering next-generation solutions for sustainable growth', className: 'md:row-start-2 md:col-start-6 md:col-span-3' },
];

function RandomNumber({ n }) {
  const { number } = useSpring({ from: { number: 0 }, to: n, delay: 200, config: { mass: 1, tension: 20, friction: 10 } });
  return <animated.span>{number.to((val) => val.toFixed(0))}</animated.span>;
}

export default function PartnersPage() {
  const [formData, setFormData] = useState({ name: '', subject: '', email: '', phone: '', message: '' });
  const [formState, setFormState] = useState({ status: 'idle', message: '' }); // idle, submitting, success, error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    try {
      const response = await fetch('/api/submitPartnerForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorResult = JSON.parse(responseText);
          throw new Error(errorResult.error || 'Terjadi error di server.');
        } catch (jsonError) {
          throw new Error(`Server error (${response.status}). Silakan coba lagi nanti.`);
        }
      }

      if (!responseText) {
        throw new Error('Server tidak memberikan respons. Kemungkinan terjadi timeout. Silakan periksa Google Sheet Anda untuk memastikan data masuk.');
      }
      
      const result = JSON.parse(responseText);
      
      setFormState({ status: 'success', message: result.message });
      setFormData({ name: '', subject: '', email: '', phone: '', message: '' }); // Reset form

    } catch (error) {
      console.error("Submit Error:", error);
      setFormState({ status: 'error', message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--main-blue)] text-[var(--white)] font-sans relative overflow-hidden">
      
      <div className="absolute w-40 h-40 bg-[var(--blue)] opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-32 h-32 bg-[var(--blue)] opacity-20 blur-2xl rounded-full top-1/3 right-10"></div>
      <div className="absolute w-24 h-24 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-1/4 left-1/4"></div>
      <div className="absolute w-28 h-28 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-10 right-1/3"></div>
      
      <header className="px-4 sm:px-6 md:px-8 lg:px-16 pt-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--white)] font-display">Our Partners</h1>
      </header>
      
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">Why<br />choose<br />ROBOTIIK!</h2>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <p className="text-[var(--white)]/80 text-base md:text-lg">ROBOTIIK provides real benefits to sponsors by reaching students and the community through educational activities, competitions, and social media. Your support will help develop robotics technology while also being an effective and positive promotional tool.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl"><div className="text-3xl sm:text-4xl md:text-5xl font-bold"><RandomNumber n={95} />%</div><div className="text-sm mt-1">Achievement</div></div>
            <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl"><div className="text-3xl sm:text-4xl md:text-5xl font-bold"><RandomNumber n={72} />+</div><div className="text-sm mt-1">Engagement</div></div>
            <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl col-span-2 sm:col-span-1"><div className="text-3xl sm:text-4xl md:text-5xl font-bold"><RandomNumber n={250} />+</div><div className="text-sm mt-1">Member</div></div>
          </div>
        </div>
      </section>
      
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {partnersData.map((item, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden shadow-lg bg-white/10 min-h-[220px] flex items-end group cursor-pointer sm:col-span-1 ${item.className}`}>
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-contain p-8 z-10 brightness-95 opacity-50" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 px-4 py-4 transform translate-y-full group-hover:translate-y-0 rounded-b-2xl">
                <h3 className="text-white text-2xl font-semibold drop-shadow font-display">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mt-1">{item.description}</p>
              </div>
              <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300"><span className="text-white text-2xl font-semibold drop-shadow font-display">{item.title}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-1/3 text-center lg:text-left"><h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">BECOME<br />A PARTNER</h2></div>
        
        <form onSubmit={handleSubmit} className="lg:w-2/3 w-full space-y-6">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
              <input id="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Your name" />
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</label>
              <input id="subject" type="text" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Subject" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="your.email@company.com" />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="0812 3456 7890" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
            <textarea id="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 resize-none" rows="4" placeholder="Tell us about your partnership interest..."></textarea>
          </div>
          
          <div className="flex justify-end items-center pt-4 gap-4">
             {formState.message && (
                <p className={`${formState.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {formState.message}
                </p>
             )}
             <button type="submit" disabled={formState.status === 'submitting'} className="bg-[var(--white)] text-[var(--main-blue)] font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition text-lg flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed">
               {formState.status === 'submitting' ? 'Sending...' : 'Submit'} 
               <FontAwesomeIcon icon={faArrowRight} className="text-base" />
             </button>
          </div>
        </form>
      </section>
    </div>
  );
}