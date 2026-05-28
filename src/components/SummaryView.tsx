import React, { useState } from 'react';
import { ArrowLeft, MapPin, Tag, Check, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Service, Specialist, UserProfile } from '../types';
import { PROMO_CODES } from '../data';

interface SummaryViewProps {
  service: Service;
  specialist: Specialist;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  userProfile: UserProfile;
  onBack: () => void;
  onConfirmBooking: (promo: string, total: number) => void;
}

export default function SummaryView({
  service,
  specialist,
  date,
  timeSlot,
  userProfile,
  onBack,
  onConfirmBooking
}: SummaryViewProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState(userProfile.paymentMethods[0]?.id || '');

  // Calculate fees dynamically
  const serviceFee = 4.50;
  const originalSubtotal = service.price;
  
  // Calculate discount based on dynamic promo codes in data.ts
  const discount = (() => {
    if (!appliedPromo) return 0;
    const value = PROMO_CODES[appliedPromo];
    if (!value) return 0;
    
    // GLOW15 or COUTURE10 -> percentages
    if (appliedPromo === 'GLOW15') return Math.round(originalSubtotal * 0.15 * 100) / 100;
    if (appliedPromo === 'COUTURE10') return Math.round(originalSubtotal * 0.10 * 100) / 100;
    // WELCOME20 -> flat rate
    if (appliedPromo === 'WELCOME20') return Math.min(20, originalSubtotal);
    return 0;
  })();

  const grandTotal = Math.max(0, Math.round((originalSubtotal - discount + serviceFee) * 100) / 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    
    const key = promoInput.toUpperCase().trim();
    if (PROMO_CODES[key] !== undefined) {
      setAppliedPromo(key);
    } else {
      setPromoError('Unknown or expired promo code');
    }
  };

  const handleClearPromo = () => {
    setAppliedPromo('');
    setPromoInput('');
    setPromoError('');
  };

  const activePayment = userProfile.paymentMethods.find(p => p.id === selectedPaymentId);

  // Formatting date nicely
  const formattedDate = () => {
    try {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
      const parsed = new Date(`${date}T12:00:00Z`);
      return parsed.toLocaleDateString('en-US', options);
    } catch {
      return date;
    }
  };

  return (
    <div className="flex-1 bg-stone-50 flex flex-col justify-between h-full font-sans">
      
      {/* HEADER ROW */}
      <div>
        <div className="px-6 pt-4 pb-3 bg-white border-b border-stone-100 flex items-center justify-between">
          <button
            id="summary-back-btn"
            onClick={onBack}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">Appointment Review</h2>
          
          <span className="text-[10px] font-bold text-stone-400">Step 2 of 3</span>
        </div>

        {/* PROGRESS STEPPER */}
        <div className="bg-stone-50 px-6 py-2 border-b border-stone-200/50 flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-stone-300">
          <span>1. Select Slot</span>
          <span>➔</span>
          <span className="text-stone-950 font-black">2. Summary</span>
          <span>➔</span>
          <span>3. Confirm</span>
        </div>
      </div>

      <div className="p-6 space-y-5 overflow-y-auto no-scrollbar flex-1">
        
        {/* EVENT TICKET CARD DECK */}
        <div className="bg-white border border-stone-200/65 rounded-3xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] space-y-4">
          <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded uppercase">
                {service.category}
              </span>
              <h3 className="text-sm font-bold text-stone-950 mt-1 leading-tight">{service.name}</h3>
              <p className="text-[10px] text-stone-400 mt-0.5">{service.duration} Minute Wellness Session</p>
            </div>
            <span className="text-base font-black text-rose-500">${service.price}</span>
          </div>

          <div className="flex items-center gap-3.5">
            <img
              src={specialist.image}
              alt={specialist.name}
              className="w-10 h-10 rounded-full object-cover border border-stone-100 shadow-sm"
            />
            <div>
              <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block">Specialist Artist</span>
              <h4 className="text-xs font-bold text-stone-900 leading-tight">{specialist.name}</h4>
              <p className="text-[10px] text-stone-500 leading-tight">{specialist.title}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block mb-0.5">Scheduled Date</span>
              <span className="font-bold text-stone-900 leading-tight">{formattedDate()}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block mb-0.5">Selected Time Slot</span>
              <span className="font-bold text-rose-500">{timeSlot}</span>
            </div>
          </div>
        </div>

        {/* SALON LOCATION ADDRESS BANNER */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4 flex gap-3">
          <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block">GlowUp Studio Location</span>
            <p className="text-xs font-bold text-stone-955 leading-tight">Suite 404, 450 N Bedford Dr</p>
            <p className="text-[10px] text-stone-500 leading-normal">Beverly Hills, CA 90210 (Validated Valet Parking)</p>
          </div>
        </div>

        {/* PAYMENTS METHOD ACCORDION */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-stone-400 tracking-wider">Payment Method</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
              Secure SSL <Check className="w-3 h-3 text-emerald-600" />
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-stone-600" />
              <div>
                <span className="text-xs font-extrabold text-stone-900 uppercase">
                  {activePayment?.type === 'visa' ? 'Visa •••• ' : 'Apple Pay '}
                  {activePayment?.last4}
                </span>
                <span className="text-[9px] text-stone-400 block">Default payment profile</span>
              </div>
            </div>
            
            <select
              id="payment-method-selector"
              value={selectedPaymentId}
              onChange={(e) => setSelectedPaymentId(e.target.value)}
              className="text-[11px] font-bold text-stone-655 bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-stone-700 hover:text-stone-950"
            >
              {userProfile.paymentMethods.map(p => (
                <option key={p.id} value={p.id}>
                  {p.type.toUpperCase()} ({p.last4})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* COUPON INPUT FIELD */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4 space-y-3">
          <span className="text-xs font-extrabold uppercase text-stone-400 tracking-wider block">Do you have a Promo Code?</span>
          
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="coupon-apply-input"
                type="text"
                placeholder="PROMO CODE (e.g. GLOW15)"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError('');
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400 font-mono tracking-widest uppercase"
              />
            </div>
            
            {appliedPromo ? (
              <button
                id="clear-promo-btn"
                type="button"
                onClick={handleClearPromo}
                className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold px-4 py-2 text-xs rounded-xl"
              >
                Clear
              </button>
            ) : (
              <button
                id="apply-promo-btn"
                type="submit"
                className="bg-stone-950 hover:bg-stone-900 text-white font-bold px-4 py-2 text-xs rounded-xl transition-all"
              >
                Apply
              </button>
            )}
          </form>

          {appliedPromo && (
            <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" />
              <span>Promo applied successfully! Saved <strong>${discount}</strong>.</span>
            </div>
          )}

          {promoError && (
            <p className="text-rose-500 text-[10px] font-bold ml-1">{promoError}</p>
          )}

          {!appliedPromo && !promoError && (
            <div className="text-[10px] text-stone-400">
              Tip: Enter code <strong className="text-rose-400 uppercase font-bold">GLOW15</strong> to apply 15% discount.
            </div>
          )}
        </div>

        {/* DETAILED PRICE BOOK SUMMARY */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4.5 space-y-2.5 text-xs text-stone-700">
          <span className="text-xs font-extrabold uppercase text-stone-400 tracking-wider block mb-1">Financial Breakdown</span>
          
          <div className="flex justify-between">
            <span>Subtotal Package Price</span>
            <span className="font-bold text-stone-950">${originalSubtotal}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span className="flex items-center gap-1 uppercase tracking-wider text-[10px]">
                Promo Applied: {appliedPromo}
              </span>
              <span>-${discount}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Organic Product & Luxury Fee</span>
            <span className="font-bold text-stone-950">${serviceFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-3 border-t border-stone-100 text-stone-950 font-black text-sm">
            <span>Grand Total Due</span>
            <span className="text-rose-500">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

      </div>

      {/* FOOTER CTA TRIGGER */}
      <div className="p-6 border-t border-stone-100 bg-white">
        <button
          id="confirm-checkout-and-pay-btn"
          onClick={() => onConfirmBooking(appliedPromo, grandTotal)}
          className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-black tracking-wider uppercase rounded-2xl shadow-lg hover:shadow-rose-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>Pay & Confirm Appointment</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
