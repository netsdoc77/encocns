import React from 'react';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
  className?: string;
}

/**
 * 공통 로딩 스피너 및 로딩중 화면 컴포넌트
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullPage = false,
  message = '데이터를 불러오는 중입니다...',
  className = ''
}) => {
  if (fullPage) {
    return (
      <div className={`w-full min-h-[60vh] flex flex-col items-center justify-center bg-transparent py-16 ${className}`}>
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-900/50 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute w-6 h-6 bg-primary/10 rounded-full animate-ping"></div>
        </div>
        {message && (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full py-12 flex flex-col items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-3 border-indigo-200 dark:border-indigo-900/50 border-t-primary rounded-full animate-spin mb-3"></div>
      {message && (
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * 테이블 행(Row) 전용 스켈레톤 로더 컴포넌트
 */
export const TableSkeletonRows: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 6 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800 animate-pulse">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-4">
              <div className={`h-4 bg-slate-200 dark:bg-slate-700/60 rounded ${cIdx === 0 ? 'w-8 mx-auto' : cIdx === 1 ? 'w-24' : 'w-full'}`}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

/**
 * 카드 리스트 전용 스켈레톤 컴포넌트
 */
export const CardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
