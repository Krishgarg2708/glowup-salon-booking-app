export type ServiceCategory = 'Haircut' | 'Hair Spa' | 'Facial' | 'Nail Care' | 'Hair Coloring' | 'Makeup';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: number; // in minutes
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  availability: string; // e.g. "Available Today", "Mon-Fri"
  specialty: string[];
  image: string;
  bio: string;
  workImages: string[];
}

export interface Booking {
  id: string;
  service: Service;
  specialist: Specialist;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:30 AM"
  status: 'upcoming' | 'completed' | 'canceled';
  totalAmount: number;
  promoCode?: string;
  createdAt: string;
}

export type AppScreen = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'home' 
  | 'service_detail' 
  | 'specialist_detail'
  | 'booking_flow' 
  | 'summary'
  | 'confirmation'
  | 'history'
  | 'profile';

export type NavigationTab = 'home' | 'explore' | 'bookings' | 'profile';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  paymentMethods: { id: string; type: 'visa' | 'mastercard' | 'applepay'; last4: string; isDefault: boolean; }[];
  notificationsEnabled: boolean;
  language?: string;
}
