import React from 'react';
import { ThemeClasses } from '../types';

const AboutPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    return (
        <div className={`${themeClasses.text} space-y-12`}>
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>About VKT Services</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    Your trusted partner in professional communication and security solutions since 2008.
                </p>
            </div>

            <div className={`p-8 md:p-12 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="md:col-span-2">
                        <h2 className={`text-3xl font-bold mb-4 ${themeClasses.text}`}>Our Story</h2>
                        <p className="text-lg opacity-90 leading-relaxed">
                            VKT Services Private Limited is a wholesale trader and service provider based in Secunderabad, specializing in two-way radios (walkie-talkies), radio repeaters, and other security and communication equipment like CCTV cameras, biometric systems, and X-ray baggage scanners. Established in 2008, the company also offers installation and maintenance services for many of its products.
                        </p>

                        <h3 className={`text-2xl font-bold mt-8 mb-4 ${themeClasses.text}`}>Services & Products</h3>
                        <ul className="list-disc list-inside space-y-2 opacity-90">
                            <li><strong>Two-Way Radios:</strong> A prominent supplier of walkie-talkies, including brands like Kenwood.</li>
                            <li><strong>Radio Repeaters:</strong> We provide and install radio repeaters to extend the range of wireless communication systems.</li>
                            <li><strong>Security and Surveillance:</strong> Products include CCTV cameras, trap cameras, X-ray baggage scanners, and under-vehicle scanning systems.</li>
                            <li><strong>Access Control:</strong> We supply biometric attendance systems, face and fingerprint recognition devices, door frame metal detectors, and spike barrier tyre killers.</li>
                            <li><strong>Other Equipment:</strong> Offerings include guard tour systems, automatic number plate recognition systems, and wireless headphones.</li>
                        </ul>
                    </div>

                    <div className={`${themeClasses.mainBg} p-6 rounded-lg border ${themeClasses.border}`}>
                        <h3 className={`text-xl font-bold mb-4 ${themeClasses.accent}`}>Company Information</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="font-semibold">Established:</p>
                                <p className="opacity-80">2008</p>
                            </div>
                             <div>
                                <p className="font-semibold">CEO:</p>
                                <p className="opacity-80">Venkata Krishnam Naidu Vegi</p>
                            </div>
                            <div>
                                <p className="font-semibold">Business Type:</p>
                                <p className="opacity-80">Wholesale & Service Provider</p>
                            </div>
                            <div>
                                <p className="font-semibold">Status:</p>
                                <p className="opacity-80">Active</p>
                            </div>
                            <div>
                                <p className="font-semibold">Address:</p>
                                <p className="opacity-80">Flat No. 205, Medharesidency, Syed Jalal Garden, Marredpally, West Marredpally, Secunderabad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
