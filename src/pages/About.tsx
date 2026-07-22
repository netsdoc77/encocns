import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { RiBuilding4Line, RiBriefcase4Line, RiShieldCheckLine, RiHistoryLine } from '@remixicon/react';
import LocationSection from '../components/common/LocationSection';

export default function About() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const timeline = [
    { year: '2026', desc: 'Digital Finance Partner 도약' },
    { year: '2020', desc: 'RBC 사업 강화 및 리스크 관리 솔루션 고도화' },
    { year: '2015', desc: 'IFRS 시스템 구축 프로젝트 수행' },
    { year: '2010', desc: '금융 SI 비즈니스 본격 확대' },
    { year: '2006', desc: 'ENCOCNS 설립' },
  ];

  const competencies = [
    { 
      title: '금융 도메인 전문성', 
      desc: '다년간의 금융권 시스템 구축 경험을 통해, 복잡한 금융 비즈니스 로직과 데이터 흐름을 가장 정확하게 이해하고 설계합니다.',
      icon: <RiBuilding4Line size={40} />,
      img: import.meta.env.BASE_URL + "images/photo-1460925895917-afdab827c52f.jpg"
    },
    { 
      title: '엔터프라이즈 프로젝트 수행 역량', 
      desc: '대규모 차세대 시스템부터 단위 업무 고도화까지, 체계적인 방법론을 적용하여 성공적인 프로젝트 완수를 보장합니다.',
      icon: <RiBriefcase4Line size={40} />,
      img: import.meta.env.BASE_URL + "images/photo-1542744173-8e7e53415bb0.jpg"
    },
    { 
      title: '글로벌 규제 완벽 대응', 
      desc: 'IFRS, Basel 등 수시로 변화하는 글로벌 금융 규제에 선제적으로 대응하는 유연한 아키텍처를 제공합니다.',
      icon: <RiShieldCheckLine size={40} />,
      img: import.meta.env.BASE_URL + "images/photo-1450101499163-c8848c66ca85.jpg"
    },
    { 
      title: '무결점 장기 유지보수', 
      desc: '구축 이후에도 24/365 안정적인 운영을 보장하며, 비즈니스 연속성을 지키는 든든한 파트너가 됩니다.',
      icon: <RiHistoryLine size={40} />,
      img: import.meta.env.BASE_URL + "images/photo-1551288049-bebda4e38f71.jpg"
    },
  ];

  const orgs = [
    {
      title: '사업 조직',
      desc: '금융 고객사의 비즈니스 혁신을 이끄는 컨설팅 및 통합 IT 전략 수립',
      img: import.meta.env.BASE_URL + "images/photo-1454165804606-c3d57bc86b40.jpg"
    },
    {
      title: '개발 조직',
      desc: '최신 기술 트렌드를 주도하는 코어 엔진 개발 및 아키텍처 설계',
      img: import.meta.env.BASE_URL + "images/photo-1555066931-4365d14bab8c.jpg"
    },
    {
      title: '운영 조직',
      desc: '무중단 금융 시스템을 위한 24시간 모니터링 및 선제적 품질 관리',
      img: import.meta.env.BASE_URL + "images/photo-1517245386807-bb43f82c33c4.jpg"
    }
  ];

  return (
    <div className="w-full font-sans">
      {/* Hero Section (Kakao Enterprise Style: Large, Immersive) */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/photo-1497366216548-37526070297c.jpg`} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Connecting<br className="md:hidden" /> Data to Finance
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="text-xl md:text-3xl text-slate-200 font-light max-w-4xl mx-auto leading-relaxed">
            데이터 기반의 혁신적 IT 기술력으로<br className="hidden md:block"/> 
            새로운 금융의 미래를 설계하는 파트너, ENCOCNS입니다.
          </motion.p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 uppercase tracking-widest">Our Vision</h2>
            <p className="text-3xl md:text-5xl text-slate-900 dark:text-white font-extrabold leading-tight mb-10">
              최고의 IT 기술력과 도메인 지식을 융합하여<br className="hidden md:block"/> 
              안정적이고 효율적인 비즈니스 환경을 완성합니다
            </p>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              우리는 <span className="text-slate-900 dark:text-white font-bold">Trusted Digital Finance Partner</span> 로서 고객의 성공을 함께 만들어 갑니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-24 text-center text-slate-900 dark:text-white">History</h2>
          <div className="max-w-3xl mx-auto relative border-l-4 border-primary/20 ml-6 md:mx-auto">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mb-16 pl-12 relative group"
              >
                <div className="absolute w-6 h-6 bg-primary rounded-full -left-[15px] top-2 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tight">{item.year}</div>
                <div className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-bold">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies (Rich Alternating Layout) */}
      <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Core Competencies</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">ENCOCNS만의 압도적인 역량으로 차별화된 가치를 제공합니다.</p>
          </div>
          
          <div className="flex flex-col gap-32">
            {competencies.map((comp, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2"
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                    <img src={comp.img} alt={comp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    {comp.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{comp.title}</h3>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    {comp.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization (Rich Image Grid) */}
      <section className="py-32 bg-slate-900 text-white relative">
        <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/photo-1557683316-973673baf926.jpg)` }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Organization</h2>
            <p className="text-xl text-slate-400">각 분야의 최고 전문가들이 모여 혁신적인 금융 IT 생태계를 완성합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {orgs.map((org, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-96 rounded-3xl overflow-hidden"
              >
                <img src={org.img} alt={org.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4">{org.title}</h3>
                  <p className="text-lg text-slate-300">
                    {org.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />
    </div>
  );
}
