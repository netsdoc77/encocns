import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RiDatabase2Line, RiBankLine, RiLineChartLine, RiShieldKeyholeLine } from '@remixicon/react';

export default function Home() {
  const { t } = useTranslation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    { id: 1, title: 'IFRS 17', icon: <RiLineChartLine size={32} className="text-primary" />, desc: '복잡한 회계 기준을 효율적으로 관리하는 데이터 플랫폼' },
    { id: 2, title: 'RBC 시스템', icon: <RiShieldKeyholeLine size={32} className="text-primary" />, desc: '보험사 지급여력비율 산출 및 리스크 관리 시스템' },
    { id: 3, title: '데이터 관리', icon: <RiDatabase2Line size={32} className="text-primary" />, desc: '대용량 금융 데이터의 수집, 검증, 관리 파이프라인 구축' },
    { id: 4, title: '금융 솔루션', icon: <RiBankLine size={32} className="text-primary" />, desc: '은행, 증권 등 맞춤형 금융 IT 비즈니스 구축' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-32 lg:py-48 flex items-center">
        {/* Local Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-100">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
              {t('hero.title')}
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-600 mb-10 font-light">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link to="/solution" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-primary/30">
                {t('hero.primaryBtn')}
              </Link>
              <Link to="/contact" className="bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-sm">
                {t('hero.secondaryBtn')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Numbers */}
      <section className="py-20 bg-surface dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">2006</div>
              <div className="text-slate-600 dark:text-slate-400 font-bold">설립 연도</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-400 font-bold">주요 프로젝트</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">15+</div>
              <div className="text-slate-600 dark:text-slate-400 font-bold">금융권 고객사</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.3 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">99%</div>
              <div className="text-slate-600 dark:text-slate-400 font-bold">유지보수 만족도</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Services */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">핵심 서비스</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">금융 비즈니스의 성공을 위한 최적의 IT 환경을 제공합니다.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-surface dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">성공적인 금융 혁신, ENCOCNS와 함께 하세요.</h2>
          <p className="text-xl text-primary-light mb-10">전문가와 상담하여 맞춤형 솔루션을 제안받아보세요.</p>
          <Link to="/contact" className="inline-block bg-white text-primary hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
            프로젝트 문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}
