import React from 'react';
import { ThemeClasses } from '../types';

interface FooterProps {
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
        <span className="sr-only">{label}</span>
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

const Footer: React.FC<FooterProps> = ({ themeClasses, setCurrentPage }) => {
    return (
        <footer className={`bg-slate-800 text-slate-300 border-t ${themeClasses.border}`}>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Top section: Logo and Newsletter */}
                <div className={`border-b border-slate-700 pb-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
                    <div className="flex items-center">
                        <img src="./vkt-logo.jpg" alt="VKT Logo" className="w-10 h-10 mr-3 rounded-full" onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = "https://placehold.co/40x40/991b1b/FFFFFF?text=VKT"; }}/>
                        <h2 className={`text-2xl font-bold text-red-500`}>VKT SERVICES</h2>
                    </div>
                    <form className="w-full max-w-sm">
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Your Email Address*"
                                className="w-full px-4 py-2 text-slate-300 bg-slate-700 border border-slate-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Main grid section */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Column 1: Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-sm text-slate-400 hover:text-white transition">About Us</a></li>
                            <li><a href="#partners" onClick={(e) => { e.preventDefault(); setCurrentPage('partners'); }} className="text-sm text-slate-400 hover:text-white transition">Partners</a></li>
                             <li><a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className="text-sm text-slate-400 hover:text-white transition">Contact Us</a></li>
                        </ul>
                    </div>
                    {/* Column 2: Products */}
                     <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Products</h3>
                        <ul className="mt-4 space-y-3">
                             <li><a href="#products" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }} className="text-sm text-slate-400 hover:text-white transition">Two-Way Radios</a></li>
                             <li><a href="#products" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }} className="text-sm text-slate-400 hover:text-white transition">MCS & PoC Solutions</a></li>
                             <li><a href="#products" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }} className="text-sm text-slate-400 hover:text-white transition">Body Worn Cameras</a></li>
                        </ul>
                    </div>
                     {/* Column 3: Support */}
                     <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-3">
                             <li><a href="#support" onClick={(e) => { e.preventDefault(); setCurrentPage('support'); }} className="text-sm text-slate-400 hover:text-white transition">Service Center</a></li>
                             <li><a href="#support" onClick={(e) => { e.preventDefault(); setCurrentPage('support'); }} className="text-sm text-slate-400 hover:text-white transition">Training Courses</a></li>
                             <li><a href="#support" onClick={(e) => { e.preventDefault(); setCurrentPage('support'); }} className="text-sm text-slate-400 hover:text-white transition">Warranty Lookup</a></li>
                        </ul>
                    </div>
                     {/* Column 4: Contact */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Follow Us</h3>
                        <div className="flex mt-4 space-x-5">
                             <SocialIcon href="#" label="Facebook" path="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                             <SocialIcon href="#" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                             <SocialIcon href="#" label="YouTube" path="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.752,2,12,2,12s0,4.248,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.248,22,12,22,12S22,7.752,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
                        </div>
                    </div>
                </div>

                {/* Partners section */}
                <div className="mt-12 border-t border-slate-700 pt-8">
                     <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Our Key Partners</h3>
                     <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        <div className="flex justify-center">
                            <img src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg" alt="Hytera" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex justify-center">
                            <img src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg" alt="Motorola" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                        </div>
                         <div className="flex justify-center">
                            <img src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg" alt="Kenwood" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                        </div>
                         <div className="flex justify-center">
                            <img src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg" alt="Kenwood" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                        </div>
                     </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-400">&copy; {new Date().getFullYear()} VKT Services. Est. 2007. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="text-slate-400 hover:text-white transition">Terms of Use</a>
                        <a href="#" className="text-slate-400 hover:text-white transition">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;