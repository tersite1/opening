import { BusinessType, ItemGrade, Package, Product, ConsultingOption, CategoryNode, OpenTaskCategory, OpenTaskItem } from './types';
import { Coffee, Utensils, Beer, ShoppingBag, Scissors, BookOpen, HeartPulse, Gamepad2, Briefcase, Car, Home, Zap, Hammer, Truck, Monitor, ShieldCheck, Wine, Box, FileText, Smartphone } from 'lucide-react';

export const BUSINESS_TYPES = [
  { type: BusinessType.CAFE, label: '카페', icon: '☕' },
  { type: BusinessType.CHICKEN, label: '치킨/호프', icon: '🍗' },
  { type: BusinessType.BAKERY, label: '베이커리', icon: '🥐' },
  { type: BusinessType.PUB, label: '동네술집', icon: '🍺' },
  { type: BusinessType.DELIVERY, label: '배달전문', icon: '🛵' },
];

export const CATEGORY_TREE: CategoryNode[] = [
  {
    id: 'food', label: '음식·외식', icon: Utensils, children: [
      { id: 'food_restaurant', label: '일반식당', children: [
        { id: 'korean', label: '한식' }, { id: 'meat', label: '고기' }, { id: 'snack', label: '분식' },
        { id: 'chinese', label: '중식' }, { id: 'japanese', label: '일식' }, { id: 'western', label: '양식' }
      ]},
      { id: 'food_cafe', label: '카페·디저트', children: [
        { id: 'cafe', label: '카페' }, { id: 'dessert', label: '디저트' }, { id: 'bakery', label: '베이커리' }
      ]},
      { id: 'food_fastfood', label: '프랜차이즈', children: [
        { id: 'chicken', label: '치킨' }, { id: 'pizza', label: '피자' }, { id: 'burger', label: '버거' }
      ]},
       { id: 'food_delivery', label: '배달전문', children: [
        { id: 'delivery_only', label: '배달' }, { id: 'shared_kitchen', label: '공유주방' }
      ]}
    ]
  },
  {
    id: 'alcohol', label: '주류·유흥', icon: Beer, children: [
      { id: 'pub_casual', label: '동네술집', children: [
         { id: 'local_pub', label: '포차' }, { id: 'hof', label: '호프' }
      ]},
      { id: 'pub_concept', label: '전문주점', children: [
        { id: 'izakaya', label: '이자카야' }, { id: 'wine_bar', label: '와인바' }
      ]}
    ]
  },
  {
    id: 'retail', label: '소매·유통', icon: ShoppingBag, children: [
      { id: 'retail_living', label: '생활잡화' }, { id: 'retail_fashion', label: '의류패션' }, { id: 'retail_food', label: '편의점' }
    ]
  },
  {
    id: 'service', label: '뷰티·서비스', icon: Scissors, children: [
      { id: 'service_beauty', label: '미용실' }, { id: 'service_clean', label: '세탁소' }, { id: 'service_pet', label: '애견샵' }
    ]
  },
  {
    id: 'education', label: '교육·학습', icon: BookOpen, children: [
       { id: 'edu_academy', label: '학원' }, { id: 'edu_space', label: '스터디카페' }
    ]
  },
  {
    id: 'health', label: '의료·건강', icon: HeartPulse, children: [
      { id: 'health_clinic', label: '병원' }, { id: 'health_fitness', label: '헬스/PT' }
    ]
  },
  {
    id: 'entertainment', label: '엔터·PC', icon: Gamepad2, children: [
      { id: 'ent_game', label: 'PC방' }, { id: 'ent_karaoke', label: '노래방' }
    ]
  },
  {
    id: 'office', label: '사무·오피스', icon: Briefcase, children: [
      { id: 'office_space', label: '공유오피스' }, { id: 'office_finance', label: '부동산' }
    ]
  },
  {
    id: 'car', label: '자동차', icon: Car, children: [
      { id: 'car_repair', label: '정비/세차' }
    ]
  },
  {
    id: 'lodging', label: '숙박·기타', icon: Home, children: [
      { id: 'stay', label: '게스트하우스' }, { id: 'unmanned', label: '무인매장' }
    ]
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
const createProduct = (name: string, category: string, w: number, d: number, h: number): Product => ({
  id: `p_${Math.random().toString(36).substr(2, 9)}`,
  name, category, width: w, depth: d, height: h, price: 0, grade: ItemGrade.B, utility: {electric:false, water:false, gas:false, vent:false}, image: '', clearance: {front:0, side:0}
});

// --- 1. USER LISTINGS (Home View - 14 Items) ---
export const MOCK_USER_LISTINGS: Package[] = [
  // Today's Listings
  {
    id: 'user_pub_gangnam', source: 'USER', name: '강남 이자카야 정리 처분 (주방위주)', description: '덕트/가스/전기 증설은 현장별 (미포함)',
    businessType: 'PUB', items: [createProduct('튀김기', 'Kitchen', 60,60,80)], totalPrice: 12500000, hopePrice: 12500000,
    location: '서울 강남구 역삼동', leadTimeDays: 7, has3D: false, badges: ['빠른설치', '주방특화'], deadline: '7일 내', tags: ['today', 'quick', 'kitchen'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800' // Dark Pub
  },
  {
    id: 'user_cafe_mapo', source: 'USER', name: '마포 테이크아웃 정리 (홀 최소)', description: '카운터 1, 진열장 1, 테이블 3, 의자 10, 선반/수납',
    businessType: 'CAFE', items: [createProduct('카운터', 'Furniture', 120,60,90)], totalPrice: 8900000, hopePrice: 8900000,
    location: '서울 마포구 합정동', leadTimeDays: 7, has3D: false, badges: ['가구특화'], deadline: '10일', tags: ['today', 'furniture'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800' // Coffee Counter
  },
  
  // Quick Sale (7 Days)
  {
    id: 'user_snack_songpa', source: 'USER', name: '송파 8평 급정리 (포장·배달 세팅)', description: '포장대 1, 작업대 1, 선반 3, 테이블 4, 의자 8',
    businessType: '분식', items: [], totalPrice: 4200000, hopePrice: 4200000,
    location: '서울 송파구 방이동', leadTimeDays: 5, has3D: false, badges: ['빠른설치'], deadline: '5일', tags: ['quick'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800' // Simple Restaurant
  },
  {
    id: 'user_nail_seongsu', source: 'USER', name: '성수 7평 이전 (2인 시술)', description: '네일테이블 2, 의자 4, 수납장 3, 대기소파 1',
    businessType: 'BEAUTY', items: [], totalPrice: 3600000, hopePrice: 3600000,
    location: '서울 성동구 성수동', leadTimeDays: 7, has3D: false, badges: ['가구특화'], deadline: '7일', tags: ['quick', 'furniture'],
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800' // Nail Salon
  },

  // Kitchen Focus
  {
    id: 'user_chicken_bucheon', source: 'USER', name: '부천 배달주방 정리 (장비 중심)', description: '냉장/냉동 2, 작업대 2, 선반 5, 싱크 1, 튀김 라인(조건부)',
    businessType: 'CHICKEN', items: [], totalPrice: 15800000, hopePrice: 15800000,
    location: '경기 부천시', leadTimeDays: 14, has3D: false, badges: ['주방특화'], deadline: '14일', tags: ['kitchen'],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800' // Stainless Kitchen
  },
  {
    id: 'user_gukbap_suwon', source: 'USER', name: '수원 12평 폐업정리 (상판·스텐 위주)', description: '스텐 작업대 3, 테이블 8, 의자 24, 선반 6, 냉장 1',
    businessType: '일반식당', items: [], totalPrice: 9700000, hopePrice: 9700000,
    location: '경기 수원시', leadTimeDays: 14, has3D: false, badges: ['주방특화', '가구혼합'], deadline: '21일', tags: ['kitchen', 'furniture'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800' // Restaurant Interior
  },

  // Furniture/Hall Focus
  {
    id: 'user_pub_gangseo', source: 'USER', name: '강서 13평 홀세팅 양도 (테이블 다수)', description: '테이블 10, 의자 36, 벽선반, 조명, 간단 바테이블',
    businessType: 'PUB', items: [], totalPrice: 7900000, hopePrice: 7900000,
    location: '서울 강서구', leadTimeDays: 14, has3D: false, badges: ['가구특화'], deadline: '14일', tags: ['furniture'],
    image: 'https://images.unsplash.com/photo-1572116469696-958721b7d6ca?q=80&w=800' // Pub Tables
  },
  {
    id: 'user_study_bundang', source: 'USER', name: '분당 18평 리뉴얼로 가구만 정리', description: '1인석 24, 듀얼석 6, 의자 30, 락커 24, 파티션 일부',
    businessType: 'EDUCATION', items: [], totalPrice: 18400000, hopePrice: 18400000,
    location: '경기 성남시 분당', leadTimeDays: 30, has3D: false, badges: ['가구특화'], deadline: '30일', tags: ['furniture', 'large'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800' // Office/Study
  },

  // Franchise
  {
    id: 'user_cafe_gangnam', source: 'USER', name: '강남 리뉴얼 (카운터·진열 일괄)', description: '카운터 1, 진열 1, 백바/수납, 테이블 6, 의자 18',
    businessType: 'CAFE', items: [], totalPrice: 14900000, hopePrice: 14900000,
    location: '서울 강남구', leadTimeDays: 21, has3D: false, badges: ['프랜차이즈'], deadline: '21일', tags: ['franchise'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800' // Modern Cafe
  },
  {
    id: 'user_cvs_incheon', source: 'USER', name: '인천 이전 (선반·냉장 쇼케이스)', description: '곤돌라 선반 10, 냉장 쇼케이스 2, POS 카운터(조건부)',
    businessType: 'RETAIL', items: [], totalPrice: 22000000, hopePrice: 22000000,
    location: '인천', leadTimeDays: 21, has3D: false, badges: ['리테일특화'], deadline: '21일', tags: ['franchise', 'retail'],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800' // Grocery Shelves
  },

  // Low Price
  {
    id: 'user_hair_daegu', source: 'USER', name: '대구 10평 급처 (대기/세트)', description: '거울 3, 의자 3, 대기소파 1, 수납장',
    businessType: 'BEAUTY', items: [], totalPrice: 2800000, hopePrice: 2800000,
    location: '대구', leadTimeDays: 10, has3D: false, badges: ['초저가'], deadline: '10일', tags: ['cheap'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800' // Salon
  },
  {
    id: 'user_key_gwanak', source: 'USER', name: '관악 5평 초소형 정리 (가구 위주)', description: '카운터 1, 진열 1, 작업테이블 1, 수납',
    businessType: 'OTHER', items: [], totalPrice: 1600000, hopePrice: 1600000,
    location: '서울 관악구', leadTimeDays: 7, has3D: false, badges: ['초저가', '초소형'], deadline: '7일', tags: ['cheap', 'small'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800' // Workshop
  },

  // Large Area
  {
    id: 'user_pilates_gangdong', source: 'USER', name: '강동 25평 이전 (거울·수납·대기)', description: '거울벽 일부, 수납장, 리셉션 데스크, 대기 가구',
    businessType: 'FITNESS', items: [], totalPrice: 9900000, hopePrice: 9900000,
    location: '서울 강동구', leadTimeDays: 30, has3D: false, badges: ['대형평수'], deadline: '30일', tags: ['large'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800' // Gym
  },
  {
    id: 'user_pc_bupyeong', source: 'USER', name: '부평 40평 정리 (좌석·데스크 중심)', description: '데스크 40, 의자 40, 파티션, 조명 일부',
    businessType: 'ENTERTAINMENT', items: [], totalPrice: 28000000, hopePrice: 28000000,
    location: '인천 부평구', leadTimeDays: 30, has3D: false, badges: ['대형평수'], deadline: '30일', tags: ['large'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800' // Gaming
  }
];

// --- 2. OPENING PACKAGES (Listings View - 10 Items) ---
export const MOCK_OPENING_PACKAGES: Package[] = [
  {
    id: 'pkg_study_white', source: 'OPENING', name: '스터디카페 패키지 16~20평 "화이트우드 A"', description: '1인석 24, 듀얼석 6, 락커 24, 파티션, 카운터(소형)',
    businessType: 'EDUCATION', items: Array(5).fill(createProduct('스터디책상', 'Furniture', 100,60,120)), totalPrice: 21900000,
    location: '전국 설치 가능', leadTimeDays: 14, has3D: true, badges: ['오프닝 검수', '설치포함'], grade: 'A', warranty: '30일', tags: [],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800' // White Office
  },
  {
    id: 'pkg_pub_wood', source: 'OPENING', name: '동네술집 홀 패키지 10~14평 "우드톤 세트"', description: '테이블 10, 의자 36, 조명, 벽선반',
    businessType: 'PUB', items: Array(4).fill(createProduct('테이블', 'Furniture', 120,60,70)), totalPrice: 16800000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: true, badges: ['오프닝 검수', '7일설치'], grade: 'A/B', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1525266383473-58d4ee4b3cfa?q=80&w=800' // Wood Pub
  },
  {
    id: 'pkg_chicken_kitchen', source: 'OPENING', name: '치킨·배달 주방 패키지 8~12평 "주방 라인 표준"', description: '작업대/선반/냉장/싱크 표준 구성 (현장 설비 제외)',
    businessType: 'CHICKEN', items: Array(6).fill(createProduct('냉장고', 'Kitchen', 90,80,180)), totalPrice: 27500000,
    location: '전국 설치 가능', leadTimeDays: 14, has3D: true, badges: ['오프닝 검수', '장비보증'], grade: 'B+', warranty: '30일', tags: [],
    image: 'https://images.unsplash.com/photo-1583251633115-788a2b9e6eb1?q=80&w=800' // Clean Kitchen
  },
  {
    id: 'pkg_cafe_front', source: 'OPENING', name: '카페 프론트 패키지 12~16평 "카운터+홀"', description: '카운터, 진열, 테이블 8, 의자 20',
    businessType: 'CAFE', items: Array(4).fill(createProduct('카운터', 'Furniture', 150,60,90)), totalPrice: 24000000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: true, badges: ['오프닝 검수', '설치포함'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1507914464562-6b718842a633?q=80&w=800' // Coffee Setup
  },
  {
    id: 'pkg_key_small', source: 'OPENING', name: '열쇠방 초소형 4~7평 "즉시 오픈"', description: '카운터/작업대/수납 기본 구성',
    businessType: 'OTHER', items: [], totalPrice: 5900000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: false, badges: ['오프닝 검수', '7일설치'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800' // Small Desk
  },
  {
    id: 'pkg_nail_small', source: 'OPENING', name: '네일샵 6~9평 "2인 시술"', description: '시술테이블, 의자, 패디의자',
    businessType: 'BEAUTY', items: [], totalPrice: 9800000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: true, badges: ['오프닝 검수', '7일설치'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800' // Nail Table
  },
  {
    id: 'pkg_hair_set', source: 'OPENING', name: '미용실 10~14평 "3면 세트"', description: '거울 3, 의자 3, 리셉션, 수납',
    businessType: 'BEAUTY', items: [], totalPrice: 13500000,
    location: '전국 설치 가능', leadTimeDays: 14, has3D: true, badges: ['오프닝 검수'], grade: 'A/B', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1596728329622-c322b28c5324?q=80&w=800' // Salon Chair
  },
  {
    id: 'pkg_snack_pack', source: 'OPENING', name: '분식 7~10평 "포장·동선 최적"', description: '포장대/수납/홀 최소',
    businessType: '분식', items: [], totalPrice: 12900000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: false, badges: ['오프닝 검수', '7일설치'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800' // Simple Tables
  },
  {
    id: 'pkg_coin_karaoke', source: 'OPENING', name: '코인노래방 리셉션/대기 패키지 12~20평', description: '카운터/대기/사인',
    businessType: 'ENTERTAINMENT', items: [], totalPrice: 14500000,
    location: '전국 설치 가능', leadTimeDays: 14, has3D: true, badges: ['오프닝 검수'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1598518619679-584fbddb7f3d?q=80&w=800' // Neon Room
  },
  {
    id: 'pkg_retail_shelf', source: 'OPENING', name: '리테일(잡화점) 8~15평 "선반 세트"', description: '곤돌라/벽선반/카운터',
    businessType: 'RETAIL', items: [], totalPrice: 11800000,
    location: '전국 설치 가능', leadTimeDays: 7, has3D: false, badges: ['오프닝 검수', '7일설치'], grade: 'A', warranty: '14일', tags: [],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800' // Retail Store
  }
];

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

export const LOGISTICS_BASE_COST = 200000; // Basic truck
export const INSTALLATION_BASE_COST = 300000; // Basic labor