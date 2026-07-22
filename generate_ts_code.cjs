const fs = require('fs');
const data = fs.readFileSync('projects_data.txt', 'utf8');

const code = `import { motion } from 'framer-motion';

${data}

export default function Projects() {
  return (
    <div className="w-full relative bg-white dark:bg-slate-900 min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            프로젝트 수행 실적
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
          >
            엔코씨앤에스가 그동안 성공적으로 완수한 주요 프로젝트 내역입니다. 
            금융, 공공 등 다양한 분야에서 축적된 노하우와 전문성을 바탕으로 최고의 IT 서비스를 제공하고 있습니다.
          </motion.p>
        </div>
      </section>

      {/* Project List */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Table Header (Desktop) */}
          <div className="hidden md:flex border-y-2 border-slate-900 dark:border-slate-100 py-4 font-bold text-slate-900 dark:text-white text-sm">
            <div className="w-[15%] px-4">수행기간</div>
            <div className="w-[35%] px-4">프로젝트명</div>
            <div className="w-[15%] px-4">고객사</div>
            <div className="w-[35%] px-4">수행내용</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {projectData.map((project) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                key={project.id}
                className="flex flex-col md:flex-row md:items-center py-6 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
              >
                {/* Mobile labels and Desktop grid layout combined */}
                
                {/* Period */}
                <div className="w-full md:w-[15%] px-4 mb-2 md:mb-0">
                  <span className="md:hidden text-xs font-bold text-slate-400 block mb-1">수행기간</span>
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{project.period}</span>
                </div>
                
                {/* Title */}
                <div className="w-full md:w-[35%] px-4 mb-4 md:mb-0">
                  <span className="md:hidden text-xs font-bold text-slate-400 block mb-1">프로젝트명</span>
                  <span className="text-slate-900 dark:text-white font-bold text-base md:text-lg">{project.title}</span>
                </div>
                
                {/* Client */}
                <div className="w-full md:w-[15%] px-4 mb-3 md:mb-0">
                  <span className="md:hidden text-xs font-bold text-slate-400 block mb-1">고객사</span>
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{project.client}</span>
                </div>
                
                {/* Description */}
                <div className="w-full md:w-[35%] px-4">
                  <span className="md:hidden text-xs font-bold text-slate-400 block mb-1">수행내용</span>
                  <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {project.description}
                  </span>
                </div>
                
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Projects.tsx', code);
