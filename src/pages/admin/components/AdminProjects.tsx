import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, PROJECTS_KEY } from '../../../utils/storage';
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiCalendarLine, RiSearchLine } from '@remixicon/react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: '', client: '', description: '' });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setProjects(getStorageData(PROJECTS_KEY));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      setStorageData(PROJECTS_KEY, updated);
    }
  };

  const openModal = (project?: any) => {
    if (project) {
      setEditingId(project.id);
      setFormData({ title: project.title, client: project.client, description: project.description });
      
      const [startStr, endStr] = project.period.split(' ~ ');
      if (startStr) {
        const [year, month] = startStr.split('.');
        setStartDate(new Date(parseInt(year), parseInt(month) - 1));
      } else {
        setStartDate(null);
      }
      
      if (endStr && endStr !== '현재') {
        const [year, month] = endStr.split('.');
        setEndDate(new Date(parseInt(year), parseInt(month) - 1));
      } else {
        setEndDate(null);
      }
    } else {
      setEditingId(null);
      setFormData({ title: '', client: '', description: '' });
      setStartDate(null);
      setEndDate(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      alert('시작일을 선택해주세요.');
      return;
    }
    
    const periodStr = `${format(startDate, 'yyyy.MM')} ~ ${endDate ? format(endDate, 'yyyy.MM') : '현재'}`;
    const dataToSave = { ...formData, period: periodStr };

    let updated;
    if (editingId) {
      updated = projects.map(p => p.id === editingId ? { ...p, ...dataToSave } : p);
    } else {
      updated = [{ id: Date.now(), ...dataToSave }, ...projects];
    }
    setProjects(updated);
    setStorageData(PROJECTS_KEY, updated);
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
    p.client.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          프로젝트 관리
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">총 {filteredProjects.length}건</span>
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="프로젝트명 또는 고객사 검색" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64"
            />
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RiAddLine size={18} />
            프로젝트 추가
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-4 font-bold">수행기간</th>
              <th className="py-3 px-4 font-bold w-1/3">프로젝트명</th>
              <th className="py-3 px-4 font-bold">고객사</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-sm text-slate-600">{project.period}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{project.title}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{project.client}</td>
                <td className="py-3 px-4 text-sm text-right flex justify-end gap-2">
                  <button 
                    onClick={() => openModal(project)}
                    className="p-1.5 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                    title="수정"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                    title="삭제"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6">{editingId ? '프로젝트 수정' : '새 프로젝트 추가'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">시작일</label>
                  <div className="relative">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date | null) => setStartDate(date)}
                      dateFormat="yyyy.MM"
                      showMonthYearPicker
                      locale={ko}
                      placeholderText="시작 월 선택"
                      className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700"
                    />
                    <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">종료일</label>
                  <div className="relative">
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date | null) => setEndDate(date)}
                      dateFormat="yyyy.MM"
                      showMonthYearPicker
                      locale={ko}
                      placeholderText="종료 월 선택 (미선택시 '현재')"
                      isClearable
                      className="w-full px-3 py-2 pl-10 pr-8 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700"
                    />
                    <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">프로젝트명</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">고객사</label>
                <input required type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">수행내용</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
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
