import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { RiShieldCrossLine, RiBankCardLine, RiStockLine } from '@remixicon/react';

export default function Business() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full font-sans bg-surface dark:bg-surface-dark">
      {/* Hero Section (Kakao i LaaS Style: Large, High-Contrast) */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/photo-1518186285589-2f7649de83e0.jpg" 
            alt="Business Hero" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Our Business
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="text-xl md:text-3xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            금융 산업별 맞춤형 IT 솔루션을 통해<br className="hidden md:block" /> 
            새로운 비즈니스 혁신을 지원합니다.
          </motion.p>
        </div>
      </section>

      {/* Sectors Introduction */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest">Core Sectors</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            복잡한 금융 도메인을 혁신하는 3대 핵심 영역
          </p>
        </div>
      </section>

      {/* Insurance Sector */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 text-primary rounded-full font-bold mb-8">
                <RiShieldCrossLine size={24} />
                <span className="text-lg">보험 (Insurance)</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                복잡한 보험 회계 및<br/>리스크 규제 완벽 대응
              </h2>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">IFRS 시스템 구축</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">새로운 국제회계기준에 부합하는 대용량 데이터 결산 및 검증 시스템을 안정적으로 구축합니다.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">RBC (지급여력비율) 시스템</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">보험사의 리스크 관리 및 건전성 평가를 위한 강력한 솔루션을 제공하여 안정성을 보장합니다.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="w-full lg:w-1/2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                <img src="/images/photo-1505691938895-1758d7feb511.jpg" alt="Insurance Sector" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl flex items-center justify-between shadow-lg">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">IFRS Compliant</span>
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banking Sector */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full font-bold mb-8">
                <RiBankCardLine size={24} />
                <span className="text-lg">은행 (Banking)</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                투명한 회계 처리 및<br/>안정적인 통합 리스크 관리
              </h2>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">은행 코어 회계 시스템</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">대규모 금융 거래 데이터를 빠르고 정확하게 처리하는 코어 뱅킹 회계 엔진 모듈을 개발합니다.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">리스크 관리 체계 고도화</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">다양한 금융 상품의 통합 리스크를 모니터링하고 대응 전략을 수립하는 시스템을 구축합니다.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="w-full lg:w-1/2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                <img src="/images/photo-1601597111158-2fceff292cdc.jpg" alt="Banking Sector" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Securities Sector */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-bold mb-8">
                <RiStockLine size={24} />
                <span className="text-lg">증권 (Securities)</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                대용량 투자 데이터의<br/>실시간 통합 분석 솔루션
              </h2>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">증권 데이터 무결성 검증</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">수많은 시장 데이터와 투자 정보를 신속하게 수집하고 데이터의 무결성을 철저히 검증합니다.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">자동화 리포팅 솔루션</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">투자자 및 규제 기관을 위한 맞춤형 분석 리포트를 빠르고 정확하게 자동 생성합니다.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="w-full lg:w-1/2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                <img src="/images/photo-1590283603385-17ffb3a7f29f.jpg" alt="Securities Sector" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
