
import React from 'react';

interface FooterProps {
    setCurrentPage: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    return (
        <footer className={`bg-slate-800 text-slate-300 border-t border-slate-700`}>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img src="/vkt services logo.png" alt="VKT Logo" className="w-9 h-9 mr-3 rounded-full" />
                            <h2 className="text-xl font-bold text-red-500">VKT SERVICES</h2>
                        </div>
                        <p className="text-sm text-slate-400">
                            Your trusted partner in professional communication and security solutions since 2008.
                        </p>
                        <div className="space-y-2 text-sm text-slate-400">
                           <p><strong>Address:</strong> 4-14-59, Samrat Colony, West Marredpally, Secunderabad, Telangana 500026, India</p>
                           <p><strong>Phone:</strong> <a href="tel:+919989106669" className="hover:text-white">+91 9989106669</a></p>
                           <p><strong>Email:</strong> <a href="mailto:vktechn@gmail.com" className="hover:text-white">vktechn@gmail.com</a></p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-sm text-slate-400 hover:text-white transition">About Us</a></li>
                            <li><a href="#solutions" onClick={(e) => { e.preventDefault(); setCurrentPage('solutions'); }} className="text-sm text-slate-400 hover:text-white transition">Solutions</a></li>
                            <li><a href="#support" onClick={(e) => { e.preventDefault(); setCurrentPage('support'); }} className="text-sm text-slate-400 hover:text-white transition">Support</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className="text-sm text-slate-400 hover:text-white transition">Contact Us</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Product Categories */}
                     <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Products</h3>
                        <ul className="mt-4 space-y-3">
                             <li><a href="#products/two-way-radios" onClick={(e) => { e.preventDefault(); setCurrentPage('products/two-way-radios'); }} className="text-sm text-slate-400 hover:text-white transition">Two-Way Radios</a></li>
                             <li><a href="#products/mcs-poc-solutions" onClick={(e) => { e.preventDefault(); setCurrentPage('products/mcs-poc-solutions'); }} className="text-sm text-slate-400 hover:text-white transition">MCS & PoC Solutions</a></li>
                             <li><a href="#products/body-worn-cameras" onClick={(e) => { e.preventDefault(); setCurrentPage('products/body-worn-cameras'); }} className="text-sm text-slate-400 hover:text-white transition">Body Worn Cameras</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Partners */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Our Key Partners</h3>
                        <div className="mt-4 space-y-5">
                            <a href="https://www.hytera.com/" target="_blank" rel="noopener noreferrer" className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hytera_logo.png" alt="Hytera" className="h-8 brightness-0 invert" />
                            </a>
                            <a href="https://www.motorolasolutions.com/" target="_blank" rel="noopener noreferrer" className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Motorola_Solutions_Logo.svg" alt="Motorola Solutions" className="h-10 brightness-0 invert" />
                            </a>
                            <a href="https://www.kenwood.com/usa/com/" target="_blank" rel="noopener noreferrer" className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Kenwood_logo.svg" alt="Kenwood" className="h-6 brightness-0 invert" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-400">&copy; {new Date().getFullYear()} VKT Services. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0 items-center">
                        <a href="#" className="text-slate-400 hover:text-white transition">Terms of Use</a>
                        <a href="#" className="text-slate-400 hover:text-white transition">Privacy Policy</a>
                        <span className="text-slate-600">|</span>
                        <a href="#login" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }} className="text-slate-500 hover:text-white transition">Admin Access</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
