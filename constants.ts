import { NavItem, ProductsData } from './types';

export const navItems: NavItem[] = [
  { name: 'Home', path: 'home', subItems: [] },
  { name: 'Products', path: 'products', subItems: [] },
  { 
    name: 'Partners', 
    path: 'partners', 
    subItems: [
      { name: 'Hytera', path: 'partners-hytera' },
      { name: 'Technology', path: 'partners-tech' },
    ] 
  },
  { name: 'Solutions', path: 'solutions', subItems: [] },
  { name: 'Support', path: 'support', subItems: [] },
  { name: 'About Us', path: 'about', subItems: [] },
];

export const productsData: ProductsData = {
  'Two-Way Radios': {
    icon: 'Radios',
    sections: [
      {
        title: 'DMR System',
        image: './product_images/Two way Radios/DMR/Handset/Hytera HP788.png',
        subsections: [
          { name: 'Handsets', products: ['Hytera HP788.png', 'Hytera HP708.png', 'Hytera HP688.png', 'Hytera HP608.png', 'Hytera HP568.png', 'Hytera HP508.png', 'Hytera HP708 UL913.png', 'Hytera HP788 UL913.png', 'Hytera HP508 UL913.png', 'Hytera HP568 UL913.png', 'HP798 Ex IIC.png', 'HP718 Ex IIA.png', 'Hytera BP518.png', 'Hytera BP568.png', 'Kenwood NX-1200.png', 'Kenwood NX-32 Series.png', 'Motorola R2 VHF.png', 'Motorola XiR P6600i.png', 'Motorola XiR P6620i.png', 'Motorola R7.png', 'Motorola R7 IS.png'] },
          { name: 'Base & Mobile Radios', products: ['Hytera HM788.png', 'Hytera HM658.png', 'Hytera MD628.png', 'Motorola XiR M3688.png', 'Motorola XiR M8668i.png', 'Kenwood NX-1800.png', 'Kenwood NX-3720.png'] },
          { name: 'Repeater', products: ['Hytera HR1068.png', 'Hytera HR658.png', 'Hytera DS-6310.png', 'Motorola SLR5300.png', 'Kenwood TKR-D710.png'] },
          { name: 'Radio Solutions', products: ['Hytera Standalone Analog & Digital.png', 'Hytera DMM (Dynamic Mixed Mode).png', 'Hytera Analog IP Site Connect.png', 'Hytera Digital IP Site Connect.png', 'Hytera XPT Single Site (Extended Pseudo Digital Trunking).png', 'Hytera XPT Multi-site (Extended Pseudo Digital Trunking).png', 'Hytera Smart-Dispatch-Plus.png', 'Motorola IPSC.png', 'Motorola CAP Plus.png', 'Motorola Linked CAP Plus.png'] },
          { name: 'Tier-iii Solution', products: ['Hytera DS-6250S DMR Trunking Cube Base Station.png', 'Hytera DS-9300 Bi-Directional Amplifier.png', 'Hytera DS-6210 DMR Trunking Pro Base Station.png', 'Hytera DS-6211 DMR Trunking Lite Base Station.png', 'Hytera Terminals.png', 'Hytera DMR Simulcast System.png'] },
          { name: 'Antenna & RF', products: ['High-Gain Collinear Antenna.png', 'GP Antenna.png', 'Yagi Antenna.png', 'Fiberglass Antenna.png', 'Mobile Antenna (Whip Antenna).png', 'Mobile Antenna (Magnetic Antenna).png', 'Transmitter Combiners.png', 'Duplexers.png', 'Receiver Multicoupler.png', 'Hybrid Couplers.png', 'Expandable Multicoupler.png', 'Filter-Preselector.png', 'Filter-Bandpass Cavity.png', 'Filter-Bandpass_Reject.png'] },
        ]
      },
      {
        title: 'TETRA System',
        image: './product_images/Two way Radios/TETRA_System/Handset_Terminals/Hytera PT310.png',
        subsections: [
          { name: 'Handset_Terminals', products: ['Hytera PT310.png', 'Hytera PT350.png', 'Hytera PT560H.png', 'Hytera PT580H Plus.png', 'Hytera PT590.png', 'Hytera PT580H Plus UL913.png', 'Hytera PT790Ex.png', 'Hytera PT890Ex.png'] },
          { name: 'Mobile_Terminals', products: ['Hytera MT680 Plus.png'] },
          { name: 'Base_Stations', products: ['Hytera DIB-R5 Advanced.png', 'Hytera DIB-R5 Compact.png', 'Hytera DIB-R5 outdoor.png', 'Hytera TETRA iBS.png', 'Hytera ACCESSNET®-T IP SMART.png', 'Hytera TETRA Data Gateway (DGW).png', 'Hytera TETRA network management system (NMS).png'] },
        ]
      },
      {
        title: 'Ad-Hoc Solutions',
        image: './product_images/Two way Radios/Ad-Hoc Solutions/Voice/Hytera E-Pole 200.png',
        subsections: [
          { name: 'Voice', products: ['Hytera E-Pole 200.png', 'Hytera E-Pack 200.png'] },
          { name: 'Data', products: ['Hytera E-mesh580P.png'] },
          { name: 'Mobility Dispatch', products: ['Hytera E-centre.png'] },
        ]
      },
      {
        title: 'License Free & Accessories',
        image: './product_images/Two way Radios/License Free & Accessories/Hytera/Hytera HP788 LF.png',
        subsections: [
          { name: 'Hytera', products: ['Hytera HP788 LF.png', 'Hytera HP708 LF.png', 'Hytera HP688 LF.png', 'Hytera HP608 LF.png', 'Hytera HP568 LF.png', 'Hytera HP508 LF.png', 'Hytera HP708 UL913.png', 'Hytera HP788 UL913.png', 'Hytera HP508 UL913.png', 'Hytera HP568 UL913.png', 'Hytera BP518 LF.png', 'Hytera BP568 LF.png', 'Hytera S1 mini & LF.png', 'Hytera S1 Pro & LF.png'] },
          { name: 'Kenwood', products: ['Kenwood TK-3501 LF.png', 'Kenwood TK-2000 LF.png'] },
          { name: 'Access', products: ['Access P9.png', 'Access P5.png', 'Access P3.png'] },
          { name: 'Aspera', products: ['Aspera V7.png', 'Aspera V9.png', 'Aspera VISTA.png', 'Aspera VICTOR.png', 'Aspera AD-90.png', 'Aspera VM-81.png', 'Aspera SFR-2500 (SFR).png'] },
          { name: 'Kenwee', products: ['Kenwee K50.png', 'Kenwee K100.png'] },
          { name: 'Airmob', products: ['Airmob A10.png', 'Airmob A11.png'] },
          { name: 'Skyphone', products: ['Skyfone S111.png', 'Skyfone S-550.png', 'Skyfone S-570.png', 'Skyfone S-580.png', 'Skyfone-SDR5188.png'] },
          { name: 'I-Comm', products: ['IU-20SR.png'] },
          { name: 'Accessories', products: ['Helical Antenna.png', 'Battery.png', 'Earphones.png', 'Cables.png', 'Chargers.png', 'Multi-unit chargers.png', 'Carry case.png', 'Radio Spares.png', 'Power Supply Units.png', 'In-line Surge protection.png', 'Connectors.png'] },
        ]
      },
    ],
  },
  'MCS & PoC Solutions': {
      icon: 'MCS',
      sections: [
          {
              title: 'PoC Radios',
              image: 'https://placehold.co/300x200/991b1b/FFFFFF?text=PoC+Radios',
              subsections: [
                  { name: 'Handheld PoC', products: ['Hytera PNC380.png', 'Hytera PNC550.png', 'Motorola TLK 100.png'] }
              ]
          },
          {
              title: 'Platforms',
              image: 'https://placehold.co/300x200/991b1b/FFFFFF?text=Platforms',
              subsections: [
                  { name: 'Hytera HyTalk', products: ['Hytera HyTalk Pro.png', 'Hytera HyTalk Lite.png'] }
              ]
          }
      ]
  },
  'Body Worn Cameras': {
      icon: 'BWC',
      sections: [
          {
              title: 'Bodycams',
               image: 'https://placehold.co/300x200/991b1b/FFFFFF?text=Bodycams',
              subsections: [
                  { name: '4G Bodycams', products: ['Hytera VM780.png', 'Hytera VM580D.png'] }
              ]
          },
          {
              title: 'Management',
              image: 'https://placehold.co/300x200/991b1b/FFFFFF?text=Management',
              subsections: [
                  { name: 'Evidence Management', products: ['Hytera SmartDEMS.png', 'Digital Evidence Management.png'] }
              ]
          }
      ]
  }
};