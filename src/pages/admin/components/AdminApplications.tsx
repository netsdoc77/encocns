import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, APPLICATIONS_KEY } from '../../../utils/storage';
import { RiCloseLine, RiSearchLine, RiDeleteBinLine, RiDownloadLine, RiFileTextLine } from '@remixicon/react';
import { supabase } from '../../../lib/supabase';

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchApplications = async () => {
    let remoteData: any[] = [];
    try {
      const { data, error } = await supabase.from('applications').select('*').order('id', { ascending: false });
      if (!error && data) {
        remoteData = data;
      }
    } catch (err) {
      console.error('Supabase error:', err);
    }
    const localData = getStorageData(APPLICATIONS_KEY) || [];
    
    const map = new Map();
    remoteData.forEach(item => map.set(item.id, item));
    localData.forEach((item: any) => map.set(item.id, item));

    const merged = Array.from(map.values()).sort((a, b) => (b.id || 0) - (a.id || 0));
    setApplications(merged);
    setStorageData(APPLICATIONS_KEY, merged);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedApp]);

  const handleDelete = async (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('정말로 이 입사지원 내역을 삭제하시겠습니까?')) {
      try {
        await supabase.from('applications').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }

      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      setStorageData(APPLICATIONS_KEY, updated);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    }
  };

  const handleDownload = (app: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!app.file_data && !app.fileData) {
      alert('첨부된 파일 데이터가 없습니다.');
      return;
    }
    const fileUrl = app.file_data || app.fileData;
    const fileName = app.file_name || app.fileName || '입사지원서.pdf';
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApps = applications.filter(app => {
    const term = searchKeyword.toLowerCase().trim();
    if (!term) return true;
    const nameMatch = app.name ? app.name.toLowerCase().includes(term) : false;
    const titleMatch = app.job_title || app.jobTitle ? (app.job_title || app.jobTitle).toLowerCase().includes(term) : false;
    const emailMatch = app.email ? app.email.toLowerCase().includes(term) : false;
    const phoneMatch = app.phone ? app.phone.includes(term) : false;
    return nameMatch || titleMatch || emailMatch || phoneMatch;
  });

  return (
    <div className="p-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            입사지원 관리
            <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              총 {filteredApps.length}건
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">입사 지원자 정보 및 첨부 입사지원서를 확인하고 관리합니다.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="지원자명, 공고명, 이메일 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
          />
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-4 px-6">지원일시</th>
                <th className="py-4 px-6">지원자명</th>
                <th className="py-4 px-6">지원 공고 (포지션)</th>
                <th className="py-4 px-6">연락처 / 이메일</th>
                <th className="py-4 px-6">첨부파일</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => {
                const jobTitle = app.job_title || app.jobTitle || '기타';
                const fileName = app.file_name || app.fileName;
                const dateStr = app.created_at || app.appliedAt || '-';

                return (
                  <tr 
                    key={app.id} 
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 text-slate-500 text-xs font-mono whitespace-nowrap">
                      {dateStr}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {app.name}
                    </td>
                    <td className="py-4 px-6 font-medium text-primary">
                      {jobTitle}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div className="font-semibold text-slate-800">{app.phone}</div>
                      <div className="text-xs text-slate-400">{app.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      {fileName ? (
                        <button
                          onClick={(e) => handleDownload(app, e)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          <RiDownloadLine size={14} className="text-primary" />
                          <span className="max-w-[120px] truncate">{fileName}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">파일 없음</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleDelete(app.id, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    접수된 입사지원 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
            onClick={() => setSelectedApp(null)} 
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden z-10">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <RiFileTextLine className="text-primary" size={20} />
                입사지원 상세 정보
              </h3>
              <button 
                onClick={() => setSelectedApp(null)} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-200/60 pb-2">
                  <span>접수 일시: {selectedApp.created_at || selectedApp.appliedAt || '-'}</span>
                  <span className="font-bold text-primary">{selectedApp.job_title || selectedApp.jobTitle}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs block">지원자 성명</span>
                    <span className="font-bold text-slate-900">{selectedApp.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">연락처</span>
                    <span className="font-bold text-slate-900">{selectedApp.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-xs block">이메일</span>
                    <span className="font-medium text-slate-800">{selectedApp.email}</span>
                  </div>
                </div>
              </div>

              {/* Intro Text */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">자기소개</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-line min-h-[100px]">
                  {selectedApp.intro || '입력된 자기소개가 없습니다.'}
                </div>
              </div>

              {/* Attached File Download */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">첨부 입사지원서</h4>
                {(selectedApp.file_name || selectedApp.fileName) ? (
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-3">
                      <RiFileTextLine className="text-primary" size={24} />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{selectedApp.file_name || selectedApp.fileName}</p>
                        <p className="text-xs text-slate-500">지원자 제출 파일</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDownload(selectedApp, e)}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <RiDownloadLine size={16} />
                      다운로드
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 text-xs">
                    첨부된 지원서 파일이 없습니다.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={(e) => handleDelete(selectedApp.id, e)}
                className="px-4 py-2 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RiDeleteBinLine size={16} />
                지원 내역 삭제
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
