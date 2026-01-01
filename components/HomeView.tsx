import React, { useState } from 'react';
import { Package, CategoryNode, BusinessType } from '../types';
import { CATEGORY_TREE, MOCK_USER_LISTINGS } from '../constants';
import { Card, Badge, Button } from './Components';
import { Search, Bell, User, Clock, Heart, ChevronRight, RotateCcw, MapPin, Calendar, Tag } from 'lucide-react';

interface HomeViewProps {
  onPackageSelect: (pkg: Package) => void;
  onConsultingClick: (pkg?: Package) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onPackageSelect, onConsultingClick }) => {
  const [selectedMajor, setSelectedMajor] = useState<CategoryNode | null>(null);
  const [selectedMiddle, setSelectedMiddle] = useState<CategoryNode | null>(null);
  const [selectedMinor, setSelectedMinor] = useState<CategoryNode | null>(null);
  const [activeTab, setActiveTab] = useState('오늘 올라온');

  // Home specific tabs
  const HOME_TABS = [
      { id: 'today', label: '오늘 올라온' },
      { id: 'quick', label: '7일 빠른회수' },
      { id: 'kitchen', label: '주방위주' },
      { id: 'furniture', label: '가구·홀 위주' },
      { id: 'franchise', label: '프랜차이즈' },
      { id: 'cheap', label: '초저가 급처' },
      { id: 'large', label: '대형 평수' }
  ];

  const resetSelection = () => {
    setSelectedMajor(null);
    setSelectedMiddle(null);
    setSelectedMinor(null);
  };

  const handleMajorSelect = (cat: CategoryNode) => {
    if (selectedMajor?.id === cat.id) {
        resetSelection();
    } else {
        setSelectedMajor(cat);
        setSelectedMiddle(null);
        setSelectedMinor(null);
    }
  };

  const handleMiddleSelect = (cat: CategoryNode) => {
      if (selectedMiddle?.id === cat.id) {
          setSelectedMiddle(null);
          setSelectedMinor(null);
      } else {
          setSelectedMiddle(cat);
          setSelectedMinor(null);
      }
  };

  const handleMinorSelect = (cat: CategoryNode) => {
      if (selectedMinor?.id === cat.id) {
          setSelectedMinor(null);
      } else {
          setSelectedMinor(cat);
      }
  };

  // Filter Logic for User Listings
  const filteredListings = MOCK_USER_LISTINGS.filter(pkg => {
    // 1. Category Filter (If selected)
    // For MVP, simple filtering can be added here if needed, 
    // but the tabs are the main navigation.

    // 2. Tab Filter
    const activeTabId = HOME_TABS.find(t => t.label === activeTab)?.id;
    if (activeTabId && pkg.tags) {
        if (!pkg.tags.includes(activeTabId)) return false;
    }

    return true;
  });

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="px-4 h-14 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={resetSelection}>
                    <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-brand-200 shadow-sm">O</div>
                    <span className="font-bold text-lg text-slate-900 tracking-tight">오프닝</span>
                </div>
                
                <div className="flex-1 max-w-md bg-brand-50 h-9 rounded-full flex items-center px-3 text-brand-900/50 text-sm gap-2 cursor-pointer hover:bg-brand-100 transition-colors">
                    <Search size={16} />
                    <span className="truncate">업종, 지역, 예산 검색</span>
                </div>

                <div className="flex gap-3 text-slate-400">
                    <button className="hover:text-brand-600 transition-colors hover:bg-gray-50 p-1 rounded-full"><Bell size={22} /></button>
                    <button className="hover:text-brand-600 transition-colors hover:bg-gray-50 p-1 rounded-full"><User size={22} /></button>
                </div>
            </div>

            {/* Status Summary Banner (Conditional) */}
            <div className="bg-brand-50 px-4 py-2 flex items-center justify-between text-xs border-t border-brand-100 cursor-pointer hover:bg-brand-100 transition-colors">
                 <div className="flex gap-4">
                     <span className="font-bold text-brand-700">진행중 1건</span>
                     <span className="w-px h-3 bg-brand-200 my-auto"></span>
                     <span className="font-bold text-brand-700">내 상담 1건</span>
                 </div>
                 <ChevronRight size={14} className="text-brand-400" />
            </div>
        </div>
      </header>

      {/* 2. Category Tree Selection (Icon Grid) */}
      <section className="bg-white border-b border-gray-100 pt-4 pb-4">
        <div className="max-w-7xl mx-auto">
            
            {/* Level 1: Major (Icon Grid) */}
            <div className="px-4 grid grid-cols-5 gap-y-4 gap-x-2 mb-2">
                {CATEGORY_TREE.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = selectedMajor?.id === cat.id;
                    return (
                        <button 
                            key={cat.id}
                            onClick={() => handleMajorSelect(cat)}
                            className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer focus:outline-none"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                                ${isSelected 
                                    ? 'bg-brand-600 text-white shadow-brand-200 scale-105 ring-2 ring-offset-1 ring-brand-500' 
                                    : 'bg-slate-50 text-slate-500 hover:bg-brand-50 hover:text-brand-600 hover:scale-105'}`}
                            >
                                {Icon && <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />}
                            </div>
                            <span className={`text-[11px] font-medium tracking-tight transition-colors
                                ${isSelected ? 'text-brand-700 font-bold' : 'text-slate-500'}`}>
                                {cat.label}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Level 2: Middle (Chips - Expanded) */}
            {selectedMajor && (
                <div className="mt-2 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative shadow-inner">
                         {/* Close/Reset Button inside panel */}
                        <div className="absolute top-2 right-2">
                            <button onClick={resetSelection} className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                                <RotateCcw size={14} />
                            </button>
                        </div>
                        
                        <div className="mb-2 text-xs font-bold text-slate-400 flex items-center gap-1">
                            {selectedMajor.label} 상세
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {selectedMajor.children?.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleMiddleSelect(cat)}
                                    className={`h-10 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center text-center leading-tight border cursor-pointer
                                        ${selectedMiddle?.id === cat.id
                                            ? 'bg-white text-brand-600 border-brand-500 ring-1 ring-brand-500 shadow-sm z-10'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-700'}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Level 3: Minor (Chips) */}
            {selectedMiddle && selectedMiddle.children && selectedMiddle.children.length > 0 && (
                <div className="px-4 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex flex-wrap gap-2">
                         {selectedMiddle.children.map(cat => (
                             <button
                                key={cat.id}
                                onClick={() => handleMinorSelect(cat)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer
                                    ${selectedMinor?.id === cat.id
                                        ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </section>

      {/* 3. Recommended Listings Tabs */}
      <div className="sticky top-14 z-30 bg-white border-b border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
         <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar items-center">
            {HOME_TABS.map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.label)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition-colors
                        ${activeTab === tab.label 
                            ? 'bg-slate-800 text-white border-slate-800' 
                            : 'border-gray-200 text-gray-600 bg-white hover:border-gray-400'}`}
                 >
                    {tab.label}
                 </button>
            ))}
         </div>
      </div>

      {/* 4. Feed (User Listings) */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-xl font-bold text-slate-900">
                    추천 매물
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    다른 창업자들의 알짜 정리/양도 매물입니다.
                </p>
            </div>
        </div>

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 shadow-sm">
                        <Search size={28} />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">해당하는 매물이 없습니다</h3>
                    <p className="text-gray-400 text-sm">다른 탭을 선택해보세요.</p>
                </div>
            ) : (
                filteredListings.map(pkg => (
                    <Card key={pkg.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer">
                        {/* Image Area */}
                        <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                            <img 
                                src={pkg.image}
                                alt={pkg.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                                <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded flex items-center gap-1">
                                    <Tag size={10} /> 정리/양도
                                </span>
                                {pkg.deadline && (
                                    <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded flex items-center gap-1 animate-pulse">
                                        <Clock size={10} /> 마감 {pkg.deadline}
                                    </span>
                                )}
                            </div>
                            {/* Bookmark */}
                            <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm hover:scale-110 active:scale-95">
                                <Heart size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1" onClick={() => onConsultingClick(pkg)}>
                            {/* Title */}
                            <div className="mb-3">
                                <div className="text-xs font-bold text-slate-500 mb-0.5">{pkg.businessType}</div>
                                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">{pkg.name}</h3>
                            </div>

                            {/* Info Rows */}
                            <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-gray-400"/>
                                    <span>{pkg.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={12} className="text-gray-400"/>
                                    <span className="font-bold text-red-500">회수 마감: {pkg.deadline}</span>
                                </div>
                                <p className="text-gray-400 mt-1 line-clamp-1">{pkg.description}</p>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex gap-1.5 flex-wrap mb-4">
                                {pkg.badges.map((b, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded border border-gray-200">
                                        {b}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                {/* Price */}
                                <div className="mb-3">
                                    <span className="text-[10px] text-gray-400 block mb-0.5">희망가 (협의가능)</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-black text-slate-900">{pkg.hopePrice?.toLocaleString()}</span>
                                        <span className="text-sm font-bold text-slate-900">원</span>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <Button 
                                    fullWidth
                                    variant="primary"
                                    onClick={(e) => { e.stopPropagation(); onConsultingClick(pkg); }}
                                    className="h-10 text-sm shadow-none bg-slate-800 hover:bg-slate-700"
                                >
                                    패키지 없이 상담
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
      </main>
    </div>
  );
};