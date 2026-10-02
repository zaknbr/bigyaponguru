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
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  Circle,
  MessageCircle,
  Globe,
  PhoneCall,
  Wand2,
  Camera,
  Video,
  ShieldCheck,
  FlaskConical,
  Clock,
} from 'lucide-react';

export function Step4CreativeKit() {
  const {
    fourQuestionCopy,
    updateFourQuestionCopy,
    checkedPolicyIds,
    togglePolicyCheck,
    profile,
    setCurrentStep,
    useBengaliDigits,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'copy' | 'photo' | 'video' | 'policy' | 'testing'>('copy');
  const [copyWizardStep, setCopyWizardStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyVariants = generateFourStepAdCopies(fourQuestionCopy);

  const categoryCollection =
    CATEGORY_HOOK_MAP[profile.category] || CATEGORY_HOOK_MAP.fashion || CATEGORY_HOOK_MAP.general;
  const categoryHooks = categoryCollection.hooks;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const policyPassedCount = checkedPolicyIds.length;
  const policyTotalCount = POLICY_SAFETY_CHECKS.length;
  const policyPercent = Math.round((policyPassedCount / policyTotalCount) * 100);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Glassmorphic Tab Ribbon */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            বিজ্ঞাপন তৈরি ও ক্রিয়েটিভ কিট
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          বিজ্ঞাপনের কপি, ছবি, ভিডিও স্ক্রিপ্ট ও পলিসি গাইড
        </h2>
        <p className="text-sm text-slate-600">
          উচ্চ কনভার্সন পাওয়ার জন্য পরীক্ষিত বাংলা অ্যাড কপি এবং ১৫-সেকেন্ডের ভাইরাল ভিডিও ফর্মুলা।
        </p>

        {/* 2026 Glass Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {[
            { id: 'copy', label: 'ক্যাপশন বিল্ডার', icon: Wand2 },
            { id: 'photo', label: 'ছবির নিয়ম', icon: Camera },
            { id: 'video', label: '১৫ সে. ভিডিও', icon: Video },
            { id: 'policy', label: 'পলিসি চেক', icon: ShieldCheck },
            { id: 'testing', label: 'টেস্টিং রুল', icon: FlaskConical },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'copy' | 'photo' | 'video' | 'policy' | 'testing')}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                    : 'glass-card hover:bg-white text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PART A: 4-QUESTION AD COPY BUILDER */}
      {activeTab === 'copy' && (
        <div className="space-y-6 animate-fade-in">
          {/* Question Wizard Box */}
          <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-5 border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                প্রশ্ন {useBengaliDigits ? toBengaliDigits(copyWizardStep) : copyWizardStep} /{' '}
                {useBengaliDigits ? toBengaliDigits(4) : 4}
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCopyWizardStep(s)}
                    className={`h-2 rounded-full transition-all ${
                      copyWizardStep === s
                        ? 'w-6 bg-slate-900'
                        : copyWizardStep > s
                        ? 'w-2 bg-emerald-500'
                        : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Q1 */}
            {copyWizardStep === 1 && (
              <div className="space-y-3 animate-fade-in">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ১. আপনি কী পণ্য বিক্রি করছেন?
                </h3>
                <input
                  type="text"
                  value={fourQuestionCopy.productName}
                  onChange={(e) => updateFourQuestionCopy({ productName: e.target.value })}
                  placeholder="যেমন: প্রিমিয়াম ব্লেন্ডেড কটন পাঞ্জাবি"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm sm:text-base font-medium text-slate-900"
                />
              </div>
            )}

            {/* Q2 */}
            {copyWizardStep === 2 && (
              <div className="space-y-3 animate-fade-in">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ২. ক্রেতার সবচেয়ে বড় সমস্যা বা মূল চাহিদা কী?
                </h3>
                <input
                  type="text"
                  value={fourQuestionCopy.customerProblem}
                  onChange={(e) => updateFourQuestionCopy({ customerProblem: e.target.value })}
                  placeholder="যেমন: গরমে সহজে ঘাম শুকায় না ও সাধারণ কাপড়ের রং দ্রুত নষ্ট হয়"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm sm:text-base font-medium text-slate-900"
                />
              </div>
            )}

            {/* Q3 */}
            {copyWizardStep === 3 && (
              <div className="space-y-3 animate-fade-in">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ৩. আপনার সেরা সুবিধা বা অফার কী?
                </h3>
                <input
                  type="text"
                  value={fourQuestionCopy.specialOffer}
                  onChange={(e) => updateFourQuestionCopy({ specialOffer: e.target.value })}
                  placeholder="যেমন: সারাদেশে ফ্রি হোম ডেলিভারি ও দেখে মূল্য পরিশোধের সুবিধা"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm sm:text-base font-medium text-slate-900"
                />
              </div>
            )}

            {/* Q4 */}
            {copyWizardStep === 4 && (
              <div className="space-y-3 animate-fade-in">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ৪. ক্রেতা কীভাবে অর্ডার করবে?
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'messenger' as SalesChannel, label: 'ইনবক্স / মেসেঞ্জারে', icon: MessageCircle },
                    { id: 'whatsapp' as SalesChannel, label: 'হোয়াটসঅ্যাপে', icon: MessageCircle },
                    { id: 'website' as SalesChannel, label: 'ওয়েবসাইটে', icon: Globe },
                    { id: 'phone' as SalesChannel, label: 'সরাসরি কলে', icon: PhoneCall },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => updateFourQuestionCopy({ orderMethod: ch.id })}
                      className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all flex items-center gap-2.5 ${
                        fourQuestionCopy.orderMethod === ch.id
                          ? 'border-2 border-emerald-500 bg-emerald-50 text-slate-900 shadow-xs'
                          : 'glass-card hover:bg-white text-slate-700'
                      }`}
                    >
                      <ch.icon className="w-4 h-4 text-emerald-600" />
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {copyWizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep - 1)}
                  className="px-4 py-2 rounded-xl glass-card hover:bg-white text-slate-700 text-xs font-bold transition-all"
                >
                  $\leftarrow$ আগের প্রশ্ন
                </button>
              ) : <div />}

              {copyWizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep + 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  পরের প্রশ্ন $\rightarrow$
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700">✓ ৩টি কপি তৈরি হয়েছে!</span>
              )}
            </div>
          </div>

          {/* 3 Generated Ad Copies */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              তৈরি হওয়া ৩টি রেডিমেড বিজ্ঞাপন ক্যাপশন:
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {copyVariants.map((variant) => {
                const isCopied = copiedId === variant.id;

                return (
                  <div
                    key={variant.id}
                    className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                          {variant.styleName}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                          {variant.badge}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(variant.id, variant.fullCopy)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'কপি সফল!' : 'কপি করুন'}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                      <p className="font-extrabold text-sm sm:text-base text-slate-900">{variant.headline}</p>
                      <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                        {variant.bodyText}
                      </p>
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl inline-block">
                          👉 {variant.ctaText}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PART B: PHOTO GUIDE */}
      {activeTab === 'photo' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DO Card */}
            <div className="glass-card p-6 rounded-3xl space-y-3 border-emerald-500/30">
              <h3 className="font-bold text-base text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ছবির ক্ষেত্রে যা করবেন (DOs)
              </h3>
              <ul className="space-y-2.5">
                {PHOTO_DO_RULES.map((rule, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{rule.title}</p>
                      <p className="text-xs text-emerald-800/80 mt-0.5">{rule.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONT Card */}
            <div className="glass-card p-6 rounded-3xl space-y-3 border-rose-500/30">
              <h3 className="font-bold text-base text-rose-800 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                ছবির ক্ষেত্রে যা করবেন না (DONTs)
              </h3>
              <ul className="space-y-2.5">
                {PHOTO_DONT_RULES.map((rule, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5 font-medium">
                    <span className="text-rose-600 font-bold flex-shrink-0">✕</span>
                    <div>
                      <p className="font-bold">{rule.title}</p>
                      <p className="text-xs text-rose-800/80 mt-0.5">{rule.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Placement Sizes Table */}
          <div className="glass-card p-6 rounded-3xl space-y-3">
            <h3 className="font-bold text-base text-slate-900">প্লেসমেন্ট সাইজ নির্দেশিকা</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-2 font-semibold">প্লেসমেন্ট</th>
                    <th className="pb-2 font-semibold">অনুপাত</th>
                    <th className="pb-2 font-semibold">রেজোলিউশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PLACEMENT_SIZES.map((row, i) => (
                    <tr key={i} className="text-slate-800 font-medium">
                      <td className="py-2.5 font-semibold">{row.placement}</td>
                      <td className="py-2.5 font-bold text-slate-900">{row.aspectRatio}</td>
                      <td className="py-2.5 text-slate-500">{row.recommendedResolution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PART C: 15-SEC VIDEO SCRIPT WITH INTERACTIVE TIMELINE GRAPH */}
      {activeTab === 'video' && (
        <div className="space-y-6 animate-fade-in">
          {/* Visual 15-Second Timeline Bar Graph */}
          <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  ১৫-সেকেন্ডের ভাইরাল ভিডিও টাইমলাইন (Timeline Graph)
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800">
                রিলেস ও টিকটক
              </span>
            </div>

            {/* Interactive Timeline Bar */}
            <div className="space-y-2">
              <div className="h-5 w-full rounded-full bg-slate-100 overflow-hidden flex gap-1 p-0.5 shadow-inner">
                <div style={{ width: '20%' }} className="bg-rose-500 h-full rounded-l-full" title="০-৩ সেকেন্ড: হুক" />
                <div style={{ width: '26%' }} className="bg-amber-500 h-full" title="৪-৭ সেকেন্ড: সমস্যা" />
                <div style={{ width: '27%' }} className="bg-blue-500 h-full" title="৮-১১ সেকেন্ড: সমাধান" />
                <div style={{ width: '13%' }} className="bg-indigo-500 h-full" title="১২-১৩ সেকেন্ড: অফার" />
                <div style={{ width: '14%' }} className="bg-emerald-500 h-full rounded-r-full" title="১৪-১৫ সেকেন্ড: CTA" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-100">
                  <p className="text-[11px] font-bold text-rose-800">০-৩ সেকেন্ড</p>
                  <p className="text-xs font-semibold text-rose-950">ম্যাজিক হুক</p>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-[11px] font-bold text-amber-800">৪-৭ সেকেন্ড</p>
                  <p className="text-xs font-semibold text-amber-950">সমস্যা/চাহিদা</p>
                </div>
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-[11px] font-bold text-blue-800">৮-১১ সেকেন্ড</p>
                  <p className="text-xs font-semibold text-blue-950">ব্যবহার ও ফল</p>
                </div>
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-[11px] font-bold text-indigo-800">১২-১৩ সেকেন্ড</p>
                  <p className="text-xs font-semibold text-indigo-950">সেরা অফার</p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-[11px] font-bold text-emerald-800">১৪-১৫ সেকেন্ড</p>
                  <p className="text-xs font-semibold text-emerald-950">অর্ডার CTA</p>
                </div>
              </div>
            </div>

            {/* Script Breakdown Cards */}
            <div className="space-y-2.5 pt-2">
              {FIFTEEN_SEC_SCRIPT.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sec.stageName}</span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {sec.timing}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{sec.whatToDo}</p>
                  <p className="text-xs text-indigo-800 font-semibold italic bg-indigo-50/50 p-2 rounded-lg">
                    {sec.exampleSpokenBangla}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bengali Hooks */}
          <div className="glass-card p-6 rounded-3xl space-y-3">
            <h3 className="font-bold text-base text-slate-900">
              আপনার ক্যাটাগরির জন্য ৫টি ভাইরাল হুক ডায়লগ:
            </h3>
            <div className="space-y-2">
              {categoryHooks.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{h.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{h.spokenBangla}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(`hook-${i}`, h.spokenBangla)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 flex-shrink-0"
                    title="কপি করুন"
                  >
                    {copiedId === `hook-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PART D: POLICY SAFETY CHECK */}
      {activeTab === 'policy' && (
        <div className="space-y-6 animate-fade-in">
          {/* Policy Readiness Meter */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900">মেটা ও টিকটক পলিসি চেকলিস্ট</h3>
                <p className="text-xs text-slate-500">বিজ্ঞাপন প্রকাশের আগে সবগুলো আইটেম টিক দিন</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                policyPercent === 100
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {useBengaliDigits ? toBengaliDigits(policyPassedCount) : policyPassedCount} /{' '}
                {useBengaliDigits ? toBengaliDigits(policyTotalCount) : policyTotalCount} উত্তীর্ণ ({useBengaliDigits ? toBengaliDigits(policyPercent) : policyPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  policyPercent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${policyPercent}%` }}
              />
            </div>

            <div className="space-y-2.5 pt-2">
              {POLICY_SAFETY_CHECKS.map((item) => {
                const isChecked = checkedPolicyIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => togglePolicyCheck(item.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'glass-card hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.plainRule}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PART E: TESTING RULE */}
      {activeTab === 'testing' && (
        <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200 shadow-md animate-fade-in">
          <h3 className="font-bold text-base sm:text-lg text-slate-900">
            বিজ্ঞাপন টেস্টিং ও অপ্টিমাইজেশন নিয়ম (Testing Rule)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg">১ম ধাপ</span>
              <p className="font-bold text-sm text-slate-900 mt-1">২-৩টি ভিন্ন বিজ্ঞাপন</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                একই পণ্যের জন্য ভিন্ন ছবি বা ভিন্ন হুক দিয়ে ২-৩টি অ্যাড তৈরি করে একসাথে চালান।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg">২য় ধাপ</span>
              <p className="font-bold text-sm text-slate-900 mt-1">২-৩ দিন সময় দিন</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                প্রথম ৪৮-৭২ ঘণ্টা অ্যালগরিদম শিখতে সময় নেয়, এর মধ্যে অ্যাড এডিট বা বন্ধ করবেন না।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg">৩য় ধাপ</span>
              <p className="font-bold text-sm text-slate-900 mt-1">সেরাটি রেখে বাকি বন্ধ</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                যে বিজ্ঞাপনে সবচেয়ে কম খরচে সেল আসছে সেটি চালু রেখে দুর্বল অ্যাডগুলো বন্ধ করে দিন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সেটআপ গাইডে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(5);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <span>৭ দিনের লঞ্চ গাইডে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
