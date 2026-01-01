import React, { useState } from 'react';
import { ConsultingBooking } from '../types';
import { Button, Card, Badge } from './Components';
import { MessageSquare, Calendar, Video, MapPin, ChevronRight, FileText, Download, User, ArrowRight, CheckCircle } from 'lucide-react';
import { ConsultingModule } from './ConsultingModule';

interface MyConsultationsViewProps {
  bookings: ConsultingBooking[];
  onBookConsulting: () => void; // Opens the wizard
}

export const MyConsultationsView: React.FC<MyConsultationsViewProps> = ({ bookings, onBookConsulting }) => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Filter
  const filteredBookings = bookings.filter(b => {
      if(activeTab === 'UPCOMING') return b.status === 'CONFIRMED' || b.status === 'PENDING' || b.status === 'IN_PROGRESS';
      return b.status === 'COMPLETED' || b.status === 'CANCELLED';
  });

  const selectedBooking = bookings.find(b => b.id === selectedBookingId);

  // Detail View
  if (selectedBooking) {
      return (
          <div className="min-h-screen bg-white pb-24">
              {/* Header */}
              <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
                  <button onClick={() => setSelectedBookingId(null)} className="p-1 -ml-1 hover:bg-gray-100 rounded-full">
                      <ChevronRight className="rotate-180" size={24} />
                  </button>
                  <h2 className="font-bold text-lg">상담 상세</h2>
              </div>

              <div className="p-4 space-y-6">
                  {/* Status Banner */}
                  <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold mb-3">
                         {selectedBooking.status === 'CONFIRMED' ? '예약 확정' : selectedBooking.status}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedBooking.typeLabel}</h3>
                      <div className="text-slate-600 font-medium flex items-center justify-center gap-2">
                          <Calendar size={16} /> {selectedBooking.date} {selectedBooking.timeSlot}
                      </div>
                  </div>

                  {/* Consultant Info */}
                  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl shadow-sm">
                       <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                           <User size={24} />
                       </div>
                       <div>
                           <div className="text-xs text-gray-500 font-bold mb-0.5">담당 컨설턴트</div>
                           <div className="font-bold text-slate-900">{selectedBooking.consultantName}</div>
                       </div>
                       <Button size="sm" variant="outline" className="ml-auto">문의</Button>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                       <Button variant="outline" className="h-12 border-gray-300">
                           <Video size={18} className="mr-2"/> 화상 미팅 입장
                       </Button>
                       <Button variant="outline" className="h-12 border-gray-300">
                           <FileText size={18} className="mr-2"/> 자료 관리
                       </Button>
                  </div>

                  {/* Info Summary */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm">
                      <h4 className="font-bold text-gray-900 mb-2">신청 정보</h4>
                      <div className="flex justify-between">
                          <span className="text-gray-500">업종</span>
                          <span className="font-medium">{selectedBooking.businessType}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">예산</span>
                          <span className="font-medium">{selectedBooking.budget}</span>
                      </div>
                  </div>

                  {selectedBooking.status === 'COMPLETED' && (
                      <div className="border-t pt-6">
                          <h3 className="font-bold text-lg mb-4">컨설팅 리포트</h3>
                          <div className="bg-white border border-brand-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
                                      <FileText size={20} />
                                  </div>
                                  <div>
                                      <div className="font-bold text-sm">최종 진단 리포트.pdf</div>
                                      <div className="text-xs text-gray-500">2023.10.25 업데이트</div>
                                  </div>
                              </div>
                              <button className="text-gray-400 hover:text-brand-600">
                                  <Download size={20} />
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
  }

  // List View
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-slate-900">내 상담</h1>
            <p className="text-sm text-gray-500 mt-1">전문가와 함께하는 창업 여정</p>
            
            {/* New Consultation CTA */}
            <div 
                onClick={onBookConsulting}
                className="mt-6 bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-brand-100 transition-colors group"
            >
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge color="brand">인기</Badge>
                        <span className="text-xs text-brand-700 font-bold">실패 확률 80% 감소</span>
                    </div>
                    <div className="font-bold text-slate-900">전문가 컨설팅 신청하기</div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
            <button 
                onClick={() => setActiveTab('UPCOMING')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'UPCOMING' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400'}`}
            >
                진행중인 상담
            </button>
            <button 
                onClick={() => setActiveTab('PAST')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'PAST' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400'}`}
            >
                종료된 상담
            </button>
        </div>

        {/* List */}
        <div className="p-4 space-y-4">
            {filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>상담 내역이 없습니다.</p>
                </div>
            ) : (
                filteredBookings.map(booking => (
                    <Card key={booking.id} onClick={() => setSelectedBookingId(booking.id)} className="p-4 cursor-pointer hover:border-brand-300">
                        <div className="flex justify-between items-start mb-3">
                            <Badge color={booking.status === 'CONFIRMED' ? 'green' : 'gray'}>
                                {booking.status === 'CONFIRMED' ? '예약확정' : booking.status}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                상세 <ChevronRight size={12} />
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{booking.typeLabel}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                            {booking.businessType} · 예산 {booking.budget}
                        </p>
                        
                        <div className="pt-3 border-t border-gray-50 flex items-center gap-2 text-sm text-slate-700">
                            <Calendar size={14} className="text-brand-600" />
                            <span className="font-medium">{booking.date} {booking.timeSlot}</span>
                        </div>
                    </Card>
                ))
            )}
        </div>
    </div>
  );
};
