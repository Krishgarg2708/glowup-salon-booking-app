import React, { useState } from 'react';
import { Booking, Service, Specialist } from '../types';
import { Calendar, Clock, CreditCard, RotateCcw, Award, CheckCircle2, ChevronRight, Ban } from 'lucide-react';

interface HistoryViewProps {
  bookings: Booking[];
  onRebook: (service: Service, specialist: Specialist) => void;
  onCancelBooking: (id: string) => void;
}

export default function HistoryView({
  bookings,
  onRebook,
  onCancelBooking
}: HistoryViewProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'canceled');

  const visibleBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="flex-1 bg-stone-50 flex flex-col h-full font-sans pb-8">
      {/* HEADER SECTION */}
      <div className="px-6 pt-4 pb-4 bg-white border-b border-stone-100 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h2 className="text-base font-extrabold tracking-tight text-stone-900 leading-tight">My Reservations</h2>
          <p className="text-[10px] text-stone-400">Manage schedules, receipts and rebook artists</p>
        </div>
        <span className="text-[11px] font-mono text-stone-400 font-bold bg-stone-100 px-2.5 py-1 rounded-lg">
          {bookings.length} Bookings
        </span>
      </div>

      {/* SEGMENTED TOGGLE TRACK BAR */}
      <div className="px-6 py-4 bg-white border-b border-stone-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-2">
        <button
          id="history-tab-upcoming"
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'upcoming'
              ? 'bg-rose-50 text-rose-600 border border-rose-100'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Active Slots ({upcomingBookings.length})</span>
          {upcomingBookings.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        <button
          id="history-tab-past"
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-stone-950 text-white'
              : 'text-stone-500 hover:text-stone-800 bg-stone-100/50'
          }`}
        >
          <span>Past Sessions ({pastBookings.length})</span>
        </button>
      </div>

      {/* EVENT DECK CARDS SCROLL */}
      <div className="p-6 space-y-4 overflow-y-auto no-scrollbar flex-1">
        {visibleBookings.length > 0 ? (
          visibleBookings.map((b) => (
            <div
              key={b.id}
              id={`history-booking-card-${b.id}`}
              className="bg-white border border-stone-200/60 p-4 rounded-3xl space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Top banner info */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div>
                  <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest block">Reference Code</span>
                  <span className="font-mono text-xs text-stone-800 font-bold">#{b.id}</span>
                </div>
                
                {/* Status colored label bulbs */}
                {b.status === 'upcoming' && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[9px] font-black uppercase text-emerald-600 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Confirmed
                  </span>
                )}
                {b.status === 'completed' && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-[9px] font-black uppercase text-amber-600 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Completed
                  </span>
                )}
                {b.status === 'canceled' && (
                  <span className="px-2.5 py-1 rounded-full bg-stone-100 text-[9px] font-black uppercase text-stone-400 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    Canceled
                  </span>
                )}
              </div>

              {/* Service information */}
              <div className="flex gap-3">
                <img
                  src={b.service.image}
                  alt={b.service.name}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-rose-500 block">
                    {b.service.category}
                  </span>
                  <h4 className="text-xs font-black text-stone-900 leading-tight mt-0.5 truncate">{b.service.name}</h4>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">by Artist {b.specialist.name} ({b.specialist.title})</p>
                </div>
              </div>

              {/* Timestamp and price info row */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-semibold text-stone-800">{b.date}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-semibold text-stone-850">{b.timeSlot}</span>
                </div>
              </div>

              {/* Real receipt lines & checkout buttons */}
              <div className="pt-3.5 border-t border-stone-100/80 flex items-center justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-stone-400 font-bold block">Amount Paid</span>
                  <strong className="text-xs font-black text-stone-950">${b.totalAmount.toFixed(2)}</strong>
                </div>

                {b.status === 'upcoming' ? (
                  <button
                    id={`cancel-appt-btn-${b.id}`}
                    onClick={() => onCancelBooking(b.id)}
                    className="text-[10px] font-bold text-stone-400 hover:text-stone-900 duration-150 px-3.5 py-2 hover:bg-stone-50 rounded-xl flex items-center gap-1 active:scale-[0.98]"
                  >
                    <Ban className="w-3 h-3 text-rose-400" />
                    <span>Cancel Appointment</span>
                  </button>
                ) : (
                  <button
                    id={`rebook-btn-${b.id}`}
                    onClick={() => onRebook(b.service, b.specialist)}
                    className="bg-stone-950 hover:bg-stone-900 text-white text-[10px] font-bold py-2 px-3 rounded-xl flex items-center gap-1.5 transition-all outline-none"
                  >
                    <RotateCcw className="w-3 h-3 text-stone-200" />
                    <span>Book Again</span>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty history illustration */
          <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl space-y-3 p-6">
            <div className="text-3xl">☕</div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">No History Found</h4>
            <p className="text-[11px] text-stone-400 leading-relaxed max-w-[210px] mx-auto">
              You do not have any {activeTab} registrations currently. Let us reserve your dream service!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
