import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, CAREERS_KEY } from '../../../utils/storage';
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiCalendarLine } from '@remixicon/react';
import { getBadgeColor, isJobClosed } from '../../../utils/badgeColors';

export default function AdminCareers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ date: '', badge: '', title: '', content: '' });
  const [selectedBadge, setSelectedBadge] = useState('');

  useEffect(() => {
    setCareers(getStorageData(CAREERS_KEY));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const updated = careers.filter(c => c.id !== id);
      setCareers(updated);
      setStorageData(CAREERS_KEY, updated);
    }
  };

  const openModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ date: item.date, badge: item.badge || '', title: item.title, content: item.content });
      
      // Determine if it's a custom badge
      const defaultBadges = ['프론트엔드', '백엔드', '앱개발', '인프라/보안', '기획/PM', '디자인'];
      if (item.badge && !defaultBadges.includes(item.badge)) {
        setSelectedBadge('직접입력');
      } else {
        setSelectedBadge(item.badge || '프론트엔드');
      }
    } else {
      setEditingId(null);
      setFormData({ date: '', badge: '프론트엔드', title: '', content: '' });
      setSelectedBadge('프론트엔드');
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = careers.map(c => c.id === editingId ? { ...c, ...formData } : c);
    } else {
      updated = [{ id: Date.now(), ...formData }, ...careers];
    }
    setCareers(updated);
    setStorageData(CAREERS_KEY, updated);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          채용 관리
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">총 {careers.length}건</span>
        </h3>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <RiAddLine size={18} />
          채용공고 추가
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-4 font-bold">마감일</th>
              <th className="py-3 px-4 font-bold">직군</th>
              <th className="py-3 px-4 font-bold w-2/5">공고 제목</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map(item => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-sm text-slate-600">{item.date}</td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getBadgeColor(item.badge, isJobClosed(item.date))}`}>{item.badge}</span>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{item.title}</td>
                <td className="py-3 px-4 text-sm text-right flex justify-end gap-2">
                  <button 
                    onClick={() => openModal(item)}
                    className="p-1.5 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                    title="수정"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                    title="삭제"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6">{editingId ? '채용공고 수정' : '새 채용공고 추가'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">마감일 (예: 2026.12.31 또는 상시채용)</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      placeholder="날짜 또는 텍스트 입력"
                      className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700"
                    />
                    <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">직군</label>
                  <div className="flex gap-2">
                    <select 
                      value={selectedBadge}
                      onChange={(e) => {
                        setSelectedBadge(e.target.value);
                        if (e.target.value !== '직접입력') {
                          setFormData({...formData, badge: e.target.value});
                        } else {
                          setFormData({...formData, badge: ''});
                        }
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="프론트엔드">프론트엔드</option>
                      <option value="백엔드">백엔드</option>
                      <option value="앱개발">앱개발</option>
                      <option value="인프라/보안">인프라/보안</option>
                      <option value="기획/PM">기획/PM</option>
                      <option value="디자인">디자인</option>
                      <option value="직접입력">직접입력</option>
                    </select>
                    {selectedBadge === '직접입력' && (
                      <input 
                        required 
                        type="text" 
                        placeholder="직접 입력" 
                        value={formData.badge} 
                        onChange={e => setFormData({...formData, badge: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">공고 제목</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">본문 내용</label>
                <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">취소</button>
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
