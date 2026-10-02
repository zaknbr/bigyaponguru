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
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-xs">
      {/* Top Main Brand & Control Bar */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1">
                বিজ্ঞাপন গুরু
              </h1>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                PRO 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              সহজ বাংলায় প্রফেশনাল মেটা ও টিকটক বিজ্ঞাপন গাইড
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs font-bold text-slate-600">
            <span className="text-[10px] text-slate-400">অগ্রগতি:</span>
            <span className="text-emerald-700">
              {useBengaliDigits ? toBengaliDigits(progressPercent) : progressPercent}%
            </span>
          </div>

          {/* Bengali Numeral Toggle */}
          <button
            type="button"
            onClick={() => setUseBengaliDigits(!useBengaliDigits)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100/90 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 active:scale-95"
            title="সংখ্যা রূপান্তর (বাংলা / ইংরেজি)"
          >
            <span className="text-slate-400 text-[10px]">সংখ্যা:</span>
            <span className={useBengaliDigits ? 'text-emerald-700 font-extrabold' : 'text-slate-700 font-bold'}>
              {useBengaliDigits ? '১২৩' : '123'}
            </span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetAllData}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95 border border-transparent hover:border-rose-100"
            title="সব তথ্য নতুন করে শুরু করুন"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Gradient Line */}
      <div className="w-full bg-slate-100 h-1 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Step Slider Navigation */}
      <div className="max-w-4xl mx-auto px-3 overflow-x-auto scrollbar-none py-2 flex items-center gap-1.5">
        {STEPS.map((s) => {
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;
          const stepNumber = useBengaliDigits ? toBengaliDigits(s.id) : s.id;
          const Icon = s.icon;

          return (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStep(s.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-2 ring-slate-900/10'
                  : isCompleted
                  ? 'bg-emerald-50/80 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100/80'
                  : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/70'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {stepNumber}
              </div>
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{s.shortTitle}</span>
              {s.id === 3 && (
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
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
