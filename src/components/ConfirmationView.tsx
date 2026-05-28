import React, { useState } from 'react';
import { CheckCircle2, Calendar, MapPin, User, ArrowRight, Share2, Sparkles, Check } from 'lucide-react';
import { Booking } from '../types';

interface ConfirmationViewProps {
  booking: Booking;
  onGoHome: () => void;
  onReschedule: () => void;
}

export default function ConfirmationView({
  booking,
  onGoHome,
  onReschedule
}: ConfirmationViewProps) {
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => {
      setCalendarAdded(false);
    }, 3000);
  };

  const handleCopyAddress = () => {
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2500);
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 h-full font-sans">
      
      {/* Decorative background light bubbles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Top micro progress tracker */}
      <div className="text-center pt-2">
        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/60 text-[10px] font-bold tracking-widest text-emerald-600 uppercase inline-block">
          Booking Confirmed!
        </span>
      </div>

      {/* Core Success checkmark area */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        {/* Check circle anchor */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative border border-emerald-100/30">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-[ping_2s_infinite]" />
          <CheckCircle2 className="w-10 h-10 text-emerald-500 z-10" />
        </div>

        <h2 className="text-2xl font-black text-stone-950 tracking-tight leading-tight px-1 mb-2">
          Your reservation is booked!
        </h2>
        <p className="text-stone-550 text-xs px-4 leading-relaxed">
          We have securely processed your deposit. GlowUp Salon is looking forward to pampering you. Your reservation slot is officially locked.
        </p>
      </div>

      {/* Booking Details ticket styling */}
      <div className="space-y-4">
        <div className="bg-stone-50 border border-stone-150 p-4.5 rounded-3xl space-y-3.5 relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-stone-950 text-[8px] font-mono text-white tracking-widest px-2 py-0.5 rounded font-bold uppercase">
            Reservation Ticket
          </div>

          <div className="flex justify-between items-start pt-1.5">
            <div>
              <h4 className="text-xs font-bold text-stone-900 leading-tight">{booking.service.name}</h4>
              <p className="text-[10px] text-stone-400 mt-0.5">{booking.service.duration} mins • by {booking.specialist.name}</p>
            </div>
            <span className="text-xs font-black text-rose-500">${booking.totalAmount.toFixed(2)}</span>
          </div>

          <div className="pt-3 border-t border-stone-200/50 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[8px] text-stone-405 font-bold uppercase tracking-wider block mb-0.5">Date</span>
              <span className="font-bold text-stone-900 leading-tight">{booking.date}</span>
            </div>
            <div>
              <span className="text-[8px] text-stone-405 font-bold uppercase tracking-wider block mb-0.5">Time</span>
              <span className="font-bold text-stone-900">{booking.timeSlot}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Suite 404, Bedford Dr, BH</span>
            </div>
            
            <button
              id="copy-address-btn"
              onClick={handleCopyAddress}
              className="text-[9px] font-bold text-rose-500 cursor-pointer hover:underline"
            >
              {copiedAddress ? 'Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>

        {/* Action utility row (Add to Calendar, Reschedule) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            id="add-calendar-btn"
            onClick={handleAddToCalendar}
            disabled={calendarAdded}
            className={`py-3 px-3.5 rounded-xl border text-[11px] font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 ${
              calendarAdded
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            {calendarAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Synced to Calendar</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Add to Calendar</span>
              </>
            )}
          </button>

          <button
            id="reschedule-btn"
            onClick={onReschedule}
            className="py-3 px-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-[11px] font-bold text-stone-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Reschedule Slot</span>
          </button>
        </div>
      </div>

      {/* Primary exit trigger to bottom board dashboard */}
      <div className="pt-6">
        <button
          id="confirm-return-home-btn"
          onClick={onGoHome}
          className="w-full py-4 bg-stone-950 hover:bg-stone-900 text-white font-black tracking-wider uppercase rounded-2xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <span className="block text-center text-[10px] text-stone-400 mt-3 font-mono">
          Booking Code: GLW-7828
        </span>
      </div>

    </div>
  );
}
