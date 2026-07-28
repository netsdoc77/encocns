import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { getStorageData, setStorageData, CAREERS_KEY } from '../../../utils/storage';
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiCalendarLine } from '@remixicon/react';
import { getBadgeColor, isJobClosed } from '../../../utils/badgeColors';
import { supabase } from '../../../lib/supabase';
import { TableSkeletonRows } from '../../../components/common/LoadingSpinner';

import initialCareersData from '../../../data/careersData.json';

export default function AdminCareers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ date: '', badge: '', title: '', content: '' });
  const [selectedBadge, setSelectedBadge] = useState('프론트엔드');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);

  const fetchCareers = async () => {
    setIsLoading(true);
    let remoteData: any[] = [];
    try {
      const { data, error } = await supabase.from('careers').select('*');
      if (!error && data) {
        remoteData = data;
      }
    } catch (err) {
      console.error('Supabase error:', err);
    }
    const localData = getStorageData(CAREERS_KEY) || [];
    
    const map = new Map();
    initialCareersData.forEach(item => map.set(item.id, item));
    localData.forEach((item: any) => map.set(item.id, item));
    remoteData.forEach(item => map.set(item.id, item));

    const getCareersDateScore = (item: any) => {
      const dateStr = item.date || item.created_at || '';
      if (!dateStr) return 0;
      const clean = dateStr.replace(/[^0-9]/g, '');
      if (clean.length >= 8) return parseInt(clean.slice(0, 8));
      const time = new Date(dateStr).getTime();
      return isNaN(time) ? 0 : time;
    };

    const merged = Array.from(map.values()).sort((a: any, b: any) => {
      const scoreA = getCareersDateScore(a);
      const scoreB = getCareersDateScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return (b.id || 0) - (a.id || 0);
    });
    setCareers(merged);
    setStorageData(CAREERS_KEY, merged);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleDelete = async (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        await supabase.from('careers').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
      const updated = careers.filter(c => c.id !== id);
      setCareers(updated);
      setStorageData(CAREERS_KEY, updated);
    }
  };

  const openModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ date: item.date || '', badge: item.badge || '', title: item.title, content: item.content });
      
      let parsedStart = new Date();
      let parsedDeadline: Date | null = null;

      if (item.date && item.date.includes('~')) {
        const [startPart, endPart] = item.date.split('~').map((s: string) => s.trim());
        if (startPart) {
          const pStart = new Date(startPart.replace(/\./g, '-'));
          if (!isNaN(pStart.getTime())) parsedStart = pStart;
        }
        if (endPart && !endPart.includes('상시')) {
          const pEnd = new Date(endPart.replace(/\./g, '-'));
          if (!isNaN(pEnd.getTime())) parsedDeadline = pEnd;
        }
      } else if (item.date && !item.date.includes('상시')) {
        const pEnd = new Date(item.date.replace(/\./g, '-'));
        if (!isNaN(pEnd.getTime())) parsedDeadline = pEnd;
      }

      setStartDate(parsedStart);
      setDeadlineDate(parsedDeadline);

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
      setStartDate(new Date());
      setDeadlineDate(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = editingId || Date.now();
    
    const startStr = format(startDate, 'yyyy.MM.dd');
    const endStr = deadlineDate ? format(deadlineDate, 'yyyy.MM.dd') : '상시채용';
    const fullDateStr = `${startStr} ~ ${endStr}`;

    const payload = { ...formData, date: fullDateStr };
    const newItem = { id: newId, ...payload };

    try {
      if (editingId) {
        await supabase.from('careers').update(payload).eq('id', editingId);
      } else {
        const { data, error } = await supabase.from('careers').insert([payload]).select();
        if (error) {
          console.error('Supabase insert error:', error);
          const maxId = careers.reduce((max, c) => Math.max(max, Number(c.id) < 1000000000000 ? Number(c.id) : 0), 0);
          const fallbackPayload = { id: maxId + 1, ...payload };
          const { data: fbData } = await supabase.from('careers').upsert([fallbackPayload]).select();
          if (fbData && fbData[0]) {
            newItem.id = fbData[0].id;
          } else {
            newItem.id = maxId + 1;
          }
        } else if (data && data[0]) {
          newItem.id = data[0].id;
        }
      }
    } catch (err) {
      console.error('Supabase save error:', err);
    }

    let updated;
    if (editingId) {
      updated = careers.map(c => c.id === editingId ? newItem : c);
    } else {
      updated = [newItem, ...careers];
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
              <th className="py-3 px-4 font-bold w-16 text-center">번호</th>
              <th className="py-3 px-4 font-bold">마감일</th>
              <th className="py-3 px-4 font-bold">직군</th>
              <th className="py-3 px-4 font-bold w-2/5">공고 제목</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeletonRows rows={5} cols={5} />
            ) : (
              careers.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-500 font-medium text-center">{careers.length - index}</td>
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
              ))
            )}
            {!isLoading && careers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">데이터가 없습니다.</td>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">시작일</label>
                  <div className="relative">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date | null) => setStartDate(date || new Date())}
                      dateFormat="yyyy.MM.dd"
                      locale={ko}
                      minDate={new Date()}
                      className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 cursor-pointer"
                    />
                    <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    * 이전일 선택 불가 (오늘부터 선택 가능)
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">마감일</label>
                    {deadlineDate && (
                      <button
                        type="button"
                        onClick={() => setDeadlineDate(null)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                      >
                        ↻ 상시채용
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={deadlineDate}
                      onChange={(date: Date | null) => setDeadlineDate(date)}
                      dateFormat="yyyy.MM.dd"
                      locale={ko}
                      minDate={startDate}
                      placeholderText="상시채용 (클릭하여 마감일 선택)"
                      isClearable
                      className="w-full px-3 py-2 pl-10 pr-8 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 cursor-pointer"
                    />
                    <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    * 미선택 시 기본 <span className="font-semibold text-indigo-600">상시채용</span>으로 설정
                  </p>
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
