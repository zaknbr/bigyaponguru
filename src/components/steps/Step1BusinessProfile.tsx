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

  // Internal sub-step for pure one-question-at-a-time mobile wizard feel
  const [subStep, setSubStep] = useState<number>(1);
  const totalSubSteps = 5;

  // Handle category selection
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
      setCurrentStep(2); // Go to Step 2: Personalized Plan
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
      {/* Sub-step indicator */}
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
        <span className="text-xs font-bold text-slate-500">
          প্রশ্ন {useBengaliDigits ? toBengaliDigits(subStep) : subStep} /{' '}
          {useBengaliDigits ? toBengaliDigits(totalSubSteps) : totalSubSteps}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                subStep === i + 1
                  ? 'w-6 bg-emerald-600'
                  : subStep > i + 1
                  ? 'w-2 bg-emerald-300'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SUB-STEP 1: Category & Product Name */}
      {subStep === 1 && (
        <div className="space-y-5 animate-slide-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              আপনি কী ধরনের পণ্য বা সেবা বিক্রি করেন?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              সঠিক ক্যাটাগরি বেছে নিলে বিজ্ঞাপন গুরু আপনার জন্য নির্ভুল বাজেট ও অডিয়েন্স প্ল্যান তৈরি করবে।
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(CATEGORY_CONFIGS).map((item) => {
              const Icon = CATEGORY_ICONS[item.iconName] || Package;
              const isSelected = profile.category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.id)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-sm text-slate-900">{item.nameBangla}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      গড় বিক্রয়মূল্য: {formatBDT(item.defaultSellingPrice, useBengaliDigits)}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-3 top-3.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Specific Name Input */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              পণ্যের নির্দিষ্ট নাম বা ধরন (যেমন: সুতি থ্রি-পিস, চামড়ার মানিব্যাগ, অর্গানিক ঘি):
            </label>
            <input
              type="text"
              value={profile.productName}
              onChange={(e) => updateProfile({ productName: e.target.value })}
              placeholder="যেমন: কাতান শাড়ি"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
            />
          </div>
        </div>
      )}

      {/* SUB-STEP 2: Pricing, Cost & Profit Margin */}
      {subStep === 2 && (
        <div className="space-y-5 animate-slide-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              বিক্রয় মূল্য ও খরচের হিসাব
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              লাভের মার্জিন জানা থাকলে বিজ্ঞাপনে কোনো অবস্থাতেই অতিরিক্ত খরচে লোকসান হবে না।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Selling Price */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                ১. প্রতিটির বিক্রয়মূল্য (৳):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  value={profile.sellingPrice || ''}
                  onChange={(e) => updateProfile({ sellingPrice: Number(e.target.value) })}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base font-bold"
                  placeholder="যেমন: ১৫০০"
                />
              </div>
              <p className="text-[11px] text-slate-500">গ্রাহকের কাছ থেকে পণ্যটির যে মূল্য নেবেন।</p>
            </div>

            {/* Cost Price */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                ২. পণ্য কেনা বা তৈরির মোট খরচ (৳):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  value={profile.costPrice || ''}
                  onChange={(e) => updateProfile({ costPrice: Number(e.target.value) })}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base font-bold"
                  placeholder="যেমন: ৯০০"
                />
              </div>
              <p className="text-[11px] text-slate-500">পণ্য ক্রয়, প্যাকেজিং ও আনুমানিক খরচ।</p>
            </div>
          </div>

          {/* Live Profit & Margin Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                আপনার লাভের হিসাব (Profit Analysis)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                মার্জিন: {useBengaliDigits ? toBengaliDigits(marginPercent) : marginPercent}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-xs text-slate-300">প্রতি সেলে মোট লাভ:</p>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-0.5">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-slate-300">ব্রেক-ইভেন লিমিট:</p>
                  <JargonBadge id="breakeven_cpa" label="CPA" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-amber-300 mt-0.5">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50">
              💡 এর মানে হলো: ১টি পণ্য বিক্রি করতে বিজ্ঞাপনে সর্বোচ্চ{' '}
              <strong className="text-emerald-300">{formatBDT(profit, useBengaliDigits)}</strong>{' '}
              পর্যন্ত খরচ হলেও আপনার কোনো লোকসান হবে না!
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 3: Monthly Ad Budget */}
      {subStep === 3 && (
        <div className="space-y-5 animate-slide-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              বিজ্ঞাপনে প্রতি মাসে কত টাকা বাজেট রাখতে চান?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              শুরুতেই লাখ টাকা লাগবেনা। ছোট বাজেট দিয়ে শুরু করে লাভ হলে আস্তে আস্তে বাজেট বাড়াবেন।
            </p>
          </div>

          {/* Quick Budget Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[4500, 8000, 15000, 30000].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => updateProfile({ monthlyBudget: b })}
                className={`py-3 px-3 rounded-xl border-2 font-bold text-sm transition-all ${
                  profile.monthlyBudget === b
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {formatBDT(b, useBengaliDigits)}/মাস
              </button>
            ))}
          </div>

          {/* Custom Budget Input */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              অথবা আপনার নির্ধারিত মাসিক বাজেট লিখুন (৳):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">৳</span>
              <input
                type="number"
                value={profile.monthlyBudget || ''}
                onChange={(e) => updateProfile({ monthlyBudget: Number(e.target.value) })}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base font-bold"
                placeholder="যেমন: ৮০০০"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              দৈনিক গড়ে প্রায় {formatBDT(Math.round((profile.monthlyBudget || 6000) / 20), useBengaliDigits)} খরচ হবে।
            </p>
          </div>

          {/* Budget Tip */}
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-xs sm:text-sm text-indigo-950 space-y-1">
            <p className="font-bold text-indigo-900">💡 নতুনদের জন্য বাজেট রুল:</p>
            <p className="leading-relaxed text-indigo-800">
              বিজ্ঞাপন গুরুর পরামর্শ হলো প্রথম ৫-৭ দিন প্রতিদিন ৳৪০০ - ৳৬০০ টাকার ছোট বাজেট দিয়ে টেস্ট করুন। ফলাফল পজিটিভ আসলে তারপর বাজেট স্কেল করুন।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 4: Sales Channel / How Customers Buy */}
      {subStep === 4 && (
        <div className="space-y-5 animate-slide-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              কাস্টমাররা আপনার থেকে কীভাবে কেনাকাটা করে?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              আপনার সেলস চ্যানেলের ওপর নির্ভর করে মেটা বা টিকটক ক্যাম্পেইনের সেরা অবজেক্টিভ নির্ধারণ করা হবে।
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'messenger' as SalesChannel,
                title: 'ফেসবুক মেসেঞ্জার চ্যাটে (Messenger Chat)',
                desc: 'গ্রাহক বিজ্ঞাপনে ক্লিক করে সরাসরি মেসেঞ্জারে কথা বলে অর্ডার কনফার্ম করে।',
                recommended: true,
                icon: MessageCircle,
              },
              {
                id: 'whatsapp' as SalesChannel,
                title: 'হোয়াটসঅ্যাপ মেসেজে (WhatsApp Direct)',
                desc: 'সরাসরি হোয়াটসঅ্যাপে ক্যাটালগ ও ছবি পাঠিয়ে চ্যাটে বিক্রি।',
                icon: MessageCircle,
              },
              {
                id: 'website' as SalesChannel,
                title: 'নিজস্ব ই-কমার্স ওয়েবসাইটে (Website Order)',
                desc: 'গ্রাহক ওয়েবসাইটে গিয়ে সরাসরি অ্যাড টু কার্ট ও চেকআউট করে।',
                icon: Globe,
              },
              {
                id: 'phone' as SalesChannel,
                title: 'সরাসরি ফোন কলে (Phone Call / Lead)',
                desc: 'উচ্চমূল্যের পণ্য বা সার্ভিসের ক্ষেত্রে ফোনে কথা বলে বুকিং নেওয়া।',
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
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-slate-900">{ch.title}</p>
                      {ch.recommended && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                          বাংলাদেশে সর্বাধিক জনপ্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ch.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-3.5 top-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
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
        <div className="space-y-5 animate-slide-up">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              আপনার সোশ্যাল মিডিয়া ও টার্গেট এলাকা
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              বর্তমান পেজ ও প্ল্যাটফর্মের স্ট্যাটাস চিহ্নিত করুন।
            </p>
          </div>

          {/* Social Presence Checkboxes */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              আপনার কোন কোন প্ল্যাটফর্মে সক্রিয় একাউন্ট আছে?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { key: 'hasFbPage', label: 'ফেসবুক পেজ (FB Page)', val: profile.hasFbPage },
                { key: 'hasInstagram', label: 'ইনস্টাগ্রাম (Instagram)', val: profile.hasInstagram },
                { key: 'hasTiktok', label: 'টিকটক একাউন্ট (TikTok)', val: profile.hasTiktok },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => updateProfile({ [item.key]: !item.val })}
                  className={`p-3 rounded-xl border-2 text-left flex items-center justify-between text-xs font-bold transition-all ${
                    item.val
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 bg-slate-50 text-slate-500'
                  }`}
                >
                  <span>{item.label}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      item.val ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {item.val && <Check className="w-3 h-3" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Area / Location */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              আপনি প্রধানত কোন এলাকায় পণ্য ডেলিভারি দেন?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'all_bd', label: 'সমগ্র বাংলাদেশ (৬৪ জেলা)' },
                { id: 'dhaka_only', label: 'শুধুমাত্র ঢাকা মেট্রো' },
                { id: 'divisional_cities', label: 'প্রধান বিভাগীয় শহরগুলো' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => updateProfile({ targetCity: loc.id as 'all_bd' | 'dhaka_only' | 'divisional_cities' })}
                  className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                    profile.targetCity === loc.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Big, Mobile-Friendly) */}
      <div className="pt-4 flex items-center gap-3">
        {subStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পেছনে যান</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <span>
            {subStep === totalSubSteps ? 'আপনার পূর্ণাঙ্গ প্ল্যান দেখুন' : 'পরবর্তী প্রশ্ন'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
