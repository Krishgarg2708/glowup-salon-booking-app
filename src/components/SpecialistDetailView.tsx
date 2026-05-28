import React from 'react';
import { Specialist, Service } from '../types';
import { ArrowLeft, Star, Heart, Sparkles, Trophy, Video, Award } from 'lucide-react';
import { SERVICES } from '../data';

interface SpecialistDetailViewProps {
  specialist: Specialist;
  onBack: () => void;
  savedSpecialists: string[];
  toggleSaveSpecialist: (id: string) => void;
  onSelectServiceToBook: (service: Service, specialist: Specialist) => void;
}

export default function SpecialistDetailView({
  specialist,
  onBack,
  savedSpecialists,
  toggleSaveSpecialist,
  onSelectServiceToBook
}: SpecialistDetailViewProps) {
  const isSaved = savedSpecialists.includes(specialist.id);

  // Find services that match this specialist's talents
  const specialistServices = SERVICES.filter(service => 
    specialist.specialty.includes(service.category)
  );

  return (
    <div className="flex-1 bg-white flex flex-col h-full font-sans pb-8">
      {/* Top Profile block */}
      <div className="relative bg-stone-900 pt-10 pb-6 px-6 text-white rounded-b-[32px] overflow-hidden">
        {/* Decorative backdrop elements */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="flex items-center justify-between mb-6 z-10 relative">
          <button
            id="specialist-detail-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <h2 className="text-sm font-black uppercase tracking-widest text-stone-300">Stylist Portfolio</h2>

          <button
            id="stylist-save-toggle-btn"
            onClick={() => toggleSaveSpecialist(specialist.id)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md backdrop-blur-sm transition-all"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}`} />
          </button>
        </div>

        <div className="flex gap-4 items-center z-10 relative">
          <img
            src={specialist.image}
            alt={specialist.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-rose-300 shadow-lg"
          />
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold tracking-tight text-white">{specialist.name}</h3>
            <p className="text-xs text-rose-300 font-bold uppercase tracking-wider">{specialist.title}</p>
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="font-bold text-white">{specialist.rating}</span>
              <span>•</span>
              <span>{specialist.reviewsCount} global sessions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dynamic statistics row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Career</span>
            <span className="text-xs font-black text-stone-950">{specialist.experience}</span>
          </div>
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Status</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1 rounded inline-block">Online</span>
          </div>
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Specialties</span>
            <span className="text-xs font-black text-stone-950">{specialist.specialty.length} Fields</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400">Professional Background</h4>
          <p className="text-stone-600 text-xs leading-relaxed">{specialist.bio}</p>
        </div>

        {/* Dynamic work portfolio images if any are declared */}
        {specialist.workImages && specialist.workImages.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400">Past Master Work</h4>
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-0.5">
              {specialist.workImages.map((workImg, idx) => (
                <img
                  key={idx}
                  src={workImg}
                  alt={`Sofia Laurent creation ${idx}`}
                  className="w-28 h-28 rounded-2xl object-cover border border-stone-200 shadow-sm shrink-0"
                />
              ))}
            </div>
          </div>
        )}

        {/* Services Menu Book catalog matching the specialist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400">Services under {specialist.name}</h4>
            <span className="text-[10px] text-stone-400 font-bold">({specialistServices.length} options)</span>
          </div>

          <div className="space-y-2.5">
            {specialistServices.map(service => (
              <div
                key={service.id}
                id={`specialist-service-card-${service.id}`}
                onClick={() => onSelectServiceToBook(service, specialist)}
                className="bg-stone-50 border border-stone-100/60 p-3 rounded-2xl flex items-center justify-between hover:border-rose-200 transition-colors cursor-pointer active:scale-[0.99]"
              >
                <div className="flex-1 pr-4">
                  <h5 className="text-xs font-bold text-stone-900 leading-tight">{service.name}</h5>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-1">
                    <span>{service.duration} mins</span>
                    <span>•</span>
                    <span className="font-bold text-stone-900">${service.price}</span>
                  </div>
                </div>

                <button
                  id={`stylist-book-action-${service.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectServiceToBook(service, specialist);
                  }}
                  className="bg-stone-950 hover:bg-stone-900 text-white text-[10px] font-bold py-2.5 px-3.5 rounded-xl block cursor-pointer select-none shrink-0 shadow-sm"
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
