import React, { useState } from 'react';
import { Package, FilterState, ItemGrade } from '../types';
import { MOCK_OPENING_PACKAGES } from '../constants';
import { Card, Button, Badge, Input } from './Components';
import { 
  Search, SlidersHorizontal, Map as MapIcon, List, ArrowUpDown, 
  Heart, Clock, CheckCircle, RotateCcw, X, Plus, Check, ChevronDown,
  Box, Truck, Hammer, ShieldCheck, MessageCircle, ChevronRight, FileText, ArrowRight
} from 'lucide-react';

interface ListingsViewProps {
  onPackageSelect: (pkg: Package) => void;
  onConsultingClick: (pkg?: Package) => void;
}

type SortOption = 'CONVERSION' | 'PRICE_ASC' | 'SPEED' | 'RECENT';
type ViewMode = 'LIST' | 'MAP';

export const ListingsView: React.FC<ListingsViewProps> = ({ onPackageSelect, onConsultingClick }) => {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    budgetRange: [0, 100000000],
    areaRange: [0, 100],
    leadTime: 'ALL',
    has3D: false,
    grade: [],
    services: []
  });

  const [sortOption, setSortOption] = useState<SortOption>('CONVERSION');
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  // Detail View State
  const [selectedPackageDetail, setSelectedPackageDetail] = useState<Package | null>(null);

  // Use the Mock Data safely
  const packages = MOCK_OPENING_PACKAGES || [];

  // Mock Data for Search
  const recentKeywords = ['스터디카페 20평', '7일 설치', '3D 체험', '강남구 주점'];
  const recommendedKeywords = ['카페 폐업', '베이커리 오븐', '식기세척기'];

  // --- Handlers ---

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(wishlist);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setWishlist(next);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id));
    } else {
      if (compareList.length >= 3) {
        alert("최대 3개까지 비교 가능합니다.");
        return;
      }
      setCompareList([...compareList, id]);
    }
  };

  const handleApplyFilter = () => setIsFilterOpen(false);
  
  const handleResetFilter = () => {
    setFilters({
      budgetRange: [0, 100000000],
      areaRange: [0, 100],
      leadTime: 'ALL',
      has3D: false,
      grade: [],
      services: []
    });
  };

  const handle3DAction = (pkg: Package) => {
      if (pkg.has3D) {
          alert("카카오톡으로 3D 체험 링크가 발송됩니다.");
      } else {
          onPackageSelect(pkg); 
      }
  }

  // --- Filtering Logic ---
  const filteredPackages = packages.filter(pkg => {
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesLoc = pkg.location.toLowerCase().includes(query);
        const matchesType = pkg.businessType.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesType) return false;
    }
    // Price filter
    if (pkg.totalPrice < filters.budgetRange[0] || pkg.totalPrice > filters.budgetRange[1]) return false;
    
    // Lead time filter
    if (filters.leadTime === '7DAYS' && pkg.leadTimeDays > 7) return false;
    if (filters.leadTime === '14DAYS' && pkg.leadTimeDays > 14) return false;
    if (filters.has3D && !pkg.has3D) return false;

    return true;
  }).sort((a, b) => {
      if (sortOption === 'PRICE_ASC') return a.totalPrice - b.totalPrice;
      if (sortOption === 'SPEED') return a.leadTimeDays - b.leadTimeDays;
      if (sortOption === 'RECENT') return b.id.localeCompare(a.id);
      return 0;
  });

  // --- Render Sub-components ---

  const renderFilterModal = () => (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setIsFilterOpen(false)} />
        <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden pointer-events-auto flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-5 duration-300">
            <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
                <h3 className="font-bold text-lg">상세 필터</h3>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-5 overflow-y-auto space-y-6">
                <div>
                    <label className="text-sm font-bold text-slate-900 mb-2 block">총 견적 예산</label>
                    <div className="flex gap-2 mb-2">
                        <button onClick={() => setFilters({...filters, budgetRange: [0, 10000000]})} className="flex-1 py-2 text-xs border rounded-lg text-gray-600 border-gray-200 hover:border-brand-500">~1천만</button>
                        <button onClick={() => setFilters({...filters, budgetRange: [10000000, 20000000]})} className="flex-1 py-2 text-xs border rounded-lg text-gray-600 border-gray-200 hover:border-brand-500">1~2천만</button>
                        <button onClick={() => setFilters({...filters, budgetRange: [20000000, 100000000]})} className="flex-1 py-2 text-xs border rounded-lg text-gray-600 border-gray-200 hover:border-brand-500">2천만~</button>
                    </div>
                </div>
                <div>
                     <label className="text-sm font-bold text-slate-900 mb-2 block">설치 리드타임</label>
                     <div className="flex gap-2">
                         {['ALL', '7DAYS', '14DAYS'].map(opt => (
                             <button
                                key={opt}
                                onClick={() => setFilters({...filters, leadTime: opt as any})}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors
                                    ${filters.leadTime === opt ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-500 border-gray-200'}`}
                             >
                                 {opt === 'ALL' ? '전체' : opt === '7DAYS' ? '7일 이내' : '14일 이내'}
                             </button>
                         ))}
                     </div>
                </div>
                <div>
                     <label className="text-sm font-bold text-slate-900 mb-2 block">포함 옵션</label>
                     <div className="space-y-2">
                         <label className="flex items-center gap-2 cursor-pointer">
                             <input type="checkbox" checked={filters.has3D} onChange={(e) => setFilters({...filters, has3D: e.target.checked})} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300" />
                             <span className="text-sm text-gray-700">3D 시안 제공 (체험 가능)</span>
                         </label>
                     </div>
                </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3">
                <Button variant="outline" onClick={handleResetFilter} className="flex-1">초기화</Button>
                <Button onClick={handleApplyFilter} className="flex-[2]">필터 적용 ({filteredPackages.length}건)</Button>
            </div>
        </div>
    </div>
  );

  const renderComparisonModal = () => {
    const items = packages.filter(p => compareList.includes(p.id));
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCompareModalOpen(false)} />
             <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex flex-col shadow-2xl">
                 <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                     <h3 className="font-bold text-lg">패키지 비교하기</h3>
                     <button onClick={() => setIsCompareModalOpen(false)}><X className="text-gray-400" /></button>
                 </div>
                 <div className="overflow-x-auto p-6">
                     <div className="flex gap-4 min-w-max">
                         <div className="w-32 flex flex-col gap-4 pt-48 text-sm font-bold text-gray-500 text-right pr-4 border-r border-gray-100">
                             <div className="h-8">총 견적</div>
                             <div className="h-8">설치 기간</div>
                             <div className="h-8">구성품 수</div>
                             <div className="h-8">3D 지원</div>
                             <div className="h-8">검수 등급</div>
                             <div className="h-8">보증</div>
                         </div>
                         {items.map(pkg => (
                             <div key={pkg.id} className="w-64 flex flex-col gap-4">
                                 <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                                     <img src={pkg.image} className="w-full h-full object-cover" />
                                     <button onClick={(e) => toggleCompare(pkg.id, e)} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-red-50 text-red-500"><X size={16} /></button>
                                 </div>
                                 <div className="h-16">
                                     <div className="text-xs text-brand-600 font-bold">{pkg.businessType}</div>
                                     <div className="font-bold text-slate-900 leading-tight line-clamp-2">{pkg.name}</div>
                                 </div>
                                 <div className="h-8 text-lg font-black text-brand-700">{pkg.totalPrice.toLocaleString()}원</div>
                                 <div className="h-8 flex items-center gap-1"><Clock size={14}/> {pkg.leadTimeDays}일</div>
                                 <div className="h-8">{pkg.items.length}종 (필수 {pkg.items.length}종)</div>
                                 <div className="h-8">{pkg.has3D ? <Badge color="brand">가능</Badge> : <span className="text-gray-400">-</span>}</div>
                                 <div className="h-8 text-sm font-bold text-brand-600">{pkg.grade}급</div>
                                 <div className="h-8 text-sm text-gray-600">{pkg.warranty}</div>
                                 <Button size="sm" onClick={() => { setIsCompareModalOpen(false); setSelectedPackageDetail(pkg); }}>선택하기</Button>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </div>
    );
  };

  const renderDetailView = () => {
    if (!selectedPackageDetail) return null;
    const pkg = selectedPackageDetail;
    const breakdown = [
        { label: '집기/가구', cost: pkg.totalPrice - 500000 },
        { label: '전문 물류', cost: 200000 },
        { label: '현장 설치', cost: 300000 },
    ];

    return (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b z-10 px-4 h-14 flex items-center gap-3">
                <button onClick={() => setSelectedPackageDetail(null)} className="p-1 -ml-1 hover:bg-gray-100 rounded-full"><ChevronRight className="rotate-180" /></button>
                <span className="font-bold text-lg truncate flex-1">{pkg.name}</span>
                <button onClick={(e) => toggleWishlist(pkg.id, e)} className="p-2">
                    <Heart size={20} fill={wishlist.has(pkg.id) ? "currentColor" : "none"} className={wishlist.has(pkg.id) ? "text-red-500" : "text-gray-400"} />
                </button>
            </div>

            <div className="p-0 pb-24">
                {/* Image & Main Info */}
                <div className="aspect-video relative bg-gray-100">
                     <img src={pkg.image} className="w-full h-full object-cover" />
                     <div className="absolute bottom-4 left-4 flex gap-1">
                        <span className="px-2 py-1 bg-brand-600 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm border border-brand-500">
                             <ShieldCheck size={10} /> 오프닝 검수
                        </span>
                        {pkg.badges.filter(b => b !== '오프닝 검수').map(b => (
                             <span key={b} className="px-2 py-1 bg-white/90 backdrop-blur text-brand-700 text-[10px] font-bold rounded shadow-sm">
                                 {b}
                             </span>
                        ))}
                     </div>
                </div>

                <div className="p-5 border-b border-gray-100">
                     <div className="flex justify-between items-start mb-2">
                         <span className="text-sm font-bold text-brand-600">{pkg.businessType} · {pkg.location}</span>
                         <span className="text-xs text-gray-400">{pkg.leadTimeDays}일 소요</span>
                     </div>
                     <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-4">{pkg.name}</h1>
                     <p className="text-sm text-gray-600 leading-relaxed mb-6">{pkg.description}</p>
                     
                     {/* Cost */}
                     <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                         <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
                             <span className="text-sm font-bold text-slate-600">총 견적 (VAT 별도)</span>
                             <span className="text-2xl font-black text-slate-900">{pkg.totalPrice.toLocaleString()}원</span>
                         </div>
                         <div className="space-y-1">
                             {breakdown.map((b, i) => (
                                 <div key={i} className="flex justify-between text-xs text-gray-500">
                                     <span>{b.label}</span>
                                     <span>{b.cost.toLocaleString()}원</span>
                                 </div>
                             ))}
                         </div>
                     </div>
                </div>

                {/* Items */}
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Box size={18} /> 구성품 리스트 ({pkg.items.length}종)
                    </h3>
                    <div className="space-y-3">
                        {pkg.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-center bg-white border border-gray-100 p-2 rounded-lg">
                                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold truncate">{item.name}</div>
                                    <div className="text-xs text-gray-500 flex gap-2">
                                        <span>{item.width}x{item.depth}cm</span>
                                        <span className="text-brand-600 font-bold">{item.grade}급</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3D Action */}
                <div className="p-5">
                     <div 
                        onClick={() => handle3DAction(pkg)}
                        className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden cursor-pointer"
                    >
                         <div className="relative z-10">
                             <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold text-sm">
                                 {pkg.has3D ? <Box size={16}/> : <RotateCcw size={16}/>}
                                 {pkg.has3D ? '3D 체험 링크 있음' : '3D 시안 요청 가능'}
                             </div>
                             <h3 className="font-bold text-lg mb-1">
                                 {pkg.has3D ? '지금 바로 배치 체험하기' : '내 공간에 맞게 배치해보기'}
                             </h3>
                             <p className="text-xs text-slate-400">
                                 {pkg.has3D ? '브라우저에서 바로 열립니다.' : '치수 입력 후 시안을 받아보세요.'}
                             </p>
                         </div>
                         <div className="absolute right-[-20px] bottom-[-20px] opacity-20 rotate-12">
                             <Box size={100} />
                         </div>
                     </div>
                     <p className="text-[10px] text-gray-400 mt-2 text-center">
                         * 3D 인테리어 체험 링크는 작업 완료 후 카카오톡으로 발송됩니다.
                     </p>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 z-50">
                <Button 
                    variant="outline" 
                    className="flex-1 border-gray-300" 
                    onClick={() => { setSelectedPackageDetail(null); onConsultingClick(pkg); }}
                >
                    <MessageCircle size={18} className="mr-2" /> 내 상담
                </Button>
                <Button 
                    className="flex-[2]"
                    onClick={() => { setSelectedPackageDetail(null); onPackageSelect(pkg); }}
                >
                    <FileText size={18} className="mr-2" /> 견적 생성하기
                </Button>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-24 relative">
      {/* 1. Header & Search */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="p-4 relative">
               {/* Search Bar */}
              <div className="relative z-30">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="text"
                    placeholder="업종, 지역, 면적(예: 10평) 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
                />
                {isSearchFocused && searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setIsSearchFocused(false); }} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                )}
              </div>

              {/* Search Overlay */}
              {isSearchFocused && !searchQuery && (
                  <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 z-20 animate-in fade-in slide-in-from-top-2">
                      <div className="mb-4">
                          <h4 className="text-xs font-bold text-gray-400 mb-2">최근 검색어</h4>
                          <div className="flex flex-wrap gap-2">
                              {recentKeywords.map(k => (
                                  <button key={k} onClick={() => setSearchQuery(k)} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-600 hover:bg-gray-100">{k}</button>
                              ))}
                          </div>
                      </div>
                      <div>
                          <h4 className="text-xs font-bold text-gray-400 mb-2">추천 키워드</h4>
                          <div className="flex flex-wrap gap-2">
                              {recommendedKeywords.map(k => (
                                  <button key={k} onClick={() => setSearchQuery(k)} className="px-3 py-1.5 border border-brand-100 text-brand-600 rounded-lg text-xs hover:bg-brand-50">{k}</button>
                              ))}
                          </div>
                      </div>
                      <div 
                        onClick={() => setIsSearchFocused(false)} 
                        className="fixed inset-0 top-[130px] bg-black/20 z-[-1]" 
                      />
                  </div>
              )}
          </div>

          {/* 2. Filter & Sort Bar */}
          <div className="px-4 py-2 flex items-center gap-2 border-t border-gray-50 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shrink-0
                    ${isFilterOpen || filters.has3D || filters.leadTime !== 'ALL'
                        ? 'bg-brand-50 border-brand-200 text-brand-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                  <SlidersHorizontal size={14} /> 필터
                  {(filters.has3D || filters.leadTime !== 'ALL') && <div className="w-1.5 h-1.5 bg-brand-600 rounded-full ml-0.5" />}
              </button>

              <div className="w-px h-4 bg-gray-200 mx-1 shrink-0" />
              
              <button onClick={() => setSortOption(sortOption === 'CONVERSION' ? 'PRICE_ASC' : 'CONVERSION')} className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 shrink-0">
                  <ArrowUpDown size={12} /> {sortOption === 'CONVERSION' ? '추천순' : sortOption === 'PRICE_ASC' ? '가격순' : '최신순'}
              </button>

              <div className="ml-auto flex bg-gray-100 rounded-lg p-0.5 shrink-0">
                  <button onClick={() => setViewMode('LIST')} className={`p-1.5 rounded-md ${viewMode === 'LIST' ? 'bg-white shadow text-slate-900' : 'text-gray-400'}`}><List size={16} /></button>
                  <button onClick={() => setViewMode('MAP')} className={`p-1.5 rounded-md ${viewMode === 'MAP' ? 'bg-white shadow text-slate-900' : 'text-gray-400'}`}><MapIcon size={16} /></button>
              </div>
          </div>
      </div>

      {/* 3. Content Area */}
      {viewMode === 'MAP' ? (
          <div className="h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-gray-400">
              <MapIcon size={48} className="mb-4 opacity-20" />
              <p>지도 보기 모드 (준비중)</p>
              <Button size="sm" variant="outline" onClick={() => setViewMode('LIST')} className="mt-4">리스트로 보기</Button>
          </div>
      ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {filteredPackages.length === 0 ? (
                 <div className="col-span-full py-20 text-center">
                     <Search size={28} className="mx-auto mb-4 text-gray-300" />
                     <p className="text-gray-500 font-bold">검색 결과가 없습니다.</p>
                     <Button variant="outline" size="sm" onClick={handleResetFilter} className="mt-4">필터 초기화</Button>
                 </div>
             ) : (
                 filteredPackages.map(pkg => {
                     const isCompared = compareList.includes(pkg.id);
                     const isWished = wishlist.has(pkg.id);

                     return (
                         <div key={pkg.id} onClick={() => setSelectedPackageDetail(pkg)} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer relative">
                             {/* Image */}
                             <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                 <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.name} />
                                 <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                                     <span className="px-2 py-1 bg-brand-600 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm border border-brand-500">
                                         <ShieldCheck size={10} /> 오프닝 검수
                                     </span>
                                     {pkg.badges.filter(b => b !== '오프닝 검수').map(b => (
                                         <span key={b} className="px-1.5 py-0.5 bg-black/60 backdrop-blur text-white text-[10px] font-bold rounded">{b}</span>
                                     ))}
                                 </div>
                                 <button 
                                    onClick={(e) => toggleWishlist(pkg.id, e)}
                                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur transition-colors ${isWished ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-500 hover:text-red-500'}`}
                                 >
                                     <Heart size={16} fill={isWished ? "currentColor" : "none"} />
                                 </button>
                             </div>

                             {/* Content */}
                             <div className="p-3">
                                 <div className="flex justify-between items-start mb-1">
                                     <div className="text-[10px] font-bold text-brand-600">{pkg.businessType}</div>
                                     <div className="text-[10px] text-gray-400">{pkg.location}</div>
                                 </div>
                                 <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 mb-2">{pkg.name}</h3>
                                 <div className="flex items-end justify-between">
                                     <div>
                                         <span className="text-[10px] text-gray-400 block">총 견적</span>
                                         <span className="text-lg font-black text-slate-900">{pkg.totalPrice.toLocaleString()}원</span>
                                     </div>
                                     <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5">
                                         <label className="flex items-center gap-1 cursor-pointer select-none">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isCompared ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-300'}`}>
                                                {isCompared && <Check size={12} className="text-white" />}
                                            </div>
                                            <input type="checkbox" checked={isCompared} onChange={(e) => toggleCompare(pkg.id, e as any)} className="hidden" />
                                            <span className={`text-xs font-bold ${isCompared ? 'text-brand-600' : 'text-gray-400'}`}>비교</span>
                                         </label>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     )
                 })
             )}
          </div>
      )}

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
          <div className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-40 animate-in slide-in-from-bottom-2">
              <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-3 flex items-center justify-between pl-5">
                  <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-400">{compareList.length}개</span>
                      <span className="text-sm">선택됨</span>
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => setCompareList([])} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">취소</button>
                      <Button size="sm" onClick={() => setIsCompareModalOpen(true)}>비교하기</Button>
                  </div>
              </div>
          </div>
      )}
      
      {/* Floating Consulting Button (General) */}
      <div className="fixed bottom-20 right-4 z-40">
          <button 
            onClick={() => onConsultingClick(undefined)}
            className="flex items-center gap-2 px-4 py-3 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 transition-transform hover:scale-105 active:scale-95"
          >
              <MessageCircle size={20} />
              <span className="font-bold text-sm">패키지 없이 상담</span>
          </button>
      </div>

      {/* Modals */}
      {isFilterOpen && renderFilterModal()}
      {isCompareModalOpen && renderComparisonModal()}
      {selectedPackageDetail && renderDetailView()}
    </div>
  );
};