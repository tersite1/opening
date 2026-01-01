import { supabase } from './supabaseClient';
import { ConsultingBooking } from '../types';

// [추가] 상담 내역 불러오기
export const fetchConsultings = async (): Promise<ConsultingBooking[]> => {
  const { data, error } = await supabase
    .from('consultings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching consultings:', error);
    return [];
  }

  // DB 데이터 -> 앱 데이터 타입 변환
  return data.map((item: any) => ({
    id: item.id,
    businessType: item.business_type,
    region: item.region,
    area: item.area,
    budget: item.budget,
    targetDate: item.target_date,
    status: item.status,
    consultantName: '김오픈 프로', // 임시 고정 (나중에 DB profile 연동 가능)
    typeLabel: '맞춤 오픈 상담',
    selectedTaskIds: item.selected_task_ids || [],
    taskDetails: item.task_details || [],
    date: new Date(item.created_at).toLocaleDateString(),
  })) as ConsultingBooking[];
};

// [추가] 상담 신청하기 (저장)
export const createConsulting = async (booking: ConsultingBooking) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('consultings')
    .insert([
      {
        user_id: user.id,
        business_type: booking.businessType,
        region: booking.region,
        area: booking.area,
        budget: booking.budget,
        target_date: booking.targetDate,
        status: 'PENDING',
        selected_task_ids: booking.selectedTaskIds,
        task_details: booking.taskDetails
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
