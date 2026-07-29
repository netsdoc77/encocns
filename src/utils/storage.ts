import initialProjectData from '../data/projectsData.json';
import initialNewsData from '../data/newsData.json';
import initialCareersData from '../data/careersData.json';
import initialInquiriesData from '../data/inquiriesData.json';

export const ADMIN_USERS_KEY = 'encocns_admin_users';
export const PROJECTS_KEY = 'encocns_projects';
export const NEWS_KEY = 'encocns_news';
export const CAREERS_KEY = 'encocns_careers';
export const INQUIRIES_KEY = 'encocns_inquiries';
export const APPLICATIONS_KEY = 'encocns_applications';

// 초기 어드민 계정 데이터 (이름: 최영환, 역할: 수퍼관리자)
const initialAdminUsers = [
  { id: 1, username: 'encocns2011', password: '12345678', name: '최영환', role: '수퍼관리자' }
];

export const initializeStorage = () => {
  const existingUsers = localStorage.getItem(ADMIN_USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(initialAdminUsers));
  } else {
    // 기존에 저장된 데이터의 '슈퍼관리자' 또는 'admin' 역할을 '최영환' 및 '수퍼관리자'로 갱신
    try {
      const parsed = JSON.parse(existingUsers);
      const updated = parsed.map((u: any) => {
        if (u.username === 'encocns2011') {
          return { ...u, name: '최영환', role: '수퍼관리자' };
        }
        return u;
      });
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(updated));
    } catch (e) {
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(initialAdminUsers));
    }
  }
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjectData));
  }
  if (!localStorage.getItem(NEWS_KEY)) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(initialNewsData));
  }
  if (!localStorage.getItem(CAREERS_KEY)) {
    localStorage.setItem(CAREERS_KEY, JSON.stringify(initialCareersData));
  }
  if (!localStorage.getItem(INQUIRIES_KEY)) {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(initialInquiriesData));
  }
};

export const getStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
