import React, { useState, useEffect } from 'react';
import { 
  AppScreen, 
  NavigationTab, 
  Service, 
  Specialist, 
  Booking, 
  UserProfile 
} from './types';
import { 
  INITIAL_USER, 
  SERVICES, 
  SPECIALISTS 
} from './data';

// SUB-VIEW IMPORTS
import PhoneContainer from './components/PhoneContainer';
import SplashView from './components/SplashView';
import OnboardingView from './components/OnboardingView';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import ServiceDetailView from './components/ServiceDetailView';
import SpecialistDetailView from './components/SpecialistDetailView';
import BookingFlowView from './components/BookingFlowView';
import SummaryView from './components/SummaryView';
import ConfirmationView from './components/ConfirmationView';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';

export default function App() {
  // CLIENT STATE MANAGEMENT
  const [activeScreen, setActiveScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [savedSpecialists, setSavedSpecialists] = useState<string[]>(['sp1', 'sp3']);
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('All');

  // POPULATING MOCK SYSTEM RESERVATION LOGS (1 Completed, 1 Canceled on boot)
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'GLW-2819',
      service: SERVICES[1], // Glow Premium Trim
      specialist: SPECIALISTS[2], // Marcus Vance
      date: '2026-05-18',
      timeSlot: '01:00 PM',
      status: 'completed',
      totalAmount: 69.50,
      createdAt: '2026-05-17T09:12:00Z'
    },
    {
      id: 'GLW-1049',
      service: SERVICES[4], // Gel overlay
      specialist: SPECIALISTS[3], // Chloe Bennett
      date: '2026-05-10',
      timeSlot: '10:00 AM',
      status: 'canceled',
      totalAmount: 84.50,
      createdAt: '2026-05-09T18:33:00Z'
    }
  ]);

  // SELECTIONS STATE UNDER CURRENT ACTIVE BOOKING FLOWS
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [finishedBooking, setFinishedBooking] = useState<Booking | null>(null);

  // UTILITY HOOKS
  const toggleSaveSpecialist = (id: string) => {
    setSavedSpecialists((prev) => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'canceled' } : b))
    );
  };

  const handleRebook = (service: Service, specialist: Specialist) => {
    setSelectedService(service);
    setSelectedSpecialist(specialist);
    setActiveScreen('booking_flow');
  };

  const handleConfirmDateTimeSelection = (date: string, slot: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(slot);
    setActiveScreen('summary');
  };

  const handleCompletePaymentAndConfirmBooking = (promo: string, totalAmount: number) => {
    if (!selectedService || !selectedSpecialist) return;

    // Generate randomized confirmation ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `GLW-${randomHex}`;

    const newBooking: Booking = {
      id: bookingCode,
      service: selectedService,
      specialist: selectedSpecialist,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'upcoming',
      totalAmount: totalAmount,
      promoCode: promo,
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setFinishedBooking(newBooking);
    setActiveScreen('confirmation');
  };

  // FULL PROTOTYPE REBOOT FLOW
  const handleResetSimulation = () => {
    setActiveScreen('splash');
    setActiveTab('home');
    setSavedSpecialists(['sp1', 'sp3']);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setFinishedBooking(null);
    setActiveFilterCategory('All');
    // Keep initial history
    setBookings([
      {
        id: 'GLW-2819',
        service: SERVICES[1],
        specialist: SPECIALISTS[2],
        date: '2026-05-18',
        timeSlot: '01:00 PM',
        status: 'completed',
        totalAmount: 69.50,
        createdAt: '2026-05-17T09:12:00Z'
      },
      {
        id: 'GLW-1049',
        service: SERVICES[4],
        specialist: SPECIALISTS[3],
        date: '2026-05-10',
        timeSlot: '10:00 AM',
        status: 'canceled',
        totalAmount: 84.50,
        createdAt: '2026-05-09T18:33:00Z'
      }
    ]);
  };

  // ROUTER CONTROLLING THE RENDER ENGINE
  const renderActiveScreenContent = () => {
    switch (activeScreen) {
      case 'splash':
        return (
          <SplashView 
            onComplete={() => setActiveScreen('onboarding')} 
          />
        );
      
      case 'onboarding':
        return (
          <OnboardingView 
            onComplete={() => setActiveScreen('login')} 
          />
        );

      case 'login':
        return (
          <LoginView 
            onComplete={() => setActiveScreen('home')} 
            userEmail={userProfile.email}
          />
        );

      case 'home':
        return (
          <HomeView
            userProfile={userProfile}
            activeBookings={bookings}
            savedSpecialists={savedSpecialists}
            toggleSaveSpecialist={toggleSaveSpecialist}
            activeFilterCategory={activeFilterCategory}
            setActiveFilterCategory={setActiveFilterCategory}
            onSelectService={(service) => {
              setSelectedService(service);
              setActiveScreen('service_detail');
            }}
            onSelectSpecialist={(spec) => {
              setSelectedSpecialist(spec);
              setActiveScreen('specialist_detail');
            }}
            onBookNow={() => {
              setActiveFilterCategory('All');
              // Auto highlight our signature cut to avoid dead choices
              setSelectedService(SERVICES[0]);
              setActiveScreen('service_detail');
            }}
          />
        );

      case 'service_detail':
        if (!selectedService) {
          setActiveScreen('home');
          return null;
        }
        return (
          <ServiceDetailView
            service={selectedService}
            onBack={() => setActiveScreen('home')}
            onSelectSpecialist={(spec) => {
              setSelectedSpecialist(spec);
              setActiveScreen('specialist_detail');
            }}
            onInstantBook={(service, specialist) => {
              setSelectedService(service);
              setSelectedSpecialist(specialist);
              setActiveScreen('booking_flow');
            }}
          />
        );

      case 'specialist_detail':
        if (!selectedSpecialist) {
          setActiveScreen('home');
          return null;
        }
        return (
          <SpecialistDetailView
            specialist={selectedSpecialist}
            savedSpecialists={savedSpecialists}
            toggleSaveSpecialist={toggleSaveSpecialist}
            onBack={() => setActiveScreen('home')}
            onSelectServiceToBook={(service, specialist) => {
              setSelectedService(service);
              setSelectedSpecialist(specialist);
              setActiveScreen('booking_flow');
            }}
          />
        );

      case 'booking_flow':
        if (!selectedService || !selectedSpecialist) {
          setActiveScreen('home');
          return null;
        }
        return (
          <BookingFlowView
            service={selectedService}
            specialist={selectedSpecialist}
            onBack={() => {
              // Return back gracefully based on entry path
              setActiveScreen('service_detail');
            }}
            onConfirmSelection={handleConfirmDateTimeSelection}
          />
        );

      case 'summary':
        if (!selectedService || !selectedSpecialist || !selectedDate || !selectedTimeSlot) {
          setActiveScreen('home');
          return null;
        }
        return (
          <SummaryView
            service={selectedService}
            specialist={selectedSpecialist}
            date={selectedDate}
            timeSlot={selectedTimeSlot}
            userProfile={userProfile}
            onBack={() => setActiveScreen('booking_flow')}
            onConfirmBooking={handleCompletePaymentAndConfirmBooking}
          />
        );

      case 'confirmation':
        if (!finishedBooking) {
          setActiveScreen('home');
          return null;
        }
        return (
          <ConfirmationView
            booking={finishedBooking}
            onGoHome={() => {
              setActiveScreen('home');
              setActiveTab('home');
            }}
            onReschedule={() => {
              setSelectedDate('');
              setSelectedTimeSlot('');
              setActiveScreen('booking_flow');
            }}
          />
        );

      case 'history':
        return (
          <HistoryView
            bookings={bookings}
            onRebook={handleRebook}
            onCancelBooking={handleCancelBooking}
          />
        );

      case 'profile':
        return (
          <ProfileView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            savedSpecialists={savedSpecialists}
            onSelectSpecialist={(spec) => {
              setSelectedSpecialist(spec);
              setActiveScreen('specialist_detail');
            }}
            onLogout={() => {
              handleResetSimulation();
              setActiveScreen('login');
            }}
          />
        );

      default:
        return (
          <div className="flex-1 bg-white p-6 flex items-center justify-center">
            <span className="text-xs text-stone-400">Error: Rendering Route</span>
          </div>
        );
    }
  };

  return (
    <PhoneContainer
      activeScreen={activeScreen}
      setScreen={setActiveScreen}
      activeTab={activeTab}
      setTab={setActiveTab}
      onReset={handleResetSimulation}
    >
      {renderActiveScreenContent()}
    </PhoneContainer>
  );
}
