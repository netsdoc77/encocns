import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import BusinessDetail from './pages/BusinessDetail';
import Solution from './pages/Solution';
import Projects from './pages/Projects';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Careers from './pages/Careers';
import CareersDetail from './pages/CareersDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="business" element={<Business />} />
          <Route path="business/:categoryId" element={<BusinessDetail />} />
          <Route path="solution" element={<Solution />} />
          <Route path="projects" element={<Projects />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:id" element={<CareersDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
