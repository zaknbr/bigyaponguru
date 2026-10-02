'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEVEN_DAY_LAUNCH_PLAN, LAUNCH_QUICK_HELP } from '@/config/launchPlan';
import { toBengaliDigits, formatBDT } from '@/utils/bengaliNumbers';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  DollarSign,
} from 'lucide-react';

export function Step5LaunchPlan() {
  const {
    campaignStartDate,
    startCampaignToday,
    currentCampaignDay,
    completedLaunchDays,
    toggleLaunchDayCompleted,
    resetCampaignCycle,
    weeklyReviewData,
    setWeeklyReviewData,
    setCurrentStep,
    useBengaliDigits,
  } = useApp();

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(currentCampaignDay || 1);
  const [showTroubleModal, setShowTroubleModal] = useState<boolean>(false);

  const selectedPlan =
    SEVEN_DAY_LAUNCH_PLAN.find((p) => p.dayNumber === selectedDayNumber) || SEVEN_DAY_LAUNCH_PLAN[0];

  const isSelectedDayDone = completedLaunchDays.includes(selectedDayNumber);

  // Weekly review calculations
  const totalRevenue = Math.max(0, weeklyReviewData.totalRevenue || 0);
  const totalSpend = Math.max(0, weeklyReviewData.totalSpend || 0);
  const productCost = Math.max(0, weeklyReviewData.productCostTotal || 0);
  const deliveryCost = Math.max(0, weeklyReviewData.deliveryCostTotal || 0);
  const totalExpenses = totalSpend + productCost + deliveryCost;
  const netProfit = totalRevenue - totalExpenses;
  const isProfitable = netProfit > 0;
  const profitMarginPercent = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Header with Start/Reset Tracker */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                বিজ্ঞাপন ট্র্যাকার ও টাইমলাইন
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              ৭ দিনের বিজ্ঞাপন লঞ্চ গাইড
            </h2>
            <p className="text-sm text-slate-600">
              বিজ্ঞাপন চালুর পর কখন কী পরিবর্তন করবেন আর কী করা যাবে না তার স্পষ্ট দিনভিত্তিক গাইড।
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {!campaignStartDate ? (
              <button
                type="button"
                onClick={startCampaignToday}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>বিজ্ঞাপন শুরু করেছি</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (confirm('আপনি কি নিশ্চিত যে নতুন ৭ দিনের সাইকেল শুরু করতে চান?')) {
                    resetCampaignCycle();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>নতুন সাইকেল শুরু</span>
              </button>
            )}
          </div>
        </div>

        {/* 7 Days Timeline Stepper Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-2">
          {SEVEN_DAY_LAUNCH_PLAN.map((p) => {
            const isSelected = p.dayNumber === selectedDayNumber;
            const isCurrent = currentCampaignDay === p.dayNumber;
            const isDone = completedLaunchDays.includes(p.dayNumber);

            return (
              <button
                key={p.dayNumber}
                type="button"
                onClick={() => setSelectedDayNumber(p.dayNumber)}
                className={`p-2.5 sm:p-3 rounded-2xl text-center transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'glass-card hover:bg-white text-slate-700'
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase">
                  দিন {useBengaliDigits ? toBengaliDigits(p.dayNumber) : p.dayNumber}
                </span>
                <span className="text-[10px] mt-0.5 opacity-80 truncate max-w-full">
                  {p.dayNumber === 7 ? 'রিভিউ' : p.title.split(' ')[0]}
                </span>
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                )}
                {isDone && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Content Card */}
      <div className="glass-card rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-6 animate-fade-in shadow-md">
        {/* Day Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                দিন {useBengaliDigits ? toBengaliDigits(selectedPlan.dayNumber) : selectedPlan.dayNumber}: {selectedPlan.title}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                {selectedPlan.tag}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
              {selectedPlan.goldenRule}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleLaunchDayCompleted(selectedPlan.dayNumber)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all flex-shrink-0 self-start sm:self-auto ${
              isSelectedDayDone
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isSelectedDayDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>আজকের কাজ শেষ</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>কাজ শেষ হলে টিক দিন</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Core Day Sections: Actions, Do Not, Watch Numbers */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* 1. Today's Actions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ১. আজকের প্রধান কাজ ({selectedPlan.todayActions.length}টি অ্যাকশন):
            </h4>
            <div className="space-y-2 pt-1">
              {selectedPlan.todayActions.map((act, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 font-medium">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1}
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. What NOT to do */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-xs space-y-1.5">
            <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              ২. আজ ভুলেও যা করবেন না (সবচেয়ে বড় ভুল):
            </h4>
            <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed pl-6">
              {selectedPlan.whatNotToDo}
            </p>
          </div>

          {/* 3. Numbers to watch */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              ৩. যে মেট্রিক্সগুলোতে নজর রাখবেন:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
              {selectedPlan.metricsToWatch.map((metric, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-indigo-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{metric.name}</span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {metric.target}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{metric.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DAY 7 SPECIAL: Interactive Financial Waterfall Review Calculator */}
        {selectedPlan.dayNumber === 7 && (
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h4 className="font-extrabold text-base sm:text-lg text-white">
                  ৭ম দিনের লাভ-ক্ষতি ক্যালকুলেটর (Financial Visualizer)
                </h4>
              </div>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                isProfitable ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {isProfitable ? 'লাভজনক সাইকেল' : 'লোকসান / সমন্বয় দরকার'}
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">মোট বিক্রি/আয় (৳):</label>
                <input
                  type="number"
                  value={weeklyReviewData.totalRevenue || ''}
                  onChange={(e) =>
                    setWeeklyReviewData((prev) => ({
                      ...prev,
                      totalRevenue: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  placeholder="১৫০০০"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">বিজ্ঞাপন খরচ (৳):</label>
                <input
                  type="number"
                  value={weeklyReviewData.totalSpend || ''}
                  onChange={(e) =>
                    setWeeklyReviewData((prev) => ({
                      ...prev,
                      totalSpend: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  placeholder="৩০০০"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">পণ্য ক্রয় খরচ (৳):</label>
                <input
                  type="number"
                  value={weeklyReviewData.productCostTotal || ''}
                  onChange={(e) =>
                    setWeeklyReviewData((prev) => ({
                      ...prev,
                      productCostTotal: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  placeholder="৭০০০"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">ডেলিভারি খরচ (৳):</label>
                <input
                  type="number"
                  value={weeklyReviewData.deliveryCostTotal || ''}
                  onChange={(e) =>
                    setWeeklyReviewData((prev) => ({
                      ...prev,
                      deliveryCostTotal: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  placeholder="১২০০"
                />
              </div>
            </div>

            {/* Visual Waterfall Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">৭ দিনে মোট ব্যয়: {formatBDT(totalExpenses, useBengaliDigits)} ৳</p>
                <p className="text-xl sm:text-2xl font-black mt-0.5">
                  নিট লাভ: <span className={isProfitable ? 'text-emerald-400' : 'text-rose-400'}>{formatBDT(netProfit, useBengaliDigits)}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-300">নিট মার্জিন: </span>
                <span className="text-sm font-extrabold text-emerald-400">{useBengaliDigits ? toBengaliDigits(profitMarginPercent) : profitMarginPercent}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting Quick Help Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowTroubleModal(true)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            <span>আমার বিজ্ঞাপনে কোনো সমস্যা হচ্ছে? দ্রুত সমাধান দেখুন</span>
          </button>
        </div>
      </div>

      {/* Troubleshooting Modal */}
      {showTroubleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">সাধারণ বিজ্ঞাপন সমস্যা ও প্রতিকার</h3>
              <button
                type="button"
                onClick={() => setShowTroubleModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {LAUNCH_QUICK_HELP.map((help) => (
                <div key={help.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-slate-900">⚠️ {help.title}</p>
                  </div>
                  <p className="text-xs text-slate-600 font-medium"><strong>সমস্যা:</strong> {help.problem}</p>
                  <p className="text-xs text-rose-700 font-medium"><strong>সম্ভাব্য কারণ:</strong> {help.causeBangla}</p>
                  <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl space-y-1">
                    <p className="font-bold">💡 সমাধান পদক্ষেপ:</p>
                    {help.solutionBangla.map((sol, si) => (
                      <p key={si} className="font-medium text-emerald-950">{sol}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowTroubleModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ক্রিয়েটিভ কিটে যান</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(6);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <span>রেজাল্ট ডক্টরে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
