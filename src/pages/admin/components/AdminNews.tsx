import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, NEWS_KEY } from '../../../utils/storage';
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiSearchLine } from '@remixicon/react';
import { supabase } from '../../../lib/supabase';

import initialNewsData from '../../../data/newsData.json';

const getNewsDateScore = (item: any) => {
  const dateStr = item.date || item.created_at || '';
  if (!dateStr) return 0;
  const clean = dateStr.replace(/[^0-9]/g, '');
  if (clean.length >= 8) {
    return parseInt(clean.slice(0, 8));
  }
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
};

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ date: '', title: '', content: '', image_url: '' });

  const fetchNews = async () => {
    let remoteData: any[] = [];
    try {
      const { data, error } = await supabase.from('news').select('*');
      if (!error && data) {
        remoteData = data;
      }
    } catch (err) {
      console.error('Supabase error:', err);
    }
    const localData = getStorageData(NEWS_KEY) || [];
    
    const map = new Map();
    initialNewsData.forEach(item => map.set(item.id, item));
    localData.forEach((item: any) => map.set(item.id, item));
    remoteData.forEach(item => {
      if (map.has(item.id)) {
        map.set(item.id, { ...map.get(item.id), ...item, image_url: item.image_url || map.get(item.id).image_url });
      } else {
        map.set(item.id, item);
      }
    });

    const merged = Array.from(map.values()).sort((a: any, b: any) => {
      const scoreA = getNewsDateScore(a);
      const scoreB = getNewsDateScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return (b.id || 0) - (a.id || 0);
    });
    setNews(merged);
    setStorageData(NEWS_KEY, merged);

    if (remoteData.length > 0) {
      const remoteIds = new Set(remoteData.map(r => r.id));
      const unsyncedLocals = localData.filter((l: any) => l.id && !remoteIds.has(l.id));
      if (unsyncedLocals.length > 0) {
        try {
          await supabase.from('news').upsert(unsyncedLocals.map((item: any) => ({
            id: item.id,
            date: item.date,
            title: item.title,
            content: item.content,
            image_url: item.image_url
          })));
        } catch (err) {
          console.error('Self-healing sync failed:', err);
        }
      }
    }
  };

  useEffect(() => {
    fetchNews();
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
        await supabase.from('news').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      setStorageData(NEWS_KEY, updated);
    }
  };

  const openModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ date: item.date || '', title: item.title || '', content: item.content || '', image_url: item.image_url || '' });
    } else {
      setEditingId(null);
      setFormData({ date: new Date().toISOString().split('T')[0], title: '', content: '', image_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = editingId || Date.now();
    const newItem = { id: newId, ...formData };

    try {
      if (editingId) {
        const { error } = await supabase.from('news').update(formData).eq('id', editingId);
        if (error) {
          const { image_url, ...dbPayload } = formData;
          await supabase.from('news').update(dbPayload).eq('id', editingId);
        }
      } else {
        const { error } = await supabase.from('news').insert([newItem]);
        if (error) {
          const { image_url, ...dbPayload } = newItem;
          await supabase.from('news').insert([dbPayload]);
        }
      }
    } catch (err) {
      console.error('Supabase save error:', err);
    }

    let updated;
    if (editingId) {
      updated = news.map(n => n.id === editingId ? { ...n, ...formData } : n);
    } else {
      updated = [newItem, ...news];
    }
    const sorted = [...updated].sort((a, b) => getNewsDateScore(b) - getNewsDateScore(a));
    setNews(sorted);
    setStorageData(NEWS_KEY, sorted);
    setIsModalOpen(false);
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          뉴스 관리
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">총 {filteredNews.length}건</span>
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="제목 검색" 
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
            뉴스 추가
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-4 font-bold">등록일</th>
              <th className="py-3 px-4 font-bold">이미지</th>
              <th className="py-3 px-4 font-bold w-1/2">제목</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map(item => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{item.date}</td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  {item.image_url ? (
                    <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                  ) : (
                    <span className="text-slate-300 text-xs font-mono">-</span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{item.title}</td>
                <td className="py-3 px-4 text-sm text-right flex justify-end gap-2">
                  <button 
                    onClick={() => openModal(item)}
                    className="p-1.5 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors cursor-pointer"
                    title="수정"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredNews.length === 0 && (
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
            <h3 className="text-xl font-bold text-slate-800 mb-6">{editingId ? '뉴스 수정' : '새 뉴스 추가'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">등록일</label>
                <input required type="text" placeholder="예: 2026.07.15" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">제목</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              
              {/* 이미지 첨부 섹션 */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700">대표 이미지 첨부</label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">📁 컴퓨터 파일 업로드</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileChange}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">🔗 또는 이미지 URL 직접 입력</span>
                    <input 
                      type="text" 
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url} 
                      onChange={e => setFormData({...formData, image_url: e.target.value})} 
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs bg-white" 
                    />
                  </div>
                </div>

                {/* 이미지 미리보기 */}
                {formData.image_url && (
                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-4">
                    <img src={formData.image_url} alt="미리보기" className="w-20 h-20 object-cover rounded-lg border border-slate-300 shadow-sm" />
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, image_url: ''})} 
                      className="text-xs text-red-500 hover:text-red-700 underline font-medium cursor-pointer"
                    >
                      이미지 삭제
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">본문 내용</label>
                <textarea required rows={8} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer">취소</button>
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors cursor-pointer">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
