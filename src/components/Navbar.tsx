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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Brand & Top Bar */}
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-xs flex-shrink-0">
            বি
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-slate-900 tracking-tight">
                বিজ্ঞাপন গুরু
              </h1>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                বাংলা গাইড
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              সহজ বাংলায় মেটা ও টিকটক বিজ্ঞাপনের সম্পূর্ণ নির্দেশিকা
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bengali Numeral Toggle */}
          <button
            type="button"
            onClick={() => setUseBengaliDigits(!useBengaliDigits)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200"
            title="সংখ্যা রূপান্তর"
          >
            <span className="text-slate-400 text-[11px]">সংখ্যা:</span>
            <span className={useBengaliDigits ? 'text-emerald-700 font-semibold' : 'text-slate-700'}>
              {useBengaliDigits ? '১২৩' : '123'}
            </span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetAllData}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="সব তথ্য নতুন করে শুরু করুন"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thin Progress Indicator */}
      <div className="w-full bg-slate-100 h-0.5 relative overflow-hidden">
        <div
          className="h-full bg-emerald-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Clean Step Navigation Tabs */}
      <div className="max-w-3xl mx-auto px-4 overflow-x-auto scrollbar-none py-2 flex items-center gap-1.5">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : isCompleted
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {stepNumber}
              </span>
              <span>{s.shortTitle}</span>
              {s.id === 3 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">
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
