import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import initialNewsData from '../data/newsData.json';

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState(initialNewsData);

  useEffect(() => {
    const stored = localStorage.getItem('encocns_news');
    if (stored) {
      setNewsData(JSON.parse(stored));
    } else {
      localStorage.setItem('encocns_news', JSON.stringify(initialNewsData));
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
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (listRef.current) {
      const y = listRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative bg-white dark:bg-slate-900 min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            공지 및 소식
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} 
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
          >
            엔코씨앤에스의 새로운 소식과 주요 공지사항을 알려드립니다.
          </motion.p>
        </div>
      </section>

      {/* News List */}
      <section className="py-16" ref={listRef}>
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* News Items */}
          <div className="flex flex-col border-t-2 border-slate-900 dark:border-slate-100">
            {currentItems.map((news) => (
              <Link 
                to={`/news/${news.id}`} 
                key={news.id}
                className="flex flex-col py-6 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 group px-2"
              >
                <div className="mb-2">
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {news.date}
                  </span>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg md:text-xl group-hover:text-primary transition-colors break-keep">
                    {news.title}
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
