import React, { useState, useEffect, useCallback, useRef } from "react";
import Papa from "papaparse";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";

function useGoogleSheetData(spreadsheetUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
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
            setData(parsedData);
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

function RandomNumber({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.span>{number.to((val) => val.toFixed(0))}</animated.span>;
}

function PartnersStats() {
  const stats = [
    { value: 95, label: "Achievement", suffix: "%" },
    { value: 72, label: "Engagement", suffix: "+" },
    { value: 250, label: "Member", suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl ${
            index === 2 ? "col-span-2 sm:col-span-1" : ""
          }`}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <RandomNumber n={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-sm mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function PartnerCard({ title, image, description, className, delay = 0 }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer 
        transform transition-all duration-700 ease-out 
        ${className}
        ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        hover:scale-105
      `}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      <div className="relative z-20 p-4 w-full">
        <div className="transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-[var(--white)] text-xl md:text-2xl font-bold drop-shadow-lg font-display">
            {title}
          </h3>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl border border-white/20 p-4">
            <div className="flex flex-col z-20">
              <h3 className="text-[var(--white)] text-xl md:text-2xl font-bold drop-shadow-lg font-display">
                {title}
              </h3>
              <p className="text-[var(--white)]/90 text-sm font-sans leading-relaxed mt-1 line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjOBJTdcNoh1jI25nxRWzcgG-mDTbbFQ662h-4KdHdBwHv7lMTlQ5q0muOf0c-et-cBMdiHx20mmeL/pub?gid=1474762779&single=true&output=csv";
  const {
    data: partnersData,
    loading,
    error,
  } = useGoogleSheetData(SPREADSHEET_URL);

  const getPartnerLayoutClass = (id) => {
    switch (id) {
      case 1:
        return "md:row-start-1 md:col-start-1 md:col-span-3";
      case 2:
        return "md:row-start-1 md:col-start-4 md:col-span-2";
      case 3:
        return "md:row-start-1 md:col-start-6 md:col-span-3";
      case 4:
        return "md:row-start-2 md:col-start-1 md:col-span-3";
      case 5:
        return "md:row-start-2 md:col-start-4 md:col-span-2";
      case 6:
        return "md:row-start-2 md:col-start-6 md:col-span-3";
      default:
        return "md:col-span-2";
    }
  };

  const filteredPartners = partnersData.filter(
    (item) => item.id >= 1 && item.id <= 6
  );

  const form = useRef();
  const [formState, setFormState] = useState({ status: "idle", message: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState({ status: "submitting", message: "" });

    const SERVICE_ID = "service_d5kvch9";
    const TEMPLATE_ID = "template_mtyjrlp";
    const PUBLIC_KEY = "v8tCgfbjACBumAo1N";

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        setFormState({
          status: "success",
          message: `Halo, ${name} formulir kamu berhasil terkirim. Kami akan menghubungi ${email} setelah peninjauan.`,
        });
        form.current.reset();
        setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
      },
      (error) => {
        setFormState({
          status: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--main-blue)] text-[var(--white)] font-sans relative overflow-hidden">
      <div className="absolute w-40 h-40 bg-[var(--blue)] opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-32 h-32 bg-[var(--blue)] opacity-20 blur-2xl rounded-full top-1/3 right-10"></div>
      <div className="absolute w-24 h-24 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-1/4 left-1/4"></div>
      <div className="absolute w-28 h-28 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-10 right-1/3"></div>

      <header className="px-4 sm:px-6 md:px-8 lg:px-16 pt-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--white)] font-display">
          Our Partners
        </h1>
      </header>

      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">
            Why
            <br />
            choose
            <br />
            ROBOTIIK!
          </h2>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <p className="text-[var(--white)]/80 text-base md:text-lg">
            ROBOTIIK provides real benefits to sponsors by reaching students and
            the community through educational activities, competitions, and
            social media. Your support will help develop robotics technology
            while also being an effective and positive promotional tool.
          </p>
          <PartnersStats />
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16">
        {loading && <p className="text-center">Loading partners...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-6 max-w-7xl mx-auto">
            {filteredPartners.map((item, index) => (
              <PartnerCard
                key={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                className={getPartnerLayoutClass(item.id)}
                delay={index * 100}
              />
            ))}
          </div>
        )}
      </section>

      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">
            BECOME
            <br />A PARTNER
          </h2>
        </div>

        <div className="lg:w-2/3 w-full">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label
                  htmlFor="from_name"
                  className="block text-sm font-semibold mb-2"
                >
                  Nama
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-md bg-white/10"
                  placeholder="Nama Anda"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="from_email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-white/10"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold mb-2"
              >
                Subjek
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full px-4 py-3 rounded-md bg-white/10"
                placeholder="Tujuan Partnership"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Deskripsi
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full px-4 py-3 rounded-md bg-white/10"
                rows="4"
                placeholder="Jelaskan tujuan Anda di sini..."
              ></textarea>
            </div>
            <div className="flex justify-end items-center pt-4 gap-4">
              {formState.message && (
                <p
                  className={`text-sm ${
                    formState.status === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formState.message}
                </p>
              )}
              <button
                type="submit"
                disabled={formState.status === "submitting"}
                className="bg-[var(--white)] text-[var(--main-blue)] font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition text-lg flex items-center gap-2 disabled:bg-gray-300"
              >
                {formState.status === "submitting" ? "Sending..." : "Submit"}
                <FontAwesomeIcon icon={faArrowRight} className="text-base" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
