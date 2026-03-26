export interface House {
  id: string;
  name: string;
  slug: string;
  description: string;
  area: number;
  dimensions: string;
  weight: number;
  basePrice: number;
  chinaToUssuriysk: number;
  images: string[];
  isPopular: boolean;
  purchaseCount: number;
}

export interface Package {
  id: string;
  houseId: string;
  name: string;
  price: number;
  description: string;
}

export interface HouseOption {
  id: string;
  houseId: string;
  name: string;
  price: number;
  category: string;
}

export interface City {
  id: string;
  name: string;
  region: string;
  distanceKm: number;
  deliveryRate: number;
}

export interface Lead {
  id?: string;
  houseId?: string;
  name: string;
  phone: string;
  telegram?: string;
  email?: string;
  city?: string;
  purpose?: 'living' | 'rent' | 'business';
  timeline?: 'urgent' | '1-3months' | 'interest';
  selectedOptions?: string[];
  totalPrice?: number;
  deliveryPrice?: number;
  source?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  isActive: boolean;
  commissionRate: number;
  totalSales: number;
  totalEarnings: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  house: House;
  selectedPackage: Package;
  selectedOptions: HouseOption[];
  deliveryCity: City | null;
}
