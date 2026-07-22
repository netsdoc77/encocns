import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiMenu3Line, RiCloseLine } from '@remixicon/react';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // const toggleTheme = () => {
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { name: t('header.about'), path: '/about' },
    { name: t('header.business'), path: '/business' },
    { name: t('header.solution'), path: '/solution' },
    { name: t('header.projects'), path: '/projects' },
    { name: t('header.news'), path: '/news' },
    { name: t('header.careers'), path: '/careers' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={`${import.meta.env.BASE_URL}logo.svg`} 
            alt="ENCOCNS Logo" 
            className="h-10 md:h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-10 pr-10">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`group relative text-base font-bold transition-colors py-2 whitespace-nowrap
                  ${isActive 
                    ? 'text-primary' 
                    : isScrolled ? 'text-slate-700 hover:text-primary dark:text-slate-300' : 'text-slate-800 hover:text-primary dark:text-slate-200'
                  }`}
              >
                {link.name}
                {/* Active & Hover Underline Effect */}
                <span className={`absolute left-0 bottom-0 w-full h-[3px] rounded-full bg-primary transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          {/* <button onClick={toggleTheme} className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {theme === 'dark' ? <RiSunLine size={22} /> : <RiMoonLine size={22} />}
          </button> */}
          {/* <button onClick={toggleLang} className="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            <RiGlobalLine size={20} />
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </button> */}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800 dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface dark:bg-surface-dark shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
                {link.name}
              </Link>
            );
          })}
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-2"></div>
          {/* <button onClick={toggleLang} className="text-left font-bold text-slate-800 dark:text-slate-200">
            Language: {i18n.language === 'ko' ? 'English' : '한국어'}
          </button> */}
        </div>
      )}
    </header>
  );
}
