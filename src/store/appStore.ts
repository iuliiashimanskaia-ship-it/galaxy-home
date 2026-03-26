import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { House, Package, HouseOption, City } from '@/types';

interface AppState {
  // Selected items
  selectedHouse: House | null;
  selectedPackage: Package | null;
  selectedOptions: HouseOption[];
  deliveryCity: City | null;
  
  // Quiz state
  quizData: {
    city: string;
    purpose: 'living' | 'rent' | 'business' | '';
    timeline: 'urgent' | '1-3months' | 'interest' | '';
    name: string;
    phone: string;
  };
  
  // UI state
  isMenuOpen: boolean;
  currentModal: string | null;
  showQuiz: boolean;
  
  // Actions
  setSelectedHouse: (house: House | null) => void;
  setSelectedPackage: (pkg: Package | null) => void;
  toggleOption: (option: HouseOption) => void;
  clearOptions: () => void;
  setDeliveryCity: (city: City | null) => void;
  
  // Quiz actions
  setQuizData: (data: Partial<AppState['quizData']>) => void;
  resetQuiz: () => void;
  
  // UI actions
  setMenuOpen: (open: boolean) => void;
  setCurrentModal: (modal: string | null) => void;
  setShowQuiz: (show: boolean) => void;
  
  // Calculations
  getBasePrice: () => number;
  getOptionsPrice: () => number;
  getDeliveryPrice: () => number;
  getTotalPrice: () => number;
}

const initialQuizData = {
  city: '',
  purpose: '' as const,
  timeline: '' as const,
  name: '',
  phone: '',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedHouse: null,
      selectedPackage: null,
      selectedOptions: [],
      deliveryCity: null,
      quizData: initialQuizData,
      isMenuOpen: false,
      currentModal: null,
      showQuiz: false,

      // Actions
      setSelectedHouse: (house) => set({ 
        selectedHouse: house,
        selectedPackage: null,
        selectedOptions: [],
      }),
      
      setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
      
      toggleOption: (option) => set((state) => {
        const exists = state.selectedOptions.find(o => o.id === option.id);
        if (exists) {
          return { 
            selectedOptions: state.selectedOptions.filter(o => o.id !== option.id) 
          };
        }
        return { 
          selectedOptions: [...state.selectedOptions, option] 
        };
      }),
      
      clearOptions: () => set({ selectedOptions: [] }),
      
      setDeliveryCity: (city) => set({ deliveryCity: city }),
      
      setQuizData: (data) => set((state) => ({
        quizData: { ...state.quizData, ...data }
      })),
      
      resetQuiz: () => set({ quizData: initialQuizData }),
      
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      
      setCurrentModal: (modal) => set({ currentModal: modal }),
      
      setShowQuiz: (show) => set({ showQuiz: show }),

      // Calculations
      getBasePrice: () => {
        const { selectedHouse, selectedPackage } = get();
        if (!selectedHouse) return 0;
        return selectedHouse.basePrice + (selectedPackage?.price || 0);
      },
      
      getOptionsPrice: () => {
        const { selectedOptions } = get();
        return selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
      },
      
      getDeliveryPrice: () => {
        const { deliveryCity, selectedHouse } = get();
        if (!deliveryCity || !selectedHouse) return 0;
        return selectedHouse.chinaToUssuriysk + (deliveryCity.distanceKm * deliveryCity.deliveryRate);
      },
      
      getTotalPrice: () => {
        const { getBasePrice, getOptionsPrice, getDeliveryPrice } = get();
        return getBasePrice() + getOptionsPrice() + getDeliveryPrice();
      },
    }),
    {
      name: 'kimmi-storage',
      partialize: (state) => ({
        selectedHouse: state.selectedHouse,
        selectedPackage: state.selectedPackage,
        selectedOptions: state.selectedOptions,
        deliveryCity: state.deliveryCity,
      }),
    }
  )
);
