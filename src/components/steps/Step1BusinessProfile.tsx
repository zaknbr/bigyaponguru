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
      {/* Clean Step Counter */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
        <span className="text-xs font-medium text-slate-500">
          প্রশ্ন {useBengaliDigits ? toBengaliDigits(subStep) : subStep} /{' '}
          {useBengaliDigits ? toBengaliDigits(totalSubSteps) : totalSubSteps}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                subStep === i + 1
                  ? 'w-6 bg-slate-900'
                  : subStep > i + 1
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SUB-STEP 1: Category & Product Name */}
      {subStep === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              আপনি কী ধরনের পণ্য বা সেবা বিক্রি করছেন?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              সঠিক ক্যাটাগরি বেছে নিলে আপনার জন্য মানানসই অডিয়েন্স ও বাজেট প্ল্যান তৈরি হবে।
            </p>
          </div>

          {/* Clean Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(CATEGORY_CONFIGS).map((item) => {
              const Icon = CATEGORY_ICONS[item.iconName] || Package;
              const isSelected = profile.category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.id)}
                  className={`p-3.5 rounded-xl text-left border transition-colors flex items-center gap-3 relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-semibold text-sm text-slate-900 truncate">{item.nameBangla}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      গড় মূল্য: {formatBDT(item.defaultSellingPrice, useBengaliDigits)}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Specific Name Input */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              পণ্যের নির্দিষ্ট নাম বা বিবরণ (ঐচ্ছিক):
            </label>
            <input
              type="text"
              value={profile.productName}
              onChange={(e) => updateProfile({ productName: e.target.value })}
              placeholder="যেমন: সুতি থ্রি-পিস, চামড়ার মানিব্যাগ, অর্গানিক মধু"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm"
            />
          </div>
        </div>
      )}

      {/* SUB-STEP 2: Pricing, Cost & Profit Margin */}
      {subStep === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              বিক্রয় মূল্য ও খরচের হিসাব
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              লাভের মার্জিন জানা থাকলে বিজ্ঞাপনে নিরাপদ খরচের সীমা সহজে বোঝা যায়।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Selling Price */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                ১. প্রতিটির বিক্রয়মূল্য (৳):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">৳</span>
                <input
                  type="number"
                  value={profile.sellingPrice || ''}
                  onChange={(e) => updateProfile({ sellingPrice: Number(e.target.value) })}
                  className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-base font-semibold text-slate-900"
                  placeholder="১৫০০"
                />
              </div>
              <p className="text-[11px] text-slate-400">গ্রাহকের কাছ থেকে পণ্যটির যে মূল্য নেবেন</p>
            </div>

            {/* Cost Price */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                ২. পণ্য কেনা বা তৈরির মোট খরচ (৳):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">৳</span>
                <input
                  type="number"
                  value={profile.costPrice || ''}
                  onChange={(e) => updateProfile({ costPrice: Number(e.target.value) })}
                  className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-base font-semibold text-slate-900"
                  placeholder="৯০০"
                />
              </div>
              <p className="text-[11px] text-slate-400">পণ্য ক্রয়, প্যাকেজিং ও আনুমানিক খরচ</p>
            </div>
          </div>

          {/* Clean Profit Analysis Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-700">লাভের প্রাথমিক হিসাব</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                মার্জিন: {useBengaliDigits ? toBengaliDigits(marginPercent) : marginPercent}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">প্রতি সেলে মোট লাভ</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-slate-500">ব্রেক-ইভেন সীমা</p>
                  <JargonBadge id="breakeven_cpa" label="CPA" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-emerald-700 mt-0.5">
                  {formatBDT(profit, useBengaliDigits)}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
              💡 এর মানে হলো: ১টি পণ্য বিক্রি করতে বিজ্ঞাপনে সর্বোচ্চ{' '}
              <span className="font-semibold text-slate-900">{formatBDT(profit, useBengaliDigits)}</span>{' '}
              টাকা পর্যন্ত খরচ হলেও আপনার কোনো লোকসান হবে না।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 3: Monthly Ad Budget */}
      {subStep === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              বিজ্ঞাপনে প্রতি মাসে কত টাকা বাজেট রাখতে চান?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              ছোট বাজেট দিয়ে শুরু করে লাভ হলে আস্তে আস্তে বাজেট বাড়ানোই বুদ্ধিমানের কাজ।
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-600">জনপ্রিয় বাজেট প্যাকেজ:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[4500, 8000, 15000, 30000].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateProfile({ monthlyBudget: b })}
                  className={`p-3 rounded-xl border text-center transition-colors ${
                    profile.monthlyBudget === b
                      ? 'border-emerald-600 bg-emerald-50/60 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="text-sm font-semibold">{formatBDT(b, useBengaliDigits)}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ~{formatBDT(Math.round(b / 20), useBengaliDigits)}/দিন
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Budget Input */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              অথবা আপনার নির্ধারিত বাজেট লিখুন (৳):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">৳</span>
              <input
                type="number"
                value={profile.monthlyBudget || ''}
                onChange={(e) => updateProfile({ monthlyBudget: Number(e.target.value) })}
                className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-base font-semibold text-slate-900"
                placeholder="৮০০০"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              দৈনিক খরচ হবে গড়ে প্রায় {formatBDT(Math.round((profile.monthlyBudget || 6000) / 20), useBengaliDigits)} টাকা।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 4: Sales Channel */}
      {subStep === 4 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              কাস্টমাররা আপনার থেকে কীভাবে কেনাকাটা করে?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              আপনার অর্ডারের মাধ্যমের ওপর ভিত্তি করে সঠিক বিজ্ঞাপনী অবজেক্টিভ নির্ধারণ করা হবে।
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
                  className={`w-full p-3.5 rounded-xl text-left border transition-colors flex items-start gap-3 relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-900">{ch.title}</p>
                      {ch.recommended && (
                        <span className="text-[10px] font-medium px-2 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
                          জনপ্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{ch.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3" />
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
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              আপনার অ্যাকাউন্ট ও টার্গেট এলাকা
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              বর্তমান পেজ ও প্ল্যাটফর্মের স্ট্যাটাস চিহ্নিত করুন।
            </p>
          </div>

          {/* Social Presence */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
            <label className="block text-xs font-medium text-slate-700">
              আপনার কোন কোন প্ল্যাটফর্মে সক্রিয় একাউন্ট আছে?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'hasFbPage', label: 'ফেসবুক পেজ', val: profile.hasFbPage },
                { key: 'hasInstagram', label: 'ইনস্টাগ্রাম', val: profile.hasInstagram },
                { key: 'hasTiktok', label: 'টিকটক একাউন্ট', val: profile.hasTiktok },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => updateProfile({ [item.key]: !item.val })}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs font-medium transition-colors ${
                    item.val
                      ? 'border-emerald-600 bg-emerald-50/50 text-slate-900'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600'
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

          {/* Location */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
            <label className="block text-xs font-medium text-slate-700">
              প্রধানত কোন এলাকায় পণ্য ডেলিভারি দেন?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'all_bd', label: 'সমগ্র বাংলাদেশ (৬৪ জেলা)' },
                { id: 'dhaka_only', label: 'শুধুমাত্র ঢাকা মেট্রো' },
                { id: 'divisional_cities', label: 'প্রধান বিভাগীয় শহরগুলো' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => updateProfile({ targetCity: loc.id as 'all_bd' | 'dhaka_only' | 'divisional_cities' })}
                  className={`p-3 rounded-lg border text-xs font-medium transition-colors text-center ${
                    profile.targetCity === loc.id
                      ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 font-semibold'
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

      {/* Navigation Buttons */}
      <div className="pt-3 flex items-center gap-3">
        {subStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পেছনে যান</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span>
            {subStep === totalSubSteps ? 'সম্পূর্ণ প্ল্যান দেখুন' : 'পরবর্তী প্রশ্ন'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
