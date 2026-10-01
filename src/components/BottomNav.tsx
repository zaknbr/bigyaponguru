'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Briefcase,
  PieChart,
  Wand2,
  Activity,
  BookOpen,
} from 'lucide-react';

export function BottomNav() {
  const { currentStep, setCurrentStep } = useApp();

  const NAV_ITEMS = [
    { step: 1, label: 'প্রোফাইল', icon: Briefcase },
    { step: 2, label: 'অ্যাড প্ল্যান', icon: PieChart },
    { step: 4, label: 'কপি কিট', icon: Wand2 },
    { step: 6, label: 'ডক্টর', icon: Activity },
    { step: 7, label: 'শব্দকোষ', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 sm:hidden shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
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
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-emerald-50 text-emerald-600' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-emerald-700' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
