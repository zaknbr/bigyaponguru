'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEVEN_DAY_LAUNCH_PLAN, LAUNCH_QUICK_HELP } from '@/config/launchPlan';
import { toBengaliDigits, formatBDT } from '@/utils/bengaliNumbers';
import {
  Calendar,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  RotateCcw,
  Eye,
  XCircle,
  Calculator,
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
  const isSelectedDayToday = campaignStartDate !== null && currentCampaignDay === selectedDayNumber;

  // Weekly review calculations
  const totalRevenue = Math.max(0, weeklyReviewData.totalRevenue || 0);
  const totalSpend = Math.max(0, weeklyReviewData.totalSpend || 0);
  const productCost = Math.max(0, weeklyReviewData.productCostTotal || 0);
  const deliveryCost = Math.max(0, weeklyReviewData.deliveryCostTotal || 0);
  const netProfit = totalRevenue - (totalSpend + productCost + deliveryCost);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-teal-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">৭ দিনের লঞ্চ প্ল্যান</h2>
              <p className="text-xs text-teal-200">বিজ্ঞাপন প্রকাশের পর দিনভিত্তিক এজেন্সী প্রটোকল</p>
            </div>
          </div>

          {/* Start Date Tracker Action */}
          <div>
            {!campaignStartDate ? (
              <button
                type="button"
                onClick={startCampaignToday}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>বিজ্ঞাপন শুরু করেছি (আজ থেকে ট্র্যাক করুন)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 px-3 rounded-2xl border border-teal-500/30">
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    বর্তমানে দিন {useBengaliDigits ? toBengaliDigits(currentCampaignDay) : currentCampaignDay}-এ আছেন
                  </span>
                </span>
                <button
                  type="button"
                  onClick={resetCampaignCycle}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                  title="নতুন সাইকেল শুরু করুন"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Day-by-Day Timeline Ribbon */}
        <div className="pt-2 border-t border-teal-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {SEVEN_DAY_LAUNCH_PLAN.map((plan) => {
            const isSelected = selectedDayNumber === plan.dayNumber;
            const isDone = completedLaunchDays.includes(plan.dayNumber);
            const isToday = campaignStartDate !== null && currentCampaignDay === plan.dayNumber;
            const dayNum = useBengaliDigits ? toBengaliDigits(plan.dayNumber) : plan.dayNumber;

            return (
              <button
                key={plan.dayNumber}
                onClick={() => setSelectedDayNumber(plan.dayNumber)}
                className={`flex-1 min-w-[76px] py-2.5 px-2 rounded-2xl text-xs font-bold transition-all text-center flex-shrink-0 relative ${
                  isSelected
                    ? 'bg-teal-400 text-slate-950 shadow-md scale-102 font-extrabold'
                    : isToday
                    ? 'bg-teal-900/90 text-teal-200 border-2 border-teal-400'
                    : isDone
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {isToday && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.2 bg-teal-300 text-slate-950 font-black rounded-full shadow-xs uppercase tracking-tighter">
                    আজ
                  </span>
                )}
                <div className="text-[10px] opacity-80">দিন</div>
                <div className="text-sm font-black flex items-center justify-center gap-1">
                  <span>{dayNum}</span>
                  {isDone && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4-PART ACTIVE DAY CARD */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 animate-slide-up">
        {/* Day Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {selectedPlan.day} • {selectedPlan.tag}
              </span>
              {isSelectedDayToday && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-600 text-white animate-pulse">
                  আজকের দিন
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {selectedPlan.title}
            </h3>
          </div>

          {/* "আমার বিজ্ঞাপনে সমস্যা" Quick Help Button */}
          <button
            type="button"
            onClick={() => setShowTroubleModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-colors self-start sm:self-auto"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>আমার বিজ্ঞাপনে সমস্যা?</span>
          </button>
        </div>

        {/* 1. আজকের কাজ (Today's Actions) */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            (১) আজকের কাজ (Today&rsquo;s Actions):
          </h4>
          <div className="space-y-2">
            {selectedPlan.todayActions.map((action, i) => (
              <div
                key={i}
                className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5 font-medium leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {useBengaliDigits ? toBengaliDigits(i + 1) : i + 1}
                </span>
                <p className="flex-1 text-emerald-950">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. আজ যা করবেন না (Common Mistake to Avoid) */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-rose-600" />
            (২) আজ যা একদমই করবেন না (ভুল এড়িয়ে চলুন):
          </h4>
          <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
            {selectedPlan.whatNotToDo}
          </div>
        </div>

        {/* 3. কী দেখবেন (Metrics to Watch) */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-indigo-600" />
            (৩) কী দেখবেন (১-২টি গুরুত্বপূর্ণ সংখ্যা):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedPlan.metricsToWatch.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-xs sm:text-sm"
              >
                <span className="text-xs text-slate-500 font-bold block">{metric.name}:</span>
                <p className="text-sm font-extrabold text-slate-900">{metric.target}</p>
                <p className="text-[11px] text-slate-600 pt-0.5 leading-relaxed">{metric.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Rule for the day */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-1">
          <p className="font-extrabold text-amber-900 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            আজকের গোল্ডেন রুল:
          </p>
          <p className="leading-relaxed font-medium">{selectedPlan.goldenRule}</p>
        </div>

        {/* 4. "আজকের কাজ শেষ" Interactive Tick Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => toggleLaunchDayCompleted(selectedDayNumber)}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-98 ${
              isSelectedDayDone
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
            }`}
          >
            {isSelectedDayDone ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>দিন {useBengaliDigits ? toBengaliDigits(selectedDayNumber) : selectedDayNumber}-এর কাজ সম্পন্ন হয়েছে ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-5 h-5 text-slate-400" />
                <span>আজকের কাজগুলো শেষ হলে এখানে চাপ দিয়ে &ldquo;কাজ শেষ&rdquo; চিহ্নিত করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DAY 7 WEEKLY REVIEW SCREEN (SPECIAL CALCULATOR & VERDICT) */}
      {/* ========================================================================= */}
      {selectedDayNumber === 7 && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-5 animate-slide-up">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calculator className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                ৭ম দিন: সাপ্তাহিক লাভ-ক্ষতি রিভিউ ক্যালকুলেটর
              </h3>
              <p className="text-xs text-slate-400">৭ দিনের আসল সংখ্যা বসিয়ে নিট লাভ যাচাই করুন</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-900">
            {/* Total Spend */}
            <div className="bg-white p-3.5 rounded-2xl space-y-1">
              <label className="font-bold text-slate-700 block">১. বিজ্ঞাপনে মোট খরচ (৳):</label>
              <input
                type="number"
                value={weeklyReviewData.totalSpend || ''}
                onChange={(e) =>
                  setWeeklyReviewData({ ...weeklyReviewData, totalSpend: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                placeholder="যেমন: ৩৫০০"
              />
            </div>

            {/* Total Messages/Orders */}
            <div className="bg-white p-3.5 rounded-2xl space-y-1">
              <label className="font-bold text-slate-700 block">২. মোট মেসেজ বা অর্ডার সংখ্যা:</label>
              <input
                type="number"
                value={weeklyReviewData.totalMessagesOrOrders || ''}
                onChange={(e) =>
                  setWeeklyReviewData({
                    ...weeklyReviewData,
                    totalMessagesOrOrders: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                placeholder="যেমন: ২৮"
              />
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-3.5 rounded-2xl space-y-1">
              <label className="font-bold text-slate-700 block">৩. মোট বিক্রয় বা আয় (Revenue ৳):</label>
              <input
                type="number"
                value={weeklyReviewData.totalRevenue || ''}
                onChange={(e) =>
                  setWeeklyReviewData({ ...weeklyReviewData, totalRevenue: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                placeholder="যেমন: ৫১৮০০"
              />
            </div>

            {/* Product Costs Total */}
            <div className="bg-white p-3.5 rounded-2xl space-y-1">
              <label className="font-bold text-slate-700 block">৪. পণ্যের ক্রয়/তৈরি খরচ (৳):</label>
              <input
                type="number"
                value={weeklyReviewData.productCostTotal || ''}
                onChange={(e) =>
                  setWeeklyReviewData({
                    ...weeklyReviewData,
                    productCostTotal: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                placeholder="যেমন: ৩০৮০০"
              />
            </div>
          </div>

          {/* Live Net Profit Summary */}
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">সাপ্তাহিক নিট মুনাফা (Net Profit):</span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  netProfit > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                }`}
              >
                {netProfit > 0 ? '🟢 লাভে আছেন' : '🔴 লোকসান হচ্ছে'}
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-black text-emerald-400">
              {formatBDT(netProfit, useBengaliDigits)}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              {netProfit > 0 ? (
                <span>
                  🎉 <strong>পরবর্তী ৭ দিনের সিদ্ধান্ত:</strong> আপনার ক্যাম্পেইনটি সফল! আগামী সপ্তাহের জন্য দৈনিক বাজেট ২০-৩০% বাড়িয়ে স্কেল করুন এবং নতুন আরও একটি ক্রিয়েটিভ দিয়ে টেস্টিং চালু রাখুন।
                </span>
              ) : (
                <span>
                  ⚠️ <strong>পরবর্তী ৭ দিনের সিদ্ধান্ত:</strong> বিজ্ঞাপনের চেয়ে পণ্যের কেনা দাম বা প্রতি অর্ডারের খরচ বেশি পড়ছে। বিজ্ঞাপন পজ করে আকর্ষণীয় অফার বা নতুন রিভিউ ভিডিও দিয়ে পুনরায় শুরু করুন।
                </span>
              )}
            </p>

            {/* Restart Cycle Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={resetCampaignCycle}
                className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>গত সপ্তাহের শিক্ষা কাজে লাগিয়ে নতুন ৭ দিনের সাইকেল শুরু করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK HELP MODAL FOR "আমার বিজ্ঞাপনে সমস্যা" */}
      {/* ========================================================================= */}
      {showTroubleModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  চলমান বিজ্ঞাপনের সাধারণ সমস্যা ও তাৎক্ষণিক সমাধান
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTroubleModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {LAUNCH_QUICK_HELP.map((item) => {
                const isOpen = activeTroubleId === item.id;

                return (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTroubleId(isOpen ? null : item.id)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100"
                    >
                      <span>{item.title}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-1 bg-white border-t border-slate-200 space-y-2 text-xs text-slate-700 leading-relaxed">
                        <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-rose-950">
                          <strong>সমস্যার কারণ: </strong>
                          {item.causeBangla}
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="font-bold text-emerald-800">কীভাবে ঠিক করবেন:</p>
                          {item.solutionBangla.map((sol, idx) => (
                            <p key={idx} className="text-slate-800">
                              {sol}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTroubleModal(false)}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                বুঝেছি, বন্ধ করুন 👍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
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
          className="flex-[2] py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <span>রেজাল্ট ডক্টরে ফলাফল মাপুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
