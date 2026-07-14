import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  RiCheckLine, 
  RiDashboard2Line, 
  RiFileList3Line, 
  RiBrainLine, 
  RiShieldKeyholeLine, 
  RiArrowRightSLine,
  RiQuestionnaireLine,
  RiLightbulbFlashLine,
  RiCodeBoxLine,
  RiServerLine,
  RiNodeTree,
  RiLockPasswordLine
} from '@remixicon/react';

export default function Solution() {
  const [activeTab, setActiveTab] = useState<'cashflow' | 'framework'>('framework');

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const heroData = {
    cashflow: {
      tag: "CashFlow-Engine",
      title: <>기업의 모든 돈의 흐름을 한눈에,<br className="hidden md:block"/> 스마트한 통합 자금관리 솔루션</>,
      desc: "복잡한 자금 관리와 시각화, 이제 클릭 몇 번으로 끝냅니다.",
      img: "/images/photo-1507679799987-c73779587ccf.jpg"
    },
    framework: {
      tag: "ENCO FrameWork",
      title: <>안정적이고 확장 가능한<br className="hidden md:block"/> 금융 IT의 표준, ENCO FrameWork</>,
      desc: "대규모 금융 시스템 구축을 위한 완벽한 엔터프라이즈 아키텍처",
      img: "/images/photo-1451187580459-43490279c0fa.jpg"
    }
  };

  const cashflowFeatures = [
    {
      title: '실시간 통합 모니터링',
      desc: '모든 은행 계좌와 자금 현황을 하나의 대시보드에서 실시간으로 확인',
      icon: <RiDashboard2Line size={32} />,
      img: '/images/photo-1551288049-bebda4e38f71.jpg',
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: '자동 자금일보 생성',
      desc: '수작업 없는 자동 수집으로 휴먼 에러 제로, 보고서 작성 시간 단축',
      icon: <RiFileList3Line size={32} />,
      img: '/images/photo-1460925895917-afdab827c52f.jpg',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500'
    },
    {
      title: 'AI 자금 예측',
      desc: '과거 패턴을 분석해 향후 자금 과부족을 미리 예측하고 대비',
      icon: <RiBrainLine size={32} />,
      img: '/images/photo-1555066931-4365d14bab8c.jpg',
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      title: '안전한 보안 통제',
      desc: '결재 라인 지정 및 권한 관리로 자금 사고 원천 차단',
      icon: <RiShieldKeyholeLine size={32} />,
      img: '/images/photo-1563986768609-322da13575f3.jpg',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    }
  ];

  const frameworkFeatures = [
    {
      title: '표준화된 개발 환경',
      desc: '검증된 라이브러리와 공통 모듈을 통해 개발 생산성을 극대화합니다.',
      icon: <RiCodeBoxLine size={32} />,
      img: '/images/photo-1498050108023-c5249f4df085.jpg',
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: '대용량 분산 처리',
      desc: '금융권 특유의 대용량 트랜잭션에도 흔들림 없는 완벽한 안정성을 제공합니다.',
      icon: <RiServerLine size={32} />,
      img: '/images/photo-1558494949-ef010cbdcc31.jpg',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500'
    },
    {
      title: 'MSA 아키텍처 지원',
      desc: '유연한 마이크로서비스 확장을 지원하여 비즈니스 변화에 민첩하게 대응합니다.',
      icon: <RiNodeTree size={32} />,
      img: '/images/photo-1519389950473-47ba0277781c.jpg',
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      title: '철저한 보안 프레임워크',
      desc: '민감한 금융 데이터를 보호하기 위한 다중 암호화 및 접근 제어 모듈이 내장되어 있습니다.',
      icon: <RiLockPasswordLine size={32} />,
      img: '/images/photo-1550751827-4bd374c3f58b.jpg',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    }
  ];

  return (
    <div className="w-full font-sans">
      {/* Hero Section with Dynamic Content */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeTab + "-bg"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={heroData[activeTab].img} 
              alt="Hero Background" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab + "-content"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full text-white font-bold mb-8 tracking-wider uppercase text-sm shadow-xl">
                {heroData[activeTab].tag}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                {heroData[activeTab].title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
                {heroData[activeTab].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Sticky Tab Menu */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[72px] z-40 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-8 md:gap-16">
            <button 
              onClick={() => setActiveTab('framework')}
              className={`py-6 text-lg md:text-xl font-bold transition-all relative ${activeTab === 'framework' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              ENCO FrameWork
              {activeTab === 'framework' && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('cashflow')}
              className={`py-6 text-lg md:text-xl font-bold transition-all relative ${activeTab === 'cashflow' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              CashFlow-Engine
              {activeTab === 'cashflow' && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ===================== CASHFLOW ENGINE CONTENT ===================== */}
        {activeTab === 'cashflow' && (
          <motion.div
            key="cashflow-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Intro (Why) Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="container mx-auto px-6 max-w-5xl">
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeIn}
                  className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden"
                >
                  <div className="p-10 md:p-16">
                    <div className="flex items-center gap-4 mb-10 text-slate-500 dark:text-slate-400">
                      <RiQuestionnaireLine size={36} className="text-orange-500" />
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">이런 불편함, 아직도 겪고 계신가요?</h2>
                    </div>
                    <ul className="space-y-6 mb-12">
                      <li className="flex items-start gap-4 text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 leading-snug">
                        <div className="mt-1 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-sm">1</div>
                        아직도 엑셀로 일일이 데이터를 모아 자금 일보를 작성하시나요?
                      </li>
                      <li className="flex items-start gap-4 text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 leading-snug">
                        <div className="mt-1 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-sm">2</div>
                        여러 은행 계좌를 하나하나 로그인해서 잔고를 확인하시나요?
                      </li>
                      <li className="flex items-start gap-4 text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 leading-snug">
                        <div className="mt-1 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-sm">3</div>
                        내일의 현금 흐름을 예측하기 어려워 불안하신가요?
                      </li>
                    </ul>
                    
                    <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0 transform rotate-3">
                          <RiLightbulbFlashLine size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-primary dark:text-blue-400 mb-2">CashFlow-Engine 하나면 해결됩니다.</h3>
                          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">더 이상 수작업에 시간을 뺏기지 마세요.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Core Features */}
            <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">핵심 기능</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">복잡한 기술은 저희가 책임집니다. 고객님은 직관적인 화면만 누리세요.</p>
                </div>
                
                <div className="flex flex-col gap-32">
                  {cashflowFeatures.map((feat, idx) => (
                    <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2"
                      >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                          <img src={feat.img} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:w-1/2 space-y-6"
                      >
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{feat.title}</h3>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {feat.desc}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
              <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                  <h2 className="text-4xl md:text-5xl font-black mb-6">압도적인 도입 효과</h2>
                  <p className="text-xl text-slate-400">숫자로 증명하는 CashFlow-Engine의 가치</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] text-center hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="text-7xl font-black text-blue-400 mb-6 flex justify-center items-baseline gap-1">
                      80<span className="text-4xl font-bold">%</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">보고서 작성 시간 감소</h3>
                    <p className="text-slate-400 leading-relaxed">수작업을 완전히 배제하여 업무 처리 시간을 획기적으로 줄입니다.</p>
                  </motion.div>

                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] text-center hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="text-7xl font-black text-green-400 mb-6 flex justify-center items-baseline gap-1">
                      95<span className="text-4xl font-bold">%</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">자금 예측 정확도 향상</h3>
                    <p className="text-slate-400 leading-relaxed">AI 기반의 과거 패턴 분석으로 현금 과부족을 정밀하게 진단합니다.</p>
                  </motion.div>

                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] text-center hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="text-7xl font-black text-primary mb-6 flex justify-center items-baseline gap-1">
                      2<span className="text-4xl font-bold">배</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">관리 업무 효율 증가</h3>
                    <p className="text-slate-400 leading-relaxed">자동화 시스템 도입으로 핵심 재무 전략 수립에 집중할 수 있습니다.</p>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ===================== FRAMEWORK CONTENT ===================== */}
        {activeTab === 'framework' && (
          <motion.div
            key="framework-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Intro (Why) Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="container mx-auto px-6 max-w-5xl">
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeIn}
                  className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700"
                >
                  <div className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                      <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                        왜 ENCO FrameWork가 <br/><span className="text-primary">필수적</span>일까요?
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        급변하는 금융 환경과 규제 속에서, 매번 시스템을 밑바닥부터 새로 구축하는 것은 막대한 비용과 리스크를 동반합니다. 
                        ENCO FrameWork는 수많은 금융권 프로젝트에서 검증된 아키텍처와 공통 컴포넌트를 제공하여 시스템 구축의 성공을 보장합니다.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <ul className="space-y-5">
                        <li className="flex items-center gap-4 text-lg font-medium text-slate-700 dark:text-slate-200">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                            <RiCheckLine />
                          </div>
                          개발 비용 및 기간 획기적 단축
                        </li>
                        <li className="flex items-center gap-4 text-lg font-medium text-slate-700 dark:text-slate-200">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                            <RiCheckLine />
                          </div>
                          금융 규제 준수(Compliance) 내장
                        </li>
                        <li className="flex items-center gap-4 text-lg font-medium text-slate-700 dark:text-slate-200">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                            <RiCheckLine />
                          </div>
                          마이크로서비스 기반 유연한 확장
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Core Features */}
            <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">주요 특장점</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">엔터프라이즈 환경에 최적화된 강력한 아키텍처를 제공합니다.</p>
                </div>
                
                <div className="flex flex-col gap-32">
                  {frameworkFeatures.map((feat, idx) => (
                    <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2"
                      >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                          <img src={feat.img} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:w-1/2 space-y-6"
                      >
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{feat.title}</h3>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {feat.desc}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tech Stack or Impact */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
              <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-black mb-6">검증된 레퍼런스</h2>
                  <p className="text-xl text-slate-400">수많은 금융 기관이 ENCO FrameWork를 선택했습니다</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {['안정성', '생산성', '보안성', '확장성'].map((value, idx) => (
                    <motion.div 
                      key={idx}
                      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] text-center hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="text-2xl font-bold text-white mb-2">{value}</div>
                      <div className="h-1 w-12 bg-primary mx-auto rounded-full mt-4"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section (Common) */}
      <section className="py-32 bg-white dark:bg-slate-900 text-center relative z-10 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 leading-tight">이제 엔코씨앤에스와 함께<br className="hidden md:block"/> 혁신을 더하세요</h2>
            <button className="bg-primary hover:bg-primary-dark text-white text-xl font-bold py-5 px-12 rounded-full shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
              도입 문의하기 <RiArrowRightSLine size={24} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
