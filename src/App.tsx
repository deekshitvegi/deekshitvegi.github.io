
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AIChatWidget from './components/AIChatWidget';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SolutionsPage from './pages/SolutionsPage';
import SupportPage from './pages/SupportPage';
import { Theme, ThemeClasses } from './types';
import { slugify } from './utils/slugify';
import { productsData as staticProductsData } from './constants';
import SearchModal from './components/SearchModal';
import PartnersPage from './pages/PartnersPage';
import HeroSlideshow from './components/HeroSlideshow';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { isAuthenticated, getSession } from './services/authService';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(
      () => {
          if (typeof window !== 'undefined') {
              return (localStorage.getItem('vkt-theme') as Theme) || 'light';
          }
          return 'light';
      }
    );
    const [currentPage, setCurrentPage] = useState('home');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.substring(1);
            if (hash) setCurrentPage(hash);
            setIsAdmin(isAuthenticated());
            const session = getSession();
            if (session) setCurrentUser(session.email);
        }
    }, []);

    const themeClasses: ThemeClasses = useMemo(() => theme === 'dark'
        ? {
            mainBg: 'bg-slate-900',
            text: 'text-slate-300',
            cardBg: 'bg-slate-800',
            accent: 'text-red-500',
            button: 'bg-red-600 hover:bg-red-700 text-white',
            border: 'border-slate-700',
        }
        : {
            mainBg: 'bg-slate-50',
            text: 'text-slate-700',
            cardBg: 'bg-white',
            accent: 'text-red-700',
            button: 'bg-red-700 hover:bg-red-800 text-white',
            border: 'border-slate-200',
        }, [theme]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('vkt-theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#f8fafc');
            }
        }
    }, [theme]);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPage(window.location.hash.substring(1) || 'home');
            setIsAdmin(isAuthenticated());
            const session = getSession();
            if (session) setCurrentUser(session.email);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = useCallback((path: string) => {
        window.scrollTo(0, 0);
        window.location.hash = path;
    }, []);
    
    const openSearch = useCallback(() => setIsSearchOpen(true), []);
    const closeSearch = useCallback(() => setIsSearchOpen(false), []);

    const handleLoginSuccess = (role: 'admin' | 'user') => {
        if (role === 'admin') {
            setIsAdmin(true);
            // Stays on page, which will re-render dashboard
        } else {
            setCurrentUser(getSession()?.email || 'User');
            navigate('home'); // Redirect regular users to home
        }
    };

    const renderContent = useCallback(() => {
        const parts = currentPage.split('/');
        
        if (parts[0] === 'products') {
            if (parts.length >= 2) {
                return <ProductsPage categorySlug={parts[1]} initialTabSlug={parts[2]} themeClasses={themeClasses} setCurrentPage={navigate} />;
            }
            const firstCategorySlug = slugify(Object.keys(staticProductsData)[0]);
            return <ProductsPage categorySlug={firstCategorySlug} themeClasses={themeClasses} setCurrentPage={navigate} />;
        }

        if (parts[0] === 'product' && parts.length === 2) {
            const productId = parts[1];
            return <ProductDetailPage productId={productId} themeClasses={themeClasses} setCurrentPage={navigate} />;
        }

        switch (parts[0]) {
            case 'home':
                return <HomePage themeClasses={themeClasses} setCurrentPage={navigate} />;
            case 'about':
                return <AboutPage themeClasses={themeClasses} />;
            case 'contact':
                return <ContactPage themeClasses={themeClasses} />;
            case 'solutions':
                return <SolutionsPage themeClasses={themeClasses} />;
            case 'support':
                return <SupportPage themeClasses={themeClasses} />;
            case 'partners':
                 return <PartnersPage themeClasses={themeClasses} />;
            case 'admin':
            case 'login':
                return isAdmin 
                    ? <AdminDashboardPage themeClasses={themeClasses} /> 
                    : <AdminLoginPage themeClasses={themeClasses} onLogin={handleLoginSuccess} />;
            default:
                return <HomePage themeClasses={themeClasses} setCurrentPage={navigate} />;
        }
    }, [currentPage, themeClasses, navigate, isAdmin]);
    
    const isHomePage = currentPage.split('/')[0] === 'home' || currentPage === '';

    return (
        <div className={`${themeClasses.mainBg} ${themeClasses.text} min-h-screen font-sans transition-colors duration-500 relative`}>
             <style>{`
                html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif; }
                .dark {
                  --tw-bg-opacity: 1;
                  background-color: rgb(2 6 23 / var(--tw-bg-opacity));
                }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'}; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: ${theme === 'dark' ? '#ef4444' : '#b91c1c'}; border-radius: 10px; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .chat-content p { margin-bottom: 0.5rem; }
                .chat-content p:last-child { margin-bottom: 0; }
                .chat-content ul { list-style: disc; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
                .chat-content li { margin-bottom: 0.25rem; }
                .chat-content strong { font-weight: 600; color: ${theme === 'dark' ? '#f9fafb' : '#111827'}; }
                .chat-content a { color: ${theme === 'dark' ? '#f87171' : '#dc2626'}; text-decoration: underline; }
            `}</style>
            
            <Header theme={theme} themeClasses={themeClasses} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} setCurrentPage={navigate} currentPage={currentPage} openSearch={openSearch} currentUser={currentUser} isAdmin={isAdmin} />
            
            {isHomePage && <HeroSlideshow setCurrentPage={navigate} />}

            <main className={`max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ${isHomePage ? 'pt-0' : ''}`}>
                {renderContent()}
            </main>

            <Footer setCurrentPage={navigate} />
            <AIChatWidget themeClasses={themeClasses} navigate={navigate} />
            <ScrollToTop themeClasses={themeClasses} />
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={closeSearch} 
                themeClasses={themeClasses} 
                setCurrentPage={(path) => {
                    navigate(path);
                    closeSearch();
                }}
            />
        </div>
    );
};

export default App;
