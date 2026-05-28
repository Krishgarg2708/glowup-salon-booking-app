import React, { useState, useMemo } from 'react';
import { ArrowLeft, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import { Service, Specialist, Booking } from '../types';
import { TIME_SLOTS } from '../data';

interface BookingFlowViewProps {
  service: Service;
  specialist: Specialist;
  onBack: () => void;
  onConfirmSelection: (date: string, timeSlot: string) => void;
}

export default function BookingFlowView({
  service,
  specialist,
  onBack,
  onConfirmSelection
}: BookingFlowViewProps) {
  // Generate the next 14 calendar booking dates dynamically
  const nextDates = useMemo(() => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Start from today (2026-05-27 based on metadata)
    const baseDate = new Date('2026-05-27T12:00:00Z');
    
    for (let i = 0; i < 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      const dayName = weekdays[d.getUTCDay()];
      const dayNum = d.getUTCDate();
      const monthLabel = months[d.getUTCMonth()];
      
      // Formatting: "YYYY-MM-DD" for key identification
      const year = d.getUTCFullYear();
      const monthStr = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dayStr = String(dayNum).padStart(2, '0');
      const isoString = `${year}-${monthStr}-${dayStr}`;

      dates.push({
        iso: isoString,
        dayNum,
        dayName,
        monthLabel,
        isSunday: d.getUTCDay() === 0, // Sundey is closed
      });
    }
    return dates;
  }, []);

  const [selectedDateObj, setSelectedDateObj] = useState(nextDates[0]);
  const [selectedTime, setSelectedTime] = useState('');

  // Simulating booked/disabled slots for Elena or Sunday for pristine realism
  const isSundayClosed = selectedDateObj.isSunday;
  const disabledSlots = useMemo(() => {
    // Return mock booked slots representing busy client flows
    if (specialist.id === 'sp1') { // Sofia is busy early
      return ['09:00 AM', '10:00 AM'];
    }
    if (specialist.id === 'sp2') { // Elena is busy afternoon
      return ['02:00 PM', '03:30 PM'];
    }
    return ['11:30 AM'];
  }, [specialist, selectedDateObj]);

  const handleDateClick = (dateObj: typeof nextDates[0]) => {
    setSelectedDateObj(dateObj);
    setSelectedTime(''); // reset slot selection
  };

  const isSelectionComplete = selectedTime !== '' && !isSundayClosed;

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full font-sans">
      
      {/* HEADER WITH PROGRESS INDICATOR */}
      <div>
        <div className="px-6 pt-4 pb-3 border-b border-stone-100 flex items-center justify-between">
          <button
            id="booking-flow-back-btn"
            onClick={onBack}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">Select Date & Time</h2>
          
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-rose-500" />
          </div>
        </div>

        {/* PROGRESS STEPPER */}
        <div className="bg-stone-50 px-6 py-2 border-b border-stone-200/50 flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-stone-400">
          <span className="text-stone-950">1. Select Slot</span>
          <span>➔</span>
          <span>2. Summary</span>
          <span>➔</span>
          <span>3. Confirm</span>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto no-scrollbar flex-1">
        
        {/* COMPACT SUMMARY CARD */}
        <div className="p-3.5 bg-stone-50 border border-stone-200/50 rounded-2xl flex items-center gap-3">
          <img
            src={specialist.image}
            alt={specialist.name}
            className="w-10 h-10 rounded-full object-cover border border-stone-200 shadow-sm"
          />
          <div>
            <h4 className="text-xs font-bold text-stone-950 leading-tight">{service.name}</h4>
            <p className="text-[10px] text-stone-400 mt-0.5">
              with <strong className="text-stone-800 font-bold">{specialist.name}</strong> • ${service.price}
            </p>
          </div>
        </div>

        {/* HORIZONTAL DATE PICKER SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-stone-400">Select Date</h3>
            <span className="text-[10px] text-stone-500 font-mono font-bold uppercase">{selectedDateObj.monthLabel} 2026</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-6 px-6 py-0.5">
            {nextDates.map((d) => {
              const isSelected = selectedDateObj.iso === d.iso;
              return (
                <button
                  key={d.iso}
                  id={`date-cell-${d.iso}`}
                  onClick={() => handleDateClick(d)}
                  className={`w-[54px] h-[78px] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all border outline-none shrink-0 ${
                    isSelected
                      ? 'bg-stone-950 border-stone-950 text-white shadow-md scale-[1.02]'
                      : d.isSunday
                      ? 'bg-stone-50 border-stone-100 text-stone-300'
                      : 'bg-white border-stone-200/60 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span className={`text-[9px] uppercase tracking-wider font-bold ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                    {d.dayName}
                  </span>
                  <span className="text-lg font-black tracking-tight leading-none mt-1.5">{d.dayNum}</span>
                  {d.isSunday && (
                    <span className="text-[7px] font-black uppercase text-stone-400 tracking-wider mt-1 scale-90">Closed</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TIME SLOT SECTOR SECTION */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-stone-400">Available Time Slots</h3>

          {isSundayClosed ? (
            <div className="p-6 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 space-y-1">
              <AlertCircle className="w-5 h-5 text-rose-450 mx-auto text-stone-400" />
              <h4 className="text-xs font-bold text-stone-800">Salon Closed on Sundays</h4>
              <p className="text-[10px] text-stone-500 leading-normal">
                GlowUp staff takes Sunday off for spiritual wellness. Please book any other date!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const isBooked = disabledSlots.includes(slot);
                const isSelected = selectedTime === slot;

                return (
                  <button
                    key={slot}
                    id={`time-slot-${slot.replace(' ', '-').replace(':', '')}`}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 px-1 text-center rounded-xl text-xs font-bold transition-all border outline-none ${
                      isSelected
                        ? 'bg-rose-500 border-rose-500 text-white shadow-sm scale-[1.02]'
                        : isBooked
                        ? 'bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed line-through'
                        : 'bg-white border-stone-200/60 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* TIME LEGEND */}
        {!isSundayClosed && (
          <div className="flex gap-4 justify-center text-[10px] font-bold text-stone-500 font-mono">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-white border border-stone-300" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-stone-50 border border-stone-100 text-stone-300" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span>Selected</span>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER ACTION SUMMARY TRIGGER */}
      <div className="p-6 border-t border-stone-100 bg-white space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.015)]">
        {isSelectionComplete && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Selected Slot</span>
              <p className="text-xs font-bold text-stone-900">
                {selectedDateObj.monthLabel} {selectedDateObj.dayNum} • <span className="text-rose-500">{selectedTime}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Total Price</span>
              <p className="text-xs font-black text-stone-950">${service.price}</p>
            </div>
          </div>
        )}

        <button
          id="confirm-datetime-selection-btn"
          onClick={() => onConfirmSelection(selectedDateObj.iso, selectedTime)}
          disabled={!isSelectionComplete}
          className={`w-full py-4 rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 ${
            isSelectionComplete
              ? 'bg-stone-950 text-white hover:bg-stone-900 active:scale-[0.99] cursor-pointer'
              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span>Continue Checkout</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
