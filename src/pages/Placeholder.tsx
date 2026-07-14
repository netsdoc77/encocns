export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{title}</h1>
      <p className="text-slate-600 dark:text-slate-400">이 페이지는 현재 준비 중입니다.</p>
    </div>
  );
}
