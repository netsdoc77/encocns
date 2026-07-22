import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowLeftLine } from '@remixicon/react';
import initialNewsData from '../data/newsData.json';
import { useEffect, useState } from 'react';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [newsItem, setNewsItem] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('encocns_news');
    const data = stored ? JSON.parse(stored) : initialNewsData;
    const item = data.find((item: any) => item.id === Number(id));
    setNewsItem(item);
    window.scrollTo(0, 0);
  }, [id]);



  if (!newsItem) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">존재하지 않는 게시글입니다.</h2>
        <button onClick={() => navigate('/news')} className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Detail Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pb-10 border-b border-slate-200 dark:border-slate-800"
        >
          {/* Date on top, Title on bottom as requested */}
          <div className="text-slate-500 dark:text-slate-400 font-medium mb-4">{newsItem.date}</div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight break-keep">
            {newsItem.title}
          </h1>
        </motion.div>

        {/* Detail Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="py-12"
        >
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {newsItem.content}
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RiArrowLeftLine size={20} />
            목록
          </button>
        </motion.div>

      </div>
    </div>
  );
}
