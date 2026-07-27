import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('.env 파일이 존재하지 않습니다.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length > 0) {
    envVars[key.trim()] = vals.join('=').trim();
  }
});

const url = envVars['VITE_SUPABASE_URL'];
const key = envVars['VITE_SUPABASE_ANON_KEY'];

if (!url || !key) {
  console.error('Supabase URL 또는 Key가 .env에 존재하지 않습니다.');
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  console.log('🚀 Supabase 데이터 자동 마이그레이션을 시작합니다...');

  // 1. Projects
  const projects = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/projectsData.json'), 'utf8'));
  console.log(`📦 Projects (${projects.length}개) 마이그레이션 중...`);
  for (const item of projects) {
    const { id, period, title, client, description } = item;
    const { error } = await supabase.from('projects').upsert({ id, period, title, client, description });
    if (error) console.error(`Projects id=${id} 에러:`, error.message);
  }

  // 2. News
  const news = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/newsData.json'), 'utf8'));
  console.log(`📰 News (${news.length}개) 마이그레이션 중...`);
  for (const item of news) {
    const { id, date, title, content } = item;
    const { error } = await supabase.from('news').upsert({ id, date, title, content });
    if (error) console.error(`News id=${id} 에러:`, error.message);
  }

  // 3. Careers
  const careers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/careersData.json'), 'utf8'));
  console.log(`💼 Careers (${careers.length}개) 마이그레이션 중...`);
  for (const item of careers) {
    const { id, date, badge, title, content } = item;
    const { error } = await supabase.from('careers').upsert({ id, date, badge, title, content });
    if (error) console.error(`Careers id=${id} 에러:`, error.message);
  }

  // 4. Inquiries
  const inquiries = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/inquiriesData.json'), 'utf8'));
  console.log(`✉️ Inquiries (${inquiries.length}개) 마이그레이션 중...`);
  for (const item of inquiries) {
    const { id, type, name, email, phone, company, content, status, createdAt, date } = item;
    const created_at = createdAt || date || new Date().toISOString();
    const { error } = await supabase.from('inquiries').upsert({ id, type: type || '기타 문의', name, email, phone, company: company || '미입력', content, status: status || '접수완료', created_at });
    if (error) console.error(`Inquiries id=${id} 에러:`, error.message);
  }

  console.log('✅ 모든 JSON 데이터가 Supabase 실시간 DB로 완벽하게 이전되었습니다!');
}

seed().catch(err => {
  console.error('마이그레이션 예외 발생:', err);
});
