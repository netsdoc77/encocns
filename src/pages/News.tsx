import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RiSearchLine, RiArrowRightLine } from '@remixicon/react';

export default function News() {
  const { t } = useTranslation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const newsItems = [
    { id: 1, date: '2026.07.10', title: 'ENCOCNS, A은행 차세대 회계 시스템 구축 성공', category: '보도자료', tags: ['은행', '회계'] },
    { id: 2, date: '2026.06.25', title: '신규 IFRS 엔진 v3.0 출시 및 세미나 개최', category: '공지사항', tags: ['솔루션', '세미나'] },
    { id: 3, date: '2026.05.15', title: '하반기 대규모 신입 및 경력 개발자 공개 채용', category: '채용', tags: ['채용', '개발자'] },
    { id: 4, date: '2026.04.02', title: '클라우드 기반 데이터 통합 플랫폼(iPaaS) 인증 획득', category: '보도자료', tags: ['클라우드', '인증'] },
    { id: 5, date: '2026.03.11', title: 'B증권사 마이데이터 보안 아키텍처 고도화 계약 체결', category: '보도자료', tags: ['증권', '보안'] },
    { id: 6, date: '2026.02.20', title: 'ENCOCNS 2026 비전 선포식 현장스케치', category: '사내소식', tags: ['비전', '문화'] },
  ];

  return (
    <div className="w-full">
      <section className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('header.news')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }} className="text-xl text-slate-400">
            ENCOCNS의 최신 소식과 보도자료를 전해드립니다.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background dark:bg-background-dark min-h-screen">
        <div className="container mx-auto px-6">
          
          {/* Search & Categories */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex gap-2">
              {['전체', '보도자료', '공지사항', '채용', '사내소식'].map((cat, idx) => (
                <button key={idx} className={`px-4 py-2 rounded-full font-bold text-sm ${idx === 0 ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'} transition-colors`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                <RiSearchLine size={20} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, idx) => (
              <motion.div 
                key={news.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all cursor-pointer flex flex-col"
              >
                <div className="h-48 bg-slate-100 dark:bg-slate-700 relative">
                   {/* Placeholder for Thumbnail */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-30">
                     <span className="text-4xl font-black text-slate-300 dark:text-slate-500">ENCOCNS</span>
                   </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full">{news.category}</span>
                    <span className="text-slate-500 text-sm font-medium">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-2">
                      {news.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-slate-400 font-medium">#{tag}</span>
                      ))}
                    </div>
                    <RiArrowRightLine size={20} className="text-slate-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
