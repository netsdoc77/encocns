import { useState } from 'react';
import { LoadingSpinner, TableSkeletonRows, CardSkeletonGrid } from '../components/common/LoadingSpinner';
import { RiRefreshLine, RiEyeLine, RiLayoutGridLine, RiTableLine, RiLoader4Line } from '@remixicon/react';

export default function LoadingDemo() {
  const [showFullPageSpinner, setShowFullPageSpinner] = useState(false);
  const [activeTab, setActiveTab] = useState<'spinner' | 'table' | 'card'>('spinner');

  const triggerFullPageSpinner = () => {
    setShowFullPageSpinner(true);
    setTimeout(() => {
      setShowFullPageSpinner(false);
    }, 3000); // 3 seconds preview
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-20 font-sans">
      {/* Full Page Spinner Preview when triggered */}
      {showFullPageSpinner && (
        <LoadingSpinner fullPage text="브랜드 로딩 스피너를 시연 중입니다... (3초 후 자동으로 닫힙니다)" />
      )}

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <RiLoader4Line className="text-primary animate-spin" size={32} />
                로딩 UI 및 스피너 미리보기 데모
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                사이트 및 어드민 전반에 적용된 로딩 화면(Full-Page Spinner, Inline Spinner, Skeleton UI)을 직접 확인하실 수 있습니다.
              </p>
            </div>
            <button
              onClick={triggerFullPageSpinner}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RiEyeLine size={20} />
              Full-Page 로딩 스피너 띄우기 (3초)
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 mb-8 bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('spinner')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'spinner'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <RiRefreshLine size={18} />
              섹션 인라인 스피너
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'table'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <RiTableLine size={18} />
              어드민 테이블 스켈레톤
            </button>
            <button
              onClick={() => setActiveTab('card')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <RiLayoutGridLine size={18} />
              카드 리스트 스켈레톤
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 min-h-[350px] flex flex-col justify-center">
            {activeTab === 'spinner' && (
              <div className="py-12">
                <LoadingSpinner text="소식을 불러오는 중입니다..." />
              </div>
            )}

            {activeTab === 'table' && (
              <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-700">
                      <th className="py-3 px-4 font-bold w-16 text-center">번호</th>
                      <th className="py-3 px-4 font-bold">등록일</th>
                      <th className="py-3 px-4 font-bold">이미지</th>
                      <th className="py-3 px-4 font-bold">제목</th>
                      <th className="py-3 px-4 font-bold text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableSkeletonRows rows={4} cols={5} />
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="py-4">
                <CardSkeletonGrid count={6} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
