import React, { useState } from 'react';
import { Sparkles, Award, ChevronRight } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: () => void;
}

export default function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Seamless & Secure Booking',
      description: 'Book your luxury wellness treatments and select individual couture artists in under 30 seconds with instant security feedback.',
      icon: <Sparkles className="w-12 h-12 text-rose-500" />,
      colorClass: 'bg-rose-50',
      badge: 'Reduced Friction'
    },
    {
      title: 'Certified Master Artists',
      description: 'Consult our hand-picked specialists trained in London and Paris. View comprehensive reviews, portfolios, and booking historical scores.',
      icon: <Award className="w-12 h-12 text-amber-600" />,
      colorClass: 'bg-amber-50',
      badge: 'Unmatched Skills'
    },
    {
      title: 'Ultimate Schedule Flexibility',
      description: 'Adapt appointments dynamically with instant rescheduling, slot previews, calendar integrations, and low-waste alert systems.',
      icon: <span className="text-4xl">🗓️</span>,
      colorClass: 'bg-stone-100',
      badge: '24/7 Availability'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[currentStep];

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 h-full font-sans">
      {/* Top action bar: Skip button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
          Step {currentStep + 1} of 3
        </span>
        <button
          id="skip-onboarding-btn"
          onClick={onComplete}
          className="text-stone-500 hover:text-stone-900 text-xs font-semibold tracking-wide transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Illustration/Teaser & Copy Container */}
      <div className="my-auto flex flex-col items-center text-center">
        {/* Animated outer circle for luxury aesthetic */}
        <div className={`w-36 h-36 ${current.colorClass} rounded-full flex items-center justify-center mb-10 transition-colors duration-500 relative`}>
          <div className="absolute inset-4 rounded-full border border-stone-900/5 animate-[ping_3s_infinite]" />
          {current.icon}
        </div>

        {/* Informative badging */}
        <span className="px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold tracking-wider uppercase text-stone-600 mb-4 inline-block">
          {current.badge}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 mb-3 leading-tight px-2">
          {current.title}
        </h2>

        {/* Paragraph */}
        <p className="text-stone-500 text-sm leading-relaxed px-4">
          {current.description}
        </p>
      </div>

      {/* Bottom Interactive Area */}
      <div className="space-y-6 pb-6">
        {/* Pagination Indicators */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              id={`onboarding-indicator-${idx}`}
              onClick={() => setCurrentStep(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep === idx ? 'w-8 bg-rose-500' : 'w-2 bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* CTA Primary Trigger Button */}
        <button
          id="onboarding-next-btn"
          onClick={handleNext}
          className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold py-4 px-6 rounded-2xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next Screen'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
