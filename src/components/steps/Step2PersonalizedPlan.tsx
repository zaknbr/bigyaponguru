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
      {/* Calm Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            ব্যক্তিগত বিজ্ঞাপন কৌশল
          </span>
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 pt-1">
          {profile.productName || 'আপনার পণ্য'}-এর জন্য প্রস্তাবিত অ্যাড প্ল্যান
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার লাভের মার্জিন ও স্থানীয় ই-কমার্স মার্কেট ডেটা অনুযায়ী এই প্ল্যানটি তৈরি করা হয়েছে।
        </p>
      </div>

      {/* Break-Even CPA Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900">
              ব্রেক-ইভেন ও নিরাপদ লাভের হিসাব
            </h3>
            <JargonBadge id="breakeven_cpa" label="CPA কি?" />
          </div>
          <span className="text-xs font-medium text-slate-500">
            মার্জিন: {useBengaliDigits ? toBengaliDigits(calculatedPlan.profitMarginPercent) : calculatedPlan.profitMarginPercent}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500">বিক্রয় মূল্য</p>
            <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {formatBDT(calculatedPlan.sellingPrice, useBengaliDigits)}
            </p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500">প্রতি সেলে লাভ</p>
            <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {formatBDT(calculatedPlan.profitPerUnit, useBengaliDigits)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-800">সর্বোচ্চ অনুমোদিত খরচ</p>
            <p className="text-base sm:text-lg font-bold text-emerald-800 mt-0.5">
              {formatBDT(calculatedPlan.breakEvenCPA, useBengaliDigits)} <span className="text-xs font-normal">/অর্ডার</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
          🎯 <strong>পরামর্শ:</strong> প্রতি অর্ডারে বিজ্ঞাপনে যদি{' '}
          <span className="font-semibold text-slate-900">
            {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.4), useBengaliDigits)} -{' '}
            {formatBDT(Math.round(calculatedPlan.profitPerUnit * 0.6), useBengaliDigits)}
          </span>{' '}
          টাকা খরচ হয়, তবে আপনি চমৎকার নিট মুনাফায় থাকবেন।
        </p>
      </div>

      {/* Platform & Objective Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Platform Share */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-semibold text-slate-900 text-sm">প্ল্যাটফর্ম ও বাজেট বণ্টন</h3>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Meta (ফেসবুক ও ইনস্টাগ্রাম)</span>
              <span className="font-semibold text-slate-900">
                {useBengaliDigits ? toBengaliDigits(calculatedPlan.platformMix.metaShare) : calculatedPlan.platformMix.metaShare}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-indigo-600 h-full"
                style={{ width: `${calculatedPlan.platformMix.metaShare}%` }}
              />
              <div
                className="bg-pink-500 h-full"
                style={{ width: `${calculatedPlan.platformMix.tiktokShare}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>ফেসবুক ও ইনস্টাগ্রাম</span>
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
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-semibold text-slate-900 text-sm">ক্যাম্পেইন অবজেক্টিভ (Goal)</h3>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium block">প্রস্তাবিত গোল:</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">
              {calculatedPlan.campaignObjective.name}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {calculatedPlan.campaignObjective.whyThis}
          </p>
        </div>
      </div>

      {/* Daily Budget & Duration */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">দৈনিক বাজেট ও সময়সীমা</h3>
          <JargonBadge id="cpm" label="CPM ব্যাখ্যা" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">প্রস্তাবিত দৈনিক বাজেট:</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {formatBDT(calculatedPlan.recommendedDailyBudget, useBengaliDigits)}
              <span className="text-xs font-normal text-slate-500 ml-1">/প্রতিদিন</span>
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">ক্যাম্পেইনের সময়কাল:</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {useBengaliDigits
                ? toBengaliDigits(calculatedPlan.recommendedDurationDays)
                : calculatedPlan.recommendedDurationDays}{' '}
              দিন
            </p>
          </div>
        </div>
      </div>

      {/* Audience Blueprint */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">অডিয়েন্স টার্গেটিং নির্দেশিকা</h3>
          <button
            type="button"
            onClick={handleCopyInterests}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            {copiedInterests ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedInterests ? 'কপি হয়েছে' : 'কি-ওয়ার্ড কপি'}</span>
          </button>
        </div>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-medium text-slate-600">লোকেশন: </span>
            <span className="text-slate-900">{calculatedPlan.targetingRecommendation.locations}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-medium text-slate-600">বয়স ও জেন্ডার: </span>
            <span className="text-slate-900">
              {calculatedPlan.targetingRecommendation.ageRange} • {calculatedPlan.targetingRecommendation.gender}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-medium text-slate-600 block">
              প্রস্তাবিত ইন্টারেস্ট কি-ওয়ার্ড:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {calculatedPlan.targetingRecommendation.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                >
                  +{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Estimates */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">
            সম্ভাব্য ফলাফল (আনুমানিক)
          </h3>
          <span className="text-[11px] text-slate-400">মার্কেট বেঞ্চমার্ক</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">সম্ভাব্য রিচ</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minReach)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxReach)}`
                : `${calculatedPlan.expectedEstimates.minReach} - ${calculatedPlan.expectedEstimates.maxReach}`}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">ক্লিক সংখ্যা</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minClicks)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxClicks)}`
                : `${calculatedPlan.expectedEstimates.minClicks} - ${calculatedPlan.expectedEstimates.maxClicks}`}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">সম্ভাব্য মেসেজ</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.minConversations)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.maxConversations)}`
                : `${calculatedPlan.expectedEstimates.minConversations} - ${calculatedPlan.expectedEstimates.maxConversations}`}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">আনুমানিক সেলস</span>
            <p className="text-base font-bold text-emerald-700 mt-0.5">
              {useBengaliDigits
                ? `${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMinSales)} - ${toBengaliDigits(calculatedPlan.expectedEstimates.estimatedMaxSales)} টি`
                : `${calculatedPlan.expectedEstimates.estimatedMinSales} - ${calculatedPlan.expectedEstimates.estimatedMaxSales} টি`}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
          * এই ফলাফলগুলো পণ্যের ছবি/ভিডিওর গুণগত মান ও মেসেজে রিপ্লাইয়ের গতির ওপর নির্ভর করে পরিবর্তিত হতে পারে।
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span>সেটআপ গাইড দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
