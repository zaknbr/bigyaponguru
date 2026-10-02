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

  const copyVariants = generateFourStepAdCopies(fourQuestionCopy);

  const categoryHooks =
    CATEGORY_HOOK_MAP[profile.category] || CATEGORY_HOOK_MAP.fashion || CATEGORY_HOOK_MAP.general;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Clean Header */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900">ক্রিয়েটিভ ও ক্যাপশন কিট</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          বাংলা বিজ্ঞাপন ক্যাপশন, ছবির নিয়ম, ১৫-সেকেন্ড ভিডিও স্ক্রিপ্ট ও পলিসি চেকলিস্ট
        </p>

        {/* 5-Tab Navigation Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {[
            { id: 'copy' as const, label: '১. বাংলা কপি বিল্ডার' },
            { id: 'photo' as const, label: '২. ছবির গাইড ও সাইজ' },
            { id: 'video' as const, label: '৩. ভিডিও ও হুক' },
            { id: 'policy' as const, label: '৪. পলিসি চেক' },
            { id: 'testing' as const, label: '৫. টেস্টিং রুল' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PART A: 4-Question Ad Copy Builder */}
      {activeTab === 'copy' && (
        <div className="space-y-5 animate-fade-in">
          {/* 4-Question Interactive Wizard */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-semibold text-sm text-slate-900">
                ৪টি সহজ প্রশ্নের উত্তর দিন $\rightarrow$ ৩টি রেডিমেড ক্যাপশন পান
              </h3>
              <span className="text-xs font-medium text-slate-400">
                প্রশ্ন {useBengaliDigits ? toBengaliDigits(copyWizardStep) : copyWizardStep} /{' '}
                {useBengaliDigits ? toBengaliDigits(4) : 4}
              </span>
            </div>

            {/* Question 1 */}
            {copyWizardStep === 1 && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-xs font-medium text-slate-700">
                  ১. আপনি কী বিক্রি করছেন? (পণ্যের নাম বা ধরন)
                </label>
                <input
                  type="text"
                  value={fourQuestionCopy.productName}
                  onChange={(e) => updateFourQuestionCopy({ productName: e.target.value })}
                  placeholder="যেমন: প্রিমিয়াম সুতি শাড়ি"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <p className="text-[11px] text-slate-400">যেমন: হ্যান্ডলুম সুতি শাড়ি, চামড়ার মানিব্যাগ, অর্গানিক মধু</p>
              </div>
            )}

            {/* Question 2 */}
            {copyWizardStep === 2 && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-xs font-medium text-slate-700">
                  ২. ক্রেতার সবচেয়ে বড় সমস্যা বা চাহিদা কী?
                </label>
                <input
                  type="text"
                  value={fourQuestionCopy.customerProblem}
                  onChange={(e) => updateFourQuestionCopy({ customerProblem: e.target.value })}
                  placeholder="যেমন: বাজারে নকল পণ্যে প্রতারিত হওয়ার ভয়"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <p className="text-[11px] text-slate-400">যেমন: গরমে কাপড়ের অস্বস্তি, নকল পণ্য পাওয়ার ভয়</p>
              </div>
            )}

            {/* Question 3 */}
            {copyWizardStep === 3 && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-xs font-medium text-slate-700">
                  ৩. আপনার সেরা সুবিধা বা বিশেষ অফার কী?
                </label>
                <input
                  type="text"
                  value={fourQuestionCopy.specialOffer}
                  onChange={(e) => updateFourQuestionCopy({ specialOffer: e.target.value })}
                  placeholder="যেমন: আজকের অর্ডারে সারা দেশে ফ্রি ডেলিভারি"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <p className="text-[11px] text-slate-400">যেমন: ক্যাশ অন ডেলিভারিতে দেখে নেওয়ার সুযোগ, ফ্রি ডেলিভারি</p>
              </div>
            )}

            {/* Question 4 */}
            {copyWizardStep === 4 && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-xs font-medium text-slate-700">
                  ৪. ক্রেতা কীভাবে অর্ডার করবে?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { id: 'messenger' as SalesChannel, label: 'ফেসবুক ইনবক্স', icon: MessageCircle },
                    { id: 'whatsapp' as SalesChannel, label: 'হোয়াটসঅ্যাপ চ্যাট', icon: MessageCircle },
                    { id: 'website' as SalesChannel, label: 'ওয়েবসাইট লিংক', icon: Globe },
                    { id: 'phone' as SalesChannel, label: 'সরাসরি কল', icon: PhoneCall },
                  ].map((m) => {
                    const isSel = fourQuestionCopy.orderMethod === m.id;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => updateFourQuestionCopy({ orderMethod: m.id })}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                          isSel
                            ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wizard Navigation */}
            <div className="flex items-center justify-between pt-2">
              {copyWizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep - 1)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>আগের প্রশ্ন</span>
                </button>
              ) : (
                <div />
              )}

              {copyWizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCopyWizardStep(copyWizardStep + 1)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs flex items-center gap-1"
                >
                  <span>পরের প্রশ্ন</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>ক্যাপশন প্রস্তুত নিচে দেখুন 👇</span>
                </span>
              )}
            </div>
          </div>

          {/* 3 Ready-to-copy Variants */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 text-sm">
              ৩টি প্রস্তুতকৃত বাংলা ক্যাপশন ভ্যারিয়েন্ট
            </h3>

            <div className="space-y-3">
              {copyVariants.map((variant) => {
                const isCopied = copiedId === variant.id;

                return (
                  <div
                    key={variant.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {variant.badge}
                        </span>
                        <h4 className="font-semibold text-slate-900 text-sm mt-1">
                          {variant.styleName}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(variant.id, variant.fullCopy)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-100 space-y-2 text-xs text-slate-700 leading-relaxed font-sans">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">হেডলাইন:</span>
                        <p className="font-semibold text-slate-900">{variant.headline}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">মূল লেখা:</span>
                        <p className="whitespace-pre-line">{variant.bodyText}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">কল-টু-অ্যাকশন:</span>
                        <p className="font-medium text-emerald-800 bg-emerald-50/60 p-1.5 rounded mt-0.5">
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

      {/* PART B: Photo Guide */}
      {activeTab === 'photo' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* DOs */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="font-semibold text-xs sm:text-sm text-emerald-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">✓</span>
                ছবিতে যা যা করবেন (DOs)
              </h4>
              <div className="space-y-1.5">
                {PHOTO_DO_RULES.map((rule, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50/60 rounded-lg text-xs space-y-0.5">
                    <p className="font-semibold text-slate-900">{rule.title}</p>
                    <p className="text-slate-500">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="font-semibold text-xs sm:text-sm text-rose-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">✕</span>
                ছবিতে যা করবেন না (DON&rsquo;Ts)
              </h4>
              <div className="space-y-1.5">
                {PHOTO_DONT_RULES.map((rule, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50/60 rounded-lg text-xs space-y-0.5">
                    <p className="font-semibold text-slate-900">{rule.title}</p>
                    <p className="text-slate-500">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Sizes */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
              প্লেসমেন্ট অনুযায়ী প্রস্তাবিত সাইজ
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-medium">
                    <th className="p-2.5">প্লেসমেন্ট</th>
                    <th className="p-2.5">রেশিও</th>
                    <th className="p-2.5">সাইজ</th>
                    <th className="p-2.5">উপকারিতা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PLACEMENT_SIZES.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-medium text-slate-900">{row.placement}</td>
                      <td className="p-2.5 text-indigo-700">{row.aspectRatio}</td>
                      <td className="p-2.5 font-mono text-slate-500">{row.recommendedResolution}</td>
                      <td className="p-2.5 text-slate-500">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PART C: Video Guide */}
      {activeTab === 'video' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
              ১৫-সেকেন্ডের ভিডিও স্ক্রিপ্ট টেমপ্লেট
            </h4>
            <div className="space-y-2">
              {FIFTEEN_SEC_SCRIPT.map((beat, idx) => (
                <div key={idx} className="p-3 bg-slate-50/70 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {beat.timing}
                    </span>
                    <span className="font-medium text-slate-700">{beat.stageName}</span>
                  </div>
                  <p className="text-slate-900 font-medium pl-1">
                    কথা: &ldquo;{beat.exampleSpokenBangla}&rdquo;
                  </p>
                  <p className="text-slate-500 text-[11px] pl-1">
                    দৃশ্য: {beat.visualCue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Hooks */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
              {categoryHooks.categoryNameBangla}-এর জন্য ৫টি পরীক্ষিত বাংলা হুক (প্রথম ৩ সেকেন্ড)
            </h4>
            <div className="space-y-2">
              {categoryHooks.hooks.map((h) => (
                <div key={h.id} className="p-3 bg-slate-50/70 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-800">{h.title}</span>
                    <span className="text-[10px]">{h.psychologicalTrigger}</span>
                  </div>
                  <p className="font-medium text-slate-900">&ldquo;{h.spokenBangla}&rdquo;</p>
                  <p className="text-[11px] text-slate-500">দৃশ্য: {h.visualAction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PART D: Policy Check */}
      {activeTab === 'policy' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                বিজ্ঞাপন দেওয়ার আগের পলিসি চেকলিস্ট
              </h4>
              <span className="text-xs font-medium text-slate-500">
                {checkedPolicyIds.length} / {POLICY_SAFETY_CHECKS.length} যাচাইকৃত
              </span>
            </div>

            <div className="space-y-2">
              {POLICY_SAFETY_CHECKS.map((policy) => {
                const isChecked = checkedPolicyIds.includes(policy.id);

                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => togglePolicyCheck(policy.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h5 className="font-semibold text-xs text-slate-900">{policy.title}</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{policy.plainRule}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {!allPoliciesChecked && (
            <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                পলিসির কোনো নিয়ম অমান্য হলে বিজ্ঞাপন রিজেক্ট হতে পারে। সবগুলো বক্সে টিক দিয়ে নিশ্চিত হোন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* PART E: Testing Rule */}
      {activeTab === 'testing' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-semibold text-sm text-slate-900">
              বিজ্ঞাপন সফল করার গোল্ডেন টেস্টিং রুল
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs">
                <span className="text-[10px] font-medium text-slate-500">অ্যাড ১ (ছবি A)</span>
                <p className="font-semibold text-slate-900 mt-1">স্বাভাবিক আসল ছবি</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs">
                <span className="text-[10px] font-medium text-slate-500">অ্যাড ২ (ছবি B)</span>
                <p className="font-semibold text-slate-900 mt-1">ব্যবহারের দৃশ্য / পরা শট</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs">
                <span className="text-[10px] font-medium text-slate-500">অ্যাড ৩ (ভিডিও)</span>
                <p className="font-semibold text-slate-900 mt-1">১৫-সেকেন্ড ভিডিও</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed pt-1">
              <p><strong>১. প্রথম ২-৩ দিন অপেক্ষা করুন:</strong> বিজ্ঞাপন কোনো এডিট না করে রোবটকে শিখতে দিন।</p>
              <p><strong>২. সেরা অ্যাডটি রাখুন:</strong> যেটিতে বেশি মেসেজ ও কম খরচ আসছে সেটি চালু রাখুন।</p>
              <p><strong>৩. দুর্বলটি বন্ধ করুন:</strong> খরচ বেশি হলে পজ করে নতুন ক্রিয়েটিভ টেস্ট করুন।</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation Buttons */}
      <div className="pt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
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
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span>৭ দিনের লঞ্চ গাইডে যান</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
