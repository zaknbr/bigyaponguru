'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCategory, SalesChannel } from '@/types';
import { CATEGORY_CONFIGS } from '@/config/adRules';
import { formatBDT, toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  Shirt,
  Sparkles,
  Smartphone,
  Utensils,
  GraduationCap,
  Home,
  Gift,
  Package,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  Globe,
  Check,
  Zap,
  Calculator,
  Compass,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shirt,
  Sparkles,
  Smartphone,
  Utensils,
  GraduationCap,
  Home,
  Gift,
  Package,
};

export function Step1BusinessProfile() {
  const { profile, updateProfile, setCurrentStep, useBengaliDigits } = useApp();

  const [subStep, setSubStep] = useState<number>(1);
  const totalSubSteps = 5;

  const handleSelectCategory = (cat: ProductCategory) => {
    const config = CATEGORY_CONFIGS[cat];
    updateProfile({
      category: cat,
      sellingPrice: profile.sellingPrice || config.defaultSellingPrice,
      costPrice: profile.costPrice || config.defaultCostPrice,
    });
  };

  const profit = Math.max(0, profile.sellingPrice - profile.costPrice);
  const marginPercent = profile.sellingPrice > 0 ? Math.round((profit / profile.sellingPrice) * 100) : 0;

  const handleNext = () => {
    if (subStep < totalSubSteps) {
      setSubStep(subStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Floating Wizard Progress Header */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">
                ধাপ {useBengaliDigits ? toBengaliDigits(subStep) : subStep} / {useBengaliDigits ? toBengaliDigits(totalSubSteps) : totalSubSteps}
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">•</span>
              <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">
                {subStep === 1 && 'ক্যাটাগরি ও পণ্য'}
                {subStep === 2 && 'মূল্য ও লাভের মার্জিন'}
                {subStep === 3 && 'বিজ্ঞাপন বাজেট'}
                {subStep === 4 && 'বিক্রির মাধ্যম'}
                {subStep === 5 && 'অ্যাকাউন্ট ও লোকেশন'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">আপনার তথ্যগুলো শুধু আপনার ব্রাউজারে সুরক্ষিত থাকবে</p>
          </div>
        </div>

        {/* Progress Bar Pills */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                subStep === i + 1
                  ? 'w-7 bg-emerald-600 shadow-xs'
                  : subStep > i + 1
                  ? 'w-2.5 bg-emerald-400'
                  : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SUB-STEP 1: Category & Product Name */}
      {subStep === 1 && (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>১ম পদক্ষেপ: পণ্য নির্বাচন</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              আপনি কোন ধরনের পণ্য বা সেবা বিক্রি করছেন?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              সঠিক ক্যাটাগরি বেছে নিলে বিজ্ঞাপন গুরু স্বয়ংক্রিয়ভাবে অডিয়েন্স ইন্টারেস্ট ও বাজেট ঠিক করে দেবে।
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(CATEGORY_CONFIGS).map((item) => {
              const Icon = CATEGORY_ICONS[item.iconName] || Package;
              const isSelected = profile.category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.id)}
                  className={`p-4 rounded-3xl text-left border-2 transition-all flex items-start gap-3.5 relative active:scale-[0.98] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white shadow-xs'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm scale-105'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-6">
                    <p className="font-extrabold text-sm sm:text-base text-slate-900">{item.nameBangla}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      গড় বিক্রয়মূল্য: <span className="font-bold text-slate-700">{formatBDT(item.defaultSellingPrice, useBengaliDigits)}</span>
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-3.5 top-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm animate-fade-in">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Specific Name Input */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <label className="block text-xs font-bold text-slate-700">
              পণ্যের নির্দিষ্ট নাম বা ধরন (ঐচ্ছিক):
            </label>
            <div className="relative">
              <input
                type="text"
                value={profile.productName}
                onChange={(e) => updateProfile({ productName: e.target.value })}
                placeholder="যেমন: প্রিমিয়াম সুতি পাঞ্জাবি, অর্গানিক মধু, লেদার ওয়ালেট"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400">নাম লিখলে কপিরাইটিং কিট ও প্ল্যানে আপনার পণ্যের নাম দিয়ে সুন্দর অ্যাড তৈরি হবে।</p>
          </div>
        </div>
      )}

      {/* SUB-STEP 2: Pricing, Cost & Profit Margin */}
      {subStep === 2 && (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>২য় পদক্ষেপ: লাভ ও খরচের অংক</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              বিক্রয় মূল্য ও পণ্য খরচের হিসাব
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              সঠিক মার্জিন জানা থাকলে বিজ্ঞাপনে কখনও অন্ধের মতো খরচ করে লোকসান হবে না।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Selling Price */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
              <label className="block text-xs font-bold text-slate-700">
                ১. প্রতিটির বিক্রয়মূল্য (৳):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-extrabold text-base">৳</span>
                <input
                  type="number"
                  value={profile.sellingPrice || ''}
                  onChange={(e) => updateProfile({ sellingPrice: Number(e.target.value) })}
                  className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-black text-slate-900 transition-all"
                  placeholder="১৫০০"
                />
              </div>
              <p className="text-[11px] text-slate-400">কাস্টমারের কাছ থেকে ডেলিভারিসহ মোট যা নেবেন</p>
            </div>

            {/* Cost Price */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
              <label className="block text-xs font-bold text-slate-700">
                ২. পণ্য তৈরি বা কেনার খরচ (৳):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-extrabold text-base">৳</span>
                <input
                  type="number"
                  value={profile.costPrice || ''}
                  onChange={(e) => updateProfile({ costPrice: Number(e.target.value) })}
                  className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-black text-slate-900 transition-all"
                  placeholder="৯০০"
                />
              </div>
              <p className="text-[11px] text-slate-400">পণ্য কেনা, প্যাকেজিং ও ডেলিভারি আনুমানিক খরচ</p>
            </div>
          </div>

          {/* 2026 Interactive Profit & Margin Visual Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                আপনার লাভের লাইভ হিসাব (Profit Meter)
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black">
                মার্জিন: {useBengaliDigits ? toBengaliDigits(marginPercent) : marginPercent}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <p className="text-xs text-slate-400 font-medium">প্রতি সেলে মোট লাভ:</p>
                <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-slate-400 font-medium">ব্রেক-ইভেন লিমিট:</p>
                  <JargonBadge id="breakeven_cpa" label="CPA" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>পণ্য খরচ ({profile.sellingPrice ? Math.round((profile.costPrice / profile.sellingPrice) * 100) : 0}%)</span>
                <span className="text-emerald-300">নিট প্রফিট ({marginPercent}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  className="bg-slate-500 h-full transition-all duration-500"
                  style={{ width: `${profile.sellingPrice ? Math.min(100, Math.round((profile.costPrice / profile.sellingPrice) * 100)) : 50}%` }}
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${Math.max(0, marginPercent)}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
              🎯 <strong>বিজ্ঞাপন গুরুর বিশ্লেষণ:</strong> ১টি অর্ডার নিশ্চিত করতে বিজ্ঞাপনে সর্বোচ্চ{' '}
              <strong className="text-emerald-300">{formatBDT(profit, useBengaliDigits)}</strong>{' '}
              টাকা পর্যন্ত খরচ হলেও আপনি লোকসানে পড়বেন না।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 3: Monthly Ad Budget */}
      {subStep === 3 && (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>৩য় পদক্ষেপ: বিজ্ঞাপনের বাজেট</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              প্রতি মাসে বিজ্ঞাপনে কত টাকা বরাদ্দ রাখতে চান?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              শুরুতেই বড় বাজেট দরকার নেই। দৈনিক ছোট বাজেটে টেস্ট করে লাভ হলে আস্তে আস্তে বাজেট স্কেল করবেন।
            </p>
          </div>

          {/* Quick Interactive Budget Preset Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">দ্রুত বাজেট বেছে নিন:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[4500, 8000, 15000, 30000].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateProfile({ monthlyBudget: b })}
                  className={`p-3.5 rounded-2xl border-2 font-black text-sm transition-all active:scale-95 text-center ${
                    profile.monthlyBudget === b
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="text-base">{formatBDT(b, useBengaliDigits)}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    ~{formatBDT(Math.round(b / 20), useBengaliDigits)}/দিন
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Budget Input */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <label className="block text-xs font-bold text-slate-700">
              অথবা আপনার নিজস্ব মাসিক বাজেট লিখুন (৳):
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 font-black text-base">৳</span>
              <input
                type="number"
                value={profile.monthlyBudget || ''}
                onChange={(e) => updateProfile({ monthlyBudget: Number(e.target.value) })}
                className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-black text-slate-900 transition-all"
                placeholder="৮০০০"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>দৈনিক আনুমানিক খরচ:</span>
              <span className="font-bold text-emerald-700">
                {formatBDT(Math.round((profile.monthlyBudget || 6000) / 20), useBengaliDigits)} / প্রতিদিন
              </span>
            </div>
          </div>

          {/* Agency Pro Tip */}
          <div className="bg-indigo-50/80 border border-indigo-200/80 p-4 rounded-3xl text-xs sm:text-sm text-indigo-950 space-y-1.5">
            <p className="font-extrabold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>নতুনদের জন্য এজেন্সি রুল:</span>
            </p>
            <p className="leading-relaxed text-indigo-900/90 text-xs">
              প্রথম ৫-৭ দিন প্রতিদিন ৳৪০০ - ৳৬০০ টাকার বাজেট দিয়ে ২-৩টি ভিন্ন অ্যাড টেস্ট করুন। ভালো ফলাফল পেলে তবেই বাজেট বাড়াবেন।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 4: Sales Channel / How Customers Buy */}
      {subStep === 4 && (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>৪র্থ পদক্ষেপ: বিক্রির মাধ্যম</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              কাস্টমাররা আপনার পণ্য কীভাবে অর্ডার করে?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              আপনার সেলস চ্যানেলের ওপর ভিত্তি করে ক্যাম্পেইনের অবজেক্টিভ (মেসেঞ্জার বা ওয়েবসাইট সেলস) সেট হবে।
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'messenger' as SalesChannel,
                title: 'মেসেঞ্জার চ্যাটে (Messenger Chat)',
                desc: 'গ্রাহক বিজ্ঞাপনে ট্যাপ করে ইনবক্সে কথা বলে ঠিকানা ও ফোন নাম্বার দিয়ে অর্ডার কনফার্ম করে।',
                recommended: true,
                icon: MessageCircle,
              },
              {
                id: 'whatsapp' as SalesChannel,
                title: 'হোয়াটসঅ্যাপ মেসেজে (WhatsApp Direct)',
                desc: 'সরাসরি হোয়াটসঅ্যাপে ক্যাটালগ ও ছবি দেখে চ্যাটের মাধ্যমে ক্যাশ অন ডেলিভারিতে অর্ডার নেয়।',
                icon: MessageCircle,
              },
              {
                id: 'website' as SalesChannel,
                title: 'নিজস্ব ওয়েবসাইটে (E-commerce Website)',
                desc: 'গ্রাহক ওয়েবসাইটে গিয়ে সরাসরি অ্যাড টু কার্ট ও চেকআউট করে কেনাকাটা করে।',
                icon: Globe,
              },
              {
                id: 'phone' as SalesChannel,
                title: 'সরাসরি ফোন কলে (Direct Phone Calls)',
                desc: 'উচ্চমূল্যের পণ্য, পাইকারি বা সার্ভিসের ক্ষেত্রে ফোনে কথা বলে বুকিং নেওয়া হয়।',
                icon: PhoneCall,
              },
            ].map((ch) => {
              const Icon = ch.icon;
              const isSelected = profile.salesChannel === ch.id;

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => updateProfile({ salesChannel: ch.id })}
                  className={`w-full p-4 rounded-3xl text-left border-2 transition-all flex items-start gap-3.5 relative active:scale-[0.99] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white shadow-xs'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm scale-105'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-extrabold text-sm sm:text-base text-slate-900">{ch.title}</p>
                      {ch.recommended && (
                        <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                          বাংলাদেশে সর্বাধিক কার্যকর
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ch.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-3.5 top-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm animate-fade-in">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-STEP 5: Existing Social Assets & Location */}
      {subStep === 5 && (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>৫ম পদক্ষেপ: প্ল্যাটফর্ম ও এলাকা</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              আপনার সোশ্যাল মিডিয়া ও টার্গেট এলাকা
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              বর্তমান অ্যাকাউন্ট এবং ডেলিভারি এরিয়া নির্বাচন করুন।
            </p>
          </div>

          {/* Social Presence Checkboxes */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              আপনার কোন কোন প্ল্যাটফর্মে সক্রিয় একাউন্ট আছে?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'hasFbPage', label: 'ফেসবুক পেজ (FB Page)', val: profile.hasFbPage },
                { key: 'hasInstagram', label: 'ইনস্টাগ্রাম (Instagram)', val: profile.hasInstagram },
                { key: 'hasTiktok', label: 'টিকটক অ্যাকাউন্ট (TikTok)', val: profile.hasTiktok },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => updateProfile({ [item.key]: !item.val })}
                  className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between text-xs font-bold transition-all active:scale-95 ${
                    item.val
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600'
                  }`}
                >
                  <span>{item.label}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                      item.val ? 'bg-emerald-600 text-white shadow-xs' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {item.val && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Area / Location */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              আপনি প্রধানত কোন এলাকায় পণ্য ডেলিভারি দেন?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all_bd', label: 'সমগ্র বাংলাদেশ (৬৪ জেলা)' },
                { id: 'dhaka_only', label: 'শুধুমাত্র ঢাকা মেট্রো' },
                { id: 'divisional_cities', label: 'প্রধান বিভাগীয় শহরসমূহ' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => updateProfile({ targetCity: loc.id as 'all_bd' | 'dhaka_only' | 'divisional_cities' })}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-bold transition-all text-center active:scale-95 ${
                    profile.targetCity === loc.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern 2026 Navigation Actions */}
      <div className="pt-4 flex items-center gap-3">
        {subStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পেছনে যান</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <span>
            {subStep === totalSubSteps ? 'আপনার পূর্ণাঙ্গ প্ল্যান দেখুন' : 'পরবর্তী ধাপ'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
