import { CategoryNode, Package, BusinessType, ItemGrade } from './types';
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
    children: []
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

// 2. 통합 매물 데이터 (오프닝 인증 + 사용자 매물)
export const MOCK_OPENING_PACKAGES: Package[] = [
  {
    id: 'pkg_001',
    source: 'OPENING',
    name: '강남 스터디카페 20평 풀패키지 (A급)',
    description: '프리미엄 독서실 폐업 자재, 상태 최상. 시디즈 의자 40개, 1인실 책상 포함. 방음 부스 상태 양호.',
    businessType: 'EDUCATION',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    items: [
      { id: 'i1', name: '프리미엄 1인실 책상', category: 'FURNITURE', width: 100, depth: 60, height: 120, price: 150000, grade: ItemGrade.A, utility: { electric: true, water: false, gas: false, vent: false }, image: '', clearance: { front: 0, side: 0 } },
      { id: 'i2', name: '시디즈 T50 의자', category: 'FURNITURE', width: 50, depth: 50, height: 100, price: 120000, grade: ItemGrade.A, utility: { electric: false, water: false, gas: false, vent: false }, image: '', clearance: { front: 0, side: 0 } },
      { id: 'i3', name: '키오스크 (21인치)', category: 'DEVICE', width: 40, depth: 30, height: 160, price: 800000, grade: ItemGrade.B, utility: { electric: true, water: false, gas: false, vent: false }, image: '', clearance: { front: 50, side: 0 } }
    ],
    totalPrice: 15000000,
    location: '강남구 역삼동',
    leadTimeDays: 7,
    has3D: true,
    badges: ['오프닝 검수', '설치포함', 'A급보증'],
    grade: 'A',
    warranty: '6개월',
    tags: ['study', 'gangnam', '20py', 'quick', 'large'],
  },
  {
    id: 'pkg_002',
    source: 'OPENING',
    name: '성수동 감성 카페 15평 (B급 가성비)',
    description: '우드톤 인테리어 가구 일체. 라마르조꼬 머신 포함되어 있으나 점검 필요. 테이블 8조.',
    businessType: 'CAFE',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000',
    items: [
        { id: 'c1', name: '2인 원목 테이블', category: 'FURNITURE', width: 60, depth: 60, height: 72, price: 50000, grade: ItemGrade.B, utility: { electric: false, water: false, gas: false, vent: false }, image: '', clearance: { front: 60, side: 60 } },
        { id: 'c2', name: '에스프레소 머신', category: 'KITCHEN', width: 80, depth: 60, height: 50, price: 3000000, grade: ItemGrade.B, utility: { electric: true, water: true, gas: false, vent: false }, image: '', clearance: { front: 0, side: 0 } }
    ],
    totalPrice: 12000000,
    location: '성동구 성수동',
    leadTimeDays: 14,
    has3D: false,
    badges: ['오프닝 검수', '철거포함'],
    grade: 'B',
    warranty: '3개월',
    tags: ['cafe', 'seongsu', 'wood', 'cheap']
  },
  {
    id: 'pkg_003',
    source: 'OPENING',
    name: '홍대 펍/바 12평 패키지 (주방특화)',
    description: '업소용 냉장고, 제빙기, 4구 간택기, 식기세척기 포함. 주방 설비 위주 구성.',
    businessType: 'PUB',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 18500000,
    location: '마포구 서교동',
    leadTimeDays: 7,
    has3D: true,
    badges: ['오프닝 검수', '주방위주', '빠른설치'],
    grade: 'A',
    warranty: '3개월',
    tags: ['pub', 'hongdae', 'kitchen', 'quick']
  },
  {
    id: 'pkg_004',
    source: 'USER', 
    name: '동네 분식집 급처분 (집기 일괄)',
    description: '운영 6개월차. 개인사정 폐업. 떡볶이 다이, 튀김기, 순대 찜기 등 집기 일괄 판매합니다.',
    businessType: 'RETAIL',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 5000000,
    location: '강서구 화곡동',
    leadTimeDays: 3,
    has3D: false,
    badges: ['직거래', '가격협의', '7일 빠른회수'], // 홈 탭 필터 태그 포함
    grade: 'C',
    warranty: '없음',
    deadline: 'D-5',
    hopePrice: 5000000,
    tags: ['retail', 'snack', 'urgent', 'quick', 'cheap']
  },
  {
    id: 'pkg_005',
    source: 'OPENING',
    name: '필라테스 스튜디오 30평 기구 일괄',
    description: '리포머, 캐딜락, 체어, 바렐 풀세트 4조. 상태 매우 좋음.',
    businessType: 'FITNESS',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 25000000,
    location: '송파구 잠실동',
    leadTimeDays: 10,
    has3D: true,
    badges: ['오프닝 검수', '설치포함', 'S급'],
    grade: 'A',
    warranty: '1년',
    tags: ['fitness', 'large', 'furniture']
  },
  {
    id: 'pkg_006',
    source: 'USER',
    name: '네일샵 테이블 및 의자 정리',
    description: '1인샵 운영하던 네일 가구 정리합니다. 흡진기 포함 테이블.',
    businessType: 'BEAUTY',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000',
    items: [],
    totalPrice: 2000000,
    location: '마포구 연남동',
    leadTimeDays: 5,
    has3D: false,
    badges: ['직거래', '소량'],
    grade: 'B',
    warranty: '없음',
    deadline: 'D-2',
    hopePrice: 1800000,
    tags: ['beauty', 'furniture', 'today']
  }
];

// 3. 사용자 직거래 리스트 (홈 화면용 필터링)
export const MOCK_USER_LISTINGS = MOCK_OPENING_PACKAGES.filter(p => p.source === 'USER' || p.tags?.includes('today') || p.tags?.includes('urgent'));

// 4. 비용 상수
export const LOGISTICS_BASE_COST = 300000;
export const INSTALLATION_BASE_COST = 500000;
