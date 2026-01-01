import React from 'react';
import { Quote } from '../types';
import { SlidersHorizontal, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from './Components';

interface QuoteViewProps {
  quotes: Quote[];
  onConsultingClick: () => void;
}

export const QuoteView: React.FC<QuoteViewProps> = ({ quotes = [], onConsultingClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-slate-900">견적 관리</h1>
          <p className="text-sm text-gray-500 mt-1">저장된 견적과 비용 분석을 확인하세요.</p>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        
        {/* Price Comparison Chart (Moved from Home) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
                <SlidersHorizontal size={14} /> 오프닝 비용 절감 효과
            </h4>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">일반 신품 구매</span>
                        <span className="text-gray-500 font-medium">~1,500만원</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-gray-300 w-full rounded-full"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-brand-700 font-bold flex items-center gap-1">
                            오프닝 <Badge color="brand">SAVE 56%</Badge>
                        </span>
                        <span className="text-brand-700 font-bold">~650만원</span>
                    </div>
                    <div className="h-3 bg-brand-100 rounded-full w-full overflow-hidden relative">
                            <div className="absolute top-0 left-0 h-full bg-brand-600 w-[45%] rounded-full shadow-[0_0_15px_rgba(30,111,255,0.5)]"></div>
                    </div>
                    <p className="text-[10px] text-brand-600 mt-1.5 text-right font-medium">
                        * 검수 + 물류 + 설치 + 보증 포함 기준
                    </p>
                </div>
            </div>
        </div>

        {/* Quote List */}
        <div>
            <h3 className="font-bold text-lg text-slate-900 mb-3">내 견적함</h3>
            {quotes.length === 0 ? (
                 <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                        <FileText size={24} />
                    </div>
                    <p className="text-gray-500 font-medium mb-1">저장된 견적이 없습니다.</p>
                    <p className="text-xs text-gray-400 mb-4">마음에 드는 패키지의 견적을 받아보세요.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {quotes.map((quote) => (
                        <Card key={quote.id} className="p-4 cursor-pointer hover:border-brand-300 transition-all group">
                             <div className="flex justify-between items-start mb-2">
                                <Badge color="blue">견적완료</Badge>
                                <span className="text-xs text-gray-400">{quote.date}</span>
                            </div>
                            <div className="mb-3">
                                <h4 className="font-bold text-slate-900">{quote.id}</h4>
                                <p className="text-xs text-gray-500">패키지 ID: {quote.packageId}</p>
                            </div>
                            <div className="flex justify-between items-end border-t border-gray-50 pt-3">
                                <div>
                                    <span className="text-xs text-gray-400 block">총 견적 금액</span>
                                    <span className="text-lg font-bold text-brand-700">{quote.totalCost.toLocaleString()}원</span>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>

        {/* CTA */}
         <div 
            onClick={onConsultingClick}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-white flex items-center justify-between cursor-pointer shadow-lg mt-8"
        >
            <div>
                <div className="text-xs font-bold text-yellow-400 mb-1">전문가 무료 상담</div>
                <div className="font-bold text-lg">내 예산에 맞는 견적 찾기</div>
            </div>
            <ArrowRight />
        </div>

      </div>
    </div>
  );
};