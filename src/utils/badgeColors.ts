export const isJobClosed = (dateString: string): boolean => {
  if (!dateString) return false;
  if (dateString.includes('상시') || dateString.includes('채용 시 마감') || dateString.includes('채용시 마감')) return false;
  
  const parts = dateString.split('~');
  if (parts.length === 2) {
    const endDateStr = parts[1].trim();
    // parse YYYY.MM.DD
    const endDate = new Date(endDateStr.replace(/\./g, '-'));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    if (endDate < now) {
      return true;
    }
  }
  return false;
};

export const getBadgeColor = (badge: string, isClosed: boolean = false) => {
  if (isClosed) {
    return 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
  }

  switch (badge) {
    case '프론트엔드':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50';
    case '백엔드':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
    case '데이터 분석':
    case '데이터 엔지니어':
      return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/50';
    case '기획':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50';
    case '인프라':
    case '인프라/보안':
    case '보안':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800/50';
    case '디자인':
      return 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800/50';
    default:
      return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/50';
  }
};
