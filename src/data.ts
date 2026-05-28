import { Service, Specialist, UserProfile } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Couture Cut',
    category: 'Haircut',
    duration: 60,
    price: 95,
    rating: 4.9,
    reviewsCount: 124,
    description: 'Personalized premium haircut designed to enhance your unique facial structures. Includes absolute detox hair wash, deep nourishment treatment, head massage, and custom blow-dry.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    name: 'Glow Premium Trim',
    category: 'Haircut',
    duration: 45,
    price: 65,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Quick reshape or line clean-up to maintain your shape. Includes absolute hair wash and quick signature blow-dry.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's3',
    name: 'Royal Keratin Spa Flow',
    category: 'Hair Spa',
    duration: 90,
    price: 180,
    rating: 4.9,
    reviewsCount: 86,
    description: 'Ultra-restorative keratin treatment which repairs damaged fibers, eliminates frizz, and infuses extreme moisture and shine. Steam therapy and micro-misting included.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's4',
    name: 'Advanced Hydra-Glow Facial',
    category: 'Facial',
    duration: 75,
    price: 150,
    rating: 5.0,
    reviewsCount: 142,
    description: 'Deep-cleaning multi-step facial utilizing vacuum-extraction technology, gentle peptide peels, hyaluronic acid infusion, and LED phototherapy for immediate lifting and radiant skin.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's5',
    name: 'Luxe Gel Overlay & Manicure',
    category: 'Nail Care',
    duration: 60,
    price: 80,
    rating: 4.7,
    reviewsCount: 75,
    description: 'Premium cuticle care, precise shaping, structuring gel overlay for added strength, and highly durable luxury Japanese gel lacquer color. Includes a warm chamomile milk hand soak.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's6',
    name: 'Artisan Balayage & Tonal Gloss',
    category: 'Hair Coloring',
    duration: 180,
    price: 260,
    rating: 4.9,
    reviewsCount: 164,
    description: 'Bespoke hand-painted highlights providing a seamless, sun-kissed gradient look. Includes bond protector, personalized tone glazing, and signature round-brush blowout styling.',
    image: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324486?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's7',
    name: 'Red Carpet Glamour Session',
    category: 'Makeup',
    duration: 90,
    price: 190,
    rating: 4.8,
    reviewsCount: 53,
    description: 'Full high-definition makeup application for black-tie events, photography, or bridal guests. Includes complimentary silk flutter lash application and custom contouring.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's8',
    name: 'Cellular Renewal Peel',
    category: 'Facial',
    duration: 50,
    price: 120,
    rating: 4.6,
    reviewsCount: 41,
    description: 'Enzymatic peel focusing on cell turnover. Ideal for pigmentation, fine lines, or clogged pores with virtually zero down time.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
  }
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sp1',
    name: 'Sofia Laurent',
    title: 'Creative Art Director',
    experience: '12 Years',
    rating: 4.9,
    reviewsCount: 421,
    availability: 'Available Today',
    specialty: ['Haircut', 'Hair Coloring', 'Hair Spa'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Sofia trained in Paris and London under world-renowned colorists. She crafts tailored shapes and effortless color gradients that grow out beautifully over months.',
    workImages: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1605497746444-ac9dbd324486?auto=format&fit=crop&q=80&w=300'
    ]
  },
  {
    id: 'sp2',
    name: 'Elena Rostova',
    title: 'Dermal Esthetician',
    experience: '8 Years',
    rating: 5.0,
    reviewsCount: 310,
    availability: 'Available Tomorrow',
    specialty: ['Facial'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Elena specializes in non-invasive cellular optimization and premium dermal massage techniques. She develops custom formulations targeting deep skin revival.',
    workImages: [
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=300'
    ]
  },
  {
    id: 'sp3',
    name: 'Marcus Vance',
    title: 'Master Groomer & Stylist',
    experience: '10 Years',
    rating: 4.8,
    reviewsCount: 289,
    availability: 'Available Today',
    specialty: ['Haircut', 'Hair Coloring'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Marcus has styled for runways and luxury commercials. Known for sharp texturing, precise barbering edits, and flawless customized global styling.',
    workImages: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=300'
    ]
  },
  {
    id: 'sp4',
    name: 'Chloe Bennett',
    title: 'Senior Nail Architect',
    experience: '6 Years',
    rating: 4.8,
    reviewsCount: 195,
    availability: 'Available Thursday',
    specialty: ['Nail Care'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Chloe is celebrated for minimalist Japanese nail-art overlays and meticulous nail-care health. She provides gorgeous, elegant extensions with organic protective bases.',
    workImages: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300'
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Amara Dev',
  email: 'amara.dev@glowup.com',
  phone: '+1 (555) 019-2834',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
  paymentMethods: [
    { id: 'p1', type: 'visa', last4: '4821', isDefault: true },
    { id: 'p2', type: 'applepay', last4: '8872', isDefault: false }
  ],
  notificationsEnabled: true,
  language: 'en'
};

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '10:30 AM',
  '11:30 AM',
  '01:00 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM'
];

export const PROMO_CODES: { [key: string]: number } = {
  'GLOW15': 15, // 15% Off
  'WELCOME20': 20, // $20 Off flat
  'COUTURE10': 10 // 10% Off
};
