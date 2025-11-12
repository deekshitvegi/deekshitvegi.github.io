import { ProductDetails } from "../types";

export const productDetailsData: ProductDetails[] = [
    {
        id: "hytera-hp788",
        name: "Hytera HP788",
        tagline: "Professional DMR Two-Way Radio",
        classification: "Handheld | Digital | DMR",
        description: "The Hytera HP788 is a next-generation professional DMR radio that delivers enhanced functionality, user experience, and robustness. It features AI-based noise cancellation, extended battery life, and superior audio quality, making it the ideal communication tool for critical situations.",
        highlights: [
            {
                icon: 'speaker-wave',
                title: "AI-Based Noise Cancellation",
                description: "Reduces background noise by up to 30dB, ensuring crystal-clear audio in loud environments.",
            },
            {
                icon: 'battery-100',
                title: "Extended Battery Life",
                description: "A 2400mAh smart battery provides up to 24 hours of operation on a single charge.",
            },
            {
                icon: 'signal',
                title: "Enhanced Coverage",
                description: "Improved receiver sensitivity extends the communication range and enhances signal quality at the edge of coverage.",
            },
            {
                icon: 'shield-check',
                title: "IP68 Ruggedness",
                description: "Fully submersible in water and completely dustproof, built to withstand the harshest conditions.",
            },
            {
                icon: 'lifebuoy',
                title: "Advanced Safety Features",
                description: "Includes Man Down, Lone Worker, and an emergency button to ensure user safety at all times.",
            },
            {
                icon: 'cube-transparent',
                title: "Slim & Lightweight Design",
                description: "Ergonomically designed for comfort and ease of use during long shifts.",
            },
        ],
        specifications: {
            "General": {
                "Frequency Range": "UHF: 400-527MHz | VHF: 136-174MHz",
                "Channel Capacity": "1024",
                "Zone Capacity": "64",
                "Operating Voltage": "7.7V (Rated)",
                "Battery": "2400mAh Li-Polymer (Smart Battery)",
                "Battery Life (5/5/90)": "Up to 24 hours",
                "Dimensions (H×W×D)": "132 x 55 x 29.5mm",
                "Weight": "290g (with antenna & battery)",
            },
            "Environmental": {
                "Operating Temperature": "-30℃ to +60℃",
                "Storage Temperature": "-40℃ to +85℃",
                "Dust and Water Intrusion": "IP68 Standard",
                "Humidity": "Per MIL-STD-810G",
            },
        },
        accessories: {
            standard: ["Smart Li-Polymer Battery (2400mAh)", "Desktop Charger", "Standard UHF/VHF Antenna", "Belt Clip", "Nylon Strap"],
            optional: ["Remote Speaker Microphone", "6-Unit Multi-Charger", "Covert Earpiece", "High-Gain Antenna", "Leather Carry Case"],
        },
        relatedProducts: ["Hytera HP708", "Motorola R7", "Kenwood NX-32 Series"],
    },
    {
        id: "motorola-r7",
        name: "Motorola R7",
        tagline: "MOTOTRBO™ Next Generation Digital Radio",
        classification: "Handheld | Digital | DMR",
        description: "The Motorola R7 is a digital portable two-way radio that offers loud, clear, and customizable audio in a rugged, dependable, and connected device. Its advanced audio processing ensures that your voice is always understood, while its rugged construction is ready for the toughest environments.",
        highlights: [
            {
                icon: 'speaker-wave',
                title: "Advanced Audio Processing",
                description: "Delivers exceptional loudness and clarity with industrial-level noise cancellation and automatic feedback suppression.",
            },
            {
                icon: 'battery-100',
                title: "Sleek and Rugged",
                description: "IP68 rated for water and dust protection, built to MIL-STD 810 standards for durability in harsh conditions.",
            },
            {
                icon: 'wifi',
                title: "Wi-Fi & Bluetooth",
                description: "Enables fast, wireless programming, location tracking, and connectivity to wireless accessories and sensors.",
            },
            {
                icon: 'cpu-chip',
                title: "Next-Gen Features",
                description: "A large color screen and modern user interface make for intuitive operation and access to advanced features.",
            },
        ],
        specifications: {
            "General": {
                "Frequency Band": "VHF, UHF",
                "Power Output": "VHF: 5W, UHF: 4W",
                "Channel Capacity": "1000",
                "Dimensions (H x W x D)": "132 x 56 x 31 mm",
                "Weight": "316g (with standard battery)",
            },
             "Environmental": {
                "Operating Temperature": "-30°C to +60°C",
                "Dust and Water Intrusion": "IP68",
            },
        },
        accessories: {
            standard: ["Standard Li-Ion Battery", "Single-Unit Charger", "Antenna", "Belt Clip"],
            optional: ["IMPRES Windporting Remote Speaker Microphone", "IMPRES 6-unit Multi-Charger", "Operations Critical Wireless Earpiece"],
        },
        relatedProducts: ["Hytera HP788", "Motorola XiR P6620i", "Kenwood NX-32 Series"],
    },
     {
        id: "kenwood-nx-1200",
        name: "Kenwood NX-1200",
        tagline: "NEXEDGE Multi-Protocol Digital Radio",
        classification: "Handheld | Digital | NXDN/DMR",
        description: "The Kenwood NX-1200 is a versatile and affordable radio that supports both NXDN and DMR digital protocols, as well as mixed digital & FM analog operation. It's an ideal solution for businesses looking to migrate from analog to digital at their own pace.",
        highlights: [
            {
                icon: 'cpu-chip',
                title: "Dual Protocol Support",
                description: "Operates in both NXDN and DMR digital modes, providing flexibility and a future-proof investment.",
            },
             {
                icon: 'speaker-wave',
                title: "Superior Audio Quality",
                description: "Features Kenwood's renowned audio for clear communication, even in noisy industrial environments.",
            },
            {
                icon: 'shield-check',
                title: "Compact Yet Robust",
                description: "Meets MIL-STD-810 C/D/E/F/G standards for durability and is IP54/55 rated for dust and water resistance.",
            },
        ],
        specifications: {
            "General": {
                "Frequency Range": "VHF: 136-174 MHz | UHF: 400-520 MHz",
                "Max Channels": "260 (64 for basic model)",
                "RF Power Output": "5W (VHF) / 4W (UHF)",
                 "Battery Life": "Approx. 11 hours (KNB-45L battery)",
            },
        },
        accessories: {
            standard: ["Li-ion Battery Pack (KNB-45L)", "Desktop Charger (KSC-35S)", "Antenna", "Belt Clip"],
            optional: ["Speaker Microphone (KMC-21)", "Heavy-duty Earpiece", "6-Unit Charger (KSC-356)"],
        },
        relatedProducts: ["Hytera HP508", "Motorola R2 VHF", "Hytera BP518"],
    },
    {
        id: "hytera-hp708",
        name: "Hytera HP708",
        tagline: "Professional DMR Two-Way Radio",
        classification: "Handheld | Digital | DMR",
        description: "The Hytera HP708 is a professional DMR radio that offers a perfect balance of functionality and design. With its loud and clear audio, long-lasting battery, and rugged build, it's designed to perform in various demanding work environments.",
        highlights: [
             {
                icon: 'speaker-wave',
                title: "Loud and Clear Audio",
                description: "A forward-facing speaker and AI-based noise cancellation ensure voice is heard clearly, even in noisy places.",
            },
             {
                icon: 'battery-100',
                title: "24-Hour Battery Life",
                description: "The standard 2400mAh smart battery provides a long operational life, lasting through extended shifts.",
            },
            {
                icon: 'shield-check',
                title: "Rugged and Durable",
                description: "IP68 rated and built to MIL-STD-810G standards, ensuring reliability in tough conditions.",
            },
        ],
        specifications: {
            "General": {
                "Frequency Range": "UHF: 400-527MHz | VHF: 136-174MHz",
                "Channel Capacity": "1024",
                 "Battery": "2400mAh Li-Polymer",
                "Dimensions (H×W×D)": "132 x 55 x 29.5mm",
            },
        },
        accessories: {
            standard: ["Smart Battery", "Charger", "Antenna", "Belt Clip"],
            optional: ["Remote Speaker Mic", "Covert Earpiece", "Multi-Unit Charger"],
        },
        relatedProducts: ["Hytera HP788", "Motorola R7", "Hytera HP688"],
    },
    {
        id: "hytera-pt580h-plus",
        name: "Hytera PT580H Plus",
        tagline: "TETRA Handheld Terminal",
        classification: "Handheld | Digital | TETRA",
        description: "The Hytera PT580H Plus is a feature-rich TETRA radio designed for mission-critical communications. It provides robust voice and data services, high-level security, and a rugged design, making it ideal for public safety, transportation, and utilities.",
        highlights: [
             {
                icon: 'speaker-wave',
                title: "Crystal Clear Audio",
                description: "Adopts advanced audio technology to ensure loud and clear voice quality in various noise environments.",
            },
            {
                icon: 'lock-closed',
                title: "High-Level Security",
                description: "Supports TETRA Air Interface Encryption (AIE) and End-to-End Encryption (E2EE) for secure communications.",
            },
            {
                icon: 'device-phone-mobile',
                title: "User-Friendly Interface",
                description: "Features a large, high-resolution color display and an intuitive UI for easy operation.",
            },
        ],
        specifications: {
            "General": {
                "Frequency Band": "350-400MHz, 380-430MHz, 405-475MHz, 806-870MHz",
                "RF Power": "3W (Class 3)",
                "Ingress Protection": "IP67",
                "Display": "1.8 inch TFT LCD (160x128 pixels)",
            },
        },
        accessories: {
            standard: ["Li-ion Battery", "Single Unit Charger", "Antenna", "Belt Clip"],
            optional: ["Remote Speaker Microphone", "Tactical Headset", "Vehicular Adapter", "Multi-Unit Charger"],
        },
        relatedProducts: ["Hytera PT590", "Hytera MT680 Plus", "Motorola MTP3550"],
    }
];
