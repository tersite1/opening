import React, { useState } from 'react';
import { ConsultingBooking, OpenTaskItem, BusinessType } from '../types';
import { OPEN_PROCESS_TASKS, OPEN_TASK_CATEGORIES } from '../constants';
import { Card, Badge, Button, Input } from './Components';
import { 
  ChevronRight, Calendar, Clock, MapPin, CheckCircle, AlertCircle, 
  FileText, MessageSquare, UploadCloud, ChevronDown, MoreHorizontal,
  Layout, ListTodo, FolderOpen, ArrowRight, X, Phone, Settings, RefreshCw
} from 'lucide-react';

interface MyConsultationsViewProps {
  bookings: ConsultingBooking[];
  onBookConsulting: () => void;
}

// Extended Status for UI
type ProjectStatus = 'WAITING' | 'REQUESTING_DOCS' | 'DESIGNING' | 'REVIEWING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';

const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
        case 'WAITING': return '대기 (접수완료)';
        case 'REQUESTING_DOCS': return '자료 요청중';
        case 'DESIGNING': return '설계/산출중';
        case 'REVIEWING': return '견적 검토중';
        case 'CONFIRMED': return '확정/결제대기';
        case 'IN_PROGRESS': return '진행중 (현장)';
        case 'COMPLETED': return '완료 (인수)';
        default: return status;
    }
};

const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
        case 'WAITING': return 'gray';
        case 'REQUESTING_DOCS': return 'red'; // Action needed
        case 'DESIGNING': return 'blue';
        case 'REVIEWING': return 'yellow';
        case 'CONFIRMED': return 'green';
        case 'IN_PROGRESS': return 'brand';
        case 'COMPLETED': return 'slate';
        default: return 'gray';
    }
};

export const MyConsultationsView: React.FC<MyConsultationsViewProps> = ({ bookings, onBookConsulting }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  
  // Detail View Tabs
  const [detailTab, setDetailTab] = useState<'DASHBOARD' | 'CHECKLIST' | 'TIMELINE' | 'FILES'>('DASHBOARD');

  // --- Mock Data Enrichment ---
  // 실제로는 bookings 데이터에 아래 필드들이 포함되어야 함.
  // UI 테스트를 위해 선택된 booking에 임시 데이터를 매핑한다고 가정.
  const activeBooking = bookings.find(b => b.id === selectedBookingId);

  // Mock Project Data (Attached to activeBooking)
  const projectData = activeBooking ? {
      ...activeBooking,
      status: 'REQUESTING_DOCS' as ProjectStatus, // Mock Status
      progress: 35, // %
      nextAction: '현장 실측 도면 업로드 필요',
      lastUpdate: '2024.01.16 14:00',
      tasks: OPEN_PROCESS_TASKS.map(t => ({
          ...t,
          status: ['used_package', 'consulting'].includes(t.id) ? 'DONE' : 'PENDING', // Mock initial state
          isSelected: ['used_package', 'consulting', 'demolition'].includes(t.id)
      })),
      files: [
          { name: '도면_v1.pdf', status: 'UPLOADED' },
          { name: '현장사진_출입구.jpg', status: 'MISSING' },
          { name: '사업자등록증', status: 'MISSING' }
      ]
  } : null;

  // --- Handlers ---
  const handleTaskToggle = (taskId: string) => {
      // In real app, this would update DB and trigger quote recalc
      console.log('Toggle task:', taskId);
  };

  // --- Render Sub-Components ---

  const renderDetailHeader = () => (
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
          <div className="flex justify-between items-start mb-4">
              <button onClick={() => setSelectedBookingId(null)} className="p-1 -ml-1 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="rotate-180" />
              </button>
              <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-brand-600"><UploadCloud size={20}/></button>
                  <button className="p-2 text-gray-500 hover:text-brand-600"><MessageSquare size={20}/></button>
              </div>
          </div>
          
          <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                 <Badge color={getStatusColor(projectData!.status)}>{getStatusLabel(projectData!.status)}</Badge>
                 <span className="text-xs text-gray-400">담당: {projectData?.consultantName} 매니저</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                  {projectData?.businessType} 20평 ({projectData?.budget})
              </h1>
              <div className="text-xs text-gray-500">
                  {activeBooking?.date} 오픈 목표 · 서울 강남구
              </div>
          </div>

          {/* Quick Actions (5.4.1) */}
          <div className="grid grid-cols-3 gap-2 mb-2">
              <Button size="sm" variant="outline" className="text-xs h-9">
                  <UploadCloud size={14} className="mr-1.5"/> 자료 업로드
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-9" onClick={() => setDetailTab('CHECKLIST')}>
                  <ListTodo size={14} className="mr-1.5"/> 체크 수정
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-9">
                  <MessageSquare size={14} className="mr-1.5"/> 담당 채팅
              </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 -mb-4 mt-4">
              {[
                  { id: 'DASHBOARD', label: '대시보드' },
                  { id: 'CHECKLIST', label: '체크리스트' },
                  { id: 'TIMELINE', label: '진행/일정' },
                  { id: 'FILES', label: '자료/파일' },
              ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id as any)}
                    className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors
                        ${detailTab === tab.id ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400'}`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>
      </div>
  );

  const renderDashboardTab = () => (
      <div className="p-4 space-y-6 bg-gray-50 min-h-screen pb-20">
          {/* Notification Block */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-brand-600 shrink-0 mt-0.5" size={20} />
              <div>
                  <h3 className="font-bold text-brand-900 text-sm mb-1">{projectData?.nextAction}</h3>
                  <p className="text-xs text-brand-700 leading-relaxed">
                      견적 산출 및 3D 시안 작업을 위해 현장 정보가 필요합니다. '자료/파일' 탭에서 업로드해주세요.
                  </p>
                  <button 
                    onClick={() => setDetailTab('FILES')}
                    className="mt-2 text-xs font-bold text-brand-700 underline underline-offset-2"
                  >
                      바로가기 &gt;
                  </button>
              </div>
          </div>

          {/* Summary Status */}
          <div className="grid grid-cols-2 gap-3">
               <div className="bg-white p-4 rounded-xl border border-gray-200">
                   <div className="text-xs text-gray-500 mb-1">총 예산 (예상)</div>
                   <div className="font-black text-lg text-slate-900">2,150만원</div>
               </div>
               <div className="bg-white p-4 rounded-xl border border-gray-200">
                   <div className="text-xs text-gray-500 mb-1">오픈 D-Day</div>
                   <div className="font-black text-lg text-brand-600">D-24</div>
               </div>
          </div>

          {/* 3D Status (5.9) */}
          <div className="bg-slate-900 text-white rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                  <div>
                      <h3 className="font-bold flex items-center gap-2">
                          <Box className="text-yellow-400" size={18} /> 3D 인테리어
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">작업 완료 후 카카오톡 발송</p>
                  </div>
                  <Badge color="yellow">작업중</Badge>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-yellow-400 w-[60%] h-full" />
              </div>
              <p className="text-[10px] text-right text-slate-400">공정률 60%</p>
          </div>

          {/* Selected Services Summary */}
          <div>
              <h3 className="font-bold text-slate-900 mb-3 text-sm">선택한 서비스</h3>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                  {projectData?.tasks.filter(t => t.isSelected).slice(0, 5).map(task => (
                      <div key={task.id} className="p-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{task.title}</span>
                          <Badge color="gray">대기</Badge>
                      </div>
                  ))}
                  <button onClick={() => setDetailTab('CHECKLIST')} className="w-full p-3 text-xs text-center text-gray-500 font-bold hover:bg-gray-50">
                      + 전체 보기 및 수정
                  </button>
              </div>
          </div>
      </div>
  );

  const renderChecklistTab = () => (
      <div className="p-4 bg-gray-50 min-h-screen pb-20">
          <div className="text-sm text-gray-500 mb-4 px-1">
              필요한 서비스를 체크하면 <strong>견적과 일정에 자동 반영</strong>됩니다.
          </div>
          
          <div className="space-y-6">
              {OPEN_TASK_CATEGORIES.map(category => {
                  const tasks = projectData?.tasks.filter(t => t.category === category.id) || [];
                  if (tasks.length === 0) return null;

                  return (
                      <div key={category.id}>
                          <h3 className="text-xs font-bold text-gray-400 mb-2 px-1">{category.label}</h3>
                          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                              {tasks.map((task, idx) => (
                                  <div 
                                    key={task.id} 
                                    className={`p-4 flex items-start gap-3 ${idx !== 0 ? 'border-t border-gray-100' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
                                    onClick={() => handleTaskToggle(task.id)}
                                  >
                                      <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors
                                          ${task.isSelected ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-300'}`}>
                                          {task.isSelected && <CheckCircle size={14} className="text-white" />}
                                      </div>
                                      <div className="flex-1">
                                          <div className="flex justify-between items-start">
                                              <span className={`text-sm font-bold ${task.isSelected ? 'text-slate-900' : 'text-gray-500'}`}>
                                                  {task.title}
                                              </span>
                                              {task.isOpeningExclusive && (
                                                  <span className="text-[10px] text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded font-bold">오프닝전용</span>
                                              )}
                                          </div>
                                          <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                                          
                                          {/* Detailed Settings (Expands when selected) */}
                                          {task.isSelected && (
                                              <div className="mt-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-1">
                                                  <div className="flex gap-2 mb-2">
                                                      <span className="text-xs font-bold text-gray-600">범위:</span>
                                                      <span className="text-xs text-slate-900 bg-gray-100 px-2 rounded">전체</span>
                                                      <Settings size={12} className="text-gray-400"/>
                                                  </div>
                                                  <div className="text-[10px] text-brand-600 flex items-center gap-1">
                                                      <RefreshCw size={10} /> 견적 v2에 반영됨
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )
              })}
          </div>
      </div>
  );

  const renderFilesTab = () => (
      <div className="p-4 bg-gray-50 min-h-screen pb-20">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center mb-6">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                   <UploadCloud size={24} />
               </div>
               <h3 className="font-bold text-slate-900 mb-1">자료 업로드</h3>
               <p className="text-xs text-gray-500 mb-4">도면, 현장 사진, 사업자등록증 등을 올려주세요.</p>
               <Button fullWidth variant="outline">파일 선택하기</Button>
          </div>

          <h3 className="font-bold text-slate-900 text-sm mb-3 px-1">필수 제출 자료</h3>
          <div className="space-y-3">
              {projectData?.files.map((file, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${file.status === 'UPLOADED' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-sm font-medium text-gray-700">{file.name}</span>
                      </div>
                      <Badge color={file.status === 'UPLOADED' ? 'green' : 'red'}>
                          {file.status === 'UPLOADED' ? '완료' : '미제출'}
                      </Badge>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderTimelineTab = () => (
      <div className="p-4 bg-gray-50 min-h-screen pb-20">
          <div className="space-y-6 relative pl-4 border-l border-gray-200 ml-4 my-4">
               {['계약/착수', '철거/기초', '인테리어/설비', '설치/배치', '준공청소', '오픈'].map((stage, idx) => (
                   <div key={idx} className="relative pl-6">
                       <div className={`absolute left-[-21px] top-0 w-4 h-4 rounded-full border-2 
                           ${idx < 2 ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-300'}`} 
                       />
                       <h3 className={`font-bold text-sm mb-1 ${idx < 2 ? 'text-slate-900' : 'text-gray-400'}`}>{stage}</h3>
                       <p className="text-xs text-gray-400">1월 {15 + idx * 5}일 예정</p>
                       
                       {idx === 1 && (
                           <div className="mt-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                               <div className="text-xs font-bold text-brand-600 mb-1">진행중</div>
                               <div className="text-sm text-slate-900">기존 집기 철거 작업</div>
                               <div className="text-xs text-gray-500 mt-1">담당: 오프닝 파트너스</div>
                           </div>
                       )}
                   </div>
               ))}
          </div>
      </div>
  );

  // --- Main Render ---

  if (selectedBookingId && projectData) {
      return (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in slide-in-from-right">
              {renderDetailHeader()}
              {detailTab === 'DASHBOARD' && renderDashboardTab()}
              {detailTab === 'CHECKLIST' && renderChecklistTab()}
              {detailTab === 'TIMELINE' && renderTimelineTab()}
              {detailTab === 'FILES' && renderFilesTab()}
          </div>
      );
  }

  // List View (Main)
  const activeCount = bookings.filter(b => b.status === 'IN_PROGRESS' || b.status === 'CONFIRMED').length;
  const waitingCount = bookings.filter(b => b.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 5.2.A Header Summary */}
      <div className="bg-white p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">내 상담</h1>
          
          <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-brand-50 rounded-xl p-4 border border-brand-100">
                  <div className="text-2xl font-black text-brand-600 mb-1">{activeCount}</div>
                  <div className="text-xs text-brand-800 font-bold">진행중</div>
              </div>
              <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-black text-slate-900 mb-1">{waitingCount}</div>
                  <div className="text-xs text-gray-500">대기/접수</div>
              </div>
              <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200 opacity-50">
                  <div className="text-2xl font-black text-slate-900 mb-1">0</div>
                  <div className="text-xs text-gray-500">완료</div>
              </div>
          </div>

          {/* Action Required Alert */}
          {bookings.length > 0 && (
              <div className="bg-slate-900 rounded-xl p-4 text-white flex justify-between items-center shadow-lg shadow-slate-200">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <AlertCircle size={18} />
                      </div>
                      <div>
                          <div className="font-bold text-sm">자료 업로드 필요</div>
                          <div className="text-xs text-slate-300">정확한 견적을 위해 도면을 올려주세요.</div>
                      </div>
                  </div>
                  <ChevronRight className="text-slate-500" />
              </div>
          )}
      </div>

      {/* 5.2.B List */}
      <div className="p-4 space-y-4">
          <h2 className="font-bold text-slate-900 text-lg">프로젝트 목록</h2>
          {bookings.length === 0 ? (
              <div className="text-center py-20">
                  <FolderOpen size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 mb-4">진행 중인 상담이 없습니다.</p>
                  <Button onClick={onBookConsulting}>새로운 상담 신청</Button>
              </div>
          ) : (
              bookings.map(booking => (
                  <Card 
                    key={booking.id} 
                    onClick={() => setSelectedBookingId(booking.id)}
                    className="p-5 cursor-pointer hover:shadow-md transition-shadow group"
                  >
                      <div className="flex justify-between items-start mb-3">
                          <Badge color={getStatusColor(booking.status as any)}>{getStatusLabel(booking.status as any)}</Badge>
                          <span className="text-xs text-gray-400">{booking.date}</span>
                      </div>
                      
                      <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                          {booking.businessType} 20평 프로젝트
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                          {booking.consultantName} 매니저 · 서울 강남구
                      </p>

                      {/* Service Icons Summary */}
                      <div className="flex gap-2 mb-4 pt-4 border-t border-gray-50">
                          {['철거', '인테리어', '패키지', '간판'].map((s, i) => (
                              <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                                  {s}
                              </span>
                          ))}
                          <span className="text-[10px] text-gray-400 px-1.5 py-0.5">+2</span>
                      </div>

                      <div className="flex justify-between items-center text-xs font-bold text-brand-600">
                          <span>{booking.status === 'PENDING' ? '담당자 배정 대기중' : '견적 v1 도착함'}</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                  </Card>
              ))
          )}
      </div>
    </div>
  );
};
