import initialProjectData from '../data/projectsData.json';
import initialNewsData from '../data/newsData.json';
import initialCareersData from '../data/careersData.json';
import initialInquiriesData from '../data/inquiriesData.json';

const ADMIN_USERS_KEY = 'encocns_admin_users';
const PROJECTS_KEY = 'encocns_projects';
const NEWS_KEY = 'encocns_news';
const CAREERS_KEY = 'encocns_careers';
const INQUIRIES_KEY = 'encocns_inquiries';

// Mock initial admin user
const initialAdminUsers = [
  { id: 1, username: 'encocns2011', password: '12345678', name: '슈퍼관리자', role: 'admin' }
];

export const initializeStorage = () => {
  if (!localStorage.getItem(ADMIN_USERS_KEY)) {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(initialAdminUsers));
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

export { ADMIN_USERS_KEY, PROJECTS_KEY, NEWS_KEY, CAREERS_KEY, INQUIRIES_KEY };
