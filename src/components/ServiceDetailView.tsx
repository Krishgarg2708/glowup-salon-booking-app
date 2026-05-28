import React from 'react';
import { Service, Specialist } from '../types';
import { ArrowLeft, Clock, DollarSign, Star, ShieldCheck, HeartPulse } from 'lucide-react';
import { SPECIALISTS } from '../data';

interface ServiceDetailViewProps {
  service: Service;
  onBack: () => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onInstantBook: (service: Service, specialist: Specialist) => void;
}

export default function ServiceDetailView({
  service,
  onBack,
  onSelectSpecialist,
  onInstantBook
}: ServiceDetailViewProps) {
  // Find specialists who specialize in this service's category
  const suitableSpecialists = SPECIALISTS.filter(spec => 
    spec.specialty.includes(service.category)
  );

  return (
    <div className="flex-1 bg-white flex flex-col h-full font-sans pb-8">
      {/* Dynamic Image backdrop */}
      <div className="relative h-64 w-full">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Navigation back */}
        <button
          id="service-detail-back-btn"
          onClick={onBack}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Floating Category Badge */}
        <div className="absolute bottom-4 left-6 right-6">
          <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-rose-500 text-white font-extrabold rounded-md inline-block mb-2">
            {service.category}
          </span>
          <h2 className="text-xl font-black text-white leading-tight">{service.name}</h2>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        
        {/* Quick parameters grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Price</span>
            <span className="text-sm font-black text-stone-950">${service.price}</span>
          </div>
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Duration</span>
            <span className="text-sm font-black text-stone-950 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              {service.duration}m
            </span>
          </div>
          <div className="bg-stone-50 border border-stone-100 p-3 rounded-2xl text-center">
            <span className="block text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Reviews</span>
            <span className="text-sm font-black text-stone-950 flex items-center justify-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              {service.rating}
            </span>
          </div>
        </div>

        {/* Description body */}
        <div className="space-y-2">
          <h3 className="text-xs uppercase font-bold tracking-widest text-stone-400">About Treatment</h3>
          <p className="text-stone-600 text-xs leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Benefits banner */}
        <div className="p-3.5 bg-rose-50/60 border border-rose-100/50 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-stone-900 leading-tight">GlowUp Premium Assurance</h4>
            <p className="text-[10px] text-stone-500 leading-normal">
              100% organic custom-blended cruelty-free products sanitized via medical autoclave levels.
            </p>
          </div>
        </div>

        {/* Suitable Stylists suggestions section */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400">Select Specialist Artist</h4>
            <span className="text-[9px] text-stone-400 font-medium">({suitableSpecialists.length} Experts)</span>
          </div>

          <div className="space-y-2.5">
            {suitableSpecialists.map((spec) => (
              <div
                key={spec.id}
                id={`detail-stylist-row-${spec.id}`}
                className="bg-white border border-stone-100 rounded-2xl p-3 flex items-center justify-between hover:border-rose-300 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => onSelectSpecialist(spec)}
                >
                  <img
                    src={spec.image}
                    alt={spec.name}
                    className="w-11 h-11 rounded-full object-cover border border-stone-100 shadow-sm"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900 leading-tight">{spec.name}</h5>
                    <span className="text-[10px] text-stone-400">{spec.title}</span>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{spec.rating}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-400 font-medium">{spec.experience} Exp</span>
                    </div>
                  </div>
                </div>

                <button
                  id={`instant-book-${spec.id}`}
                  onClick={() => onInstantBook(service, spec)}
                  className="bg-stone-950 hover:bg-stone-900 text-white text-[10px] font-bold py-2.5 px-3.5 rounded-xl transition-all shadow-sm cursor-pointer select-none"
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
