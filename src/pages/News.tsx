import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';
import initialNewsData from '../data/newsData.json';
import { supabase } from '../lib/supabase';

const getNewsDateScore = (item: any) => {
  const dateStr = item.date || item.created_at || '';
  if (!dateStr) return 0;
  const clean = dateStr.replace(/[^0-9]/g, '');
  if (clean.length >= 8) {
    return parseInt(clean.slice(0, 8));
  }
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
};

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<any[]>(() => 
    [...initialNewsData].sort((a, b) => getNewsDateScore(b) - getNewsDateScore(a))
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchNews() {
      let remoteData: any[] = [];
      try {
        const { data, error } = await supabase.from('news').select('*');
        if (!error && data) {
          remoteData = data;
        }
      } catch (err) {
        console.error('Supabase error:', err);
      }

      const stored = localStorage.getItem('encocns_news');
      const localData: any[] = stored ? JSON.parse(stored) : [];

      const map = new Map();
      initialNewsData.forEach((item: any) => map.set(item.id, item));
      localData.forEach((item: any) => map.set(item.id, item));
      remoteData.forEach((item: any) => {
        if (map.has(item.id)) {
          const existing = map.get(item.id);
          const bestImageUrl = (item.image_url && item.image_url.trim() !== '') ? item.image_url : (existing?.image_url || '');
          map.set(item.id, { ...existing, ...item, image_url: bestImageUrl });
        } else {
          map.set(item.id, item);
        }
      });

      const merged = Array.from(map.values()).sort((a: any, b: any) => {
        const scoreA = getNewsDateScore(a);
        const scoreB = getNewsDateScore(b);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (b.id || 0) - (a.id || 0);
      });
      setNewsData(merged);
      localStorage.setItem('encocns_news', JSON.stringify(merged));

      // Self-healing: if localData has items not in Supabase DB, push to Supabase
      if (remoteData.length > 0) {
        const remoteIds = new Set(remoteData.map(r => r.id));
        const unsyncedLocals = localData.filter((l: any) => l.id && !remoteIds.has(l.id));
        if (unsyncedLocals.length > 0) {
          try {
            const preparedPayloads = unsyncedLocals.map((item: any) => {
              const payload: any = {
                date: item.date,
                title: item.title,
                content: item.content,
                image_url: item.image_url || ''
              };
              if (item.id && item.id < 1000000000000) {
                payload.id = item.id;
              }
              return payload;
            });
            const withId = preparedPayloads.filter((p: any) => p.id);
            const withoutId = preparedPayloads.filter((p: any) => !p.id);

            if (withId.length > 0) await supabase.from('news').upsert(withId);
            if (withoutId.length > 0) await supabase.from('news').insert(withoutId);
          } catch (err) {
            console.error('Self-healing sync failed:', err);
          }
        }
      }
    }
    fetchNews();
  }, []);
  const itemsPerPage = 10;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Filtered Items
  const filteredNews = newsData.filter(news => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const titleMatch = news.title ? news.title.toLowerCase().includes(term) : false;
    const contentMatch = news.content ? news.content.toLowerCase().includes(term) : false;
    return titleMatch || contentMatch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

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
          
          {/* Search & Header Info Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              총 <span className="font-bold text-primary">{filteredNews.length}</span>건의 소식이 있습니다.
            </div>
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="제목 또는 내용 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-3 bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all"
              />
              <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              {searchTerm && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                  title="검색어 초기화"
                >
                  <RiCloseLine size={18} />
                </button>
              )}
            </div>
          </div>

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

            {filteredNews.length === 0 && (
              <div className="py-24 text-center border-b border-slate-200 dark:border-slate-800">
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">
                  "{searchTerm}"에 대한 검색 결과가 없습니다.
                </p>
                <button
                  onClick={handleSearchClear}
                  className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-full text-sm transition-colors cursor-pointer"
                >
                  전체 목록 보기
                </button>
              </div>
            )}
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
