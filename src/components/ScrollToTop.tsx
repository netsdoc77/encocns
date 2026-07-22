import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Save scroll position
  useEffect(() => {
    let timeoutId: any = null;
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };
    
    const scrollListener = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [pathname]);

  // Restore scroll position or scroll to top
  useEffect(() => {
    if (navType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }, 10);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}
