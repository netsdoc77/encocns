import React, { useState, useEffect } from 'react';
import { RiSmartphoneLine, RiComputerLine, RiTabletLine, RiHome4Line } from '@remixicon/react';

interface AdminMobileGuardProps {
  children: React.ReactNode;
}

/**
 * 어드민 화면 PC & 태블릿 전용 가드 컴포넌트
 * 화면 너비 768px 미만(Mobile) 환경 접속 시 차단 안내 화면을 보여줍니다.
 */
export default function AdminMobileGuard({ children }: AdminMobileGuardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl flex flex-col items-center">
          {/* Icons */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <RiSmartphoneLine size={36} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs font-bold shadow">
              ✕
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-white mb-2">
            모바일 기기 접근 제한 안내
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            어드민 관리자 시스템은 <strong className="text-indigo-300">PC 및 태블릿(Tablet)</strong> 환경에서만 최적화되어 제공됩니다.
          </p>

          {/* Device Badges */}
          <div className="flex items-center justify-center gap-3 w-full bg-slate-900/60 p-3 rounded-xl mb-6 border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <RiSmartphoneLine size={16} className="text-red-400" />
              <span className="line-through text-red-400">Mobile</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <RiTabletLine size={16} />
              <span>Tablet (768px+)</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <RiComputerLine size={16} />
              <span>PC</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-6">
            안전하고 원활한 데이터 관리를 위해 화면 너비가 넓은 태블릿이나 PC 기기로 접속해 주세요.
          </p>

          {/* Button */}
          <a
            href="/"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <RiHome4Line size={18} />
            메인 웹사이트로 이동
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
