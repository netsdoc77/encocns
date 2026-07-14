import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RiMapPinLine, RiMailSendLine } from '@remixicon/react';

export default function Contact() {
  const { t } = useTranslation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-surface dark:bg-surface-dark min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('header.contact')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }} className="text-xl text-slate-400">
            솔루션 도입, 파트너십 등 무엇이든 문의해 주세요.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Contact Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 h-full">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <RiMapPinLine size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">오시는 길</h3>
                    <p className="text-slate-900 dark:text-white font-medium leading-relaxed">서울특별시 성동구 성수일로8길 5<br />(서울숲 SK V1타워) A동 407호</p>
                  </div>
                </div>

                {/* <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <RiPhoneLine size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">전화번호</h3>
                    <p className="text-slate-900 dark:text-white font-medium">02-1234-5678</p>
                  </div>
                </div> */}

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <RiMailSendLine size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">이메일</h3>
                    <p className="text-slate-900 dark:text-white font-medium">hyungseok.choi@encocns.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">온라인 문의</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">이름 / 담당자명 <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">회사명</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all" placeholder="(주)엔코씨엔에스" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">연락처 <span className="text-red-500">*</span></label>
                    <input type="tel" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all" placeholder="010-0000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">이메일 <span className="text-red-500">*</span></label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all" placeholder="email@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">문의 내용 <span className="text-red-500">*</span></label>
                  <textarea rows={6} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all resize-none" placeholder="여기에 문의 내용을 상세히 적어주세요."></textarea>
                </div>

                <div className="pt-4">
                  <button type="button" className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold text-lg px-12 py-4 rounded-full transition-colors shadow-lg shadow-primary/30">
                    문의 접수하기
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
