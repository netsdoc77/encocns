import { motion } from 'framer-motion';
import { RiHeartPulseLine, RiBookOpenLine, RiTeamLine } from '@remixicon/react';

export default function Careers() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const welfare = [
    { icon: <RiHeartPulseLine size={32} />, title: '건강검진 지원', desc: '임직원 및 가족의 종합 건강검진을 지원합니다.' },
    { icon: <RiBookOpenLine size={32} />, title: '자기계발비', desc: '도서 구입, 세미나 참석 등 성장을 위한 비용을 지원합니다.' },
    { icon: <RiTeamLine size={32} />, title: '동호회 활동', desc: '사내 다양한 동호회 활동비를 지원하여 소통을 장려합니다.' },
  ];

  const process = [
    { step: '01', title: '서류 전형', desc: '이력서 및 포트폴리오를 통한 직무 적합성 평가' },
    { step: '02', title: '실무 인터뷰', desc: '현업 담당자와의 기술 및 직무 역량 심층 면접' },
    { step: '03', title: '컬처 핏 인터뷰', desc: 'ENCOCNS의 핵심 가치와 부합하는지 확인하는 임원 면접' },
    { step: '04', title: '처우 협의', desc: '최종 합격자 대상 처우 및 입사일 조율' },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-slate-900 text-white pt-32 pb-32 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-widest text-sm mb-4 block">JOIN US</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              데이터로 금융의 미래를<br/>함께 그려갈 인재를 찾습니다
            </h1>
            <p className="text-xl text-slate-400 mb-10">
              최고의 동료들과 함께 성장하며 혁신적인 금융 IT 생태계를 만들어가세요.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              채용 공고 보러가기
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-24 bg-surface dark:bg-surface-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Culture</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">ENCOCNS는 이런 문화를 지향합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="p-8">
              <div className="text-4xl font-extrabold text-slate-200 dark:text-slate-700 mb-4">1</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">전문성 중심</h3>
              <p className="text-slate-600 dark:text-slate-400">직급에 관계없이 기술과 데이터에 기반한 논리적인 의견을 존중합니다.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }} className="p-8">
              <div className="text-4xl font-extrabold text-slate-200 dark:text-slate-700 mb-4">2</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">투명한 협업</h3>
              <p className="text-slate-600 dark:text-slate-400">모든 정보는 투명하게 공유되며, 부서 간 경계 없는 협업을 추구합니다.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }} className="p-8">
              <div className="text-4xl font-extrabold text-slate-200 dark:text-slate-700 mb-4">3</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">끊임없는 성장</h3>
              <p className="text-slate-600 dark:text-slate-400">실패를 두려워하지 않고, 새로운 기술에 끊임없이 도전합니다.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welfare */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welfare</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">업무에 몰입할 수 있도록 아낌없이 지원합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {welfare.map((w, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  {w.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{w.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-surface dark:bg-surface-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Hiring Process</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">공정하고 투명한 채용 프로세스를 통해 인재를 모십니다.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="hidden md:grid grid-cols-4 gap-4 relative">

              {process.map((p, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: idx * 0.15 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg mb-4 shadow-lg ring-4 ring-white dark:ring-slate-900">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-2">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile Vertical Process */}
            <div className="md:hidden flex flex-col gap-8">
              {process.map((p, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg z-10 relative">
                      {p.step}
                    </div>
                    {idx < process.length - 1 && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2"></div>}
                  </div>
                  <div className="pt-2 pb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
