import React, { useState, useEffect } from 'react';
import { 
  AppStep, 
  MainTab,
  Package, 
  ConsultingBooking,
  RoomDimensions,
  PlacedItem,
  Quote
} from './types';
import { 
  LOGISTICS_BASE_COST,
  INSTALLATION_BASE_COST
} from './constants';
import { Planner2D } from './components/Planner2D';
import { ConsultingModule } from './components/ConsultingModule';
import { validateLayout } from './utils/plannerUtils';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { MyConsultationsView } from './components/MyConsultationsView';
import { QuoteView } from './components/QuoteView';
import { FAQView } from './components/FAQView';
import { ListingsView } from './components/ListingsView';
import { Button, Input } from './components/Components';
import { ArrowLeft, Grid, Info, Ruler, AlertCircle, CheckCircle, FileText, ChevronRight, Truck, DoorOpen, X, ShoppingBag, Calendar } from 'lucide-react';

function App() {
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<MainTab>('HOME');
  const [appMode, setAppMode] = useState<AppStep>('TAB_VIEW'); // Handles overlay modes like Planner

  // Data State
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [consultingBookings, setConsultingBookings] = useState<ConsultingBooking[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]); // New state for saved quotes

  // Planner State
  const [room, setRoom] = useState<RoomDimensions>({
    width: 500, depth: 400, height: 250, doorX: 200, doorWidth: 90
  });
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);

  // Simulate Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds splash screen
    return () => clearTimeout(timer);
  }, []);

  // --- Actions ---

  // 1. Open Planner Flow (from Home or Listing)
  const startPlannerFlow = (pkg: Package) => {
    setSelectedPackage(pkg);
    // Initialize items
    const initialItems: PlacedItem[] = pkg.items.map((item, idx) => ({
      ...item,
      instanceId: `${item.id}_${idx}_${Date.now()}`,
      x: 10 + (idx * 20) % 200,
      y: 10 + (Math.floor(idx / 10) * 50),
      rotation: 0,
      isCollision: false,
      isWallViolation: false,
      warnings: []
    }));
    setPlacedItems(initialItems);
    setAppMode('SPACE_INPUT');
  };

  // 2. Open Consulting Flow
  const startConsultingFlow = (pkg?: Package) => {
    if (pkg) {
        setSelectedPackage(pkg);
    } else {
        setSelectedPackage(null); // General consulting
    }
    setAppMode('CONSULTING_WIZARD');
  };

  const handleConsultingComplete = (booking: ConsultingBooking) => {
    const newBooking = { ...booking, id: `bk_${Date.now()}`, consultantName: '김오픈 프로', typeLabel: '창업 진단 30분' };
    setConsultingBookings([newBooking, ...consultingBookings]);
    setAppMode('TAB_VIEW');
    setCurrentTab('CONSULTING'); // Go to My Consultations
  };

  // 3. Planner Logic
  const handleSpaceSubmit = () => {
     if (room.width < 200 || room.depth < 200) {
      alert("공간이 너무 작습니다.");
      return;
    }
    setPlacedItems(prev => validateLayout(prev, room));
    setAppMode('PLANNER');
  };

  const handlePlannerNext = () => {
    // Generate Quote
    if (selectedPackage) {
      const itemsCost = selectedPackage.totalPrice; 
      const total = itemsCost + LOGISTICS_BASE_COST + INSTALLATION_BASE_COST;
      const vat = total * 0.1;
      
      const newQuote: Quote = {
        id: `QT-${Date.now()}`,
        packageId: selectedPackage.id,
        itemsCost,
        logisticsCost: LOGISTICS_BASE_COST,
        installationCost: INSTALLATION_BASE_COST,
        vat,
        totalCost: total + vat,
        deposit: (total + vat) * 0.1,
        date: new Date().toLocaleDateString(),
        consultingIncluded: false
      };
      
      setQuote(newQuote);
      setAppMode('QUOTE_GEN');
    }
  };

  const handleSaveQuote = () => {
      if(quote) {
          setSavedQuotes([quote, ...savedQuotes]);
          alert("견적이 저장되었습니다.");
          setAppMode('TAB_VIEW');
          setCurrentTab('QUOTE');
      }
  }

  // --- Render Views ---

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-600 flex flex-col items-center justify-center text-white transition-opacity duration-500">
        <div className="flex items-center gap-3 animate-pulse scale-110">
           <DoorOpen size={56} strokeWidth={2.5} />
           <span className="text-5xl font-black tracking-tight">오프닝</span>
        </div>
      </div>
    );
  }

  // Helper to wrap overlays in a modal on desktop, full screen on mobile
  const ModalWrapper: React.FC<{ children: React.ReactNode, title: string, onClose: () => void, maxWidth?: string }> = ({ children, title, onClose, maxWidth = 'max-w-xl' }) => (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
        
        {/* Modal Content */}
        <div className={`relative bg-white w-full ${maxWidth} h-[95vh] md:h-auto md:max-h-[85vh] md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 transform translate-y-0`}>
             <div className="h-14 border-b flex items-center justify-between px-4 bg-white shrink-0">
                  <div className="flex items-center gap-3">
                      <button onClick={onClose} className="md:hidden"><ArrowLeft /></button>
                      <h2 className="font-bold text-lg">{title}</h2>
                  </div>
                  <button onClick={onClose} className="hidden md:block p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <X size={24} className="text-gray-500" />
                  </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>
        </div>
    </div>
  );

  const renderWizardContent = () => {
    switch (appMode) {
      case 'CONSULTING_WIZARD':
        return (
          <ModalWrapper title="오픈 상담 신청" onClose={() => setAppMode('TAB_VIEW')} maxWidth="max-w-2xl">
             <div className="p-4 md:p-8">
                 <ConsultingModule 
                    onComplete={handleConsultingComplete}
                    onCancel={() => setAppMode('TAB_VIEW')}
                    preSelectedPackageId={selectedPackage?.id}
                />
             </div>
          </ModalWrapper>
        );
      
      case 'SPACE_INPUT':
        return (
           <ModalWrapper title="공간 입력" onClose={() => setAppMode('TAB_VIEW')} maxWidth="max-w-lg">
              <div className="p-6 w-full">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Grid size={24} />
                    </div>
                    <p className="text-slate-500">실측 사이즈를 입력하면 3D 도면이 생성됩니다.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                         <Input label="가로 (cm)" type="number" value={room.width} onChange={e => setRoom({...room, width: Number(e.target.value)})} />
                         <Input label="세로 (cm)" type="number" value={room.depth} onChange={e => setRoom({...room, depth: Number(e.target.value)})} />
                    </div>
                    <Input label="천장 높이 (cm)" type="number" value={room.height} onChange={e => setRoom({...room, height: Number(e.target.value)})} />
                    <Button fullWidth size="lg" onClick={handleSpaceSubmit}>3D 배치 시작</Button>
                  </div>
              </div>
           </ModalWrapper>
        );

      case 'PLANNER':
         // Planner uses full screen overlay on desktop too, but maybe with some padding or different close button
         return (
             <div className="fixed inset-0 bg-slate-100 z-50 flex flex-col md:p-6 md:bg-black/80 md:backdrop-blur-sm">
                 <div className="bg-white flex-1 flex flex-col md:rounded-2xl md:shadow-2xl overflow-hidden relative">
                     <div className="bg-white h-14 border-b flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setAppMode('SPACE_INPUT')} className="md:hidden"><ArrowLeft /></button>
                            <button onClick={() => setAppMode('SPACE_INPUT')} className="hidden md:flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium">
                                <ArrowLeft size={20} /> 치수 재설정
                            </button>
                            <span className="font-bold hidden md:block text-slate-300">|</span>
                            <span className="font-bold text-lg">3D 배치 검증</span>
                        </div>
                        <div className="flex gap-2">
                             <Button size="sm" onClick={handlePlannerNext}>견적 생성</Button>
                             <button onClick={() => setAppMode('TAB_VIEW')} className="hidden md:block p-2 text-gray-400 hover:text-gray-600">
                                <X />
                             </button>
                        </div>
                     </div>
                     <div className="flex-1 overflow-hidden p-0 md:p-4 bg-slate-50">
                         <Planner2D items={placedItems} room={room} onUpdateItems={setPlacedItems} />
                     </div>
                 </div>
             </div>
         );

      case 'QUOTE_GEN':
          return (
             <ModalWrapper title="최종 견적서" onClose={() => setAppMode('PLANNER')} maxWidth="max-w-2xl">
                 <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                         <div className="flex justify-between items-start mb-6 border-b pb-4">
                             <div>
                                 <h1 className="text-2xl font-bold mb-1">견적서</h1>
                                 <p className="text-sm text-gray-500">No. {quote?.id}</p>
                             </div>
                             <div className="text-right">
                                 <div className="font-bold text-brand-600">오프닝 공식 인증</div>
                                 <div className="text-xs text-gray-400">{quote?.date}</div>
                             </div>
                         </div>
                         
                         <div className="space-y-3 mb-6">
                             <div className="flex justify-between text-gray-600"><span>물품 합계 (가구/기기)</span><span>{quote?.itemsCost.toLocaleString()}원</span></div>
                             <div className="flex justify-between text-gray-600"><span>전문 물류/배송</span><span>{quote?.logisticsCost.toLocaleString()}원</span></div>
                             <div className="flex justify-between text-gray-600"><span>현장 설치비</span><span>{quote?.installationCost.toLocaleString()}원</span></div>
                             <div className="flex justify-between text-gray-600"><span>부가세 (VAT)</span><span>{quote?.vat.toLocaleString()}원</span></div>
                             <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-900 mt-4"><span>총 합계</span><span className="text-brand-700">{quote?.totalCost.toLocaleString()}원</span></div>
                         </div>
                         
                         <div className="bg-brand-50 p-4 rounded-lg mb-6 text-sm text-brand-800">
                             <p className="font-bold mb-1">💡 예약금 10% ({quote?.deposit.toLocaleString()}원) 결제 시 일정 확정</p>
                             <p className="opacity-80">잔금은 설치 완료 후 현장에서 결제 가능합니다.</p>
                         </div>

                         <div className="flex gap-3">
                             <Button variant="outline" fullWidth onClick={() => setAppMode('PLANNER')}>수정하기</Button>
                             <Button fullWidth onClick={handleSaveQuote}>견적 저장하기</Button>
                         </div>
                     </div>
                 </div>
             </ModalWrapper>
          );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-row overflow-hidden">
      
      {/* Desktop Sidebar */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} className="hidden md:flex" />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative h-screen overflow-y-auto no-scrollbar scroll-smooth">
        {/* Container */}
        <div className="w-full mx-auto bg-white min-h-screen shadow-none md:max-w-none md:bg-white pb-20 md:pb-0">
            
            {/* Views */}
            {currentTab === 'HOME' && (
            <HomeView 
                onPackageSelect={startPlannerFlow} 
                onConsultingClick={startConsultingFlow} 
            />
            )}

            {currentTab === 'CONSULTING' && (
                <MyConsultationsView 
                    bookings={consultingBookings}
                    onBookConsulting={() => startConsultingFlow()}
                />
            )}

            {currentTab === 'LISTINGS' && (
                <ListingsView 
                    onPackageSelect={startPlannerFlow} 
                    onConsultingClick={startConsultingFlow}
                />
            )}

            {currentTab === 'QUOTE' && (
                <QuoteView 
                    quotes={savedQuotes}
                    onConsultingClick={() => startConsultingFlow()}
                />
            )}

            {currentTab === 'FAQ' && (
                <FAQView onConsultingClick={() => startConsultingFlow()} />
            )}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
          <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      {/* Overlays (Wizard / Planner) */}
      {appMode !== 'TAB_VIEW' && renderWizardContent()}

    </div>
  );
}

export default App;