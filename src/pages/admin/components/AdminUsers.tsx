import { useState, useEffect } from 'react';
import { getStorageData, setStorageData, ADMIN_USERS_KEY } from '../../../utils/storage';
import { RiAddLine, RiDeleteBinLine, RiSearchLine } from '@remixicon/react';
import { supabase } from '../../../lib/supabase';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '', role: 'admin' });

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('admin_users').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) {
        // DB 데이터 중 '슈퍼관리자'가 남아있는 경우 '최영환'으로 자동 업데이트 시도
        const needUpdate = data.find(u => u.username === 'encocns2011' && u.name === '슈퍼관리자');
        if (needUpdate) {
          await supabase.from('admin_users').update({ name: '최영환', role: '수퍼관리자' }).eq('username', 'encocns2011');
          data.forEach(u => {
            if (u.username === 'encocns2011') {
              u.name = '최영환';
              u.role = '수퍼관리자';
            }
          });
        }
        setUsers(data);
        return;
      }
    } catch (err) {
      console.error('Supabase error:', err);
    }
    setUsers(getStorageData(ADMIN_USERS_KEY));
  };

  useEffect(() => {
    fetchUsers();
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
        const { error } = await supabase.from('admin_users').delete().eq('id', id);
        if (!error) {
          fetchUsers();
          return;
        }
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      setStorageData(ADMIN_USERS_KEY, updated);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('admin_users').insert([formData]);
      if (!error) {
        fetchUsers();
        setIsModalOpen(false);
        setFormData({ username: '', password: '', name: '', role: 'admin' });
        return;
      }
    } catch (err) {
      console.error('Supabase save error:', err);
    }

    const newUser = {
      ...formData,
      id: Date.now()
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setStorageData(ADMIN_USERS_KEY, updated);
    setIsModalOpen(false);
    setFormData({ username: '', password: '', name: '', role: 'admin' });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
    u.username.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          관리자 목록
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">총 {filteredUsers.length}건</span>
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="이름 또는 아이디 검색" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64"
            />
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RiAddLine size={18} />
            사용자 추가
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* 사용자 관리 목록 테이블 헤더 */}
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-4 font-bold">번호</th>
              <th className="py-3 px-4 font-bold">아이디</th>
              <th className="py-3 px-4 font-bold">이름</th>
              <th className="py-3 px-4 font-bold">역할</th>
              <th className="py-3 px-4 font-bold text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-sm text-slate-600">{user.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{user.username}</td>
                {/* 사용자 이름 (슈퍼관리자 표기 시 최영환으로 보완 표시) */}
                <td className="py-3 px-4 text-sm text-slate-600">
                  {user.name === '슈퍼관리자' ? '최영환' : user.name}
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  {/* 역할 표기: admin인 경우 수퍼관리자로 표시 */}
                  <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs">
                    {user.role === 'admin' ? '수퍼관리자' : user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-right flex justify-end gap-2">
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                    title="삭제"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 새 사용자 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">새 사용자 추가</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">아이디</label>
                <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호</label>
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">이름</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
