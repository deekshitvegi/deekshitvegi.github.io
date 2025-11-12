import React from 'react';
import { ThemeClasses } from '../types';

const partners = [
    { name: 'Hytera', logo: '/hytera-logo-gs.png', description: 'As an authorized partner, we provide the full range of Hytera\'s innovative DMR, TETRA, and PoC communication solutions, backed by official support and warranty.' },
    { name: 'Motorola Solutions', logo: '/motorola-logo-gs.png', description: 'We offer a selection of Motorola\'s industry-leading MOTOTRBO digital radios, known for their reliability, durability, and advanced features.' },
    { name: 'Kenwood', logo: '/kenwood-logo-gs.png', description: 'Our portfolio includes versatile and robust two-way radios from Kenwood, offering excellent audio quality and multi-protocol capabilities.' },
];

const PartnersPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    return (
        <div className={`${themeClasses.text} space-y-12 animate-fade-in-up`}>
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>Our Technology Partners</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    We collaborate with the world's leading communication technology providers to deliver robust and reliable solutions to our clients.
                </p>
            </div>

            <div className="space-y-10">
                {partners.map((partner, index) => (
                    <div key={partner.name} className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="md:w-1/4 flex justify-center p-4">
                            <img src={partner.logo} alt={`${partner.name} Logo`} className="h-12 md:h-16 object-contain grayscale" />
                        </div>
                        <div className="md:w-3/4">
                            <h2 className={`text-3xl font-bold mb-3 ${themeClasses.text}`}>{partner.name}</h2>
                            <p className="text-lg opacity-90 leading-relaxed">{partner.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersPage;
