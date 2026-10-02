'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { formatBDT, toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  TrendingUp,
  Target,
  Sparkles,
  Users,
  MousePointerClick,
  MessageSquare,
  ShoppingBag,
} from 'lucide-react';

export function Step2PersonalizedPlan() {
  const { calculatedPlan, profile, setCurrentStep, useBengaliDigits } = useApp();
  const [copiedInterests, setCopiedInterests] = useState(false);

  const handleCopyInterests = () => {
    const text = calculatedPlan.targetingRecommendation.interests.join(', ');
    navigator.clipboard.writeText(text);
    setCopiedInterests(true);
    setTimeout(() => setCopiedInterests(false), 2000);
  };

  const sellingPrice = calculatedPlan.sellingPrice;
  const profitPerUnit = calculatedPlan.profitPerUnit;
  const breakEvenCPA = calculatedPlan.breakEvenCPA;
  const targetSafeCPA = Math.round(profitPerUnit * 0.45);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Glassmorphic Header */}
      <div className="glass-card p-6 rounded-3xl space-y-2 border-emerald-500/20 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            আপনার বিজনেসের এআই প্ল্যান
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {profile.productName || 'আপনার পণ্য'}-এর জন্য অ্যাড স্ট্র্যাটেজি
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          আপনার প্রোডাক্টের লাভ-মার্জিন ও বাংলাদেশি অডিয়েন্স বিহেভিয়ার বিশ্লেষণ করে এই ব্লুপ্রিন্টটি সাজানো হয়েছে।
        </p>
      </div>

      {/* Break-Even & Safe Zone Interactive Speedometer Gauge */}
      <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              ব্রেক-ইভেন ও বিজ্ঞাপন খরচের নিরাপদ সীমা (CPA Meter)
            </h3>
            <JargonBadge id="breakeven_cpa" label="CPA কি?" />
          </div>
          <span className="self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            মার্জিন: {useBengaliDigits ? toBengaliDigits(calculatedPlan.profitMarginPercent) : calculatedPlan.profitMarginPercent}%
          </span>
        </div>

        {/* 3 Metric Glass Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">বিক্রয় মূল্য</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {formatBDT(sellingPrice, useBengaliDigits)}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">প্রতি সেলে মোট লাভ</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {formatBDT(profitPerUnit, useBengaliDigits)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 shadow-xs">
            <p className="text-xs text-emerald-800 font-semibold">ব্রেক-ইভেন সর্বোচ্চ সীমা</p>
            <p className="text-lg sm:text-xl font-extrabold text-emerald-900 mt-1">
              {formatBDT(breakEvenCPA, useBengaliDigits)} <span className="text-xs font-normal">/অর্ডার</span>
            </p>
          </div>
        </div>

        {/* Visual CPA Target Safety Zone Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-700">🟢 নিরাপদ জোন: ৳০ - {formatBDT(targetSafeCPA, useBengaliDigits)}</span>
            <span className="text-amber-700">🟡 সহনশীল জোন: ৳{formatBDT(targetSafeCPA, useBengaliDigits)} - {formatBDT(breakEvenCPA, useBengaliDigits)}</span>
            <span className="text-rose-600">🔴 লোকসান জোন: &gt; ৳{formatBDT(breakEvenCPA, useBengaliDigits)}</span>
          </div>

          <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden flex gap-1 p-0.5 shadow-inner">
            <div style={{ width: '45%' }} className="bg-emerald-500 h-full rounded-l-full" title="হাই প্রফিট জোন" />
            <div style={{ width: '35%' }} className="bg-amber-400 h-full" title="নো লস নো প্রফিট জোন" />
            <div style={{ width: '20%' }} className="bg-rose-400 h-full rounded-r-full" title="লোকসান জোন" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
          <p>
            🎯 <strong>টার্গেট রাখুন:</strong> প্রতিটি সফল বিক্রয়ে বিজ্ঞাপনে খরচ{' '}
            <strong className="text-emerald-800 font-extrabold">{formatBDT(Math.round(profitPerUnit * 0.35), useBengaliDigits)} - {formatBDT(targetSafeCPA, useBengaliDigits)} টাকার মধ্যে</strong>{' '}
            থাকলে আপনার ব্যাবসায় সর্বোচ্চ নিট লাভ থাকবে।
          </p>
        </div>
      </div>

      {/* 2026 Interactive Marketing Funnel Graph */}
      <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              বিজ্ঞাপনের রূপান্তর ফানেল (Funnel Forecast Graph)
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800">
            মার্কেট প্রেডিকশন
          </span>
        </div>

        {/* Funnel Step Bars with Interactive Visual Connections */}
        <div className="space-y-3">
          {/* Step 1: Reach */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-white border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">১. বিজ্ঞাপন পৌঁছাবে (Reach)</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {useBengaliDigits
                    ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minReach)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxReach)} জন`
                    : `${calculatedPlan.expectedEstimates.minReach} - ${calculatedPlan.expectedEstimates.maxReach} people`}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded-lg">১০০% ভিউ</span>
          </div>

          {/* Step 2: Clicks */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-white border border-indigo-100 flex items-center justify-between ml-2 sm:ml-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                <MousePointerClick className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">২. বিজ্ঞাপনে ক্লিক করবে (Clicks)</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {useBengaliDigits
                    ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minClicks)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxClicks)} জন`
                    : `${calculatedPlan.expectedEstimates.minClicks} - ${calculatedPlan.expectedEstimates.maxClicks} clicks`}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-100/60 px-2.5 py-1 rounded-lg">~২-৩% CTR</span>
          </div>

          {/* Step 3: Messages */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50/80 to-white border border-purple-100 flex items-center justify-between ml-4 sm:ml-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">৩. ইনবক্স বা মেসেজ পাঠাবে (Inquiries)</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {useBengaliDigits
                    ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minConversations)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxConversations)} জন`
                    : `${calculatedPlan.expectedEstimates.minConversations} - ${calculatedPlan.expectedEstimates.maxConversations} messages`}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-100/60 px-2.5 py-1 rounded-lg">~১৫-২০% মেসেজ</span>
          </div>

          {/* Step 4: Sales */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-white border-2 border-emerald-500/40 flex items-center justify-between ml-6 sm:ml-12 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-800">৪. সফল অর্ডার/বিক্রি (Expected Orders)</p>
                <p className="text-base sm:text-xl font-extrabold text-emerald-950">
                  {useBengaliDigits
                    ? `${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMinSales)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMaxSales)} টি সেলস`
                    : `${calculatedPlan.expectedEstimates.estimatedMinSales} - ${calculatedPlan.expectedEstimates.estimatedMaxSales} sales`}
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
              চূড়ান্ত কনভার্সন
            </span>
          </div>
        </div>
      </div>

      {/* Platform Allocation & Recommended Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Platform Share */}
        <div className="glass-card p-5 rounded-3xl space-y-3">
          <h3 className="font-bold text-slate-900 text-base">প্ল্যাটফর্ম ও বাজেট বিভাজন</h3>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-indigo-700">Meta (ফেসবুক ও ইনস্টাগ্রাম)</span>
              <span className="text-slate-900">
                {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.metaShare) : calculatedPlan.platformMix.metaShare}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner p-0.5">
              <div
                className="bg-indigo-600 h-full rounded-l-full transition-all duration-500"
                style={{ width: `${calculatedPlan.platformMix.metaShare}%` }}
              />
              <div
                className="bg-pink-500 h-full rounded-r-full transition-all duration-500"
                style={{ width: `${calculatedPlan.platformMix.tiktokShare}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>ফেসবুক ও ইনস্টাগ্রাম ফিড</span>
              <span>
                টিকটক: {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.tiktokShare) : calculatedPlan.platformMix.tiktokShare}%
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {calculatedPlan.platformMix.description}
          </p>
        </div>

        {/* Campaign Objective */}
        <div className="glass-card p-5 rounded-3xl space-y-3">
          <h3 className="font-bold text-slate-900 text-base">বিজ্ঞাপনের মূল অবজেক্টিভ (Goal)</h3>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">অ্যাডস ম্যানেজারে যা নির্বাচন করবেন:</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {calculatedPlan.campaignObjective.name}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {calculatedPlan.campaignObjective.whyThis}
          </p>
        </div>
      </div>

      {/* Daily Budget & Duration */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">দৈনিক প্রস্তাবিত বাজেট ও সময়কাল</h3>
          <JargonBadge id="cpm" label="CPM ব্যাখ্যা" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">দৈনিক বাজেট:</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatBDT(calculatedPlan.recommendedDailyBudget, useBengaliDigits)}
              <span className="text-xs font-normal text-slate-500 ml-1.5">/প্রতিদিন</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">প্রথম ধাপের সময়কাল:</span>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">
              {useBengaliDigits
                ? toBengaliDigits(calculatedPlan.recommendedDurationDays)
                : calculatedPlan.recommendedDurationDays}{' '}
              দিন
            </p>
          </div>
        </div>
      </div>

      {/* Audience Targeting Blueprint */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">টার্গেটিং ব্লুপ্রিন্ট (Detailed Targeting)</h3>
          <button
            type="button"
            onClick={handleCopyInterests}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            {copiedInterests ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedInterests ? 'কপি সফল!' : 'সব কি-ওয়ার্ড কপি'}</span>
          </button>
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <span className="font-semibold text-slate-600">টার্গেট লোকেশন: </span>
            <span className="text-slate-900 font-bold">{calculatedPlan.targetingRecommendation.locations}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <span className="font-semibold text-slate-600">বয়স ও জেন্ডার: </span>
            <span className="text-slate-900 font-bold">
              {calculatedPlan.targetingRecommendation.ageRange} • {calculatedPlan.targetingRecommendation.gender}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="font-semibold text-slate-700 block">
              অ্যাড সেটে যোগ করার জন্য সেরা ইন্টারেস্ট কি-ওয়ার্ড:
            </span>
            <div className="flex flex-wrap gap-2">
              {calculatedPlan.targetingRecommendation.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  +{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <span>সেটআপ গাইড শুরু করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
