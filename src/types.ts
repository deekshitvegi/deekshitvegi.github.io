
export type Theme = 'light' | 'dark';

export interface ThemeClasses {
    mainBg: string;
    text: string;
    cardBg: string;
    accent: string;
    button: string;
    border: string;
}

export interface NavSubItem {
    name: string;
    path: string;
}

export interface NavItem {
    name: string;
    path: string;
    subItems: NavSubItem[];
}

export interface ProductSubsection {
    name: string;
    products: string[];
}

export interface ProductSection {
    title: string;
    image?: string; // Optional image for mega menu display
    subsections: ProductSubsection[];
}

export interface ProductCategory {
    icon: string;
    image?: string;
    sections: ProductSection[];
}

export interface ProductsData {
    [key: string]: ProductCategory;
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    sources?: {
        uri: string;
        title: string;
    }[];
}

// Types for Product Detail Page
export interface ProductHighlight {
  title: string;
  description: string;
  icon: string; // Changed to string to accommodate Heroicon names
}

export interface ProductSpecification {
  [category: string]: {
    [spec: string]: string;
  };
}

export interface ProductDetails {
  id: string; 
  name: string;
  tagline: string;
  classification: string;
  description: string;
  highlights: ProductHighlight[];
  specifications: ProductSpecification;
  accessories: {
    standard: string[];
    optional: string[];
  };
  relatedProducts: string[];
  // FIX: Added optional brochureUrl property to support the brochure download feature.
  brochureUrl?: string;
}

export interface ProductSearchResult {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  section: string;
  subsection: string;
}
