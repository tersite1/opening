import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from './Components';

// FAQ Data Structure
const FAQ_DATA = [
    {
        category: '서비스',
        question: '오프닝은 정확히 뭘 해주나요?',
        answer: '업종에 맞는 중고 패키지를 추천하고, 품목을 검수해 등급화한 뒤, **총비용 견적(집기+물류+설치+옵션)**과 설치 일정을 확정합니다. 필요하면 창업 컨설팅까지 번들로 제공합니다.'
    },
    {
        category: '서비스',
        question: '진행 순서가 어떻게 되나요?',
        answer: '업종 선택 → 추천 매물/패키지 확인 → 견적 확인 → (선택) 내 상담 → 확정/결제 → 물류/설치 진행 → 완료/보증 순서입니다.'
    },
    {
        category: '서비스',
        question: '“매물”은 점포 임대까지 포함인가요?',
        answer: '기본은 인테리어·가구·집기 패키지(구성/설치) 중심입니다. 임대(보증금/월세)는 제공 가능한 범위에서 정보로 노출되며, 계약 중개를 대체하지 않습니다.'
    },
    {
        category: '가격/견적',
        question: '왜 ‘새 가구 가격’ 수준인데도 이익이 나나요?',
        answer: '오프닝은 중고를 단순 판매하지 않고 검수·표준화·패키징·물류/설치 운영으로 원가 구조를 잡습니다. 고객 입장에서는 새 가구 대비 비용이 비슷해도, 시간/리스크/재작업 비용이 줄어 전체 비용이 낮아집니다.'
    },
    {
        category: '가격/견적',
        question: '견적에 포함되는 항목이 뭔가요?',
        answer: '기본은 패키지 가격 + 물류비 + 설치비입니다. 선택 옵션으로 철거/원상복구/추가 자재/추가 시공이 붙습니다. 견적서에 포함/미포함을 명시합니다.'
    },
    {
        category: '가격/견적',
        question: '숨은 비용이 생길 수 있나요?',
        answer: '현장 조건(계단 운반, 엘리베이터 없음, 주차 불가, 출입 동선 제한, 전기/급배수 추가 공사 등)이 견적과 다르면 추가 비용이 생길 수 있습니다. 이를 줄이기 위해 사전 체크 항목을 받고, 필요 시 실측을 진행합니다.'
    },
    {
        category: '품질/검수',
        question: '중고라서 상태가 걱정돼요.',
        answer: '모든 품목은 검수 후 등급(A/B/C)과 결함 태그로 공개합니다. 작동이 필요한 품목은 작동 확인을 원칙으로 합니다(가능 범위 내). 보증 제공 여부는 품목/패키지별로 다르며 상세에 표시됩니다.'
    },
    {
        category: '품질/검수',
        question: '사진이랑 실제가 다르면요?',
        answer: '하자/오염/스크래치 등은 “고지 항목”으로 분류해 사전에 표시합니다. 미고지 결함은 CS 기준에 따라 조치합니다(교환/부분 환불/수리 등 정책에 따름).'
    },
    {
        category: '3D 시안',
        question: '3D 인테리어 시안은 무엇인가요?',
        answer: '선택한 업종/컨셉/공간 정보를 바탕으로, 공간을 3D로 체험할 수 있는 시안을 제공합니다. 구매 전 이해를 돕기 위한 체험용 시각 자료입니다.'
    },
    {
        category: '3D 시안',
        question: '3D 시안은 앱에서 보나요?',
        answer: 'MVP에서는 앱 내 뷰어가 아니라 카카오톡 링크로 발송됩니다. 링크를 열면 브라우저에서 3D 공간을 체험할 수 있습니다.'
    },
    {
        category: '3D 시안',
        question: '3D 시안은 언제 받을 수 있나요?',
        answer: '필요한 입력(치수/도면/사진 등)이 모두 확보된 이후 작업이 진행되며, 완료되면 카카오톡 링크로 전달됩니다.'
    },
    {
        category: '3D 시안',
        question: '3D 시안이 실제 시공 결과와 100% 동일한가요?',
        answer: '아닙니다. 3D 시안은 “의사결정 보조 자료”이며, 실제 현장 조건(배관/전기/벽체 상태/층고 오차/기존 마감 상태)에 따라 달라질 수 있습니다. 오차를 줄이기 위해 치수/도면/현장 확인 단계가 있습니다.'
    },
    {
        category: '3D 시안',
        question: '3D 시안에서 본 배치대로 설치해주나요?',
        answer: '가능 범위에서 반영합니다. 다만 실제 설치 시 안전/법규/동선/설비 조건으로 조정될 수 있으며, 변경 시 사유를 안내합니다.'
    },
    {
        category: '일정/설치',
        question: '설치까지 얼마나 걸리나요?',
        answer: '패키지/지역/현장 조건에 따라 다르며, 일부 패키지는 “빠른 설치(예: 7일/14일)”로 운영합니다. 확정 일정은 주문 진행 단계에서 고정됩니다.'
    },
    {
        category: '일정/설치',
        question: '철거/원상복구도 해주나요?',
        answer: '옵션입니다. 필요하면 견적에 포함해 원스톱으로 진행할 수 있습니다.'
    },
    {
        category: '환불/취소',
        question: '결제 후 취소가 가능한가요?',
        answer: '단계별로 다릅니다. 작업이 시작되기 전/후, 물류 예약 전/후, 설치 당일 등 단계에 따라 취소 수수료가 달라집니다. 각 단계는 주문 상세에 표시됩니다.'
    },
    {
        category: '환불/취소',
        question: '배송/설치 중 파손되면요?',
        answer: '현장 사진과 작업 로그를 기반으로 책임 범위를 확인하고 조치합니다. 포장/운송/설치 책임 주체를 명확히 기록합니다.'
    },
    {
        category: '환불/취소',
        question: '사이즈가 안 맞아 설치가 불가능하면요?',
        answer: '치수 입력 오류/현장 구조 변수로 발생할 수 있습니다. 이를 줄이기 위해 사전 체크와 필요 시 실측을 진행합니다. 책임 기준은 “사전 제공 정보의 정확성”과 “검증 단계 이행 여부”에 따라 적용됩니다.'
    },
    {
        category: '컨설팅',
        question: '컨설팅은 무엇을 해주나요?',
        answer: '업종/예산/면적 기준으로 패키지 구성, 동선, 비용 구조, 리스크 포인트를 정리해주고, 결과를 리포트로 제공합니다.'
    },
    {
        category: '컨설팅',
        question: '컨설팅만 받을 수 있나요?',
        answer: '가능합니다. 다만 오프닝 패키지와 함께 진행하면 번들 적용(포함/할인/크레딧)이 가능합니다.'
    },
    {
        category: '공급자',
        question: '폐업자인데 가구/집기를 어떻게 팔 수 있나요?',
        answer: '사진/목록/희망 일정으로 신청하면, 오프닝이 매입/위탁/철거 포함 옵션 중 최적 방식을 제안합니다.'
    },
    {
        category: '공급자',
        question: '정산은 언제 받나요?',
        answer: '방식(즉시 매입/위탁)에 따라 다르며, 견적서에 정산 조건을 명시합니다.'
    }
];

const CATEGORIES = ['전체', '서비스', '가격/견적', '3D 시안', '일정/설치', '환불/취소', '컨설팅', '공급자'];

interface FAQViewProps {
  onConsultingClick: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onConsultingClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = FAQ_DATA.filter(item => {
        const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
        const matchesSearch = item.question.includes(searchQuery) || item.answer.includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header with Banner */}
            <div className="sticky top-0 z-20 bg-white">
                <div className="bg-slate-900 text-white p-4">
                    <h1 className="text-xl font-bold mb-1">자주 묻는 질문</h1>
                    <p className="text-xs text-slate-300 opacity-90 leading-relaxed">
                        오프닝은 폐업 점포의 자산을 표준화해 창업자에게 합리적인 비용으로 제공합니다.<br/>
                        <span className="text-yellow-400 font-bold">⚠️ 3D 인테리어 시안은 작업 완료 후 카카오톡 링크로 발송됩니다.</span>
                    </p>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="궁금한 점을 검색해보세요 (예: 환불, 3D)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setOpenIndex(null); }}
                            className={`whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 transition-colors
                                ${selectedCategory === cat 
                                    ? 'border-brand-600 text-brand-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ List */}
            <div className="divide-y divide-gray-100">
                {filteredFAQs.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                        <HelpCircle size={48} className="mx-auto mb-3 opacity-20" />
                        <p>검색 결과가 없습니다.</p>
                    </div>
                ) : (
                    filteredFAQs.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="bg-white">
                                <button 
                                    onClick={() => toggleItem(index)}
                                    className="w-full px-4 py-4 text-left flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div>
                                        <span className="inline-block text-[10px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded mb-1.5">
                                            {item.category}
                                        </span>
                                        <h3 className={`text-sm font-bold leading-snug ${isOpen ? 'text-brand-700' : 'text-slate-900'}`}>
                                            Q. {item.question}
                                        </h3>
                                    </div>
                                    {isOpen ? <ChevronUp size={20} className="text-gray-400 shrink-0 mt-1" /> : <ChevronDown size={20} className="text-gray-400 shrink-0 mt-1" />}
                                </button>
                                {isOpen && (
                                    <div className="px-4 pb-6 pt-1 bg-gray-50 text-sm text-slate-700 leading-relaxed whitespace-pre-line animate-in slide-in-from-top-1 duration-200">
                                        <div className="flex gap-2">
                                            <span className="font-bold text-slate-400">A.</span>
                                            <div>{item.answer}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {/* Bottom Action */}
            <div className="p-4 mt-6 bg-gray-50 border-t border-gray-100">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                    <h4 className="font-bold text-slate-900 mb-1">원하는 답변을 못 찾으셨나요?</h4>
                    <p className="text-xs text-gray-500 mb-4">전문 매니저가 빠르고 친절하게 답변해드립니다.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="sm" onClick={() => alert("1:1 문의 기능 준비중")}>
                             1:1 문의 남기기
                        </Button>
                         <Button size="sm" onClick={onConsultingClick}>
                             <MessageCircle size={16} className="mr-2"/> 상담 신청하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}