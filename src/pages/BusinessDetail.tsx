import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { businessCategories } from '../data/businessData';
import { RiCheckLine, RiArrowRightSLine, RiArrowLeftLine, RiErrorWarningLine } from '@remixicon/react';

export default function BusinessDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = businessCategories.find(c => c.id === categoryId);
  const [activeServiceId, setActiveServiceId] = useState<string>('');

  useEffect(() => {
    if (category && category.services.length > 0) {
      setActiveServiceId(category.services[0].id);
    }
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 pt-24">
        <h2 className="text-2xl font-bold mb-4">카테고리를 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/business')} className="px-6 py-2 bg-primary text-white rounded-full">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const activeService = category.services.find(s => s.id === activeServiceId) || category.services[0];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full font-sans bg-white dark:bg-slate-900 min-h-screen pt-[72px]">
      
      {/* Top Navigation Bar */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4">
        <div className="container mx-auto px-6 flex items-center">
          <button onClick={() => navigate('/business')} className="flex items-center text-slate-500 hover:text-primary transition-colors cursor-pointer">
            <RiArrowLeftLine className="mr-2" />
            <span className="font-bold">Business Overview</span>
          </button>
          <span className="mx-4 text-slate-300">|</span>
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <category.icon size={20} className="text-primary" />
            {category.title}
          </span>
        </div>
      </div>

      {/* Sticky Sub-Service Tabs */}
      <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-[64px] md:top-[72px] z-40 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center gap-4 md:gap-12 overflow-x-auto no-scrollbar">
            {category.services.map(srv => (
              <button 
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`py-4 md:py-5 text-sm md:text-lg font-bold transition-all relative cursor-pointer whitespace-nowrap px-2 ${activeServiceId === srv.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                {srv.name}
                {activeServiceId === srv.id && (
                  <motion.div layoutId="activeServiceIndicator" className="absolute -bottom-[1px] left-0 right-0 h-[3px] md:h-1 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {/* 1. Hero Section (Typo) */}
          <section className="py-24 md:py-32 bg-white dark:bg-slate-900 text-center">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary dark:text-blue-400 font-bold rounded-full mb-6">
                  {activeService.name}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.3] mb-8 break-keep">
                  {activeService.hero.typo}
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed break-keep">
                  {activeService.hero.desc}
                </p>
              </motion.div>
            </div>
          </section>

          {/* 2. Problems to Solve */}
          <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">해결하는 문제</h2>
                <p className="text-lg text-slate-500">이런 어려움을 겪고 계시지 않나요?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeService.problems.map((prob, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center">
                      <RiErrorWarningLine size={24} />
                    </div>
                    <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{prob}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Core Features (Process) */}
          <section className="py-24 md:py-32 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">주요 기능 및 프로세스</h2>
                <p className="text-lg text-slate-500">데이터 수집부터 공시까지의 완벽한 파이프라인</p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="w-full lg:w-48 bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] text-center shadow-lg border border-slate-100 dark:border-slate-700 relative group hover:-translate-y-2 transition-transform duration-300"
                    >
                      <div className="w-10 h-10 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                        {idx + 1}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 break-keep">{feat.desc}</p>
                    </motion.div>
                    
                    {idx < activeService.features.length - 1 && (
                      <div className="hidden lg:flex w-8 justify-center text-slate-300 dark:text-slate-600">
                        <RiArrowRightSLine size={32} />
                      </div>
                    )}
                    {idx < activeService.features.length - 1 && (
                      <div className="lg:hidden h-8 flex justify-center text-slate-300 dark:text-slate-600 my-2">
                        <div className="w-[2px] h-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Expected Effects (Before / After) */}
          <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">기대 효과</h2>
                <p className="text-lg text-slate-400 break-keep">{activeService.effects.description}</p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Before */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                >
                  <div className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-sm">AS-IS (기존)</div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-300 leading-tight break-keep">
                    {activeService.effects.before}
                  </div>
                </motion.div>

                {/* Arrow */}
                <div className="flex items-center justify-center md:rotate-0 rotate-90">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                    <RiArrowRightSLine size={32} />
                  </div>
                </div>

                {/* After */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="flex-1 bg-primary/20 backdrop-blur-md border border-primary/30 p-8 rounded-3xl"
                >
                  <div className="text-blue-300 font-bold mb-4 uppercase tracking-widest text-sm">TO-BE (도입 후)</div>
                  <div className="text-2xl md:text-3xl font-bold text-white leading-tight break-keep">
                    {activeService.effects.after}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 5. Related Projects */}
          <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10">관련 구축 사례</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {activeService.projects.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-full shadow-sm border border-slate-200 dark:border-slate-600 flex items-center gap-2"
                  >
                    <RiCheckLine className="text-green-500" size={20} />
                    {proj}
                  </motion.div>
                ))}
              </div>
              <div className="mt-12">
                <button onClick={() => navigate('/projects')} className="text-primary font-bold hover:underline cursor-pointer">
                  모든 프로젝트 실적 보기 &rarr;
                </button>
              </div>
            </div>
          </section>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
