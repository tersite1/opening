import React, { useState } from 'react';
import { ConsultingBooking, OpenTaskItem, OpenTaskCategory } from '../types';
import { OPEN_PROCESS_TASKS, OPEN_TASK_CATEGORIES, MOCK_CONSULTING_OPTIONS } from '../constants';
import { Button, Input, Badge } from './Components';
import { 
  Calendar, CheckCircle, ChevronDown, ChevronUp, FileText, 
  Clock, AlertCircle, Upload, ArrowRight, Check, MapPin, 
  Hammer, ShoppingBag, ShieldCheck, Zap, Box
} from 'lucide-react';

interface ConsultingModuleProps {
  onComplete: (booking: ConsultingBooking) => void;
  onCancel: () => void;
  preSelectedPackageId?: string; 
}

type Step = 'INFO' | 'CHECKLIST' | 'UPLOAD' | 'SCHEDULE' | 'CONFIRM';

export const ConsultingModule: React.FC<ConsultingModuleProps> = ({ onComplete, onCancel, preSelectedPackageId }) => {
  const [step, setStep] = useState<Step>('INFO');
  
  // Step 1: Info Data
  const [formData, setFormData] = useState({
    businessType: '',
    status: '', // '점포없음', '후보있음', '계약완료'
    budget: '',
    area: '',
    openDate: '',
  });

  // Step 2: Selected Tasks (Set of IDs)
  // Fix: explicitly type the Set as string
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set<string>(
    preSelectedPackageId ? ['used_package', 'consulting'] : []
  ));

  // Step 3: Schedule
  const [selectedSlot, setSelectedSlot] = useState<{date: string, time: string} | null>(null);

  // --- Handlers ---
  
  const toggleTask = (taskId: string) => {
    // Copy the set to trigger re-render
    const newSet = new Set<string>(selectedTaskIds);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setSelectedTaskIds(newSet);
  };

  const getTaskById = (id: string) => OPEN_PROCESS_TASKS.find(t => t.id === id);

  // --- Calculations ---
  const selectedTasks = Array.from(selectedTaskIds).map((id) => getTaskById(id as string)).filter(Boolean) as OpenTaskItem[];
  const has3DLink = selectedTaskIds.has('3d_link');
  
  // Lead Time Calculation (Rough Estimate)
  const maxLeadTimeWeeks = selectedTasks.reduce((acc, task) => {
      if(task.leadTime.includes('주')) return Math.max(acc, parseInt(task.leadTime));
      return acc;
  }, 1);

  // --- Helpers ---
  // Icon Component for Cleaning
  const Sparkles = ({size}: {size: number}) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 9h4"/></svg>
  );

  const getTaskIcon = (id: string) => {
      if(id.includes('store')) return MapPin;
      if(id.includes('demo')) return Hammer;
      if(id.includes('interior')) return Hammer;
      if(id.includes('sign')) return MapPin;
      if(id.includes('clean')) return Sparkles;
      if(id.includes('network')) return Zap;
      if(id.includes('insur')) return ShieldCheck;
      if(id.includes('bever')) return ShoppingBag;
      if(id.includes('deliv')) return ShoppingBag;
      if(id.includes('used')) return ShoppingBag;
      if(id.includes('3d')) return Box;
      if(id.includes('consult')) return FileText;
      return CheckCircle;
  }

  // --- Render Steps ---

  const renderInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">오픈 상담 신청</h2>
        <p className="text-slate-500 text-sm mt-1">기본 정보를 입력하면 딱 맞는 체크리스트를 추천해드려요.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">현재 진행 상태</label>
          <div className="flex gap-2 flex-wrap">
            {['점포 알아봄', '후보지 있음', '계약 완료', '철거 필요'].map(s => (
              <button
                key={s}
                onClick={() => setFormData({...formData, status: s})}
                className={`px-3 py-2 rounded-lg text-sm font-bold border transition-all
                  ${formData.status === s 
                    ? 'bg-brand-600 text-white border-brand-600' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-300'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Input 
          label="업종 (예: 카페, 술집)" 
          value={formData.businessType}
          onChange={e => setFormData({...formData, businessType: e.target.value})}
          placeholder="예: 10평대 개인카페"
        />

        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="예상 예산" 
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                placeholder="예: 3000만원"
                suffix="원"
            />
             <Input 
                label="면적" 
                value={formData.area}
                onChange={e => setFormData({...formData, area: e.target.value})}
                placeholder="예: 12"
                suffix="평"
            />
        </div>
        
        <Input 
            label="오픈 희망일" 
            type="date"
            value={formData.openDate}
            onChange={e => setFormData({...formData, openDate: e.target.value})}
        />
      </div>

      <div className="pt-4">
        <Button fullWidth size="lg" onClick={() => setStep('CHECKLIST')} disabled={!formData.businessType}>
          다음: 할 일 선택하기
        </Button>
      </div>
    </div>
  );

  const renderChecklistStep = () => (
    <div className="pb-20 relative min-h-[60vh]">
       <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">오픈 체크리스트</h2>
        <p className="text-slate-500 text-sm mt-1">필요한 항목을 선택하면 견적과 일정을 정리해드립니다.</p>
      </div>

      {/* Recommended Toggle (Mock) */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6 text-xs font-bold text-gray-500">
          <button className="flex-1 py-1.5 bg-white shadow-sm rounded text-brand-700">오프닝 추천</button>
          <button className="flex-1 py-1.5">최저 비용</button>
          <button className="flex-1 py-1.5">최단 기간</button>
      </div>

      <div className="space-y-3">
        {OPEN_TASK_CATEGORIES.map(category => {
            const tasksInCategory = OPEN_PROCESS_TASKS.filter(t => t.category === category.id);
            if(tasksInCategory.length === 0) return null;

            return (
                <div key={category.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <span className="font-bold text-slate-800 text-sm">{category.label}</span>
                            <p className="text-[10px] text-gray-500">{category.description}</p>
                        </div>
                    </div>
                    
                    {/* Task Cards */}
                    <div className="divide-y divide-gray-100">
                        {tasksInCategory.map(task => {
                             const isSelected = selectedTaskIds.has(task.id);
                             const Icon = getTaskIcon(task.id);

                             return (
                                <div 
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className={`p-4 cursor-pointer transition-all flex items-start gap-3
                                        ${isSelected ? 'bg-brand-50/50' : 'hover:bg-gray-50'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                        ${isSelected ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Icon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className={`text-sm font-bold ${isSelected ? 'text-brand-800' : 'text-slate-700'}`}>
                                                {task.title}
                                            </h4>
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                                                ${isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'border-gray-300 bg-white'}`}>
                                                {isSelected && <Check size={12} strokeWidth={3} />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                {task.leadTime}
                                            </span>
                                            {task.isOpeningExclusive && (
                                                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 font-bold">
                                                    오프닝 전용
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                </div>
            )
        })}
      </div>

      {/* Fixed Footer for 3D Link */}
      {has3DLink && (
          <div className="fixed bottom-[80px] left-0 right-0 max-w-2xl mx-auto px-4 z-10 pointer-events-none">
              <div className="bg-slate-800/90 backdrop-blur text-white text-xs py-2 px-4 rounded-lg shadow-lg text-center animate-in slide-in-from-bottom-2">
                  <span className="font-bold text-yellow-400 mr-1">알림</span> 
                  3D 인테리어 체험 링크는 작업 완료 후 <strong className="underline">카카오톡</strong>으로 발송됩니다.
              </div>
          </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
         <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
             <div className="flex flex-col">
                 <span className="text-xs text-gray-500 font-bold">선택 {selectedTasks.length}개 항목</span>
                 <span className="text-sm font-bold text-brand-700">예상 준비기간 {maxLeadTimeWeeks}주~</span>
             </div>
             <Button onClick={() => setStep('UPLOAD')} disabled={selectedTasks.length === 0} className="px-8">
                 이대로 진행 <ArrowRight size={16} className="ml-2" />
             </Button>
         </div>
      </div>
    </div>
  );

  const renderUploadStep = () => (
     <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">자료 업로드 (선택)</h2>
            <p className="text-slate-500 text-sm mt-1">현장 사진이나 도면이 있으면 더 정확한 견적이 가능해요.</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-brand-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload size={24} />
            </div>
            <h3 className="font-bold text-gray-700">사진/도면 파일 추가</h3>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (최대 10MB)</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex gap-3 items-start">
            <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-yellow-800">
                <p className="font-bold mb-1">아직 자료가 없으신가요?</p>
                <p>괜찮습니다! 상담 시 매니저에게 현장 상황을 설명해주시면 됩니다. 나중에 카카오톡으로 보내주셔도 돼요.</p>
            </div>
        </div>

        <div className="pt-8 flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setStep('CHECKLIST')}>이전</Button>
            <Button fullWidth onClick={() => setStep('SCHEDULE')}>다음</Button>
        </div>
     </div>
  );

  const renderScheduleStep = () => {
    const slots = [
        { date: '오늘', times: ['14:00', '15:30', '17:00'] },
        { date: '내일', times: ['10:00', '11:30', '14:00'] },
        { date: '모레', times: ['13:00', '16:00'] },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900">상담 일정 선택</h2>
                <p className="text-slate-500 text-sm mt-1">전문가가 선택하신 항목을 미리 검토하고 연락드립니다.</p>
            </div>

            <div className="grid gap-4">
                {slots.map((slot, idx) => (
                <div key={idx} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-brand-600"/> {slot.date}
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {slot.times.map(t => (
                        <button
                        key={t}
                        onClick={() => setSelectedSlot({date: slot.date, time: t})}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all
                            ${selectedSlot?.date === slot.date && selectedSlot?.time === t 
                            ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-100' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50'
                            }`}
                        >
                        {t}
                        </button>
                    ))}
                    </div>
                </div>
                ))}
            </div>

             <div className="pt-8 flex gap-3">
                <Button variant="outline" fullWidth onClick={() => setStep('UPLOAD')}>이전</Button>
                <Button fullWidth onClick={handleConfirm} disabled={!selectedSlot}>상담 확정하기</Button>
            </div>
        </div>
    );
  };

  const handleConfirm = () => {
      if(!selectedSlot) return;
      
      const booking: ConsultingBooking = {
          id: `bk_${Date.now()}`,
          date: selectedSlot.date,
          timeSlot: selectedSlot.time,
          businessType: formData.businessType,
          budget: formData.budget,
          status: 'CONFIRMED',
          consultantName: '배정중',
          typeLabel: '오픈 종합 상담',
          selectedTasks: Array.from(selectedTaskIds)
      };
      onComplete(booking);
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
        {/* Header Navigation (Hidden on Confirmation) */}
        {step !== 'CONFIRM' && (
            <div className="flex justify-center mb-8 gap-2">
                {['INFO', 'CHECKLIST', 'UPLOAD', 'SCHEDULE'].map((s, idx) => {
                    const stepOrder = ['INFO', 'CHECKLIST', 'UPLOAD', 'SCHEDULE'];
                    const currentIdx = stepOrder.indexOf(step);
                    const isActive = currentIdx >= idx;
                    return (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${isActive ? 'bg-brand-600' : 'bg-gray-200'}`} />
                    )
                })}
            </div>
        )}

        {step === 'INFO' && renderInfoStep()}
        {step === 'CHECKLIST' && renderChecklistStep()}
        {step === 'UPLOAD' && renderUploadStep()}
        {step === 'SCHEDULE' && renderScheduleStep()}
    </div>
  );
};