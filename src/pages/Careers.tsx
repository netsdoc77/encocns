import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import initialCareersData from '../data/careersData.json';
import { getBadgeColor, isJobClosed } from '../utils/badgeColors';

export default function Careers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [careersData, setCareersData] = useState(initialCareersData);

  useEffect(() => {
    const stored = localStorage.getItem('encocns_careers');
    if (stored) {
      setCareersData(JSON.parse(stored));
    } else {
      localStorage.setItem('encocns_careers', JSON.stringify(initialCareersData));
    }
  }, []);
  const itemsPerPage = 10;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = careersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(careersData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (listRef.current) {
      const y = listRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full font-sans bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section (Like About, Business, Solution) */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/careers-hero.jpg`} 
            alt="Careers Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            함께 혁신을 만들어갈<br className="md:hidden" /> 인재를 모십니다
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="text-xl md:text-3xl text-slate-200 font-light max-w-4xl mx-auto leading-relaxed">
            엔코씨앤에스와 함께 금융 IT의 새로운 미래를<br className="hidden md:block"/> 
            이끌어갈 열정적인 전문가를 기다립니다.
          </motion.p>
        </div>
      </section>

      {/* Careers List (Same design as News) */}
      <section className="py-24" ref={listRef}>
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">채용 공고</h2>
            <p className="text-slate-500 mt-4">현재 진행 중인 채용 포지션을 확인해 보세요.</p>
          </div>

          {/* List Items */}
          <div className="flex flex-col border-t-2 border-slate-900 dark:border-slate-100">
            {currentItems.map((job) => (
              <Link 
                to={`/careers/${job.id}`} 
                key={job.id}
                className="flex flex-col py-6 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 group px-2"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`shrink-0 px-3 py-1 rounded-md text-xs font-bold border ${getBadgeColor(job.badge, isJobClosed(job.date))}`}>
                    {job.badge}
                  </span>
                  <span className={`text-sm font-medium ${isJobClosed(job.date) ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-500 dark:text-slate-400'}`}>
                    {job.date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className={`font-bold text-lg md:text-xl transition-colors break-keep ${isJobClosed(job.date) ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                    {job.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-colors cursor-pointer ${
                    currentPage === page 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
