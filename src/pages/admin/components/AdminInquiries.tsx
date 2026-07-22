import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, INQUIRIES_KEY } from '../../../utils/storage';
import { RiCloseLine, RiSearchLine } from '@remixicon/react';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setInquiries(getStorageData(INQUIRIES_KEY));
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updated = inquiries.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    setStorageData(INQUIRIES_KEY, updated);
    
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">대기 중</span>;
      case 'in-progress':
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">처리 중</span>;
      case 'completed':
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">처리 완료</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const filteredInquiries = inquiries.filter(inq => {
    const searchLower = searchKeyword.toLowerCase();
    const companyMatch = inq.company ? inq.company.toLowerCase().includes(searchLower) : false;
    const nameMatch = inq.name ? inq.name.toLowerCase().includes(searchLower) : false;
    const emailMatch = inq.email ? inq.email.toLowerCase().includes(searchLower) : false;
    return companyMatch || nameMatch || emailMatch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          문의 관리
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">총 {filteredInquiries.length}건</span>
        </h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="회사명, 담당자, 이메일 검색" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-72"
          />
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-4 font-bold">접수일시</th>
              <th className="py-3 px-4 font-bold">회사명</th>
              <th className="py-3 px-4 font-bold">담당자</th>
              <th className="py-3 px-4 font-bold">이메일</th>
              <th className="py-3 px-4 font-bold">문의 내용</th>
              <th className="py-3 px-4 font-bold text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(inq => (
              <tr 
                key={inq.id} 
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedInquiry(inq)}
              >
                <td className="py-3 px-4 text-sm text-slate-600">{formatDate(inq.createdAt)}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{inq.company}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{inq.name}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{inq.email}</td>
                <td className="py-3 px-4 text-sm text-slate-600 max-w-xs truncate">
                  {inq.content.length > 30 ? inq.content.substring(0, 30) + '...' : inq.content}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {getStatusBadge(inq.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <RiCloseLine size={24} />
            </button>
            
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              문의 상세 내용
              {getStatusBadge(selectedInquiry.status)}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold mb-1">접수일시</p>
                <p className="text-sm text-slate-800 font-medium">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold mb-1">회사명</p>
                <p className="text-sm text-slate-800 font-medium">{selectedInquiry.company || '-'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold mb-1">담당자</p>
                <p className="text-sm text-slate-800 font-medium">{selectedInquiry.name}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold mb-1">연락처</p>
                <p className="text-sm text-slate-800 font-medium">{selectedInquiry.phone}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 col-span-2">
                <p className="text-xs text-slate-500 font-bold mb-1">이메일</p>
                <p className="text-sm text-slate-800 font-medium">{selectedInquiry.email}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-slate-500 font-bold mb-2">문의 내용</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed min-h-[120px]">
                {selectedInquiry.content}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500 font-bold mb-3">처리 상태 변경</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleStatusChange(selectedInquiry.id, 'pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedInquiry.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  대기 중
                </button>
                <button 
                  onClick={() => handleStatusChange(selectedInquiry.id, 'in-progress')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedInquiry.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  처리 중
                </button>
                <button 
                  onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedInquiry.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  처리 완료
                </button>
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="bg-[#5452F6] hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/30"
                >
                  확인
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
