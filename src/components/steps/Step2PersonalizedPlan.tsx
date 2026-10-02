'use client';

import React, { useState } from 'react';
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
  Copy,
  Check,
  Zap,
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

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Executive Strategy Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>স্মার্ট এআই ও মার্কেট ডেটা অ্যালগরিদম</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            {profile.productName || 'আপনার পণ্য'}-এর এজেন্সি অ্যাড স্ট্র্যাটেজি
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            আপনার মুনাফার মার্জিন এবং বাংলাদেশের সক্রিয় অনলাইন ক্রেতাদের আচরণ বিশ্লেষণ করে এই কাস্টম ক্যাম্পেইন গাইড তৈরি করা হয়েছে।
          </p>
        </div>
      </div>

      {/* Break-Even CPA & Safe Profit Guard */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  নিরাপদ লাভ ও ব্রেক-ইভেন টার্গেট
                </h3>
                <JargonBadge id="breakeven_cpa" label="CPA কি?" />
              </div>
              <p className="text-xs text-slate-500">লোকসান এড়াতে প্রতি অর্ডারে সর্বোচ্চ খরচের সীমা</p>
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full self-start sm:self-auto">
            মুনাফা মার্জিন: {useBengaliDigits ? toBengaliDigits(calculatedPlan.profitMarginPercent) : calculatedPlan.profitMarginPercent}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
            <p className="text-xs font-medium text-slate-500">বিক্রয় মূল্য:</p>
            <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {formatBDT(calculatedPlan.sellingPrice, useBengaliDigits)}
            </p>
          </div>
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            <p className="text-xs font-medium text-emerald-800">প্রতি সেলে নিট লাভ:</p>
            <p className="text-lg sm:text-xl font-black text-emerald-700 mt-0.5">
              {formatBDT(calculatedPlan.profitPerUnit, useBengaliDigits)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
            <p className="text-xs font-medium text-amber-800">সর্বোচ্চ অনুমোদিত খরচ:</p>
            <p className="text-lg sm:text-xl font-black text-amber-900 mt-0.5">
              {formatBDT(calculatedPlan.breakEvenCPA, useBengaliDigits)} <span className="text-xs font-normal">/অর্ডার</span>
            </p>
          </div>
        </div>

        <div className="bg-emerald-950/90 text-emerald-100 p-4 rounded-2xl border border-emerald-800/80 text-xs leading-relaxed flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            🎯 <strong>গোল্ডেন রুল:</strong> প্রতিটি অর্ডার নিশ্চিত করতে বিজ্ঞাপনে যদি{' '}
            <strong className="text-emerald-300 font-black">
              {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.4), useBengaliDigits)} -{' '}
              {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.6), useBengaliDigits)}
            </strong>{' '}
            টাকা খরচ হয়, তবে বিজ্ঞাপন বন্ধ করবেন না—এটি খুবই লাভজনক অবস্থান।
          </p>
        </div>
      </div>

      {/* Platform Allocation & Campaign Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Recommended Platform Mix */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">প্ল্যাটফর্ম ও বাজেট বণ্টন</h3>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-800">Meta (ফেসবুক ও ইনস্টাগ্রাম)</span>
                <span className="text-indigo-600">
                  {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.metaShare) : calculatedPlan.platformMix.metaShare}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="bg-indigo-600 h-full transition-all duration-700"
                  style={{ width: `${calculatedPlan.platformMix.metaShare}%` }}
                />
                <div
                  className="bg-pink-500 h-full transition-all duration-700"
                  style={{ width: `${calculatedPlan.platformMix.tiktokShare}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>ফেসবুক ও ইনস্টা চ্যাট</span>
                <span>
                  টিকটক: {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.tiktokShare) : calculatedPlan.platformMix.tiktokShare}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed mt-3">
            {calculatedPlan.platformMix.description}
          </p>
        </div>

        {/* Campaign Objective */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">ক্যাম্পেইন অবজেক্টিভ (Goal)</h3>
            </div>

            <div className="bg-teal-50/80 border border-teal-200/80 p-3.5 rounded-2xl">
              <span className="text-[11px] text-teal-800 font-bold uppercase tracking-wider block">সুপারিশকৃত গোল:</span>
              <p className="text-base font-black text-teal-950 mt-0.5">
                {calculatedPlan.campaignObjective.name}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-3">
            {calculatedPlan.campaignObjective.whyThis}
          </p>
        </div>
      </div>

      {/* Daily Budget & Duration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">দৈনিক বাজেট ও আদর্শ সময়কাল</h3>
              <p className="text-xs text-slate-500">অ্যাড ম্যানেজারে কত বাজেট সেট করবেন</p>
            </div>
          </div>
          <JargonBadge id="cpm" label="CPM ব্যাখ্যা" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500">প্রস্তাবিত দৈনিক বাজেট:</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {formatBDT(calculatedPlan.recommendedDailyBudget, useBengaliDigits)}
              <span className="text-xs font-normal text-slate-500 ml-1">/প্রতিদিন</span>
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              (আন্তর্জাতিক স্ট্যান্ডার্ডে প্রায় ${Math.round(calculatedPlan.recommendedDailyBudget / 120)} ডলার)
            </p>
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500">ক্যাম্পেইনের টেস্ট সময়সীমা:</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {useBengaliDigits
                ? toBengaliDigits(calculatedPlan.recommendedDurationDays)
                : calculatedPlan.recommendedDurationDays}{' '}
              দিন
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              (প্রথম ৩ দিন অ্যালগরিদম লার্নিং ফেজে থাকে, কোনো এডিট করবেন না)
            </p>
          </div>
        </div>
      </div>

      {/* Audience Targeting Blueprint */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">অডিয়েন্স টার্গেটিং ব্লু-প্রিন্ট</h3>
              <p className="text-xs text-slate-500">অ্যাড ম্যানেজারে কপি-পেস্ট করার জন্য প্রস্তুত</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyInterests}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-black transition-all active:scale-95"
          >
            {copiedInterests ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedInterests ? 'কপি হয়েছে!' : 'সব কি-ওয়ার্ড কপি'}</span>
          </button>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-extrabold text-slate-700">লোকেশন (Location): </span>
              <span className="text-slate-900 font-medium">{calculatedPlan.targetingRecommendation.locations}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <Clock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-extrabold text-slate-700">বয়স ও জেন্ডার (Age & Gender): </span>
              <span className="text-slate-900 font-medium">
                {calculatedPlan.targetingRecommendation.ageRange} • {calculatedPlan.targetingRecommendation.gender}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2.5">
            <span className="font-extrabold text-slate-700 block">
              প্রস্তাবিত ইন্টারেস্ট কি-ওয়ার্ড (Detailed Targeting):
            </span>
            <div className="flex flex-wrap gap-2">
              {calculatedPlan.targetingRecommendation.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
                >
                  +{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Realistic What to Expect Range */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="font-black text-sm sm:text-base text-white">
              বাস্তবধর্মী সম্ভাব্য ফলাফল (What to Expect)
            </h3>
          </div>
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            মার্কেট বেঞ্চমার্ক
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-medium">সম্ভাব্য রিচ</span>
              <JargonBadge id="reach" label="রিচ" />
            </div>
            <p className="text-base font-black text-white mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minReach)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxReach)}`
                : `${calculatedPlan.expectedEstimates.minReach} - ${calculatedPlan.expectedEstimates.maxReach}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-medium">ক্লিক সংখ্যা</span>
              <JargonBadge id="ctr" label="CTR" />
            </div>
            <p className="text-base font-black text-emerald-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minClicks)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxClicks)}`
                : `${calculatedPlan.expectedEstimates.minClicks} - ${calculatedPlan.expectedEstimates.maxClicks}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 font-medium">সম্ভাব্য মেসেজ/চ্যাট</span>
            <p className="text-base font-black text-teal-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minConversations)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxConversations)}`
                : `${calculatedPlan.expectedEstimates.minConversations} - ${calculatedPlan.expectedEstimates.maxConversations}`}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 font-medium">আনুমানিক সেলস</span>
            <p className="text-base font-black text-amber-300 mt-1">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMinSales)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMaxSales)} টি`
                : `${calculatedPlan.expectedEstimates.estimatedMinSales} - ${calculatedPlan.expectedEstimates.estimatedMaxSales} টি`}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-slate-300 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>সতর্কবার্তা:</strong> এই অনুমানসমূহ বাংলাদেশের সফল ই-কমার্স বিজ্ঞাপনগুলোর গড় মেট্রিক্স। আসল বিক্রির পরিমাণ আপনার পণ্যের ছবি/ভিডিওর মান, কাস্টমারদের প্রশ্নের দ্রুত উত্তর এবং অফারের আকর্ষণের ওপর নির্ভরশীল।
          </p>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <span>সেটআপ গাইড দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
