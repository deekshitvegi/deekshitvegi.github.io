import React from 'react';
import { ThemeClasses } from '../types';
import Accordion from '../components/Accordion';

const supportItems = [
    {
        title: 'Installation & Commissioning',
        description: 'Our certified technicians provide professional installation and commissioning for all communication systems. We ensure your equipment is set up for optimal performance, coverage, and reliability from day one, including system integration and user configuration.',
        icon: 'wrench-screwdriver',
    },
    {
        title: 'Maintenance & Repair',
        description: 'We offer comprehensive maintenance contracts and on-demand repair services to keep your equipment in peak condition. Regular check-ups prevent downtime, and our expert team quickly diagnoses and resolves any issues that arise.',
        icon: 'cog-6-tooth',
    },
    {
        title: 'Warranty Support',
        description: 'As authorized partners, we facilitate full manufacturer warranty support for all Hytera, Motorola, and Kenwood products purchased through us. We manage the process to ensure your claims are handled efficiently.',
        icon: 'shield-check',
    },
    {
        title: 'Product Training',
        description: 'Empower your team with our product training sessions. We provide end-user and administrator training to ensure your staff can effectively use all the features of your new communication system, maximizing your investment.',
        icon: 'academic-cap',
    },
];

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const iconMap: { [key: string]: React.ReactElement } = {
        'wrench-screwdriver': <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.375 3.375 0 0 0 0-4.773L6.75 2.25 2.25 6.75l7.727 7.727a3.375 3.375 0 0 0 4.774 0Z" />,
        'cog-6-tooth': <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.625a2.25 2.25 0 0 1-2.36 0l-7.5-4.625A2.25 2.25 0 0 1 2.25 6.993V6.75" />,
        'shield-check': <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.38-2.752-1.057-3.949A11.953 11.953 0 0 1 12 2.75Z" />,
        'academic-cap': <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />,
    };

    return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>{iconMap[name]}</svg>;
};

const faqs = [
    { question: "How do I get a quote for a new system?", answer: "The best way is to fill out our contact form with details about your needs. A sales representative will get back to you with a customized quote." },
    { question: "What is the warranty period on your products?", answer: "Warranty periods vary by manufacturer and product. Typically, professional radios come with a 1-2 year warranty. We will confirm the specific warranty for any product you purchase." },
    { question: "Can you service equipment that was not purchased from VKT Services?", answer: "Yes, in many cases we can. Please contact our support team with the make and model of your equipment to confirm if we can service it." },
];

const SupportPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    return (
        <div className={`${themeClasses.text} space-y-16 animate-fade-in-up`}>
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>Support Center</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    Dedicated to providing you with the best service and support for your communication equipment.
                </p>
            </div>

            <section>
                 <h2 className={`text-3xl font-bold text-center mb-10 ${themeClasses.accent}`}>Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {supportItems.map((item) => (
                        <div key={item.title} className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}>
                            <div className="flex items-center mb-4">
                                <div className={`flex-shrink-0 ${themeClasses.button} rounded-lg p-3 mr-4 shadow-lg`}>
                                    <Icon name={item.icon} className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`text-xl font-bold ${themeClasses.text}`}>{item.title}</h3>
                            </div>
                            <p className="opacity-90 flex-grow">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                <div className={`lg:col-span-3 p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg`}>
                    <h2 className={`text-3xl font-bold mb-6`}>Submit a Support Ticket</h2>
                     <form className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name <span className={themeClasses.accent}>*</span></label>
                                <input required type="text" id="name" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className={themeClasses.accent}>*</span></label>
                                <input required type="email" id="email" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject <span className={themeClasses.accent}>*</span></label>
                            <input required type="text" id="subject" placeholder="e.g., Radio Repair, System Quote" className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`} />
                        </div>
                        <div>
                            <label htmlFor="details" className="block text-sm font-medium mb-1">Please describe your issue <span className={themeClasses.accent}>*</span></label>
                            <textarea required id="details" rows={5} className={`w-full p-2.5 rounded-md ${themeClasses.mainBg} border ${themeClasses.border} focus:ring-2 focus:ring-red-500 outline-none`}></textarea>
                        </div>
                        <div>
                            <button type="submit" className={`w-full py-3 rounded-md font-semibold text-lg transition-transform hover:scale-[1.02] ${themeClasses.button} shadow-lg`}>
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:col-span-2 flex flex-col">
                    <h2 className={`text-3xl font-bold mb-6`}>FAQs</h2>
                    <div className="space-y-4">
                         {faqs.map((faq, index) => (
                            <Accordion key={index} question={faq.question} answer={faq.answer} themeClasses={themeClasses} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SupportPage;
