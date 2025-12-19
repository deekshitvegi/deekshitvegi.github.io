import React from 'react';
import { ThemeClasses } from '../types';

const ContactPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    return (
        <div className={`${themeClasses.text} space-y-12`}>
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>Contact Us</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    We're here to help. Reach out to us with any questions or for a quote on our products and services.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
                {/* Contact Info & Map */}
                <div className="lg:col-span-2 space-y-8">
                    <div className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-4 ${themeClasses.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <a href="tel:+919989106669" className="hover:underline">+91 9989106669</a>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-4 ${themeClasses.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href="mailto:vktechn@gmail.com" className="hover:underline">vktechn@gmail.com</a>
                            </div>
                            <div className="flex items-start">
                               <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-4 mt-1 flex-shrink-0 ${themeClasses.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>4-14-59, Samrat Colony, Suman Housing Colony, West Marredpally, Secunderabad, Telangana 500026, India</span>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-2xl ${themeClasses.border} border shadow-lg overflow-hidden h-80`}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.568113458641!2d78.50422967592455!3d17.43265710156976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a1758103c2d%3A0x868d47d256157858!2sMedha%20Residency!5e0!3m2!1sen!2sin!4v1721157697198!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="VKT Services Location"
                        ></iframe>
                    </div>
                </div>

                {/* Enquiry Form */}
                <div className={`lg:col-span-3 p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg`}>
                    <h2 className={`text-3xl font-bold mb-2`}>Want to Learn More?</h2>
                    <p className="mb-6 opacity-80">A VKT representative will contact you shortly after you complete the form below.</p>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium mb-1">First Name <span className={themeClasses.accent}>*</span></label>
                                <input required type="text" id="first-name" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium mb-1">Last Name <span className={themeClasses.accent}>*</span></label>
                                <input required type="text" id="last-name" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                             <div>
                                <label htmlFor="company-name" className="block text-sm font-medium mb-1">Company Name <span className={themeClasses.accent}>*</span></label>
                                <input required type="text" id="company-name" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                            <div>
                                <label htmlFor="business-email" className="block text-sm font-medium mb-1">Business Email <span className={themeClasses.accent}>*</span></label>
                                <input required type="email" id="business-email" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                                <input type="tel" id="phone" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry <span className={themeClasses.accent}>*</span></label>
                                <select required id="industry" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`}>
                                    <option>Please Select</option>
                                    <option>Construction</option>
                                    <option>Hospitality</option>
                                    <option>Manufacturing</option>
                                    <option>Public Safety</option>
                                    <option>Security</option>
                                    <option>Transportation</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="business-needs" className="block text-sm font-medium mb-1">Please describe your business needs <span className={themeClasses.accent}>*</span></label>
                            <textarea required id="business-needs" rows={5} placeholder="Please provide any specific business needs, project details, or questions..." className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`}></textarea>
                        </div>
                        <div className="flex items-start">
                            <input id="agree" type="checkbox" className="h-4 w-4 mt-0.5 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                            <label htmlFor="agree" className="ml-2 text-sm">I agree to receive information about VKT's products, solutions and offerings.</label>
                        </div>
                        <div>
                            <button type="submit" className={`w-full py-3 rounded-md font-semibold text-lg transition-transform hover:scale-[1.02] ${themeClasses.button} shadow-lg`}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;