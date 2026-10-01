'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  generateFourStepAdCopies,
  PHOTO_DO_RULES,
  PHOTO_DONT_RULES,
  PLACEMENT_SIZES,
  FIFTEEN_SEC_SCRIPT,
  CATEGORY_HOOK_MAP,
  POLICY_SAFETY_CHECKS,
} from '@/config/creativeKitConfig';
import { SalesChannel } from '@/types';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import {
  Wand2,
  Copy,
  Check,
  Sparkles,
  Camera,
  Video,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  Eye,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Circle,
  FlaskConical,
  MessageCircle,
  Globe,
  PhoneCall,
  Flame,
} from 'lucide-react';

export function Step4CreativeKit() {
  const {
    fourQuestionCopy,
    updateFourQuestionCopy,
    checkedPolicyIds,
    togglePolicyCheck,
    allPoliciesChecked,
    profile,
    setCurrentStep,
    useBengaliDigits,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'copy' | 'photo' | 'video' | 'policy' | 'testing'>('copy');
  const [copyWizardStep, setCopyWizardStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate 3 copy variations
  const copyVariants = generateFourStepAdCopies(fourQuestionCopy);

  // Get 5 category-tailored hooks based on product category in Step 1
  const categoryHooks =
    CATEGORY_HOOK_MAP[profile.category] || CATEGORY_HOOK_MAP.fashion || CATEGORY_HOOK_MAP.general;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const uncheckedPolicyCount = POLICY_SAFETY_CHECKS.length - checkedPolicyIds.length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">ক্রিয়েটিভ কিট</h2>
              <p className="text-xs text-purple-200">বাংলা ক্যাপশন, ছবির নিয়ম, ভিডিও হুক ও পলিসি অডিট</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
            ৫টি ক্রিয়েটিভ টুলস
          </span>
        </div>

        {/* 5-Tab Navigation Ribbon */}
        <div className="pt-2 border-t border-purple-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'copy' as const, label: '১. বাংলা কপি বিল্ডার', icon: Sparkles },
            { id: 'photo' as const, label: '২. ছবির গাইড ও সাইজ', icon: Camera },
            { id: 'video' as const, label: '৩. ১৫-সেকেন্ড ভিডিও ও হুক', icon: Video },
            { id: 'policy' as const, label: '৪. পলিসি সেফটি চেক', icon: ShieldCheck },
            { id: 'testing' as const, label: '৫. টেস্টিং রুল', icon: FlaskConical },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-purple-950/60 text-purple-200 hover:bg-purple-900/60 border border-purple-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART A: 4-Question Ad Copy Builder (One-by-one or Quick Editor) */}
      {/* ========================================================================= */}
      {activeTab === 'copy' && (
        <div className="space-y-6 animate-slide-up">
          {/* 4-Question Interactive Wizard */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  {useBengaliDigits ? toBengaliDigits(copyWizardStep) : copyWizardStep}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  ৪টি সহজ প্রশ্নের উত্তর দিন $\rightarrow$ ৩টি রেডিমেড ক্যাপশন পান
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">
                প্রশ্ন {useBengaliDigits ? toBengaliDigits(copyWizardStep) : copyWizardStep} /{' '}
                {useBengaliDigits ? toBengaliDigits(4) : 4}
              </span>
            </div>

            {/* Question 1 */}
            {copyWizardStep === 1 && (
              <div className="space-y-3 animate-slide-up">
                <label className="block text-sm font-bold text-slate-900">
                  ১. আপনি কী বিক্রি করছেন? (পণ্যের নাম বা ধরন)
                </label>
                <p className="text-xs text-slate-500">
                  যেমন: প্রিমিয়াম হ্যান্ডলুম সুতি শাড়ি, চামড়ার মানিব্যাগ, অর্গানিক স্কিন সিরাম ইত্যাদি।
                </p>
                <input
                  type="text"
                  value={fourQuestionCopy.productName}
                  onChange={(e) => updateFourQuestionCopy({ productName: e.target.value })}
                  placeholder="যেমন: প্রিমিয়াম সুতি শাড়ি"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            )}

            {/* Question 2 */}
            {copyWizardStep === 2 && (
              <div className="space-y-3 animate-slide-up">
                <label className="block text-sm font-bold text-slate-900">
                  ২. ক্রেতার সবচেয়ে বড় সমস্যা বা চাহিদা কী?
                </label>
                <p className="text-xs text-slate-500">
                  যেমন: বাজারে নিম্নমানের নকল কাপড় পেয়ে ঠকার ভয়, গরমে অস্বস্তি, ইত্যাদি।
                </p>
                <input
                  type="text"
                  value={fourQuestionCopy.customerProblem}
                  onChange={(e) => updateFourQuestionCopy({ customerProblem: e.target.value })}
                  placeholder="যেমন: বাজারে নকল পণ্যে প্রতারিত হওয়ার ভয়"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            )}

            {/* Question 3 */}
            {copyWizardStep === 3 && (
              <div className="space-y-3 animate-slide-up">
                <label className="block text-sm font-bold text-slate-900">
                  ৩. আপনার সেরা সুবিধা বা বিশেষ অফার কী?
                </label>
                <p className="text-xs text-slate-500">
                  যেমন: আজকের অর্ডারে ফ্রি হোম ডেলিভারি, ক্যাশ অন ডেলিভারিতে চেক করে নেওয়ার সুযোগ, ২০% ছাড়।
                </p>
                <input
                  type="text"
                  value={fourQuestionCopy.specialOffer}
                  onChange={(e) => updateFourQuestionCopy({ specialOffer: e.target.value })}
                  placeholder="যেমন: আজকের অর্ডারে সারা দেশে ফ্রি ডেলিভারি"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            )}

            {/* Question 4 */}
            {copyWizardStep === 4 && (
              <div className="space-y-3 animate-slide-up">
                <label className="block text-sm font-bold text-slate-900">
                  ৪. ক্রেতা কীভাবে অর্ডার করবে? (কল-টু-অ্যাকশন মেথড)
                </label>
                <p className="text-xs text-slate-500">
                  বিজ্ঞাপনের নিচে কাস্টমার কোন বাটনে চাপ দিয়ে আপনার সাথে যোগাযোগ করবে:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'messenger' as SalesChannel, label: 'ফেসবুক ইনবক্স', icon: MessageCircle },
                    { id: 'whatsapp' as SalesChannel, label: 'হোয়াটসঅ্যাপ চ্যাট', icon: MessageCircle },
                    { id: 'website' as SalesChannel, label: 'ওয়েবসাইট লিংক', icon: Globe },
                    { id: 'phone' as SalesChannel, label: 'সরাসরি কল', icon: PhoneCall },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSel = fourQuestionCopy.orderMethod === m.id;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => updateFourQuestionCopy({ orderMethod: m.id })}
                        className={`p-3 rounded-2xl border-2 text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                          isSel
                            ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              {copyWizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep - 1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>আগের প্রশ্ন</span>
                </button>
              ) : (
                <div />
              )}

              {copyWizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep + 1)}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>পরের প্রশ্ন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>ক্যাপশন প্রস্তুত নিচে দেখুন 👇</span>
                </span>
              )}
            </div>
          </div>

          {/* 3 Ready-to-copy Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>৩টি প্রস্তুতকৃত বাংলা ক্যাপশন ভ্যারিয়েন্ট</span>
              </h3>
              <span className="text-xs text-purple-700 font-semibold">
                যেকোনো একটি সম্পূর্ণ কপি করুন
              </span>
            </div>

            <div className="space-y-4">
              {copyVariants.map((variant) => {
                const isCopied = copiedId === variant.id;

                return (
                  <div
                    key={variant.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          {variant.badge}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                          {variant.styleName}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(variant.id, variant.fullCopy)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Breakdown Display */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      <div>
                        <span className="text-[11px] font-bold text-purple-700 block uppercase">
                          হেডলাইন (Headline):
                        </span>
                        <p className="font-bold text-slate-900">{variant.headline}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-purple-700 block uppercase">
                          বডি টেক্সট (Body Text):
                        </span>
                        <p className="text-slate-700 whitespace-pre-line">{variant.bodyText}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-purple-700 block uppercase">
                          কল-টু-অ্যাকশন (CTA):
                        </span>
                        <p className="font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                          {variant.ctaText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART B: Photo Guide (DOs/DON'Ts & Placement Size Table) */}
      {/* ========================================================================= */}
      {activeTab === 'photo' && (
        <div className="space-y-6 animate-slide-up">
          {/* DOs & DON'Ts Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOs */}
            <div className="bg-emerald-50/90 border-2 border-emerald-200 p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <span>ছবিতে যা যা করবেন (DOs)</span>
              </div>

              <div className="space-y-2">
                {PHOTO_DO_RULES.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 p-3 rounded-xl border border-emerald-100 space-y-0.5"
                  >
                    <p className="font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      {rule.title}
                    </p>
                    <p className="text-xs text-slate-600 pl-4">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div className="bg-rose-50/90 border-2 border-rose-200 p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-rose-950 font-extrabold text-base">
                <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <ThumbsDown className="w-4 h-4" />
                </div>
                <span>ছবিতে যা করবেন না (DON&rsquo;Ts)</span>
              </div>

              <div className="space-y-2">
                {PHOTO_DONT_RULES.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 p-3 rounded-xl border border-rose-100 space-y-0.5"
                  >
                    <p className="font-bold text-xs sm:text-sm text-rose-950 flex items-center gap-1.5">
                      <span className="text-rose-600 font-bold">✕</span>
                      {rule.title}
                    </p>
                    <p className="text-xs text-slate-600 pl-4">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Placement Sizes Table */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-600" />
              <span>প্লেসমেন্ট অনুযায়ী প্রস্তাবিত ছবির সাইজ ও রেজোলিউশন</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-bold">
                    <th className="p-3 rounded-l-xl">প্লেসমেন্ট</th>
                    <th className="p-3">রেশিও</th>
                    <th className="p-3">প্রস্তাবিত সাইজ</th>
                    <th className="p-3 rounded-r-xl">উপকারিতা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PLACEMENT_SIZES.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{row.placement}</td>
                      <td className="p-3 font-semibold text-purple-700">{row.aspectRatio}</td>
                      <td className="p-3 font-mono text-slate-600">{row.recommendedResolution}</td>
                      <td className="p-3 text-slate-500">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART C: Video Guide (15-sec Script & 5 Category Hooks) */}
      {/* ========================================================================= */}
      {activeTab === 'video' && (
        <div className="space-y-6 animate-slide-up">
          {/* 15-Second Video Script Template */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-pink-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  ১৫-সেকেন্ডের হাই-কনভার্টিং ভিডিও স্ক্রিপ্ট টেমপ্লেট
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                রিলস ও টিকটক
              </span>
            </div>

            <div className="space-y-2.5">
              {FIFTEEN_SEC_SCRIPT.map((beat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200 text-xs">
                        {beat.timing}
                      </span>
                      <span className="font-bold text-slate-900">{beat.stageName}</span>
                    </div>
                    <p className="text-slate-800 font-medium">
                      মুখের কথা: <span className="text-pink-950 font-bold">{beat.exampleSpokenBangla}</span>
                    </p>
                  </div>

                  <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5 flex-shrink-0">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{beat.visualCue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Bengali Hooks Tailored to the Selected Category */}
          <div className="bg-gradient-to-br from-rose-900 via-pink-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-rose-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {categoryHooks.categoryNameBangla}-এর জন্য ৫টি পরীক্ষিত বাংলা হুক
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                প্রথম ৩ সেকেন্ড
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {categoryHooks.hooks.map((h) => (
                <div
                  key={h.id}
                  className="bg-slate-900/80 p-4 rounded-2xl border border-rose-800/50 space-y-2 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300">{h.title}</span>
                    <span className="text-[10px] text-slate-400">ট্রিগার: {h.psychologicalTrigger}</span>
                  </div>
                  <p className="font-bold text-white text-sm bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/40">
                    &ldquo;{h.spokenBangla}&rdquo;
                  </p>
                  <p className="text-slate-300 text-xs flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>স্ক্রিনে দৃশ্য: {h.visualAction}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Shooting Pro-Tips */}
          <div className="bg-indigo-50 border border-indigo-200 p-4 sm:p-5 rounded-2xl space-y-2 text-xs sm:text-sm text-indigo-950">
            <p className="font-extrabold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              ভিডিও তৈরির জরুরি ৪টি নিয়ম:
            </p>
            <ul className="space-y-1.5 text-indigo-900 list-disc list-inside leading-relaxed">
              <li><strong>লম্বালম্বি সাইজ (৯:১৬):</strong> মোবাইল দিয়ে সোজা করে শুট করুন যাতে পুরো স্ক্রিন জুড়ে আসে।</li>
              <li><strong>অন-স্ক্রিন ক্যাপশন (Text on Video):</strong> শতকরা ৭০% মানুষ সাউন্ড ছাড়া ভিডিও দেখে, তাই ক্যাপশন থাকা আবশ্যক।</li>
              <li><strong>সাধারণ মোবাইল ক্যামেরাই যথেষ্ট:</strong> দামি ডিএসএলআর বা স্টুডিও লাগবে না; সাধারণ স্মার্টফোনের ক্যামেরাই সবচেয়ে বেশি বিশ্বাসযোগ্য।</li>
              <li><strong>আসল মানুষের ব্যবহার:</strong> পণ্যটি হাতে ধরে বা পরে কথা বললে কাস্টমার সবচেয়ে বেশি অর্ডার করে।</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART D: Policy Safety Check (Checklist & Warning Alerts) */}
      {/* ========================================================================= */}
      {activeTab === 'policy' && (
        <div className="space-y-6 animate-slide-up">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  বিজ্ঞাপন পাবলিশ করার আগের পলিসি অডিট চেকলিস্ট
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {checkedPolicyIds.length} / {POLICY_SAFETY_CHECKS.length} যাচাইকৃত
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              মেটা এবং টিকটকে বিজ্ঞাপন দেওয়ার আগে এই ৫টি নীতি শতভাগ মেনে চলা হয়েছে কিনা নিশ্চিত করুন:
            </p>

            {/* Checklist Items */}
            <div className="space-y-3">
              {POLICY_SAFETY_CHECKS.map((policy) => {
                const isChecked = checkedPolicyIds.includes(policy.id);

                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => togglePolicyCheck(policy.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-lg border-2 border-slate-300 bg-white flex items-center justify-center">
                          <Circle className="w-3.5 h-3.5 text-transparent" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-sm text-slate-900">{policy.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{policy.plainRule}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unchecked Warning Box */}
          {!allPoliciesChecked ? (
            <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-3xl space-y-2 text-amber-950 animate-slide-up">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>সতর্কতা: এখনো {uncheckedPolicyCount} টি পলিসি আইটেম যাচাই করা বাকি আছে!</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-900">
                পলিসির কোনো নিয়ম অমান্য হলে মেটা বা টিকটক কোনো নোটিশ ছাড়াই আপনার বিজ্ঞাপন <strong>Rejected</strong> করতে পারে অথবা সম্পূর্ণ <strong>Ad Account Restricted</strong> করে দিতে পারে। সবগুলো বক্সে টিক দিয়ে সম্পূর্ণ নিশ্চিত হোন।
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-3xl space-y-1 text-emerald-950 animate-slide-up flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-emerald-900">
                  🎉 অভিনন্দন! পলিসি অডিট ১০০% সম্পূর্ণ
                </h4>
                <p className="text-xs text-emerald-800">
                  আপনার বিজ্ঞাপন সম্পূর্ণ সেফ এবং মেটার বিজ্ঞাপনী নীতিমালা অনুযায়ী সুরক্ষিত।
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART E: Testing Rule (Infographic Visual) */}
      {/* ========================================================================= */}
      {activeTab === 'testing' && (
        <div className="space-y-6 animate-slide-up">
          {/* Visual Testing Matrix Card */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FlaskConical className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  বিজ্ঞাপন সফল করার গোল্ডেন টেস্টিং রুল
                </h3>
                <p className="text-xs text-slate-500">একসাথে ২-৩টি ক্রিয়েটিভ দিয়ে শুরু করুন</p>
              </div>
            </div>

            {/* Visual 3-Ad Flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">
                  অ্যাড ১ (ছবি A)
                </span>
                <p className="font-bold text-xs text-indigo-950">দিনের আলোয় পরিষ্কার আসল ছবি</p>
                <div className="text-[11px] text-indigo-800 bg-white/80 p-2 rounded-lg">
                  স্বাভাবিক প্রোডাক্ট শট
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">
                  অ্যাড ২ (ছবি B)
                </span>
                <p className="font-bold text-xs text-indigo-950">ব্যবহারের দৃশ্য / মডেল পরা</p>
                <div className="text-[11px] text-indigo-800 bg-white/80 p-2 rounded-lg">
                  In-use লাইফস্টাইল শট
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-2 text-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-200 text-pink-800">
                  অ্যাড ৩ (ভিডিও)
                </span>
                <p className="font-bold text-xs text-pink-950">১৫-সেকেন্ডের আনবক্সিং ভিডিও</p>
                <div className="text-[11px] text-pink-800 bg-white/80 p-2 rounded-lg">
                  ৩ সেকেন্ড হুক সহ ভিডিও
                </div>
              </div>
            </div>

            {/* Step-by-Step Testing Process Infographic */}
            <div className="space-y-2.5 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ১
                </span>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">২-৩ দিন একটানা চলতে দিন</p>
                  <p className="text-slate-600 leading-relaxed">
                    বিজ্ঞাপন চালু করে প্রথম ২-৩ দিন কোনো পরিবর্তন করবেন না। ফেসবুকের রোবটকে বুঝতে দিন কোন ক্রিয়েটিভে মানুষ বেশি চ্যাট করছে।
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ২
                </span>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <p className="font-bold text-emerald-950">সেরা অ্যাডটি চালু রাখুন (Winner Ad)</p>
                  <p className="text-emerald-900 leading-relaxed">
                    যে ছবি বা ভিডিওটিতে সবচেয়ে বেশি মেসেজ ও ক্লিক এসেছে এবং প্রতি মেসেজের খরচ কম, সেটি চালু রাখুন।
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ৩
                </span>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <p className="font-bold text-rose-950">দুর্বল অ্যাডটি বন্ধ করুন (Kill Loser)</p>
                  <p className="text-rose-900 leading-relaxed">
                    যেটিতে ক্লিক কম ও খরচ বেশি হয়েছে সেটি পজ (Pause) করে তার জায়গায় নতুন আরেকটি ভিডিও বা ছবি দিয়ে টেস্ট করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সেটআপ গাইডে যান</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(5);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <span>৭ দিনের লঞ্চ গাইডে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
