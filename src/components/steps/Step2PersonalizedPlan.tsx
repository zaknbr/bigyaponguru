'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { formatBDT, toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  PieChart,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Target,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export function Step2PersonalizedPlan() {
  const { calculatedPlan, profile, setCurrentStep, useBengaliDigits } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>আপনার ব্যবসার জন্য পারসোনালাইজড প্ল্যান</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {profile.productName || 'আপনার পণ্য'}-এর জন্য অ্যাড স্ট্র্যাটেজি
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            আপনার মুনাফার মার্জিন এবং বাংলাদেশের ই-কমার্স মার্কেটের তথ্য বিশ্লেষণ করে এই এজেন্সী-লেভেল গাইড তৈরি করা হয়েছে।
          </p>
        </div>
      </div>

      {/* Break-Even CPA & Profit Guard Card */}
      <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-emerald-950">
                  নিরাপদ লাভ ও ব্রেক-ইভেন টার্গেট
                </h3>
                <JargonBadge id="breakeven_cpa" label="CPA কি?" />
              </div>
              <p className="text-xs text-emerald-800">লোকসান এড়াতে সর্বোচ্চ অনুমোদিত খরচ</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-white text-emerald-800 border border-emerald-300 rounded-full shadow-sm">
            মার্জিন: {useBengaliDigits ? toBengaliDigits(calculatedPlan.profitMarginPercent) : calculatedPlan.profitMarginPercent}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs text-slate-500">বিক্রয় মূল্য:</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {formatBDT(calculatedPlan.sellingPrice, useBengaliDigits)}
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-xs text-slate-500">প্রতিটিতে লাভ:</p>
            <p className="text-base font-bold text-emerald-700 mt-0.5">
              {formatBDT(calculatedPlan.profitPerUnit, useBengaliDigits)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm">
            <p className="text-xs text-amber-800 font-medium">সর্বোচ্চ খরচ সীমা:</p>
            <p className="text-base font-bold text-amber-900 mt-0.5">
              {formatBDT(calculatedPlan.breakEvenCPA, useBengaliDigits)}/অর্ডার
            </p>
          </div>
        </div>

        <p className="text-xs text-emerald-900 bg-white/80 p-3 rounded-xl border border-emerald-200/80 leading-relaxed">
          🎯 <strong>গোল্ডেন রুল:</strong> প্রতিটি অর্ডার পেতে বিজ্ঞাপনে যদি{' '}
          <strong className="text-emerald-700">
            {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.4), useBengaliDigits)} -{' '}
            {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.6), useBengaliDigits)}
          </strong>{' '}
          টাকা খরচ হয়, তবে আপনি চমৎকার নিট মুনাফায় থাকবেন।
        </p>
      </div>

      {/* Platform & Objective Recommendation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Recommended Platform Mix */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">প্ল্যাটফর্ম শেয়ার ও বাজেট বণ্টন</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Meta (ফেসবুক ও ইনস্টাগ্রাম)</span>
              <span className="text-indigo-600">
                {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.metaShare) : calculatedPlan.platformMix.metaShare}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
              <div
                className="bg-indigo-600 h-full transition-all"
                style={{ width: `${calculatedPlan.platformMix.metaShare}%` }}
              />
              <div
                className="bg-pink-500 h-full transition-all"
                style={{ width: `${calculatedPlan.platformMix.tiktokShare}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>ফেসবুক ও ইনস্টাগ্রাম চ্যাট</span>
              <span>
                টিকটক: {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.tiktokShare) : calculatedPlan.platformMix.tiktokShare}%
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
            {calculatedPlan.platformMix.description}
          </p>
        </div>

        {/* Campaign Objective */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">ক্যাম্পেইন অবজেক্টিভ</h3>
          </div>

          <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl">
            <p className="text-xs text-teal-800 font-bold">সুপারিশকৃত গোল:</p>
            <p className="text-sm font-extrabold text-teal-950 mt-0.5">
              {calculatedPlan.campaignObjective.name}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {calculatedPlan.campaignObjective.whyThis}
          </p>
        </div>
      </div>

      {/* Daily Budget & Duration */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">দৈনিক বাজেট ও সময়সীমা</h3>
              <p className="text-xs text-slate-500">কত টাকা ও কত দিন চালাবেন</p>
            </div>
          </div>
          <JargonBadge id="cpm" label="CPM ব্যাখ্যা" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-xs text-slate-500">প্রস্তাবিত দৈনিক বাজেট:</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatBDT(calculatedPlan.recommendedDailyBudget, useBengaliDigits)}
              <span className="text-xs font-normal text-slate-500">/প্রতিদিন</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              (আন্তর্জাতিক মান অনুযায়ী প্রায় ${Math.round(calculatedPlan.recommendedDailyBudget / 120)} ডলার)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-xs text-slate-500">ক্যাম্পেইনের আদর্শ সময়কাল:</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {useBengaliDigits
                ? toBengaliDigits(calculatedPlan.recommendedDurationDays)
                : calculatedPlan.recommendedDurationDays}{' '}
              দিন
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              (একটানা অন্তত ৫ দিন না চালালে লার্নিং সম্পন্ন হয় না)
            </p>
          </div>
        </div>
      </div>

      {/* Audience Targeting Blueprint */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">অডিয়েন্স টার্গেটিং ব্লু-প্রিন্ট</h3>
            <p className="text-xs text-slate-500">অ্যাড ম্যানেজারে যা যা সিলেক্ট করবেন</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-700">লোকেশন (Location): </span>
              <span className="text-slate-900">{calculatedPlan.targetingRecommendation.locations}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-700">বয়স ও জেন্ডার (Age & Gender): </span>
              <span className="text-slate-900">
                {calculatedPlan.targetingRecommendation.ageRange} • {calculatedPlan.targetingRecommendation.gender}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-slate-700 block">
              প্রস্তাবিত ইন্টারেস্ট কি-ওয়ার্ড (Detailed Targeting):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {calculatedPlan.targetingRecommendation.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-xs"
                >
                  +{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Honest What to Expect Range */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              বাস্তবধর্মী সম্ভাব্য ফলাফল (What to Expect)
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            সতর্ক অনুমান
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400">সম্ভাব্য রিচ</span>
              <JargonBadge id="reach" label="রিচ" />
            </div>
            <p className="text-base font-bold text-white mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minReach)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxReach)}`
                : `${calculatedPlan.expectedEstimates.minReach} - ${calculatedPlan.expectedEstimates.maxReach}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400">ক্লিক সংখ্যা</span>
              <JargonBadge id="ctr" label="CTR" />
            </div>
            <p className="text-base font-bold text-emerald-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minClicks)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxClicks)}`
                : `${calculatedPlan.expectedEstimates.minClicks} - ${calculatedPlan.expectedEstimates.maxClicks}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <span className="text-xs text-slate-400">সম্ভাব্য মেসেজ/চ্যাট</span>
            <p className="text-base font-bold text-teal-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minConversations)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxConversations)}`
                : `${calculatedPlan.expectedEstimates.minConversations} - ${calculatedPlan.expectedEstimates.maxConversations}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <span className="text-xs text-slate-400">আনুমানিক সেলস</span>
            <p className="text-base font-bold text-amber-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMinSales)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMaxSales)} টি`
                : `${calculatedPlan.expectedEstimates.estimatedMinSales} - ${calculatedPlan.expectedEstimates.estimatedMaxSales} টি`}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700 text-slate-300 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>সতর্কবার্তা:</strong> এই অনুমানসমূহ বাংলাদেশের গড় মার্কেট বেঞ্চমার্কের ভিত্তিতে তৈরি। প্রকৃত ফলাফল পণ্যের ছবি/ভিডিওর আকর্ষণ, পণ্যের চাহিদা এবং মেসেঞ্জারে আপনার গ্রাহকসেবার গতির ওপর নির্ভর করে পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে যান</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-[2] py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <span>সেটআপ চেকলিস্টে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
