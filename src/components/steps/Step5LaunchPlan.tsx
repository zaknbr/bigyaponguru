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
  ChevronDown,
  ChevronUp,
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
  const [activeTroubleId, setActiveTroubleId] = useState<string | null>(null);

  const selectedPlan =
    SEVEN_DAY_LAUNCH_PLAN.find((p) => p.dayNumber === selectedDayNumber) || SEVEN_DAY_LAUNCH_PLAN[0];

  const isSelectedDayDone = completedLaunchDays.includes(selectedDayNumber);

  // Weekly review calculations
  const totalRevenue = Math.max(0, weeklyReviewData.totalRevenue || 0);
  const totalSpend = Math.max(0, weeklyReviewData.totalSpend || 0);
  const productCost = Math.max(0, weeklyReviewData.productCostTotal || 0);
  const deliveryCost = Math.max(0, weeklyReviewData.deliveryCostTotal || 0);
  const netProfit = totalRevenue - (totalSpend + productCost + deliveryCost);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Clean Header */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">৭ দিনের লঞ্চ গাইড</h2>
            <p className="text-xs sm:text-sm text-slate-500">বিজ্ঞাপন প্রকাশের পর দিনভিত্তিক করণীয় ও ভুল এড়ানোর নিয়ম</p>
          </div>

          <div>
            {!campaignStartDate ? (
              <button
                type="button"
                onClick={startCampaignToday}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>বিজ্ঞাপন শুরু করেছি (আজ থেকে শুরু)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs">
                <span className="font-semibold text-slate-800">
                  দিন {useBengaliDigits ? toBengaliDigits(currentCampaignDay) : currentCampaignDay}-এ আছেন
                </span>
                <button
                  type="button"
                  onClick={resetCampaignCycle}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title="রিসেট"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Day-by-Day Timeline Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {SEVEN_DAY_LAUNCH_PLAN.map((plan) => {
            const isSelected = selectedDayNumber === plan.dayNumber;
            const isDone = completedLaunchDays.includes(plan.dayNumber);
            const isToday = campaignStartDate !== null && currentCampaignDay === plan.dayNumber;
            const dayNum = useBengaliDigits ? toBengaliDigits(plan.dayNumber) : plan.dayNumber;

            return (
              <button
                key={plan.dayNumber}
                onClick={() => setSelectedDayNumber(plan.dayNumber)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors text-center flex-shrink-0 relative ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold'
                    : isToday
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : isDone
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isToday && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] px-1.5 bg-emerald-600 text-white font-bold rounded-full">
                    আজ
                  </span>
                )}
                <span>দিন {dayNum} {isDone && '✓'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE DAY CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-5 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-medium text-slate-500">
              {selectedPlan.day} • {selectedPlan.tag}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {selectedPlan.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowTroubleModal(true)}
            className="text-xs text-rose-700 hover:text-rose-900 font-medium bg-rose-50 px-2.5 py-1 rounded-lg self-start sm:self-auto"
          >
            সমস্যা হচ্ছে?
          </button>
        </div>

        {/* 1. আজকের কাজ */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            (১) আজকের কাজ:
          </p>
          <div className="space-y-1.5">
            {selectedPlan.todayActions.map((action, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {useBengaliDigits ? toBengaliDigits(i + 1) : i + 1}
                </span>
                <p className="flex-1">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. আজ যা করবেন না */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-rose-800 uppercase tracking-wider">
            (২) আজ যা করবেন না (ভুল এড়িয়ে চলুন):
          </p>
          <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-100 text-xs sm:text-sm text-rose-950 leading-relaxed">
            {selectedPlan.whatNotToDo}
          </div>
        </div>

        {/* 3. কী দেখবেন */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            (৩) কী দেখবেন (মেট্রিক্স):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedPlan.metricsToWatch.map((metric, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                <span className="text-slate-500 font-medium">{metric.name}:</span>
                <p className="font-semibold text-slate-900">{metric.target}</p>
                <p className="text-[11px] text-slate-400">{metric.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Complete Toggle Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => toggleLaunchDayCompleted(selectedDayNumber)}
            className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              isSelectedDayDone
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isSelectedDayDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>দিন {useBengaliDigits ? toBengaliDigits(selectedDayNumber) : selectedDayNumber}-এর কাজ সম্পন্ন হয়েছে</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>আজকের কাজ শেষ হলে এখানে চাপ দিন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DAY 7 WEEKLY REVIEW SCREEN */}
      {selectedDayNumber === 7 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 animate-fade-in">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            ৭ম দিন: সাপ্তাহিক লাভ-ক্ষতি রিভিউ ক্যালকুলেটর
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">বিজ্ঞাপনে খরচ (৳):</label>
              <input
                type="number"
                value={weeklyReviewData.totalSpend || ''}
                onChange={(e) =>
                  setWeeklyReviewData({ ...weeklyReviewData, totalSpend: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
                placeholder="৩৫০০"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">মোট মেসেজ/অর্ডার:</label>
              <input
                type="number"
                value={weeklyReviewData.totalMessagesOrOrders || ''}
                onChange={(e) =>
                  setWeeklyReviewData({
                    ...weeklyReviewData,
                    totalMessagesOrOrders: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
                placeholder="২৮"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">মোট বিক্রয় বা আয় (৳):</label>
              <input
                type="number"
                value={weeklyReviewData.totalRevenue || ''}
                onChange={(e) =>
                  setWeeklyReviewData({ ...weeklyReviewData, totalRevenue: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
                placeholder="৫১৮০০"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">পণ্যের মোট খরচ (৳):</label>
              <input
                type="number"
                value={weeklyReviewData.productCostTotal || ''}
                onChange={(e) =>
                  setWeeklyReviewData({
                    ...weeklyReviewData,
                    productCostTotal: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
                placeholder="৩০৮০০"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">সাপ্তাহিক নিট লাভ:</span>
              <span className="text-sm font-bold text-slate-900">
                {formatBDT(netProfit, useBengaliDigits)}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {netProfit > 0
                ? '🎉 ক্যাম্পেইনটি সফল! আগামী সপ্তাহের জন্য বাজেট ২০-৩০% বাড়াতে পারেন।'
                : '⚠️ খরচ বেশি হচ্ছে। নতুন ছবি বা ভালো অফার দিয়ে পুনরায় শুরু করুন।'}
            </p>
          </div>
        </div>
      )}

      {/* QUICK HELP MODAL */}
      {showTroubleModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-xl p-5 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">চলমান বিজ্ঞাপনের সাধারণ সমস্যা ও সমাধান</h4>
              <button
                type="button"
                onClick={() => setShowTroubleModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {LAUNCH_QUICK_HELP.map((item) => {
                const isOpen = activeTroubleId === item.id;
                return (
                  <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveTroubleId(isOpen ? null : item.id)}
                      className="w-full p-3 text-left flex items-center justify-between text-xs font-medium text-slate-900 hover:bg-slate-50"
                    >
                      <span>{item.title}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-3 bg-slate-50 text-xs text-slate-600 space-y-1.5 border-t border-slate-100">
                        <p><strong>কারণ:</strong> {item.causeBangla}</p>
                        <div className="pt-1">
                          <strong>সমাধান:</strong>
                          {item.solutionBangla.map((s, idx) => (
                            <p key={idx}>• {s}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="pt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
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
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span>রেজাল্ট ডক্টরে ফলাফল মাপুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
