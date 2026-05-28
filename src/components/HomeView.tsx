import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Flame, 
  ArrowRight, 
  Bookmark, 
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { Service, Specialist, Booking, ServiceCategory } from '../types';
import { SERVICES, SPECIALISTS } from '../data';

interface HomeViewProps {
  userProfile: { name: string; avatar: string; };
  activeBookings: Booking[];
  savedSpecialists: string[];
  toggleSaveSpecialist: (id: string) => void;
  onSelectService: (service: Service) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onBookNow: () => void;
  activeFilterCategory: string;
  setActiveFilterCategory: (category: string) => void;
}

export default function HomeView({
  userProfile,
  activeBookings,
  savedSpecialists,
  toggleSaveSpecialist,
  onSelectService,
  onSelectSpecialist,
  onBookNow,
  activeFilterCategory,
  setActiveFilterCategory
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Define categories and their visual designs
  const categoriesList: { id: ServiceCategory | 'All'; label: string; icon: string }[] = [
    { id: 'All', label: 'All Treatments', icon: '✨' },
    { id: 'Haircut', label: 'Cuts', icon: '✂️' },
    { id: 'Hair Spa', label: 'Spa Treatment', icon: '💆‍♀️' },
    { id: 'Facial', label: 'Dermal Facials', icon: '🌿' },
    { id: 'Nail Care', label: 'Gel Nails', icon: '💅' },
    { id: 'Hair Coloring', label: 'Colours', icon: '🎨' },
    { id: 'Makeup', label: 'Glam Makeup', icon: '💄' }
  ];

  // Filters computed based on category chips and search queries
  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = activeFilterCategory === 'All' || s.category === activeFilterCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const upcomingAppointment = activeBookings.find(b => b.status === 'upcoming');

  return (
    <div className="flex-1 bg-stone-50 flex flex-col h-full font-sans pb-8">
      {/* HEADER BAR */}
      <div className="px-6 pt-3 pb-4 bg-white flex items-center justify-between sticky top-0 z-20 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt="User avatar"
            className="w-10 h-10 rounded-full border border-stone-250 ring-2 ring-stone-100 object-cover"
          />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Good Day,</div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">{userProfile.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 text-stone-500 bg-stone-100 py-1.5 px-2.5 rounded-lg text-[10px] font-bold">
          <MapPin className="w-3 h-3 text-rose-500" />
          <span>Beverly Hills, CA</span>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORY ROW */}
      <div className="p-6 bg-white space-y-4 border-b border-stone-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="home-search-input"
            type="text"
            placeholder="Search Balayage, Designer Cuts, Facials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-colors"
          />
          <button 
            id="home-search-clear"
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-stone-200 text-stone-400"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Horizontal Chip Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Select Category</span>
            {activeFilterCategory !== 'All' && (
              <button 
                id="clear-categories-btn"
                onClick={() => setActiveFilterCategory('All')} 
                className="text-[10px] text-rose-500 font-bold"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 -mx-6 px-6">
            {categoriesList.map((cat) => {
              const isSelected = activeFilterCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-chip-${cat.id}`}
                  onClick={() => setActiveFilterCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                    isSelected
                      ? 'bg-stone-950 text-white shadow-md shadow-stone-950/10 scale-[1.02]'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 pt-6">
        
        {/* UPCOMING APPOINTMENT BANNER */}
        {upcomingAppointment ? (
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/25 text-[9px] uppercase tracking-wider font-extrabold text-rose-200">
                Upcoming Appointment
              </span>
              <span className="text-stone-400 text-[10px] font-mono">ID: {upcomingAppointment.id}</span>
            </div>

            <h4 className="text-base font-bold text-white tracking-tight mb-1">{upcomingAppointment.service.name}</h4>
            <p className="text-[11px] text-stone-300 flex items-center gap-1.5 mb-4">
              <span className="font-semibold text-rose-300">{upcomingAppointment.specialist.name}</span>
              <span>•</span>
              <span>{upcomingAppointment.specialist.title}</span>
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="font-medium">{upcomingAppointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="font-medium">{upcomingAppointment.timeSlot}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty / Call To Action banner if no appointments scheduled */
          <div className="bg-stone-100 border border-stone-200/60 rounded-3xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-rose-500">
                <Flame className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Book Now</h4>
              </div>
              <p className="text-stone-950 font-bold text-sm leading-tight">No active booking found</p>
              <p className="text-stone-500 text-[11px] max-w-[180px]">Schedule your next customized aesthetic treatment.</p>
            </div>
            <button
              id="empty-booking-btn"
              onClick={onBookNow}
              className="bg-stone-950 hover:bg-stone-900 text-white text-[11px] font-bold py-2.5 px-4 rounded-xl shadow-sm hover:translate-x-0.5 transition-all"
            >
              Book Now
            </button>
          </div>
        )}

        {/* PROMOTIONAL RUNWAY BANNER */}
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-200/20 to-rose-300/30 rounded-l-full pointer-events-none" />
          <div className="space-y-1 max-w-[65%] z-10">
            <span className="text-[9px] font-bold bg-rose-200 text-rose-700 uppercase px-2 py-0.5 rounded-md">Seasonal Code</span>
            <h3 className="text-base font-extrabold text-stone-900 leading-tight">15% Off Your Next Cut</h3>
            <p className="text-[11px] text-stone-500">Use coupon code <strong className="text-rose-600">GLOW15</strong> at final checkout summary.</p>
          </div>
          <div className="text-center bg-white p-3 rounded-2xl shadow-sm border border-rose-100 flex flex-col justify-center min-w-[70px]">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest font-black">Code</span>
            <span className="text-sm font-black text-stone-900">15%</span>
          </div>
        </div>

        {/* FEATURED SERVICES LIST SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-950 uppercase tracking-wider">
              {activeFilterCategory === 'All' ? 'Popular Services' : `${activeFilterCategory} Packages`}
            </h3>
            <span className="text-xs font-mono text-stone-400">({filteredServices.length}) Available</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredServices.length > 0 ? (
              filteredServices.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="bg-white border border-stone-200/60 p-3 rounded-2xl flex gap-3.5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded uppercase">
                          {service.category}
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-stone-950 mt-1 line-clamp-1">{service.name}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-stone-950">${service.price}</span>
                        <span className="text-[9px] text-stone-400">/ {service.duration} mins</span>
                      </div>
                      <span className="text-[9px] font-bold text-stone-600 flex items-center gap-0.5 hover:text-stone-900">
                        Select <ArrowRight className="w-2.5 h-2.5 text-rose-500" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-2xl border border-stone-200">
                <p className="text-xs text-stone-500 font-bold">No packages found match your query.</p>
                <button
                  id="reset-filter-on-empty"
                  onClick={() => { setSearchQuery(''); setActiveFilterCategory('All'); }}
                  className="text-xs text-rose-500 underline font-bold mt-2"
                >
                  View All Packages
                </button>
              </div>
            )}
          </div>
        </div>

        {/* POPULAR SPECIALISTS GRID */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-950 uppercase tracking-wider">Popular Specialists</h3>
            <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5">
              Available <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 py-1">
            {SPECIALISTS.map((spec) => {
              const isSaved = savedSpecialists.includes(spec.id);
              return (
                <div
                  key={spec.id}
                  id={`stylist-card-${spec.id}`}
                  className="w-[150px] bg-white border border-stone-200/60 rounded-2xl p-3 shrink-0 relative flex flex-col justify-between hover:shadow-md cursor-pointer group active:scale-[0.99]"
                  onClick={() => onSelectSpecialist(spec)}
                >
                  {/* Heart bookmark trigger */}
                  <button
                    id={`stylist-heart-${spec.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveSpecialist(spec.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-rose-500 shadow-sm backdrop-blur-sm z-10 select-none transition-colors"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                  </button>

                  <div className="text-center flex flex-col items-center">
                    <img
                      src={spec.image}
                      alt={spec.name}
                      className="w-16 h-16 rounded-full object-cover border border-stone-100 shadow-inner mb-2"
                    />
                    <h4 className="text-xs font-bold text-stone-950 line-clamp-1">{spec.name}</h4>
                    <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider leading-none">
                      {spec.title}
                    </span>
                    
                    {/* Tiny specialty badge */}
                    <span className="mt-1.5 px-2 py-0.5 bg-stone-50 border border-stone-100 rounded text-[8px] text-stone-500 font-medium">
                      {spec.experience} Exp
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-50 flex items-center justify-between text-[10px]">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-0.5" />
                      <span>{spec.rating}</span>
                    </div>
                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1 rounded font-bold">
                      Online
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
