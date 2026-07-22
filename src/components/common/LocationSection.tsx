import { motion } from 'framer-motion';
import { RiMapPinLine, RiPhoneLine, RiPrinterLine, RiTrainLine } from '@remixicon/react';

const KakaoMap = () => {
  return (
    <iframe
      src={`${import.meta.env.BASE_URL}map.html`}
      width="100%"
      height="500"
      style={{ border: 0, borderRadius: '1rem' }}
      title="엔코씨앤에스 오시는 길"
      scrolling="no"
    />
  );
};

export default function LocationSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">찾아오시는 길</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">엔코씨앤에스로 오시는 길을 안내해 드립니다.</p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {/* Map */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="w-full">
            <KakaoMap />
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Address & Contact */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-2">주소 및 연락처</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RiMapPinLine className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">주소</span>
                    <span className="text-slate-600 dark:text-slate-400">서울특별시 성동구 성수일로8길 5 (서울숲 SK V1타워) A동 407호</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RiPhoneLine className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">대표번호</span>
                    <span className="text-slate-600 dark:text-slate-400">070) 4111-9210</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RiPrinterLine className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">팩스</span>
                    <span className="text-slate-600 dark:text-slate-400">070) 4111-9211</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Transportation */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-2">교통안내</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RiTrainLine className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">지하철 이용</span>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      2호선 뚝섬역 4번 출구에서 직진 후 사거리에서 좌회전 (도보 약 5분 이내)
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
