import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowLeftLine, RiCloseLine, RiCheckLine } from '@remixicon/react';
import initialCareersData from '../data/careersData.json';
import { useEffect, useState } from 'react';
import { getBadgeColor, isJobClosed } from '../utils/badgeColors';

export default function CareersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('encocns_careers');
    const data = stored ? JSON.parse(stored) : initialCareersData;
    const item = data.find((item: any) => item.id === Number(id));
    setJob(item);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);



  if (!job) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">존재하지 않는 채용 공고입니다.</h2>
        <button onClick={() => navigate('/careers')} className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      alert('지원이 완료되었습니다. 결과는 개별 안내드리겠습니다.');
    }, 1500);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 min-h-screen pt-32 pb-20 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Detail Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pb-10 border-b border-slate-200 dark:border-slate-800"
        >
          {/* Badge and Date on top */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`shrink-0 px-3 py-1 rounded-md text-sm font-bold border ${getBadgeColor(job.badge, isJobClosed(job.date))}`}>
              {job.badge}
            </span>
            <div className={`font-medium ${isJobClosed(job.date) ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-500 dark:text-slate-400'}`}>{job.date}</div>
          </div>
          
          {/* Title on bottom */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className={`text-3xl md:text-5xl font-black leading-tight break-keep ${isJobClosed(job.date) ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
              {job.title}
            </h1>
          </div>
        </motion.div>

        {/* Detail Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="py-12"
        >
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {job.content}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 flex justify-center gap-4"
        >
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RiArrowLeftLine size={20} />
            목록
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-colors cursor-pointer shadow-lg hover:shadow-xl"
          >
            <RiCheckLine size={20} />
            지원하기
          </button>
        </motion.div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">입사 지원하기</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm text-primary font-bold mb-1">{job.badge}</p>
                  <p className="text-slate-900 dark:text-white font-medium line-clamp-1">{job.title}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">지원자명 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      placeholder="이름을 입력해주세요"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">이메일 <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      required 
                      placeholder="example@email.com"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">연락처 <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="010-0000-0000"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">자기소개 <span className="text-red-500">*</span></label>
                    <textarea 
                      required 
                      rows={4}
                      placeholder="간단한 자기소개를 입력해주세요 (지원 동기, 핵심 역량 등)"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">입사지원서 업로드 <span className="text-red-500">*</span></label>
                    <input 
                      type="file" 
                      required 
                      accept=".pdf,.doc,.docx"
                      className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    <p className="text-xs text-slate-500 mt-2">PDF, DOC, DOCX 형식만 가능 (최대 10MB)</p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full font-bold transition-all cursor-pointer"
                    >
                      취소
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/25"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        '최종 지원하기'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
