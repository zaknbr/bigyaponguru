'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Briefcase,
  PieChart,
  CheckSquare,
  Wand2,
  Calendar,
  Activity,
  HelpCircle,
} from 'lucide-react';

export function BottomNav() {
  const { currentStep, setCurrentStep } = useApp();

  const NAV_ITEMS = [
    { step: 1, label: 'প্রোফাইল', icon: Briefcase },
    { step: 2, label: 'প্ল্যান', icon: PieChart },
    { step: 3, label: 'সেটআপ', icon: CheckSquare },
    { step: 4, label: 'কপি কিট', icon: Wand2 },
    { step: 5, label: 'লঞ্চ', icon: Calendar },
    { step: 6, label: 'ডক্টর', icon: Activity },
    { step: 7, label: 'শব্দকোষ', icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 shadow-2xl rounded-2xl px-1.5 py-1.5 flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;

          return (
            <button
              key={item.step}
              onClick={() => {
                setCurrentStep(item.step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-90 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-emerald-400' : ''}`} />
              <span className={`text-[9px] mt-0.5 tracking-tight ${isActive ? 'text-emerald-300 font-black' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
