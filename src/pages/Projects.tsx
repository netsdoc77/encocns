import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiCheckLine, RiCloseLine } from '@remixicon/react';

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filters = ['All', '보험', '은행', '증권', '회계', '리스크'];

  const projects = [
    { id: 1, title: 'A보험사 IFRS 결산 시스템', category: '보험', tag: '회계', before: '수작업 및 엑셀 기반의 월간 결산 (소요시간 15일)', after: '통합 시스템을 통한 일일 결산 자동화 (소요시간 3일)', img: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 2, title: 'B은행 글로벌 리스크 관리', category: '은행', tag: '리스크', before: '부서별 분산된 데이터로 인한 통합 리스크 파악 지연', after: '전사 통합 리스크 대시보드 구축 및 실시간 모니터링', img: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { id: 3, title: 'C증권 대용량 마이데이터 플랫폼', category: '증권', tag: '데이터', before: '기존 RDBMS의 성능 한계로 인한 배치 지연', after: '분산 처리 엔진 도입으로 데이터 처리 속도 10배 향상', img: 'bg-slate-200 dark:bg-slate-800' },
    { id: 4, title: 'D생명 RBC 산출 시스템', category: '보험', tag: '리스크', before: '규제 변경 시 룰 업데이트에 1개월 소요', after: '유연한 룰 엔진 적용으로 규제 변경 즉각 대응', img: 'bg-teal-100 dark:bg-teal-900/30' },
    { id: 5, title: 'E은행 차세대 코어뱅킹 회계', category: '은행', tag: '회계', before: '노후화된 레거시 시스템으로 인한 유지보수 비용 증가', after: '최신 아키텍처 적용으로 유지보수 비용 40% 절감', img: 'bg-cyan-100 dark:bg-cyan-900/30' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter || p.tag === filter);

  return (
    <div className="w-full relative">
      {/* Page Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('header.projects')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-400">
            ENCOCNS가 성공적으로 수행한 주요 프로젝트 사례입니다.
          </motion.p>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-20 bg-background dark:bg-background-dark min-h-screen">
        <div className="container mx-auto px-6">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
                  filter === f 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer group"
                >
                  <div className={`h-48 ${project.img} p-6 flex flex-col justify-end relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="inline-block bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 z-10">{project.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex items-center text-primary font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                      상세 보기 <RiArrowRightLine size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-3xl w-full relative z-10 shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <RiCloseLine size={32} />
              </button>
              
              <div className="mb-8 pr-12">
                <span className="text-primary font-bold text-sm mb-2 block">{selectedProject.category} / {selectedProject.tag}</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{selectedProject.title}</h2>
              </div>

              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">프로젝트 성과 (Before & After)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                  <div className="text-slate-500 font-bold mb-2">BEFORE</div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{selectedProject.before}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-primary/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <div className="text-primary font-bold mb-2 flex items-center gap-2">
                    <RiCheckLine size={20} /> AFTER
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{selectedProject.after}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
