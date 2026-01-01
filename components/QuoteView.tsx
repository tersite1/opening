import React, { useState } from 'react';
import { Quote, QuoteStatus } from '../types';
import { 
  FileText, ChevronRight, ArrowRight, Download, Share2, AlertCircle, 
  CheckCircle, Clock, MapPin, ShieldCheck, Box, RefreshCw, Calendar, 
  ChevronDown, SlidersHorizontal, MessageCircle, CreditCard
} from 'lucide-react';
import { Button, Card, Badge } from './Components';

interface QuoteViewProps {
  quotes: Quote[];
  onConsultingClick: () => void;
}

export const QuoteView: React.FC<QuoteViewProps> = ({ quotes = [], onConsultingClick }) => {
  const [activeTab, setActiveTab] = useState<QuoteStatus | 'ALL'>('ALL');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Status Tabs
  const TABS: { id: QuoteStatus | 'ALL'; label: string }[] = [
      { id: 'ALL', label: '전체' },
      { id: 'DRAFT', label: '초안' },
      { id: 'REVIEWING', label: '검토중' },
      { id: 'CONFIRMED', label: '확정' },
      { id: 'COMPLETED', label: '완료' },
  ];

  // Filtering
  const filteredQuotes = quotes.filter(q => {
      if (activeTab === 'ALL') return true;
      return q.status === activeTab;
  });

  // --- Render Detail Modal ---
  const renderDetailModal = () => {
    if (!selectedQuote) return null;
    const q = selectedQuote;

    return (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* 3.3.1 Header Summary */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b z-10 px-4 h-14 flex items-center justify-between">
                <button onClick={() => setSelectedQuote(null)} className="p-1 -ml-1 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="rotate-180" size={24}/>
                </button>
                <div className="font-bold text-lg">견적 상세</div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-brand-600"><Share2 size={20} /></button>
                    <button className="p-2 text-gray-500 hover:text-brand-600"><Download size={20} /></button>
                </div>
            </div>

            <div className="p-4 pb-24 space-y-6">
                {/* Header Info */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge color={q.status === 'CONFIRMED' ? 'green' : 'gray'}>{q.status}</Badge>
                        <span className="text-xs text-gray-400">v{q.version} · {q.date} 생성</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 leading-snug mb-2">{q.packageName}</h1>
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                        <div>
                            <span className="text-xs text-gray-500 block">총 견적 (VAT 포함)</span>
                            <span className="text-2xl font-black text-brand-700">{q.totalCost.toLocaleString()}원</span>
                        </div>
                        <div className="text-right">
                             <span className="text-xs text-gray-400 block">설치 예상</span>
                             <span className="text-sm font-bold text-slate-900">1주 이내</span>
                        </div>
                    </div>
                </div>

                {/* 3.3.2 Scope (Included/Excluded) */}
                <section>
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle size={18} /> 포함 범위
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {q.scope.map((scopeItem, idx) => (
                            <div key={idx} className={`p-4 ${idx !== 0 ? 'border-t border-gray-100' : ''} ${!scopeItem.isIncluded ? 'bg-gray-50' : ''}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {scopeItem.isIncluded 
                                        ? <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">포함</span>
                                        : <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">미포함(별도)</span>
                                    }
                                    <span className="font-bold text-sm text-slate-700">{scopeItem.category}</span>
                                </div>
                                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 ml-1">
                                    {scopeItem.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3.3.3 Cost Breakdown */}
                <section>
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <CreditCard size={18} /> 비용 상세
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>패키지 가격</span><span>{q.itemsCost.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>물류비</span><span>{q.logisticsCost.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>설치비</span><span>{q.installationCost.toLocaleString()}원</span>
                        </div>
                        {q.optionsCost > 0 && (
                             <div className="flex justify-between text-gray-600">
                                <span>추가 옵션</span><span>{q.optionsCost.toLocaleString()}원</span>
                            </div>
                        )}
                        <div className="flex justify-between text-gray-400 pt-2 border-t border-gray-200">
                            <span>VAT (10%)</span><span>{q.vat.toLocaleString()}원</span>
                        </div>
                         <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 text-slate-900">
                            <span>최종 합계</span><span>{q.totalCost.toLocaleString()}원</span>
                        </div>
                        {q.status !== 'CONFIRMED' && (
                             <div className="bg-yellow-50 text-yellow-800 text-xs p-2 rounded mt-2">
                                 * 현장 상황(엘리베이터 없음, 사다리차 필요 등)에 따라 물류/설치비가 변동될 수 있습니다.
                             </div>
                        )}
                    </div>
                </section>

                {/* 3.3.4 Timeline */}
                <section>
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Clock size={18} /> 진행 일정
                    </h3>
                    <div className="space-y-4 px-2">
                        {q.timeline.map((item, idx) => (
                            <div key={idx} className="flex gap-4 relative">
                                {/* Line */}
                                {idx !== q.timeline.length - 1 && (
                                    <div className="absolute left-[9px] top-6 bottom-[-20px] w-0.5 bg-gray-100"></div>
                                )}
                                {/* Dot */}
                                <div className={`w-5 h-5 rounded-full shrink-0 z-10 flex items-center justify-center
                                    ${item.status === 'DONE' ? 'bg-brand-600 text-white' : 
                                      item.status === 'IN_PROGRESS' ? 'bg-brand-100 text-brand-600 ring-4 ring-brand-50' : 'bg-gray-200'}`}>
                                    {item.status === 'DONE' ? <CheckCircle size={12}/> : <div className="w-2 h-2 bg-current rounded-full"/>}
                                </div>
                                <div className="pb-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-bold text-sm text-slate-900">{item.stage}</span>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{item.duration}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3.3.5 Requirements */}
                <section>
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle size={18} /> 준비해주세요
                    </h3>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                        <ul className="space-y-2">
                            {q.requirements.map((req, i) => (
                                <li key={i} className="flex gap-2 text-sm text-orange-900">
                                    <CheckCircle size={16} className="shrink-0 text-orange-400 mt-0.5" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 3.3.6 CS/Warranty */}
                <section className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 p-3 rounded-xl text-center">
                        <div className="text-xs text-gray-500 mb-1">검수 등급</div>
                        <div className="font-black text-brand-600 text-lg">{q.grade}급</div>
                    </div>
                     <div className="bg-white border border-gray-200 p-3 rounded-xl text-center">
                        <div className="text-xs text-gray-500 mb-1">보증 기간</div>
                        <div className="font-black text-slate-900 text-lg">{q.warrantyPeriod}</div>
                    </div>
                </section>
                
                {/* 3.3.7 3D Section */}
                <section className="bg-slate-900 text-white rounded-xl p-5 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold mb-1 flex items-center gap-2">
                             <Box size={18} className="text-yellow-400"/> 3D 인테리어
                        </h3>
                        <p className="text-xs text-slate-300 mb-4 opacity-80">
                            {q.has3D ? '체험 링크가 준비되었습니다.' : '시안 작업이 진행중입니다.'}
                            <br/>카카오톡으로 링크가 발송됩니다.
                        </p>
                        <div className="flex gap-2">
                             {q.has3D && <Button size="sm" className="bg-white text-slate-900 hover:bg-gray-100">체험 링크 열기</Button>}
                             <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">재발송 요청</Button>
                        </div>
                    </div>
                </section>
                
                {/* 3.3.8 Negotiation (Mock) */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 whitespace-nowrap hover:bg-gray-200">
                        💰 비용 줄이기 제안
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 whitespace-nowrap hover:bg-gray-200">
                        📅 일정 당기기
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 whitespace-nowrap hover:bg-gray-200">
                        ➕ 옵션 추가/변경
                    </button>
                </div>
            </div>

            {/* 3.3.9 Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 z-50">
                 {q.status === 'CONFIRMED' ? (
                     <Button fullWidth onClick={() => alert("결제 기능 연동 필요")}>
                         결제하고 진행하기
                     </Button>
                 ) : (
                     <>
                        <Button variant="outline" className="flex-1" onClick={onConsultingClick}>
                            <MessageCircle size={18} className="mr-2" /> 문의/수정
                        </Button>
                        <Button className="flex-[2]" onClick={() => alert("예약금 결제 페이지로 이동")}>
                            확정하고 결제하기
                        </Button>
                     </>
                 )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 3.2.1 Header & Tabs */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
          <div className="px-4 py-4">
              <h1 className="text-2xl font-bold text-slate-900">견적 관리</h1>
              <p className="text-sm text-gray-500 mt-1">결정과 실행을 위한 견적 허브</p>
          </div>
          
          <div className="flex px-4 gap-4 overflow-x-auto no-scrollbar">
              {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors
                        ${activeTab === tab.id 
                            ? 'border-brand-600 text-brand-600' 
                            : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>
          
          {/* Filters (Visual Only) */}
          <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
               <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-500">
                   <SlidersHorizontal size={10} /> 정렬: 최신순
               </button>
               <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-500">
                   예산 범위 <ChevronDown size={10} />
               </button>
               <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-500">
                   설치 일정 <ChevronDown size={10} />
               </button>
          </div>
      </div>

      {/* 3.2.2 Quote List */}
      <div className="p-4 space-y-4">
        {filteredQuotes.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
                <FileText size={48} className="mx-auto mb-3 opacity-20" />
                <p>보관된 견적이 없습니다.</p>
                <Button size="sm" variant="outline" className="mt-4" onClick={onConsultingClick}>
                    새 견적 요청하기
                </Button>
            </div>
        ) : (
            filteredQuotes.map(quote => (
                <Card 
                    key={quote.id} 
                    onClick={() => setSelectedQuote(quote)}
                    className="p-4 cursor-pointer hover:border-brand-400 hover:shadow-md transition-all group"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <Badge color={quote.status === 'CONFIRMED' ? 'green' : 'gray'}>
                                     {quote.status === 'DRAFT' ? '초안' : 
                                      quote.status === 'REVIEWING' ? '검토중' :
                                      quote.status === 'CONFIRMED' ? '확정' : '완료'}
                                 </Badge>
                                 <span className="text-xs text-gray-400">{quote.date}</span>
                             </div>
                             <h3 className="font-bold text-slate-900 text-lg leading-tight">{quote.packageName}</h3>
                         </div>
                         <div className="text-right">
                             <span className="text-[10px] text-gray-400 block">총 비용</span>
                             <span className="font-black text-brand-700 text-lg">{quote.totalCost.toLocaleString()}</span>
                         </div>
                    </div>

                    {/* Summary Chips */}
                    <div className="flex gap-1.5 flex-wrap mb-4">
                         <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border border-gray-200">
                             설치포함
                         </span>
                         <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border border-gray-200">
                             {quote.warrantyPeriod} 보증
                         </span>
                         <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border border-gray-200">
                             {quote.grade}급
                         </span>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-500">유효기간: {quote.validUntil}까지</span>
                        <div className="flex items-center gap-1 text-sm font-bold text-brand-600 group-hover:underline">
                            상세 보기 <ArrowRight size={14} />
                        </div>
                    </div>
                </Card>
            ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && renderDetailModal()}
    </div>
  );
};
