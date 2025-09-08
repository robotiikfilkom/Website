import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

// ====================================================================
// FUNGSI PENGAMBIL DATA (CUSTOM HOOK) - Tidak berubah
// ====================================================================
function useGoogleSheetData(spreadsheetUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    if (!spreadsheetUrl) {
      setError("Spreadsheet URL is not provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(spreadsheetUrl, { cache: "no-cache" })
      .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data Spreadsheet.");
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().trim(),
          complete: (results) => {
            // Menambahkan parseInt pada ID saat parsing
            const parsedData = results.data.map(row => ({
                ...row,
                id: parseInt(row.id, 10)
            }));
            setData(parsedData);
          },
          error: (err) => setError(`Gagal memproses CSV: ${err.message}`),
        });
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [spreadsheetUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}

// ====================================================================
// KOMPONEN-KOMPONEN KARTU - ActivityCard diubah sedikit
// ====================================================================
const MemberCard = ({ member }) => (
  <div className="bg-white/5 rounded-2xl p-6 text-center group">
    <div className="w-32 h-32 rounded-full mx-auto overflow-hidden mb-4 border-2 border-white/10">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    </div>
    <h3 className="text-xl font-bold font-display text-[var(--white)]">{member.name}</h3>
    <p className="text-sm text-[var(--orange)] font-semibold">{member.position}</p>
    <p className="text-xs text-white/60 mt-1">{member.major}</p>
  </div>
);

// Menerima prop 'widthClass' bukan dari 'item'
const ActivityCard = ({ item, widthClass }) => {
  return (
    <Link 
      to={item.link || '#'}
      className={`relative rounded-2xl overflow-hidden shadow-lg h-64 flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${widthClass}`}
    >
      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
      <div className="relative z-30 p-6 w-full flex justify-between items-end">
        <h3 className="text-[var(--white)] text-2xl font-bold font-display drop-shadow-lg">{item.title}</h3>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 transform group-hover:rotate-45 group-hover:bg-[var(--white)]">
          <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]" />
        </div>
      </div>
    </Link>
  );
};

// ====================================================================
// KOMPONEN UTAMA HALAMAN EXECUTIVE
// ====================================================================
export default function Executive() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?gid=1379500681&single=true&output=csv';
  
  const { data: allData, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  const leaders = allData.filter(item => item.category === 'leader');
  const staff = allData.filter(item => item.category === 'staff');
  const activities = allData.filter(item => item.category === 'activity');
  
  const getActivityWidthClass = (activityId) => {
    const id = parseInt(activityId, 10);
    if (id === 1 || id === 4) {
      return 'md:w-3/5';
    }
    if (id === 2 || id === 3) {
      return 'md:w-2/5';
    }
    return 'md:w-1/2'; 
  };
  
  if (loading) return <div className="min-h-screen bg-[var(--main-blue)] text-white flex items-center justify-center"><p>Loading Division Data...</p></div>;
  if (error) return <div className="min-h-screen bg-[var(--main-blue)] text-white flex items-center justify-center"><p className="text-red-400">{error}</p></div>;

  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-6xl mx-auto">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
            Executive Board
          </h1>
        </header>

        <section className="mb-20">
          <div className="flex justify-center flex-wrap gap-8">
            {leaders.map(member => <MemberCard key={member.id} member={member} />)}
          </div>
        </section>

        {staff.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">Our Staff</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map(member => <MemberCard key={member.id} member={member} />)}
            </div>
          </section>
        )}

        <section className="mb-20 bg-black/20 p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Our Responsibilities</h2>
            <p className="max-w-3xl mx-auto text-white/80 leading-relaxed">
              The Executive Board is the core of ROBOTIIK, responsible for setting the vision, making strategic decisions, and ensuring all divisions work in synergy towards a common goal. Our main tasks include defining the organization's long-term vision, coordinating all activities, managing external relations, and ensuring organizational health.
            </p>
        </section>
        
        {activities.length > 0 && (
          <section>
            <h2 className="text-3xl font-display font-bold mb-8 text-center">Division Activities</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row w-full gap-6">
                {activities.find(a => a.id === 1) && 
                  <ActivityCard item={activities.find(a => a.id === 1)} widthClass={getActivityWidthClass(1)} />}
                {activities.find(a => a.id === 2) && 
                  <ActivityCard item={activities.find(a => a.id === 2)} widthClass={getActivityWidthClass(2)} />}
              </div>
              <div className="flex flex-col sm:flex-row w-full gap-6">
                {activities.find(a => a.id === 3) && 
                  <ActivityCard item={activities.find(a => a.id === 3)} widthClass={getActivityWidthClass(3)} />}
                {activities.find(a => a.id === 4) && 
                  <ActivityCard item={activities.find(a => a.id === 4)} widthClass={getActivityWidthClass(4)} />}
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}