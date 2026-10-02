'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import {
  RotateCcw,
  Briefcase,
  PieChart,
  CheckSquare,
  Wand2,
  Calendar,
  Activity,
  HelpCircle,
} from 'lucide-react';

export const STEPS = [
  { id: 1, title: 'ব্যবসার বিবরণ', shortTitle: 'প্রোফাইল', icon: Briefcase },
  { id: 2, title: 'অ্যাড প্ল্যান', shortTitle: 'প্ল্যান', icon: PieChart },
  { id: 3, title: 'সেটআপ গাইড', shortTitle: 'সেটআপ', icon: CheckSquare },
  { id: 4, title: 'ক্রিয়েটিভ ও কপি', shortTitle: 'কপি কিট', icon: Wand2 },
  { id: 5, title: '৭ দিনের লঞ্চ গাইড', shortTitle: '৭ দিন', icon: Calendar },
  { id: 6, title: 'রেজাল্ট ডক্টর', shortTitle: 'ডক্টর', icon: Activity },
  { id: 7, title: 'শব্দকোষ ও FAQ', shortTitle: 'সাহায্য', icon: HelpCircle },
];

export function Navbar() {
  const {
    currentStep,
    setCurrentStep,
    useBengaliDigits,
    setUseBengaliDigits,
    resetAllData,
    setupCompletedCount,
    setupTotalCount,
  } = useApp();

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-white/80 shadow-sm shadow-slate-900/5">
      {/* Brand & Top Bar */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform flex-shrink-0">
            বি
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                বিজ্ঞাপন গুরু
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ২০২৬ এডিশন
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              বাংলাদেশের উদ্যোক্তাদের জন্য মেটা ও টিকটক অ্যাডস গাইড
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bengali Numeral Toggle */}
          <button
            type="button"
            onClick={() => setUseBengaliDigits(!useBengaliDigits)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/80 hover:bg-white text-slate-700 transition-all border border-slate-200/80 shadow-xs active:scale-95"
            title="সংখ্যা রূপান্তর"
          >
            <span className="text-slate-400 text-[11px]">সংখ্যা:</span>
            <span className={useBengaliDigits ? 'text-emerald-700 font-extrabold' : 'text-slate-700 font-extrabold'}>
              {useBengaliDigits ? '১২৩' : '123'}
            </span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetAllData}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
            title="সব তথ্য নতুন করে শুরু করুন"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thin Animated Progress Bar */}
      <div className="w-full bg-slate-100 h-1 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 2026 Glassmorphic Step Navigation Ribbon */}
      <div className="max-w-4xl mx-auto px-4 overflow-x-auto scrollbar-none py-2.5 flex items-center gap-2">
        {STEPS.map((s) => {
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;
          const stepNumber = useBengaliDigits ? toBengaliDigits(s.id) : s.id;

          return (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStep(s.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-105'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  : 'glass-pill text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {stepNumber}
              </span>
              <span>{s.shortTitle}</span>
              {s.id === 3 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {useBengaliDigits ? toBengaliDigits(setupCompletedCount) : setupCompletedCount}/
                  {useBengaliDigits ? toBengaliDigits(setupTotalCount) : setupTotalCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
