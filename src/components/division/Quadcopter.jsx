import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";
import { motion } from "framer-motion";

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
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengambil data Spreadsheet.");
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.toLowerCase().trim(),
          complete: (results) => {
            const parsedData = results.data.map((row) => ({
              ...row,
              id: parseInt(row.id, 10),
            }));
            setData(parsedData.reverse());
          },
          error: (err) => setError(`Gagal memproses CSV: ${err.message}`),
        });
      })
      .catch((err) => {
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

const MemberCard = ({ member }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg h-96 flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105">
    <img
      src={member.image}
      alt={member.name}
      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
    <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
      <div className="relative p-4 rounded-xl transition-all duration-300">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md z-10 rounded-xl border border-white/20"></div>
        <div className="relative z-20 flex flex-col items-start">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            {member.position && (
              <p className="text-xs font-semibold text-[var(--white)] border border-[var(--white)] font-sans rounded-lg px-2 py-0.5">
                {member.position}
              </p>
            )}
            {member.major && (
              <p className="text-xs font-semibold text-[var(--black)] bg-[var(--white)] font-sans rounded-lg px-2 py-0.5">
                {member.major}
              </p>
            )}
          </div>
          <h3 className="text-[var(--white)] text-2xl font-bold drop-shadow-lg font-display">
            {member.name}
          </h3>
        </div>
      </div>
    </div>
  </div>
);

const ActivityCard = ({ item, widthClass }) => {
  return (
    <Link
      to={item.link || "#"}
      className={`relative rounded-2xl overflow-hidden shadow-lg h-64 flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${widthClass}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
      <div className="relative z-30 p-6 w-full flex justify-between items-end">
        <h3 className="text-[var(--white)] text-2xl font-bold font-display drop-shadow-lg">
          {item.title}
        </h3>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 transform group-hover:rotate-45 group-hover:bg-[var(--white)]">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]"
          />
        </div>
      </div>
    </Link>
  );
};

export default function Quadcopter() {
  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjOBJTdcNoh1jI25nxRWzcgG-mDTbbFQ662h-4KdHdBwHv7lMTlQ5q0muOf0c-et-cBMdiHx20mmeL/pub?gid=962530985&single=true&output=csv";

  const { data: allData, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  const leaders = allData.filter(
    (item) => item.category?.toLowerCase().trim() === "leader"
  );
  const coreTeam = allData.filter(
    (item) => item.category?.toLowerCase().trim() === "core_team"
  );
  const teamMembers = allData.filter(
    (item) => item.category?.toLowerCase().trim() === "team"
  );
  const activities = allData.filter(
    (item) => item.category?.toLowerCase().trim() === "activity"
  );
  const divisionInfo = allData.find(
    (item) => item.category?.toLowerCase().trim() === "division_info"
  );
  const responsibilitiesText = divisionInfo
    ? divisionInfo.description
    : "Deskripsi tanggung jawab belum tersedia.";

  const topCoreTeam = coreTeam.slice(0, 2);
  const bottomCoreTeam = coreTeam.slice(2, 5);

  const getActivityWidthClass = (activityId) => {
    const id = parseInt(activityId, 10);
    if (id === 1 || id === 4) return "md:w-3/5";
    if (id === 2 || id === 3) return "md:w-2/5";
    return "md:w-1/2";
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[var(--main-blue)] text-white flex items-center justify-center">
        <p>Loading Division Data...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[var(--main-blue)] text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-6xl mx-auto">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--white)]">
            Quadcopter
          </h1>
        </motion.header>

        {leaders.length > 0 && (
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Managerial
            </h2>
            <motion.div
              className="flex flex-wrap justify-center lg:grid-cols-3 gap-8"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {leaders.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm"
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {coreTeam.length > 0 && (
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Core Team
            </h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {coreTeam.slice(0, 4).map((member) => (
                <motion.div key={member.id} variants={cardVariants}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {teamMembers.length > 0 && (
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              The Team
            </h2>
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm"
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        <motion.section
          className="mb-20 bg-black/20 p-8 rounded-2xl text-center"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Our Responsibilities
          </h2>
          <p className="max-w-3xl mx-auto text-white/80 leading-relaxed">
            {responsibilitiesText}
          </p>
        </motion.section>

        {activities.length > 0 && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Division Activities
            </h2>
            <div className="flex flex-col gap-6">
              <motion.div
                className="flex flex-col sm:flex-row w-full gap-6"
                variants={cardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {activities.find((a) => a.id === 1) && (
                  <motion.div
                    variants={cardVariants}
                    className="w-full sm:w-3/5"
                  >
                    <ActivityCard
                      item={activities.find((a) => a.id === 1)}
                      widthClass="w-full"
                    />
                  </motion.div>
                )}
                {activities.find((a) => a.id === 2) && (
                  <motion.div
                    variants={cardVariants}
                    className="w-full sm:w-2/5"
                  >
                    <ActivityCard
                      item={activities.find((a) => a.id === 2)}
                      widthClass="w-full"
                    />
                  </motion.div>
                )}
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row w-full gap-6"
                variants={cardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {activities.find((a) => a.id === 3) && (
                  <motion.div
                    variants={cardVariants}
                    className="w-full sm:w-2/5"
                  >
                    <ActivityCard
                      item={activities.find((a) => a.id === 3)}
                      widthClass="w-full"
                    />
                  </motion.div>
                )}
                {activities.find((a) => a.id === 4) && (
                  <motion.div
                    variants={cardVariants}
                    className="w-full sm:w-3/5"
                  >
                    <ActivityCard
                      item={activities.find((a) => a.id === 4)}
                      widthClass="w-full"
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
