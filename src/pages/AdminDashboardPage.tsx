
import React, { useState, useMemo } from 'react';
import { ThemeClasses } from '../types';
import { logout } from '../services/authService';
import { getProductsData, saveCustomProduct, removeCustomProduct, getCustomProducts, generateConstantsCode, getCustomProductAttributes } from '../services/productsManager';
import { generateProductDetails } from '../services/geminiService';
import { getProductDetails } from '../services/productDetailService';
import { slugify } from '../utils/slugify';

interface AdminDashboardPageProps {
    themeClasses: ThemeClasses;
}

// MAX SAFE LIMIT for LocalStorage is ~5MB total. 
// Setting single file limit to ~4MB to allow room for code.
const MAX_FILE_SIZE_KB = 4500; 

type Tab = 'overview' | 'add' | 'manage' | 'publish';

// Helper component for Image/File Inputs
const ImageInput = ({ 
    label, 
    sourceType, 
    setSourceType, 
    urlValue, 
    setUrlValue, 
    base64Value, 
    fileType,
    themeClasses,
    onFileUpload
}: { 
    label: string, 
    sourceType: 'url' | 'upload', 
    setSourceType: (t: 'url' | 'upload') => void, 
    urlValue: string, 
    setUrlValue: (v: string) => void, 
    base64Value: string,
    fileType: 'image' | 'brochure' | 'categoryImage' | 'sectionImage',
    themeClasses: ThemeClasses,
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'brochure' | 'categoryImage' | 'sectionImage') => void
}) => (
    <div className={`mt-2 p-4 rounded-lg border ${themeClasses.border} ${themeClasses.mainBg} text-sm`}>
        <label className="block font-bold mb-3 uppercase text-xs tracking-wider opacity-70">{label}</label>
        
        <div className="flex gap-4 mb-3">
            <label className="cursor-pointer flex items-center font-medium"><input type="radio" checked={sourceType === 'upload'} onChange={() => setSourceType('upload')} className="mr-2 accent-red-600" /> Upload File</label>
            <label className="cursor-pointer flex items-center font-medium"><input type="radio" checked={sourceType === 'url'} onChange={() => setSourceType('url')} className="mr-2 accent-red-600" /> Paste URL</label>
        </div>

        {sourceType === 'upload' ? (
            <div className={`border-2 border-dashed p-4 rounded-lg text-center transition-colors ${themeClasses.border} hover:border-red-500/50 bg-white/5 relative group`}>
                <input type="file" accept={fileType === 'brochure' ? "application/pdf" : "image/*"} onChange={(e) => onFileUpload(e, fileType)} className="hidden" id={`upload-${fileType}`} />
                
                {!base64Value ? (
                    <label htmlFor={`upload-${fileType}`} className="cursor-pointer flex flex-col items-center justify-center py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2 opacity-50 group-hover:text-red-500 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="text-red-500 font-bold hover:underline">Click to Choose File</span>
                        <span className="text-xs opacity-50 mt-1">Max {MAX_FILE_SIZE_KB/1000}MB</span>
                    </label>
                ) : (
                    <div className="relative">
                         {/* PREVIEW SECTION */}
                        {fileType === 'brochure' ? (
                            <div className="flex items-center justify-center p-4 bg-red-500/10 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-500 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                <div className="text-left">
                                    <p className="font-bold text-sm">PDF Ready</p>
                                    <p className="text-xs opacity-60">File loaded successfully</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative inline-block">
                                <img src={base64Value} alt="Preview" className="h-32 w-auto object-contain rounded-md shadow-md bg-white" />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">Ready</div>
                            </div>
                        )}
                        <label htmlFor={`upload-${fileType}`} className="block mt-3 text-xs text-red-500 cursor-pointer hover:underline">Change File</label>
                    </div>
                )}
            </div>
        ) : (
            <div className="space-y-2">
                <input type="text" value={urlValue} onChange={e => setUrlValue(e.target.value)} placeholder="https://example.com/image.jpg" className={`w-full p-3 rounded-lg border ${themeClasses.border} bg-transparent outline-none focus:ring-1 focus:ring-red-500`} />
                {urlValue && fileType !== 'brochure' && (
                    <div className="mt-2 p-2 border rounded bg-white/5 text-center">
                        <img src={urlValue} alt="URL Preview" className="h-24 mx-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                )}
            </div>
        )}
    </div>
);

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ themeClasses }) => {
    const allData = useMemo(() => getProductsData(), []);
    const customProducts = getCustomProducts();
    const existingCategories = Object.keys(allData);

    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Search to Edit State
    const [editSearch, setEditSearch] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    // Selection States
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubsection, setSelectedSubsection] = useState('');
    
    // "Create New" States
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSection, setIsNewSection] = useState(false);
    const [isNewSubsection, setIsNewSubsection] = useState(false);
    
    // Input Values
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSectionName, setNewSectionName] = useState('');
    const [newSubsectionName, setNewSubsectionName] = useState('');
    const [productName, setProductName] = useState('');
    
    // Rich Details State
    const [tagline, setTagline] = useState('');
    const [classification, setClassification] = useState('');
    const [description, setDescription] = useState('');
    const [specifications, setSpecifications] = useState<{key: string, value: string}[]>([]);
    const [standardAccessories, setStandardAccessories] = useState('');
    
    // AI Loading State
    const [isGenerating, setIsGenerating] = useState(false);

    // File/Source States
    const [imageSourceType, setImageSourceType] = useState<'url' | 'upload'>('upload');
    const [imageUrl, setImageUrl] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    
    const [brochureSourceType, setBrochureSourceType] = useState<'url' | 'upload'>('upload');
    const [brochureUrl, setBrochureUrl] = useState('');
    const [brochureBase64, setBrochureBase64] = useState('');

    // New Category/Section Images
    const [categoryImageSourceType, setCategoryImageSourceType] = useState<'url' | 'upload'>('upload');
    const [categoryImageUrl, setCategoryImageUrl] = useState('');
    const [categoryImageBase64, setCategoryImageBase64] = useState('');

    const [sectionImageSourceType, setSectionImageSourceType] = useState<'url' | 'upload'>('upload');
    const [sectionImageUrl, setSectionImageUrl] = useState('');
    const [sectionImageBase64, setSectionImageBase64] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Export State
    const [generatedCode, setGeneratedCode] = useState('');

    // --- Handlers ---

    const handleEditSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setEditSearch(query);
        if (query.length > 1) {
            const results: string[] = [];
            Object.values(allData).forEach(cat => {
                cat.sections.forEach(sec => {
                    sec.subsections.forEach(sub => {
                        sub.products.forEach(p => {
                             const cleanName = p.replace(/\.[^/.]+$/, "");
                             if (cleanName.toLowerCase().includes(query.toLowerCase())) {
                                 results.push(cleanName);
                             }
                        });
                    });
                });
            });
            setSearchResults(Array.from(new Set(results)).slice(0, 10));
        } else {
            setSearchResults([]);
        }
    };

    const selectProductForEdit = (pName: string) => {
        // Find product location to autofill category/section
        let found = false;
        Object.entries(allData).forEach(([catTitle, catData]) => {
            catData.sections.forEach(sec => {
                sec.subsections.forEach(sub => {
                     const match = sub.products.find(p => p.replace(/\.[^/.]+$/, "") === pName);
                     if (match && !found) {
                         setSelectedCategory(catTitle);
                         setSelectedSection(sec.title);
                         setSelectedSubsection(sub.name);
                         found = true;
                     }
                });
            });
        });

        setProductName(pName);
        setEditSearch('');
        setSearchResults([]);

        // Load existing details if available (Custom first, then Static via DetailService)
        const pId = slugify(pName);
        const details = getProductDetails(pId);
        
        if (details) {
             setTagline(details.tagline);
             setClassification(details.classification);
             setDescription(details.description);
             
             const specArr: {key: string, value: string}[] = [];
             if (details.specifications) {
                 Object.values(details.specifications).forEach(group => {
                     Object.entries(group).forEach(([k, v]) => specArr.push({key: k, value: v}));
                 });
             }
             setSpecifications(specArr);
             setStandardAccessories(details.accessories.standard.join(', '));
             
             // Handle images/brochures if they are custom URLs
             if (details.brochureUrl) {
                 setBrochureSourceType('url');
                 setBrochureUrl(details.brochureUrl);
             }
        }
        
        // Check if custom attributes exist specifically to load image base64
        const customAttrs = getCustomProductAttributes(pName);
        if (customAttrs) {
            if (customAttrs.imageSource?.startsWith('data:')) {
                setImageSourceType('upload');
                setImageBase64(customAttrs.imageSource);
            } else if (customAttrs.imageSource) {
                setImageSourceType('url');
                setImageUrl(customAttrs.imageSource);
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'brochure' | 'categoryImage' | 'sectionImage') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE_KB * 1024) {
            setErrorMsg(`File too large! Limit is ${MAX_FILE_SIZE_KB/1000}MB. Please compress it or use a URL.`);
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            if (type === 'image') setImageBase64(base64String);
            else if (type === 'brochure') setBrochureBase64(base64String);
            else if (type === 'categoryImage') setCategoryImageBase64(base64String);
            else if (type === 'sectionImage') setSectionImageBase64(base64String);
            setErrorMsg('');
        };
        reader.readAsDataURL(file);
    };

    // Derived data for dropdowns
    const sections = !isNewCategory && selectedCategory && allData[selectedCategory] 
        ? allData[selectedCategory].sections 
        : [];
        
    const subsections = !isNewCategory && !isNewSection && selectedSection 
        ? sections.find(s => s.title === selectedSection)?.subsections || []
        : [];

    // --- AI Handler ---
    const handleAutoFill = async () => {
        if (!productName) {
            setErrorMsg("Please enter a Product Name first.");
            return;
        }
        setIsGenerating(true);
        setErrorMsg('');
        
        try {
            const details = await generateProductDetails(productName);
            if (details) {
                setTagline(details.tagline || '');
                setClassification(details.classification || '');
                setDescription(details.description || '');
                setStandardAccessories((details.standardAccessories || []).join(', '));
                
                const specsArray = Object.entries(details.specifications || {}).map(([key, value]) => ({ key, value }));
                setSpecifications(specsArray);
                
                setSuccessMsg("Auto-fill successful! Review the details below.");
            } else {
                setErrorMsg("AI could not find details for this product. Please fill manually.");
            }
        } catch (e) {
            setErrorMsg("Error connecting to AI service.");
        } finally {
            setIsGenerating(false);
        }
    };

    const addSpecRow = () => setSpecifications([...specifications, { key: '', value: '' }]);
    const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
        const newSpecs = [...specifications];
        newSpecs[index][field] = val;
        setSpecifications(newSpecs);
    };
    const removeSpec = (index: number) => {
        const newSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(newSpecs);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        const finalCategory = isNewCategory ? newCategoryName.trim() : selectedCategory;
        const finalSection = isNewSection ? newSectionName.trim() : selectedSection;
        const finalSubsection = isNewSubsection ? newSubsectionName.trim() : selectedSubsection;

        if (!finalCategory || !finalSection || !finalSubsection || !productName) {
            setErrorMsg("Please fill in all required fields.");
            return;
        }

        // Image logic
        let finalImageSource = undefined;
        if (imageSourceType === 'upload' && imageBase64) finalImageSource = imageBase64;
        else if (imageSourceType === 'url' && imageUrl) finalImageSource = imageUrl;

        let finalBrochureSource = undefined;
        if (brochureSourceType === 'upload' && brochureBase64) {
            finalBrochureSource = brochureBase64;
        } else if (brochureSourceType === 'url' && brochureUrl) {
            finalBrochureSource = brochureUrl;
        }

        let finalCategoryImage = undefined;
        if (isNewCategory) {
            if (categoryImageSourceType === 'upload' && categoryImageBase64) finalCategoryImage = categoryImageBase64;
            else if (categoryImageSourceType === 'url' && categoryImageUrl) finalCategoryImage = categoryImageUrl;
        }

        let finalSectionImage = undefined;
        if (isNewSection) {
            if (sectionImageSourceType === 'upload' && sectionImageBase64) finalSectionImage = sectionImageBase64;
            else if (sectionImageSourceType === 'url' && sectionImageUrl) finalSectionImage = sectionImageUrl;
        }

        const specsObj: { [key: string]: string } = {};
        specifications.forEach(s => {
            if (s.key && s.value) specsObj[s.key] = s.value;
        });

        let relatedProductsList: string[] = [];
        if (allData[finalCategory]) {
            const potentialRelated: string[] = [];
            allData[finalCategory].sections.forEach(s => {
                s.subsections.forEach(sub => {
                    sub.products.forEach(p => {
                        const pName = p.endsWith('.png') ? p.substring(0, p.lastIndexOf('.')) : p;
                        if (pName !== productName) potentialRelated.push(pName);
                    });
                });
            });
            relatedProductsList = potentialRelated.sort(() => 0.5 - Math.random()).slice(0, 4);
        }

        saveCustomProduct({
            name: productName,
            category: finalCategory,
            section: finalSection,
            subsection: finalSubsection,
            imageSource: finalImageSource,
            brochureSource: finalBrochureSource,
            tagline,
            classification,
            description,
            specifications: specsObj,
            standardAccessories: standardAccessories.split(',').map(s => s.trim()).filter(s => s),
            highlights: [
                { icon: 'shield-check', title: 'Rugged Design', description: 'Built for durability in tough environments.' },
                { icon: 'speaker-wave', title: 'Crystal Clear Audio', description: 'Advanced audio processing technology.' }
            ],
            relatedProducts: relatedProductsList,
            categoryImage: finalCategoryImage,
            sectionImage: finalSectionImage
        });
        
        setSuccessMsg('Product saved successfully! Page will reload...');
    };

    const handleGenerateCode = () => {
        const code = generateConstantsCode();
        setGeneratedCode(code);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Code copied!");
    };

    // --- RENDER TABS ---

    const renderOverview = () => (
        <div className="space-y-6 animate-fade-in-up">
            <div className={`p-8 rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-2 ${themeClasses.accent}`}>Welcome, Admin!</h2>
                <p className="opacity-80 text-lg">You have full control over the VKT Services product catalog.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-sm`}>
                    <p className="text-sm opacity-70 font-bold uppercase">Custom Products</p>
                    <p className={`text-4xl font-extrabold mt-2 ${themeClasses.text}`}>{customProducts.length}</p>
                </div>
                <div 
                    onClick={() => setActiveTab('add')}
                    className={`p-6 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg cursor-pointer hover:scale-105 transition-transform`}
                >
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">Add / Edit Product</p>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <p className="text-sm opacity-90 mt-2">Add items, specs & brochures</p>
                </div>
                <div 
                     onClick={() => setActiveTab('publish')}
                     className={`p-6 rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-sm cursor-pointer hover:border-red-500 transition-colors`}
                >
                     <p className="text-sm opacity-70 font-bold uppercase">System Status</p>
                     <p className={`text-lg font-bold mt-2 ${themeClasses.accent}`}>Ready to Publish</p>
                     <p className="text-xs opacity-60 mt-1">Generate code to save changes</p>
                </div>
            </div>
        </div>
    );

    const renderAddForm = () => (
        <div className={`p-6 sm:p-8 rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-xl animate-fade-in-up`}>
             
             {/* SEARCH TO EDIT */}
             <div className="relative mb-8 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-70 text-red-600">Search to Edit Existing Product</label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={editSearch}
                        onChange={handleEditSearch}
                        placeholder="Type product name to edit (e.g. Hytera HP788)..."
                        className={`w-full p-3 rounded-lg border ${themeClasses.border} ${themeClasses.mainBg} outline-none`}
                    />
                    {searchResults.length > 0 && (
                        <div className={`absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-lg shadow-xl ${themeClasses.cardBg} border ${themeClasses.border}`}>
                            {searchResults.map(name => (
                                <div 
                                    key={name} 
                                    onClick={() => selectProductForEdit(name)}
                                    className={`p-2 hover:bg-gray-500/10 cursor-pointer ${themeClasses.text}`}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
             </div>

             <form onSubmit={handleAdd} className="space-y-6">
                {/* Category/Section Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 1. Category */}
                    <div>
                        <label className="block text-xs font-bold mb-1 uppercase opacity-70">1. Category</label>
                        {isNewCategory ? (
                            <>
                                <input type="text" placeholder="New Category" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none`} />
                                <ImageInput 
                                    label="Category Image (Optional)"
                                    sourceType={categoryImageSourceType}
                                    setSourceType={setCategoryImageSourceType}
                                    urlValue={categoryImageUrl}
                                    setUrlValue={setCategoryImageUrl}
                                    base64Value={categoryImageBase64}
                                    fileType="categoryImage"
                                    themeClasses={themeClasses}
                                    onFileUpload={handleFileUpload}
                                />
                            </>
                        ) : (
                            <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setSelectedSection(''); setSelectedSubsection(''); }} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none`}>
                                <option value="">-- Select --</option>
                                {existingCategories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}
                        <button type="button" onClick={() => setIsNewCategory(!isNewCategory)} className="text-xs text-red-500 mt-1 underline">{isNewCategory ? 'Select Existing' : 'Create New'}</button>
                    </div>
                    {/* 2. Section */}
                    <div>
                        <label className="block text-xs font-bold mb-1 uppercase opacity-70">2. Section</label>
                        {isNewSection || isNewCategory ? (
                            <>
                                <input type="text" placeholder="New Section" value={newSectionName} onChange={e => setNewSectionName(e.target.value)} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none`} />
                                <ImageInput 
                                    label="Section Image (Optional)"
                                    sourceType={sectionImageSourceType}
                                    setSourceType={setSectionImageSourceType}
                                    urlValue={sectionImageUrl}
                                    setUrlValue={setSectionImageUrl}
                                    base64Value={sectionImageBase64}
                                    fileType="sectionImage"
                                    themeClasses={themeClasses}
                                    onFileUpload={handleFileUpload}
                                />
                            </>
                        ) : (
                            <select value={selectedSection} onChange={e => { setSelectedSection(e.target.value); setSelectedSubsection(''); }} disabled={!selectedCategory} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none disabled:opacity-50`}>
                                <option value="">-- Select --</option>
                                {sections.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                            </select>
                        )}
                        <button type="button" onClick={() => setIsNewSection(!isNewSection)} className="text-xs text-red-500 mt-1 underline">{isNewSection ? 'Select Existing' : 'Create New'}</button>
                    </div>
                    {/* 3. Subsection */}
                    <div>
                        <label className="block text-xs font-bold mb-1 uppercase opacity-70">3. Subsection</label>
                        {isNewSubsection || isNewSection || isNewCategory ? (
                            <input type="text" placeholder="New Subsection" value={newSubsectionName} onChange={e => setNewSubsectionName(e.target.value)} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none`} />
                        ) : (
                            <select value={selectedSubsection} onChange={e => setSelectedSubsection(e.target.value)} disabled={!selectedSection} className={`w-full p-2 rounded-md border ${themeClasses.border} ${themeClasses.mainBg} outline-none disabled:opacity-50`}>
                                <option value="">-- Select --</option>
                                {subsections.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </select>
                        )}
                        <button type="button" onClick={() => setIsNewSubsection(!isNewSubsection)} className="text-xs text-red-500 mt-1 underline">{isNewSubsection ? 'Select Existing' : 'Create New'}</button>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                {/* 4. Product Name & AI Button */}
                <div className="flex items-end gap-4">
                    <div className="flex-grow">
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-70">4. Product Name</label>
                        <input 
                            type="text" 
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            placeholder="E.g., Hytera HP788"
                            className={`w-full p-3 rounded-lg border ${themeClasses.border} ${themeClasses.mainBg} outline-none font-semibold`}
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={handleAutoFill}
                        disabled={isGenerating}
                        className={`px-4 py-3 rounded-lg font-bold text-white ${themeClasses.button} shadow-md transition-all hover:scale-105 disabled:opacity-50 flex items-center`}
                    >
                        {isGenerating ? 'Thinking...' : '✨ Auto-fill with AI'}
                    </button>
                </div>

                {/* Rich Details Section */}
                <div className={`bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4`}>
                    <h3 className="font-bold text-sm uppercase opacity-70 border-b pb-2">Product Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1">Classification</label>
                            <input type="text" value={classification} onChange={e => setClassification(e.target.value)} placeholder="Handheld | Digital" className={`w-full p-2 rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Tagline</label>
                            <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Reliable Communication" className={`w-full p-2 rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium mb-1">Description</label>
                        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className={`w-full p-2 rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Standard Accessories (comma separated)</label>
                        <input type="text" value={standardAccessories} onChange={e => setStandardAccessories(e.target.value)} className={`w-full p-2 rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Specifications (Key : Value)</label>
                        {specifications.map((spec, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input type="text" placeholder="Key (e.g. Weight)" value={spec.key} onChange={e => updateSpec(idx, 'key', e.target.value)} className={`w-1/3 p-1 text-sm rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                                <input type="text" placeholder="Value (e.g. 290g)" value={spec.value} onChange={e => updateSpec(idx, 'value', e.target.value)} className={`w-2/3 p-1 text-sm rounded border ${themeClasses.border} ${themeClasses.mainBg}`} />
                                <button type="button" onClick={() => removeSpec(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={addSpecRow} className="text-xs text-blue-500 underline">+ Add Specification</button>
                    </div>
                </div>

                {/* 5. Image Source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-70">5. Image</label>
                        <ImageInput 
                            label="Product Image"
                            sourceType={imageSourceType}
                            setSourceType={setImageSourceType}
                            urlValue={imageUrl}
                            setUrlValue={setImageUrl}
                            base64Value={imageBase64}
                            fileType="image"
                            themeClasses={themeClasses}
                            onFileUpload={handleFileUpload}
                        />
                    </div>
                    
                    {/* 6. Brochure Source */}
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-70">6. Brochure (Opt)</label>
                        <ImageInput 
                            label="PDF Brochure"
                            sourceType={brochureSourceType}
                            setSourceType={setBrochureSourceType}
                            urlValue={brochureUrl}
                            setUrlValue={setBrochureUrl}
                            base64Value={brochureBase64}
                            fileType="brochure"
                            themeClasses={themeClasses}
                            onFileUpload={handleFileUpload}
                        />
                    </div>
                </div>

                {errorMsg && <div className="bg-red-100 text-red-700 p-4 rounded">{errorMsg}</div>}
                {successMsg && <div className="bg-green-100 text-green-700 p-4 rounded">{successMsg}</div>}

                <button 
                    type="submit"
                    className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg ${themeClasses.button} transition-transform active:scale-95`}
                >
                    Save Product to Catalog
                </button>
            </form>
        </div>
    );

    const renderManage = () => (
        <div className={`p-6 rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-xl animate-fade-in-up`}>
            <h2 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>Manage Custom Products</h2>
            {customProducts.length === 0 ? (
                <div className="text-center py-20 opacity-60">
                    <p className="italic text-lg">No custom products found.</p>
                    <button onClick={() => setActiveTab('add')} className="mt-4 text-red-500 underline">Add your first product</button>
                </div>
            ) : (
                <ul className="space-y-4">
                    {customProducts.slice().reverse().map(p => (
                        <li key={p.id} className={`p-4 rounded-lg border ${themeClasses.border} flex gap-4 items-center ${themeClasses.mainBg}`}>
                            <div className="w-16 h-16 flex-shrink-0 rounded bg-white overflow-hidden border border-gray-200">
                                {p.imageSource ? <img src={p.imageSource} className="w-full h-full object-contain" /> : <div className="text-xs text-center pt-6">Img</div>}
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-bold text-lg truncate">{p.name}</p>
                                <p className="text-sm opacity-70 truncate">{p.category} &gt; {p.section}</p>
                                <p className="text-xs opacity-50">{new Date(p.timestamp).toLocaleString()}</p>
                            </div>
                            <button 
                                onClick={() => {
                                    if(confirm(`Delete ${p.name}?`)) removeCustomProduct(p.id);
                                }} 
                                className="px-3 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const renderPublish = () => (
        <div className={`p-8 rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-xl animate-fade-in-up`}>
            <h2 className={`text-2xl font-bold mb-4 ${themeClasses.accent}`}>🚀 Publish to GitHub</h2>
            <p className="text-lg opacity-80 mb-6">
                Since this is a static website hosted on GitHub Pages, changes made here are only saved in your browser. 
                To make them visible to everyone on the internet, you need to update your project code.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300 opacity-90">
                    <li>Click the "Generate Configuration" button below.</li>
                    <li>Copy the generated code.</li>
                    <li>Open your project in VS Code (or your editor).</li>
                    <li>Open the file <code className="bg-black/10 px-1 rounded">src/constants.ts</code>.</li>
                    <li>Replace the entire content of that file with the code below.</li>
                    <li>Commit and push your changes to GitHub.</li>
                </ol>
            </div>

            <button onClick={() => { handleGenerateCode(); }} className={`w-full py-4 rounded-lg font-bold text-lg border ${themeClasses.border} hover:bg-gray-500/10 transition-colors mb-6`}>
                Generate Configuration Code
            </button>
            
            {generatedCode && (
                <div className="relative">
                    <textarea readOnly value={generatedCode} className={`w-full h-96 p-4 rounded-lg text-xs font-mono border ${themeClasses.border} ${themeClasses.mainBg} focus:outline-none shadow-inner`} />
                    <button onClick={copyToClipboard} className={`absolute top-4 right-4 ${themeClasses.button} text-xs px-4 py-2 rounded shadow hover:scale-105 transition-transform`}>Copy Code</button>
                </div>
            )}
        </div>
    );
    
    return (
        <div className={`flex flex-col lg:flex-row gap-8 pb-20 min-h-[80vh]`}>
            {/* Sidebar Navigation */}
            <aside className={`lg:w-64 flex-shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0`}>
                 <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 rounded-xl text-left font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? themeClasses.button : `${themeClasses.cardBg} ${themeClasses.text} hover:bg-gray-500/10`}`}>
                    Dashboard Overview
                </button>
                <button onClick={() => setActiveTab('add')} className={`px-4 py-3 rounded-xl text-left font-medium transition-colors whitespace-nowrap ${activeTab === 'add' ? themeClasses.button : `${themeClasses.cardBg} ${themeClasses.text} hover:bg-gray-500/10`}`}>
                    Add / Edit Product
                </button>
                <button onClick={() => setActiveTab('manage')} className={`px-4 py-3 rounded-xl text-left font-medium transition-colors whitespace-nowrap ${activeTab === 'manage' ? themeClasses.button : `${themeClasses.cardBg} ${themeClasses.text} hover:bg-gray-500/10`}`}>
                    Manage List
                </button>
                <button onClick={() => setActiveTab('publish')} className={`px-4 py-3 rounded-xl text-left font-medium transition-colors whitespace-nowrap ${activeTab === 'publish' ? themeClasses.button : `${themeClasses.cardBg} ${themeClasses.text} hover:bg-gray-500/10`}`}>
                    Publish Changes
                </button>
                <button onClick={logout} className={`mt-auto px-4 py-3 rounded-xl text-left font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-500 transition-colors`}>
                    Log Out
                </button>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'add' && renderAddForm()}
                {activeTab === 'manage' && renderManage()}
                {activeTab === 'publish' && renderPublish()}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
