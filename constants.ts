import { CategoryNode, Package, BusinessType, ItemGrade, Product, ConsultingOption, OpenTaskCategory, OpenTaskItem } from './types';
import { 
  Utensils, Coffee, ShoppingBag, Scissors, GraduationCap, 
  Stethoscope, Gamepad2, Building2, Car, BedDouble 
} from 'lucide-react';

// 1. 업종 카테고리 트리
export const CATEGORY_TREE: CategoryNode[] = [
  {
    id: 'FOOD',
    label: '음식·외식',
    icon: Utensils,
    children: [
      { id: 'CAFE', label: '카페/디저트', children: [{ id: 'cafe_small', label: '개인카페' }, { id: 'cafe_fran', label: '프랜차이즈' }, { id: 'bakery', label: '베이커리' }] },
      { id: 'PUB', label: '주점/호프', children: [{ id: 'pub_Izakaya', label: '이자카야' }, { id: 'pub_poch', label: '포차' }, { id: 'pub_bar', label: '바(Bar)' }] },
      { id: 'CHICKEN', label: '치킨/피자', children: [] },
      { id: 'KOREAN', label: '한식/분식', children: [] },
    ]
  },
  {
    id: 'RETAIL',
    label: '소매·유통',
    icon: ShoppingBag,
    children: [
      { id: 'CVS', label: '편의점/마트', children: [] },
      { id: 'CLOTHES', label: '의류/잡화', children: [] },
    ]
  },
  {
    id: 'BEAUTY',
    label: '뷰티·서비스',
    icon: Scissors,
    children: [
      { id: 'HAIR', label: '헤어샵', children: [] },
      { id: 'NAIL', label: '네일/속눈썹', children: [] },
    ]
  },
  {
    id: 'EDUCATION',
    label: '교육·학습',
    icon: GraduationCap,
    children: [
      { id: 'STUDY', label: '스터디카페', children: [] },
      { id: 'ACADEMY', label: '학원/교습소', children: [] },
    ]
  },
  {
    id: 'HEALTH',
    label: '의료·건강',
    icon: Stethoscope,
    children: [
      { id: 'FITNESS', label: '헬스/PT' },
      { id: 'PILATES', label: '필라테스' }
    ]
  },
  {
    id: 'ENTERTAINMENT',
    label: '엔터·PC',
    icon: Gamepad2,
    children: [
      { id: 'PC', label: 'PC방', children: [] },
      { id: 'KARAOKE', label: '노래방', children: [] },
    ]
  },
  {
    id: 'OFFICE',
    label: '사무·오피스',
    icon: Building2,
    children: []
  },
  {
    id: 'AUTO',
    label: '자동차',
    icon: Car,
    children: []
  },
  {
    id: 'LODGING',
    label: '숙박·기타',
    icon: BedDouble,
    children: []
  }
];

export const OPEN_TASK_CATEGORIES: OpenTaskCategory[] = [
  { id: 'A', label: '점포/계약', description: '창업의 첫 단추, 리스크 없이 계약하기' },
  { id: 'B', label: '정리/공사', description: '철거부터 인테리어까지 한번에' },
  { id: 'C', label: '운영 인프라', description: '오픈 필수 설비 및 서비스 세팅' },
  { id: 'D', label: '오프닝 전용', description: '비용 절감과 퀄리티 보장의 핵심' },
];

export const OPEN_PROCESS_TASKS: OpenTaskItem[] = [
  // A. 점포/계약
  { id: 'find_store', category: 'A', title: '점포 찾기', description: '입지/상권 분석 및 매물 추천', leadTime: '1~2주' },
  
  // B. 정리/공사
  { id: 'demolition', category: 'B', title: '철거 및 원상복구', description: '폐기물 처리 및 부분/전체 철거', leadTime: '3~7일' },
  { id: 'interior', category: 'B', title: '인테리어 시공', description: '업종별 필수 시공 및 설비 공사', leadTime: '2~4주' },
  { id: 'signage', category: 'B', title: '간판/사인물', description: '내외부 간판 디자인 및 설치', leadTime: '5~7일' },
  { id: 'cleaning', category: 'B', title: '전문 청소', description: '오픈 전 딥클리닝 (주방 포함)', leadTime: '1일' },

  // C. 운영 인프라
  { id: 'network_pos', category: 'C', title: '통신/POS 솔루션', description: '인터넷, CCTV, 키오스크 세팅', leadTime: '3~5일' },
  { id: 'insurance', category: 'C', title: '필수 보험 가입', description: '화재/배상책임/의무보험 설계', leadTime: '즉시' },
  { id: 'beverage', category: 'C', title: '음료/주류 도매', description: '최적 단가 공급사 매칭', leadTime: '3~7일' },
  { id: 'delivery', category: 'C', title: '배달 대행 세팅', description: '배달권역 설정 및 대행사 연결', leadTime: '3~5일' },

  // D. 오프닝 전용 (핵심)
  { id: 'used_package', category: 'D', title: '중고 가구/집기 패키지', description: 'A급 검수 패키지 + 물류/설치 포함', leadTime: '5~7일', isOpeningExclusive: true, isRequired: true },
  { id: '3d_link', category: 'D', title: '3D 인테리어 시안', description: '배치/동선 체험 링크 제공', leadTime: '3~5일', isOpeningExclusive: true },
  { id: 'consulting', category: 'D', title: '창업 컨설팅', description: '예산/구성 최적화 진단 리포트', leadTime: '2~3일', isOpeningExclusive: true },
  { id: 'owner_guide', category: 'D', title: '사장님 필독 체크', description: '인허가/행정절차 가이드 제공', leadTime: '즉시', isOpeningExclusive: true },
];

// Helper to create mock products
const createProduct = (name: string, category: string, w: number, d: number, h: number, price: number = 0, grade: ItemGrade = ItemGrade.A): Product => ({
  id: `p_${Math.random().toString(36).substr(2, 9)}`,
  name, category, width: w, depth: d, height: h, price, grade, 
  utility: {electric:false, water:false, gas:false, vent:false}, 
  image: '', 
  clearance: {front:0, side:0}
});

// 2. 통합 매물 데이터 (오프닝 인증 + 사용자 매물)
export const MOCK_OPENING_PACKAGES: Package[] = [
  // ============================================
  // [EDUCATION] 스터디카페 & 학원
  // ============================================
  {
    id: 'pkg_edu_001',
    source: 'OPENING',
    name: '강남 프리미엄 스터디카페 20평형 (A급 풀세트)',
    description: '프리미엄 독서실 폐업 자재, 상태 최상. 시디즈 의자 40개, 1인실 책상 포함. 방음 부스 상태 양호.',
    businessType: 'EDUCATION',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    items: [
      createProduct('프리미엄 1인실 책상', 'FURNITURE', 100, 60, 120, 150000),
      createProduct('시디즈 T50 의자', 'FURNITURE', 50, 50, 100, 120000),
      createProduct('키오스크 (21인치)', 'DEVICE', 40, 30, 160, 800000, ItemGrade.B)
    ],
    totalPrice: 15000000,
    location: '서울 강남구 역삼동',
    leadTimeDays: 7,
    has3D: true,
    badges: ['오프닝 검수', '설치포함', 'A급보증'],
    grade: 'A',
    warranty: '6개월',
    tags: ['study', 'gangnam', '20py', 'quick', 'large'],
  },
  {
    id: 'pkg_edu_002',
    source: 'USER',
    name: '보습학원 15평 강의실 집기 일괄 (책걸상 30조)',
    description: '운영 2년차 학원 정리. 책걸상 세트 30조, 화이트보드 2개, 강연대 1개. 상태 깨끗함.',
    businessType: 'EDUCATION',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000',
    items: [
        createProduct('학원용 책걸상 세트', 'FURNITURE', 60, 40, 70, 30000, ItemGrade.B),
        createProduct('대형 화이트보드', 'FURNITURE', 180, 5, 120, 50000, ItemGrade.C)
    ],
    totalPrice: 1200000,
    location: '경기 성남시 분당구',
    leadTimeDays: 5,
    has3D: false,
    badges: ['직거래', '가구위주'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-10',
    hopePrice: 1000000,
    tags: ['academy', 'bundang', 'cheap']
  },

  // ============================================
  // [CAFE] 카페 & 베이커리
  // ============================================
  {
    id: 'pkg_cafe_001',
    source: 'OPENING',
    name: '성수동 감성 카페 15평 (B급 가성비 패키지)',
    description: '우드톤 인테리어 가구 일체. 라마르조꼬 머신 포함(점검완료). 테이블 8조, 의자 16개.',
    businessType: 'CAFE',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000',
    items: [
        createProduct('2인 원목 테이블', 'FURNITURE', 60, 60, 72, 50000, ItemGrade.B),
        createProduct('라마르조꼬 리네아 2구', 'KITCHEN', 80, 60, 50, 4500000, ItemGrade.B)
    ],
    totalPrice: 12000000,
    location: '서울 성동구 성수동',
    leadTimeDays: 14,
    has3D: true,
    badges: ['오프닝 검수', '철거포함'],
    grade: 'B',
    warranty: '3개월',
    tags: ['cafe', 'seongsu', 'wood', 'cheap']
  },
  {
    id: 'pkg_cafe_002',
    source: 'USER',
    name: '프랜차이즈 카페 폐업 정리 (집기/가구/머신)',
    description: '메가/컴포즈 스타일 저가형 카페 집기. 제빙기 2대, 블렌더 2대, 포스기 포함 풀세트.',
    businessType: 'CAFE',
    image: 'https://images.unsplash.com/photo-1507914464562-6b718842a633?q=80&w=1000',
    items: [],
    totalPrice: 8500000,
    location: '인천 부평구',
    leadTimeDays: 7,
    has3D: false,
    badges: ['직거래', '급처', '7일 빠른회수'],
    grade: 'C',
    warranty: '없음',
    deadline: 'D-3',
    hopePrice: 8000000,
    tags: ['cafe', 'franchise', 'urgent']
  },
  {
    id: 'pkg_cafe_003',
    source: 'OPENING',
    name: '베이커리 카페 주방 장비 세트 (데크오븐 포함)',
    description: '3단 데크오븐, 도우컨디셔너, 믹서기, 스텐 작업대 3개. 베이커리 특화 구성.',
    businessType: 'CAFE',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000',
    items: [
        createProduct('3단 데크오븐', 'KITCHEN', 160, 90, 180, 2000000, ItemGrade.B),
        createProduct('버티컬 믹서 20L', 'KITCHEN', 60, 60, 100, 800000, ItemGrade.B)
    ],
    totalPrice: 18000000,
    location: '서울 송파구',
    leadTimeDays: 10,
    has3D: true,
    badges: ['오프닝 검수', '주방위주'],
    grade: 'B+',
    warranty: '6개월',
    tags: ['bakery', 'kitchen', 'oven']
  },

  // ============================================
  // [PUB] 주점 & 호프 & 바
  // ============================================
  {
    id: 'pkg_pub_001',
    source: 'OPENING',
    name: '홍대 펍/바 12평 패키지 (주방 설비 특화)',
    description: '업소용 냉장고, 제빙기, 4구 간택기, 식기세척기 포함. 주방 설비 위주 구성.',
    businessType: 'PUB',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 18500000,
    location: '서울 마포구 서교동',
    leadTimeDays: 7,
    has3D: true,
    badges: ['오프닝 검수', '주방위주', '빠른설치'],
    grade: 'A',
    warranty: '3개월',
    tags: ['pub', 'hongdae', 'kitchen', 'quick']
  },
  {
    id: 'pkg_pub_002',
    source: 'USER',
    name: '이자카야 다찌(Bar) 테이블 및 목재 인테리어',
    description: '히노끼 스타일 다찌 상판, 목재 파티션, 일본식 조명 일괄 양도. 철거 가져가시는 조건.',
    businessType: 'PUB',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000',
    items: [],
    totalPrice: 3000000,
    location: '서울 관악구 신림동',
    leadTimeDays: 20,
    has3D: false,
    badges: ['직거래', '인테리어포함'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-14',
    hopePrice: 2500000,
    tags: ['izakaya', 'wood', 'interior']
  },
  {
    id: 'pkg_pub_003',
    source: 'USER',
    name: '실내포차 원형테이블 15개 세트 급처',
    description: '스테인리스 원형 드럼통 테이블 15개, 수납 의자 60개 일괄. 상태 양호.',
    businessType: 'PUB',
    image: 'https://images.unsplash.com/photo-1560526860-1f0e56046c85?q=80&w=1000',
    items: [
        createProduct('스텐 원형 테이블', 'FURNITURE', 90, 90, 75, 40000, ItemGrade.C)
    ],
    totalPrice: 800000,
    location: '경기 수원시 인계동',
    leadTimeDays: 3,
    has3D: false,
    badges: ['직거래', '초저가', '당일가능'],
    grade: 'C',
    warranty: '없음',
    deadline: 'D-2',
    hopePrice: 500000,
    tags: ['pub', 'pocha', 'cheap']
  },

  // ============================================
  // [RETAIL] 소매 & 편의점
  // ============================================
  {
    id: 'pkg_retail_001',
    source: 'USER',
    name: '동네 분식집 급처분 (집기 일괄)',
    description: '운영 6개월차. 개인사정 폐업. 떡볶이 다이, 튀김기, 순대 찜기 등 집기 일괄 판매합니다.',
    businessType: 'RETAIL',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 5000000,
    location: '서울 강서구 화곡동',
    leadTimeDays: 3,
    has3D: false,
    badges: ['직거래', '가격협의', '7일 빠른회수'],
    grade: 'C',
    warranty: '없음',
    deadline: 'D-5',
    hopePrice: 5000000,
    tags: ['retail', 'snack', 'urgent', 'quick', 'cheap']
  },
  {
    id: 'pkg_retail_002',
    source: 'OPENING',
    name: '편의점/마트 진열대(곤돌라) 20개 세트',
    description: '화이트 철제 곤돌라(양면/단면 혼합). 워크인 쿨러 도어 4짝 포함.',
    businessType: 'RETAIL',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000',
    items: [
        createProduct('철제 곤돌라(양면)', 'FURNITURE', 90, 80, 150, 150000, ItemGrade.A)
    ],
    totalPrice: 4500000,
    location: '경기 김포시',
    leadTimeDays: 7,
    has3D: true,
    badges: ['오프닝 검수', '설치지원'],
    grade: 'A',
    warranty: '6개월',
    tags: ['retail', 'cvs', 'shelf']
  },
  {
    id: 'pkg_retail_003',
    source: 'USER',
    name: '옷가게 행거 및 전신거울, 마네킹',
    description: '골드 프레임 행거 10개, 대형 전신거울 2개, 마네킹 5개. 감성 인테리어.',
    businessType: 'RETAIL',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000',
    items: [],
    totalPrice: 1500000,
    location: '서울 마포구 연남동',
    leadTimeDays: 7,
    has3D: false,
    badges: ['직거래', '소량'],
    grade: 'A',
    warranty: '없음',
    deadline: 'D-7',
    hopePrice: 1200000,
    tags: ['retail', 'clothing', 'interior']
  },

  // ============================================
  // [BEAUTY] 뷰티 & 미용
  // ============================================
  {
    id: 'pkg_beauty_001',
    source: 'USER',
    name: '네일샵 테이블 및 의자 정리 (1인샵)',
    description: '1인샵 운영하던 네일 가구 정리합니다. 흡진기 내장 테이블, 시술 의자, 패디 의자 1개.',
    businessType: 'BEAUTY',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 2000000,
    location: '서울 마포구 망원동',
    leadTimeDays: 5,
    has3D: false,
    badges: ['직거래', '소량'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-2',
    hopePrice: 1800000,
    tags: ['beauty', 'nail', 'today']
  },
  {
    id: 'pkg_beauty_002',
    source: 'OPENING',
    name: '미용실 경대/의자 3세트 패키지 (전동의자)',
    description: '골드 프레임 팔각 거울 경대 3개, 프리미엄 전동 미용 의자 3개, 샴푸대 1개.',
    businessType: 'BEAUTY',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000',
    items: [
        createProduct('전동 미용 의자', 'DEVICE', 70, 90, 110, 800000, ItemGrade.A),
        createProduct('샴푸대', 'DEVICE', 60, 120, 90, 600000, ItemGrade.B)
    ],
    totalPrice: 5500000,
    location: '서울 강남구 청담동',
    leadTimeDays: 10,
    has3D: true,
    badges: ['오프닝 검수', '설치포함'],
    grade: 'A',
    warranty: '1년',
    tags: ['beauty', 'hair', 'premium']
  },
  {
    id: 'pkg_beauty_003',
    source: 'OPENING',
    name: '바버샵 클래식 체어 2대 세트',
    description: '앤티크 스타일 중량 바버 체어 2대. 가죽 상태 양호.',
    businessType: 'BEAUTY',
    image: 'https://images.unsplash.com/photo-1503951914205-9847627cb971?q=80&w=1000',
    items: [],
    totalPrice: 2800000,
    location: '서울 용산구 이태원동',
    leadTimeDays: 7,
    has3D: false,
    badges: ['오프닝 검수', '희귀템'],
    grade: 'B+',
    warranty: '3개월',
    tags: ['beauty', 'barber', 'vintage']
  },

  // ============================================
  // [FITNESS] 헬스 & 필라테스
  // ============================================
  {
    id: 'pkg_fit_001',
    source: 'OPENING',
    name: '필라테스 스튜디오 30평 기구 일괄 (S급)',
    description: '리포머, 캐딜락, 체어, 바렐 풀세트 4조 (인투필라테스). 상태 매우 좋음.',
    businessType: 'FITNESS',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
    items: [
        createProduct('콤비 리포머', 'EQUIPMENT', 80, 240, 180, 1500000, ItemGrade.A)
    ],
    totalPrice: 25000000,
    location: '서울 송파구 잠실동',
    leadTimeDays: 10,
    has3D: true,
    badges: ['오프닝 검수', '설치포함', 'S급'],
    grade: 'A',
    warranty: '1년',
    tags: ['fitness', 'pilates', 'large']
  },
  {
    id: 'pkg_fit_002',
    source: 'USER',
    name: 'PT샵 운동기구 정리 (렉, 덤벨, 벤치)',
    description: '파워렉 1대, 스미스머신 1대, 덤벨 세트(2~30kg), 벤치 2개. 소규모 PT샵용.',
    businessType: 'FITNESS',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
    items: [],
    totalPrice: 4500000,
    location: '경기 안양시',
    leadTimeDays: 14,
    has3D: false,
    badges: ['직거래', '운반별도'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-20',
    hopePrice: 4000000,
    tags: ['fitness', 'gym', 'pt']
  },

  // ============================================
  // [OTHER] 기타 (스튜디오, 코인노래방 등)
  // ============================================
  {
    id: 'pkg_other_001',
    source: 'OPENING',
    name: '셀프 사진관(스튜디오) 장비 세트',
    description: '조명(스트로보) 2조, 배경지 전동 시스템, 키오스크 및 프린터 박스.',
    businessType: 'OTHER',
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1000',
    items: [],
    totalPrice: 6500000,
    location: '서울 마포구',
    leadTimeDays: 7,
    has3D: false,
    badges: ['오프닝 검수', '설치지원'],
    grade: 'A',
    warranty: '6개월',
    tags: ['photo', 'studio', 'kiosk']
  },
  {
    id: 'pkg_other_002',
    source: 'OPENING',
    name: '코인노래방 15룸 패키지 (반주기/스피커/모니터)',
    description: 'TJ미디어 최신 반주기 세트 15개. 소파 및 케이스 포함. 철거 후 보관중.',
    businessType: 'ENTERTAINMENT',
    image: 'https://images.unsplash.com/photo-1598518619679-584fbddb7f3d?q=80&w=1000',
    items: [],
    totalPrice: 35000000,
    location: '경기 부천시',
    leadTimeDays: 20,
    has3D: true,
    badges: ['오프닝 검수', '대량'],
    grade: 'B+',
    warranty: '3개월',
    tags: ['karaoke', 'entertainment', 'large']
  },
  {
    id: 'pkg_other_003',
    source: 'USER',
    name: '꽃집 작업대 및 진열장',
    description: '대형 원목 작업테이블(2000 사이즈), 리본걸이, 화분 진열대.',
    businessType: 'OTHER',
    image: 'https://images.unsplash.com/photo-1589244188104-81233c62a5a9?q=80&w=1000',
    items: [],
    totalPrice: 800000,
    location: '서울 서초구',
    leadTimeDays: 3,
    has3D: false,
    badges: ['직거래', '가구위주'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-5',
    hopePrice: 700000,
    tags: ['flower', 'furniture', 'wood']
  },
  // ============================================
  // [CHICKEN] 치킨 & 피자
  // ============================================
  {
    id: 'pkg_chicken_001',
    source: 'OPENING',
    name: '치킨·배달 주방 패키지 8~12평 "주방 라인 표준"',
    description: '작업대/선반/냉장/싱크 표준 구성 (현장 설비 제외). 튀김기 2구 포함.',
    businessType: 'CHICKEN',
    items: [createProduct('냉장고', 'Kitchen', 90, 80, 180, 1200000)],
    totalPrice: 27500000,
    location: '전국 설치 가능',
    leadTimeDays: 14,
    has3D: true,
    badges: ['오프닝 검수', '장비보증'],
    grade: 'B+',
    warranty: '30일',
    tags: ['chicken', 'kitchen', 'delivery'],
    image: 'https://images.unsplash.com/photo-1583251633115-788a2b9e6eb1?q=80&w=800'
  },
  {
    id: 'pkg_chicken_002',
    source: 'USER',
    name: '피자집 오븐 및 토핑냉장고 정리',
    description: '컨베이어 피자오븐 1대, 토핑테이블 냉장고 1500사이즈. 도우 믹서기.',
    businessType: 'CHICKEN',
    items: [],
    totalPrice: 4000000,
    location: '서울 동대문구',
    leadTimeDays: 7,
    has3D: false,
    badges: ['직거래', '주방위주'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-7',
    hopePrice: 3500000,
    tags: ['pizza', 'kitchen', 'oven'],
    image: 'https://images.unsplash.com/photo-1566843972233-03099975775a?q=80&w=800'
  },
  // ============================================
  // [OFFICE] 사무실
  // ============================================
  {
    id: 'pkg_office_001',
    source: 'USER',
    name: '소호사무실 퍼시스 책상/의자 10세트',
    description: '퍼시스 인에이블 책상(1400) + 의자 10세트. 이동서랍 포함. 1년 사용.',
    businessType: 'OFFICE',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000',
    items: [],
    totalPrice: 3500000,
    location: '서울 구로구 디지털단지',
    leadTimeDays: 14,
    has3D: false,
    badges: ['직거래', '브랜드가구', '상태최상'],
    grade: 'A',
    warranty: '없음',
    deadline: 'D-30',
    hopePrice: 3000000,
    tags: ['office', 'furniture', 'desk']
  }
];

// 3. 사용자 직거래 리스트 (홈 화면용 필터링)
// OPENING과 USER가 섞여있는 MOCK_OPENING_PACKAGES에서 USER만 필터링하거나, 
// 홈 화면 전용 태그('today', 'urgent')가 있는 항목을 추출
export const MOCK_USER_LISTINGS = MOCK_OPENING_PACKAGES.filter(p => p.source === 'USER' || p.tags?.includes('today') || p.tags?.includes('urgent'));

// 4. 비용 상수
export const LOGISTICS_BASE_COST = 200000; // Basic truck
export const INSTALLATION_BASE_COST = 300000; // Basic labor

// 5. 상담 옵션
export const MOCK_CONSULTING_OPTIONS: ConsultingOption[] = [
  {
    id: 'c_quick',
    title: '빠른 검증 (30분)',
    durationMin: 30,
    price: 30000,
    description: '아이디어/상권 초기 진단. 전화 또는 화상.',
    isOnline: true,
  },
  {
    id: 'c_standard',
    title: '구성/동선 확정 (60분)',
    durationMin: 60,
    price: 99000,
    description: '도면 기반 상세 배치 및 설비 체크. 화상 미팅.',
    isOnline: true,
  },
  {
    id: 'c_site',
    title: '현장 실측 동행',
    durationMin: 90,
    price: 250000,
    description: '전문가 현장 방문. 실측 및 인테리어 조언.',
    isOnline: false,
  }
];
