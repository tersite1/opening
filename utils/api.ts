import { supabase } from './supabaseClient';
import { ConsultingBooking, Quote } from '../types';

// 1. 상담 내역 불러오기
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
    files: item.files || [], 
    date: new Date(item.created_at).toLocaleDateString(),
  })) as ConsultingBooking[];
};

// 2. 상담 신청하기
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
        files: []
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 3. 파일 업로드
export const uploadConsultingFile = async (consultingId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${consultingId}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

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

    const { error: updateError } = await supabase
        .from('consultings')
        .update({ files: updatedFiles })
        .eq('id', consultingId);

    if (updateError) throw updateError;

    return updatedFiles;
};

// 4. 견적서 목록 불러오기 (layoutData 매핑 추가됨 ✅)
export const fetchQuotes = async (): Promise<Quote[]> => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    packageId: item.package_id,
    packageName: item.package_name,
    
    itemsCost: item.items_cost,
    logisticsCost: item.logistics_cost,
    installationCost: item.installation_cost,
    optionsCost: item.options_cost,
    discountAmount: item.discount_amount,
    vat: item.vat,
    totalCost: item.total_cost,
    deposit: item.deposit,
    
    date: new Date(item.created_at).toLocaleDateString(),
    validUntil: item.valid_until,
    status: item.status,
    version: item.version,
    
    scope: item.scope || [],
    timeline: item.timeline || [],
    requirements: item.requirements || [],
    
    grade: item.grade,
    warrantyPeriod: item.warranty_period,
    
    has3D: item.has_3d,
    is3DLinkSent: item.is_3d_link_sent,
    consultingIncluded: item.consulting_included,

    // [중요] DB의 layout_data를 앱의 layoutData로 연결
    layoutData: item.layout_data || null 
  })) as Quote[];
};

// 5. 견적서 저장하기 (layout_data 저장 추가됨 ✅)
export const createQuote = async (quote: Quote) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('quotes')
    .insert([
      {
        id: quote.id,
        user_id: user.id,
        package_id: quote.packageId,
        package_name: quote.packageName,
        
        items_cost: quote.itemsCost,
        logistics_cost: quote.logisticsCost,
        installation_cost: quote.installationCost,
        options_cost: quote.optionsCost,
        discount_amount: quote.discountAmount,
        vat: quote.vat,
        total_cost: quote.totalCost,
        deposit: quote.deposit,
        
        valid_until: quote.validUntil,
        status: quote.status,
        version: quote.version,
        
        scope: quote.scope,
        timeline: quote.timeline,
        requirements: quote.requirements,
        
        grade: quote.grade,
        warranty_period: quote.warrantyPeriod,
        
        has_3d: quote.has3D,
        is_3d_link_sent: quote.is3DLinkSent,
        consulting_included: quote.consultingIncluded,

        // [중요] 3D 배치 데이터 저장
        layout_data: quote.layoutData 
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
