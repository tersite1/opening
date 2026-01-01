import { supabase } from './supabaseClient';
import { ConsultingBooking } from '../types';

// [수정] 상담 내역 불러오기 (files 컬럼 추가 매핑)
export const fetchConsultings = async (): Promise<ConsultingBooking[]> => {
  const { data, error } = await supabase
    .from('consultings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching consultings:', error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    businessType: item.business_type,
    region: item.region,
    area: item.area,
    budget: item.budget,
    targetDate: item.target_date,
    status: item.status,
    consultantName: '김오픈 프로',
    typeLabel: '맞춤 오픈 상담',
    selectedTaskIds: item.selected_task_ids || [],
    taskDetails: item.task_details || [],
    // [추가] DB의 files JSON 데이터를 앱에서 쓸 수 있게 변환
    files: item.files || [], 
    date: new Date(item.created_at).toLocaleDateString(),
  })) as ConsultingBooking[];
};

// [기존 유지] 상담 신청하기
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
        task_details: booking.taskDetails,
        files: [] // 초기 파일은 빈 배열
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// [신규] 파일 업로드 함수
export const uploadConsultingFile = async (consultingId: string, file: File) => {
    // 1. Storage에 파일 업로드
    // 파일명 중복 방지를 위해 timestamp 추가
    const fileExt = file.name.split('.').pop();
    const fileName = `${consultingId}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
        .from('uploads') // 1단계에서 만든 버킷 이름
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. 업로드된 파일의 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

    // 3. DB 업데이트 (기존 파일 목록에 추가)
    // 먼저 현재 파일 목록을 가져옵니다.
    const { data: currentData, error: fetchError } = await supabase
        .from('consultings')
        .select('files')
        .eq('id', consultingId)
        .single();
    
    if (fetchError) throw fetchError;

    const newFile = { 
        name: file.name, 
        url: publicUrl, 
        status: 'UPLOADED',
        uploadedAt: new Date().toISOString()
    };
    
    const updatedFiles = [...(currentData.files || []), newFile];

    // DB에 저장
    const { error: updateError } = await supabase
        .from('consultings')
        .update({ files: updatedFiles })
        .eq('id', consultingId);

    if (updateError) throw updateError;

    return updatedFiles;
};
