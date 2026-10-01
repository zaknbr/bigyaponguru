'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import {
  Sparkles,
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
  { id: 3, title: 'সেটআপ চেকলিস্ট', shortTitle: 'সেটআপ', icon: CheckSquare },
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top Main Bar */}
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                বিজ্ঞাপন গুরু
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                Agency Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              বাংলাদেশের নতুন উদ্যোক্তাদের জন্য সহজ বিজ্ঞাপন গাইড
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bengali Numeral Toggle */}
          <button
            type="button"
            onClick={() => setUseBengaliDigits(!useBengaliDigits)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors border border-slate-200"
            title="বাংলা/ইংরেজি সংখ্যা পরিবর্তন করুন"
          >
            <span className="text-slate-400 text-[10px]">সংখ্যা:</span>
            <span className={useBengaliDigits ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
              {useBengaliDigits ? '১২৩ (বাংলা)' : '123 (Eng)'}
            </span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetAllData}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="সব তথ্য রিসেট করুন"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="w-full bg-slate-100 h-1 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Horizontal Scrollable Step Bar for Easy Navigation */}
      <div className="max-w-3xl mx-auto px-2 overflow-x-auto scrollbar-none py-2 border-t border-slate-100 flex items-center gap-1.5">
        {STEPS.map((s) => {
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;

          const stepNumber = useBengaliDigits ? toBengaliDigits(s.id) : s.id;

          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {stepNumber}
              </span>
              <span>{s.shortTitle}</span>
              {s.id === 3 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
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
