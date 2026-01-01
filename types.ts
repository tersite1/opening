// Business Types
export enum BusinessType {
  CAFE = 'CAFE',
  CHICKEN = 'CHICKEN',
  BAKERY = 'BAKERY',
  PUB = 'PUB',
  DELIVERY = 'DELIVERY',
  RETAIL = 'RETAIL',
  BEAUTY = 'BEAUTY',
  EDUCATION = 'EDUCATION',
  FITNESS = 'FITNESS',
  ENTERTAINMENT = 'ENTERTAINMENT',
  OTHER = 'OTHER'
}

// Item Grade
export enum ItemGrade {
  A = 'A', // Like New
  B = 'B', // Good
  C = 'C', // Usable
}

// Requirements for utilities
export interface UtilityReq {
  electric: boolean; // Needs power
  water: boolean;    // Needs plumbing
  gas: boolean;      // Needs gas
  vent: boolean;     // Needs ventilation
}

// An individual item (product)
export interface Product {
  id: string;
  name: string;
  category: string;
  width: number; // cm
  depth: number; // cm
  height: number; // cm
  price: number; // KRW
  grade: ItemGrade;
  utility: UtilityReq;
  image: string; // URL
  clearance: { // Required extra space cm
    front: number;
    side: number;
  };
}

export type ListingSource = 'USER' | 'OPENING'; // User Generated vs Platform Certified

// A package of items
export interface Package {
  id: string;
  source: ListingSource; // New field to distinguish source
  name: string;
  description: string;
  businessType: BusinessType | string;
  image: string; // Main thumbnail image
  items: Product[];
  totalPrice: number;
  location: string;
  leadTimeDays: number;
  has3D: boolean;
  badges: string[];
  
  // Specific to User Listings (Closure/Transfer)
  deadline?: string; // e.g., "7일 내", "30일"
  hopePrice?: number; // Used for User Listings instead of standardized TotalPrice
  tags?: string[]; // For filtering in Home View (e.g., 'kitchen', 'quick')

  // Specific to Opening Packages
  grade?: string; // Overall Grade (A, B)
  warranty?: string; // e.g., "30일", "6개월"
  
  deposit?: number; // Optional rent deposit
  monthlyRent?: number; // Optional monthly rent
  discountRate?: number;
  newPriceEstimate?: number;
}

// Filter State for Listings
export interface FilterState {
  budgetRange: [number, number]; // 0 to 100,000,000+
  areaRange: [number, number]; // 0 to 100+ pyung
  leadTime: 'ALL' | '7DAYS' | '14DAYS';
  has3D: boolean;
  grade: ItemGrade[]; // Selected grades
  services: string[]; // 'INSTALL', 'DEMOLITION', 'CLEANING'
}

// Room Dimensions
export interface RoomDimensions {
  width: number; // cm
  depth: number; // cm
  height: number; // cm
  doorX: number; // location of door on bottom wall
  doorWidth: number;
}

// Placed Item in the Planner
export interface PlacedItem extends Product {
  instanceId: string;
  x: number; // cm from left
  y: number; // cm from top
  rotation: number; // degrees
  isCollision: boolean;
  isWallViolation: boolean;
  warnings: string[];
}

// Quote structure
export interface Quote {
  id: string;
  packageId: string;
  itemsCost: number;
  logisticsCost: number;
  installationCost: number;
  vat: number;
  totalCost: number;
  deposit: number; // 10%
  date: string;
  consultingIncluded: boolean;
}

// Consulting Types
export interface ConsultingOption {
  id: string;
  title: string;
  durationMin: number;
  price: number;
  description: string;
  isOnline: boolean;
}

// Opening Process Task (Checklist Item)
export interface OpenTaskItem {
  id: string;
  title: string;
  description: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E'; // Stage
  leadTime: string;
  isRequired?: boolean;
  isOpeningExclusive?: boolean; // True for 3D, Package, Consulting
}

export interface OpenTaskCategory {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  label: string;
  description: string;
}

export interface ConsultingBooking {
  id: string;
  optionId?: string; 
  date: string;
  timeSlot: string;
  businessType: BusinessType | string;
  budget: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  consultantName: string;
  typeLabel: string; // e.g., '30분 화상' or '오픈 패키지 상담'
  selectedTasks?: string[]; // IDs of selected tasks
}

// Category Tree Structure
export interface CategoryNode {
  id: string;
  label: string;
  icon?: any; // For UI
  children?: CategoryNode[];
}

// Navigation Types
export type MainTab = 'HOME' | 'LISTINGS' | 'QUOTE' | 'FAQ' | 'CONSULTING';

export type AppStep = 
  | 'TAB_VIEW' // Shows the main tabs
  | 'SPACE_INPUT' // Wizard Flow
  | 'PLANNER'
  | 'QUOTE_GEN'
  | 'CONSULTING_WIZARD'; // Overlay Flow