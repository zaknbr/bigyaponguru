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
  PieChart as PieIcon,
  ShieldCheck,
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

  // Cost & Profit Calculations
  const selling = Math.max(1, profile.sellingPrice || 1200);
  const cost = Math.max(0, profile.costPrice || 600);
  const estDelivery = Math.round(selling * 0.08) || 100; // ~8% or 100 BDT
  const grossProfit = Math.max(0, selling - cost);
  const netMaxAdSpend = Math.max(0, grossProfit - estDelivery);
  const recommendedAdTarget = Math.round(grossProfit * 0.35); // 35% of gross profit for ads
  const expectedNetProfit = Math.max(0, grossProfit - estDelivery - recommendedAdTarget);

  const costPercent = Math.min(100, Math.round((cost / selling) * 100));
  const deliveryPercent = Math.min(100 - costPercent, Math.round((estDelivery / selling) * 100));
  const adPercent = Math.min(100 - costPercent - deliveryPercent, Math.round((recommendedAdTarget / selling) * 100));
  const profitPercent = Math.max(0, 100 - costPercent - deliveryPercent - adPercent);

  const marginPercent = Math.round((grossProfit / selling) * 100);

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
      {/* 2026 Glassmorphic Step Progress Ribbon */}
      <div className="glass-card p-3 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs shadow-inner">
            {useBengaliDigits ? toBengaliDigits(subStep) : subStep}
          </div>
          <span className="text-sm font-semibold text-slate-700">
            ধাপ {useBengaliDigits ? toBengaliDigits(subStep) : subStep} এর{' '}
            {useBengaliDigits ? toBengaliDigits(totalSubSteps) : totalSubSteps}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSubStep(i + 1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                subStep === i + 1
                  ? 'w-7 bg-emerald-500 shadow-sm shadow-emerald-500/50'
                  : subStep > i + 1
                  ? 'w-3 bg-slate-800'
                  : 'w-2 bg-slate-200'
              }`}
              title={`ধাপ ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* SUB-STEP 1: Category & Product Name */}
      {subStep === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              আপনি কী ধরনের পণ্য বা সেবা বিক্রি করছেন?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              সঠিক ক্যাটাগরি নির্বাচন করলে স্থানীয় মার্কেট ডেটা ও কাস্টমার বিহেভিয়ার অনুযায়ী পারফেক্ট অ্যাড স্ট্র্যাটেজি তৈরি হবে।
            </p>
          </div>

          {/* Glass Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(CATEGORY_CONFIGS).map((item) => {
              const Icon = CATEGORY_ICONS[item.iconName] || Package;
              const isSelected = profile.category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-center gap-3.5 relative ${
                    isSelected
                      ? 'bg-white/95 border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.01]'
                      : 'glass-card glass-card-hover'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-bold text-base text-slate-900 truncate">{item.nameBangla}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      গড় বিক্রয়মূল্য: {formatBDT(item.defaultSellingPrice, useBengaliDigits)}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-fade-in">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Specific Name Input */}
          <div className="glass-card p-5 rounded-2xl space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              পণ্যের নির্দিষ্ট নাম বা ধরন (ঐচ্ছিক):
            </label>
            <input
              type="text"
              value={profile.productName}
              onChange={(e) => updateProfile({ productName: e.target.value })}
              placeholder="যেমন: সুতি থ্রি-পিস, চামড়ার মানিব্যাগ, অর্গানিক মধু"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-base font-medium text-slate-800 placeholder:text-slate-400 transition-all shadow-inner"
            />
          </div>
        </div>
      )}

      {/* SUB-STEP 2: Pricing, Cost & Profit Margin with Interactive SVG Visual Graph */}
      {subStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              বিক্রয় মূল্য ও খরচের স্মার্ট হিসাব
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              সঠিক লাভ ও ব্রেক-ইভেন জানলে বিজ্ঞাপনে কখনো বাড়তি খরচের ঝুঁকি বা লোকসান হবে না।
            </p>
          </div>

          {/* Interactive Pricing Inputs with Quick Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Selling Price Card */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-800">
                  ১. প্রতিটি পণ্যের বিক্রয়মূল্য:
                </label>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  গ্রাহক মূল্য
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold text-base">৳</span>
                <input
                  type="number"
                  value={profile.sellingPrice || ''}
                  onChange={(e) => updateProfile({ sellingPrice: Number(e.target.value) })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-bold text-slate-900"
                  placeholder="১৫০০"
                />
              </div>
              <input
                type="range"
                min="300"
                max="10000"
                step="50"
                value={profile.sellingPrice || 1200}
                onChange={(e) => updateProfile({ sellingPrice: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Cost Price Card */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-800">
                  ২. পণ্য তৈরি/কেনার খরচ:
                </label>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  ক্রয় খরচ
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold text-base">৳</span>
                <input
                  type="number"
                  value={profile.costPrice || ''}
                  onChange={(e) => updateProfile({ costPrice: Number(e.target.value) })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-bold text-slate-900"
                  placeholder="৭০০"
                />
              </div>
              <input
                type="range"
                min="100"
                max={Math.max(500, profile.sellingPrice || 1200)}
                step="50"
                value={profile.costPrice || 600}
                onChange={(e) => updateProfile({ costPrice: Number(e.target.value) })}
                className="w-full accent-slate-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* 2026 Interactive Visual Breakdown Graph & Donut Analysis */}
          <div className="glass-card p-6 rounded-3xl space-y-5 border-emerald-500/20 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <PieIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">১টি সেলের আয় ও খরচ বিভাজন (Visual Graph)</h3>
                  <p className="text-xs text-slate-500">বিক্রয়মূল্য {formatBDT(selling, useBengaliDigits)} টাকার বন্টন</p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                মোট মার্জিন: {useBengaliDigits ? toBengaliDigits(marginPercent) : marginPercent}%
              </span>
            </div>

            {/* Interactive SVG Segmented Progress Bar */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner p-0.5 gap-0.5">
                <div
                  style={{ width: `${costPercent}%` }}
                  className="bg-slate-400 h-full rounded-l-full transition-all duration-500 relative group"
                  title={`পণ্য খরচ: ${costPercent}%`}
                />
                <div
                  style={{ width: `${deliveryPercent}%` }}
                  className="bg-amber-400 h-full transition-all duration-500 relative group"
                  title={`ডেলিভারি ও প্যাকিং: ${deliveryPercent}%`}
                />
                <div
                  style={{ width: `${adPercent}%` }}
                  className="bg-indigo-500 h-full transition-all duration-500 relative group"
                  title={`টার্গেট অ্যাড বাজেট: ${adPercent}%`}
                />
                <div
                  style={{ width: `${profitPercent}%` }}
                  className="bg-emerald-500 h-full rounded-r-full transition-all duration-500 relative group"
                  title={`প্রত্যাশিত নিট লাভ: ${profitPercent}%`}
                />
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 truncate">পণ্য ক্রয়/তৈরি</p>
                    <p className="text-xs font-bold text-slate-800">{formatBDT(cost, useBengaliDigits)}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-amber-800 truncate">ডেলিভারি ও প্যাকিং</p>
                    <p className="text-xs font-bold text-amber-900">{formatBDT(estDelivery, useBengaliDigits)}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-indigo-800 truncate">অ্যাড খরচ (টার্গেট)</p>
                    <p className="text-xs font-bold text-indigo-900">{formatBDT(recommendedAdTarget, useBengaliDigits)}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-emerald-800 truncate">নিট পকেট লাভ</p>
                    <p className="text-xs font-bold text-emerald-900">{formatBDT(expectedNetProfit, useBengaliDigits)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Safe CPA Insight Box */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    সর্বোচ্চ নিরাপদ অ্যাড খরচ (ব্রেক-ইভেন সীমা):{' '}
                    <span className="text-emerald-700 font-extrabold">{formatBDT(netMaxAdSpend, useBengaliDigits)}</span>
                  </p>
                  <JargonBadge id="breakeven_cpa" label="CPA" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  বিজ্ঞাপনে প্রতি সেলে {formatBDT(recommendedAdTarget, useBengaliDigits)} টাকা খরচ হলে আপনার চমৎকার প্রফিট থাকবে। আর সর্বোচ্চ {formatBDT(netMaxAdSpend, useBengaliDigits)} টাকা পর্যন্ত খরচ হলেও আপনার কোনো ক্ষতি বা লস হবে না।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-STEP 3: Monthly Ad Budget */}
      {subStep === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              বিজ্ঞাপনে প্রতি মাসে কত টাকা বাজেট রাখতে চান?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              নতুনদের জন্য প্রতিদিন ২-৪ ডলার (৳২৫০-৫০০) দিয়ে টেস্ট করে ফলাফল যাচাই করে স্কেল করাই আদর্শ নিয়ম।
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2.5">
            <span className="text-sm font-semibold text-slate-700">জনপ্রিয় বাজেট প্যাকেজ নির্বাচন করুন:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[4500, 8000, 15000, 30000].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateProfile({ monthlyBudget: b })}
                  className={`p-4 rounded-2xl border transition-all text-center ${
                    profile.monthlyBudget === b
                      ? 'border-2 border-emerald-500 bg-emerald-50/70 text-slate-900 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : 'glass-card glass-card-hover text-slate-700'
                  }`}
                >
                  <p className="text-base font-bold">{formatBDT(b, useBengaliDigits)}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    ~{formatBDT(Math.round(b / 20), useBengaliDigits)}/দিন
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Budget Input */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <label className="block text-sm font-semibold text-slate-800">
              অথবা আপনার নির্ধারিত কাস্টম বাজেট লিখুন (৳):
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-bold text-base">৳</span>
              <input
                type="number"
                value={profile.monthlyBudget || ''}
                onChange={(e) => updateProfile({ monthlyBudget: Number(e.target.value) })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-bold text-slate-900"
                placeholder="৮০০০"
              />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              💡 দৈনিক গড় বিজ্ঞাপন খরচ হবে প্রায়{' '}
              <span className="text-emerald-700 font-bold">
                {formatBDT(Math.round((profile.monthlyBudget || 6000) / 20), useBengaliDigits)}
              </span>{' '}
              টাকা (সপ্তাহে ৪-৫ দিন অ্যাক্টিভ রাখলে)।
            </p>
          </div>
        </div>
      )}

      {/* SUB-STEP 4: Sales Channel */}
      {subStep === 4 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              কাস্টমাররা আপনার থেকে কীভাবে কেনাকাটা করে?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              আপনার অর্ডারের মাধ্যমের ওপর ভিত্তি করে সঠিক অ্যাড অবজেক্টিভ ও কল-টু-অ্যাকশন সেট হবে।
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'messenger' as SalesChannel,
                title: 'ফেসবুক মেসেঞ্জার চ্যাটে (Messenger Chat)',
                desc: 'গ্রাহক বিজ্ঞাপনে ক্লিক করে ইনবক্সে সরাসরি কথা বলে এবং ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করে।',
                recommended: true,
                icon: MessageCircle,
              },
              {
                id: 'whatsapp' as SalesChannel,
                title: 'হোয়াটসঅ্যাপ মেসেজে (WhatsApp Direct)',
                desc: 'গ্রাহক সরাসরি হোয়াটসঅ্যাপে চ্যাট করে ক্যাটালগ ও ফটো দেখে অর্ডার চূড়ান্ত করে।',
                icon: MessageCircle,
              },
              {
                id: 'website' as SalesChannel,
                title: 'নিজস্ব ই-কমার্স ওয়েবসাইটে (Website Checkout)',
                desc: 'গ্রাহক ওয়েবসাইটে গিয়ে প্রোডাক্ট দেখে অ্যাড টু কার্ট ও স্বয়ংক্রিয় পেমেন্ট/চেকআউট সম্পন্ন করে।',
                icon: Globe,
              },
              {
                id: 'phone' as SalesChannel,
                title: 'সরাসরি ফোন কলে (Phone Call / Lead)',
                desc: 'উচ্চমূল্যের পণ্য, রিয়েল এস্টেট বা সার্ভিসের ক্ষেত্রে ফোনে কথা বলে বুকিং নেওয়া।',
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
                  className={`w-full p-4 rounded-2xl text-left transition-all flex items-start gap-4 relative ${
                    isSelected
                      ? 'bg-white/95 border-2 border-emerald-500 shadow-md shadow-emerald-500/10 scale-[1.01]'
                      : 'glass-card glass-card-hover'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-base text-slate-900">{ch.title}</p>
                      {ch.recommended && (
                        <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                          বাংলাদেশে সর্বাধিক কার্যকর
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">{ch.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-STEP 5: Accounts & Delivery Locations */}
      {subStep === 5 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              আপনার অ্যাকাউন্ট ও টার্গেট এলাকা
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              যে যে প্ল্যাটফর্মে বিজ্ঞাপন চালানো সম্ভব সেগুলো নিশ্চিত করুন।
            </p>
          </div>

          {/* Social Presence */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <label className="block text-sm font-semibold text-slate-800">
              আপনার কোন কোন প্ল্যাটফর্মে সক্রিয় একাউন্ট/পেজ আছে?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'hasFbPage', label: 'ফেসবুক পেজ', val: profile.hasFbPage },
                { key: 'hasInstagram', label: 'ইনস্টাগ্রাম', val: profile.hasInstagram },
                { key: 'hasTiktok', label: 'টিকটক একাউন্ট', val: profile.hasTiktok },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => updateProfile({ [item.key]: !item.val })}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-sm font-semibold transition-all ${
                    item.val
                      ? 'border-2 border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                      item.val ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {item.val && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <label className="block text-sm font-semibold text-slate-800">
              প্রধানত কোন এলাকায় ডেলিভারি সুবিধা আছে?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all_bd', label: 'সমগ্র বাংলাদেশ (৬৪ জেলা)' },
                { id: 'dhaka_only', label: 'শুধুমাত্র ঢাকা মেট্রো' },
                { id: 'divisional_cities', label: 'প্রধান বিভাগীয় শহরসমূহ' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => updateProfile({ targetCity: loc.id as 'all_bd' | 'dhaka_only' | 'divisional_cities' })}
                  className={`p-3.5 rounded-xl border text-sm font-semibold transition-all text-center ${
                    profile.targetCity === loc.id
                      ? 'border-2 border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern 2026 Navigation Action Bar */}
      <div className="pt-4 flex items-center gap-3">
        {subStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পেছনে যান</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <span>
            {subStep === totalSubSteps ? 'সম্পূর্ণ কাস্টম প্ল্যান দেখুন' : 'পরবর্তী প্রশ্ন'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
