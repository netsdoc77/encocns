import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { businessCategories } from '../data/businessData';
import { RiArrowRightLine } from '@remixicon/react';

export default function Business() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="w-full font-sans bg-surface dark:bg-surface-dark">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/photo-1518186285589-2f7649de83e0.jpg`} 
            alt="Business Hero" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/80"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Business Areas
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            고객의 비즈니스 과제를 정확히 진단하고,<br className="hidden md:block" />
            최적의 금융 IT 솔루션을 통해 혁신적인 가치를 창출합니다.
          </motion.p>
        </div>
      </section>

      {/* 4 Core Categories Grid */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6"
            >
              우리가 해결하는 <span className="text-primary">4대 핵심 과제</span>
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              단순한 시스템 구축을 넘어, 규제 대응부터 데이터 혁신까지 고객의 근본적인 페인포인트를 해결하는 여정을 제안합니다.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {businessCategories.map((category) => (
              <motion.div key={category.id} variants={fadeIn}>
                <Link 
                  to={`/business/${category.id}`}
                  className="block group bg-white dark:bg-slate-800 rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <category.icon size={40} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{category.title}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                    {category.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.services.map(srv => (
                        <span key={srv.id} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-full">
                          {srv.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary dark:text-blue-400 font-bold group-hover:gap-4 transition-all">
                      자세히 보기 <RiArrowRightLine />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
