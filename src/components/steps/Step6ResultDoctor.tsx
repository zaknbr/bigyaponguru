'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { diagnoseAdResults } from '@/config/resultDoctorEngine';
import { formatBDT, formatDecimal } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react';

export function Step6ResultDoctor() {
  const { doctorInput, setDoctorInput, calculatedPlan, setCurrentStep, useBengaliDigits } = useApp();

  const verdict = diagnoseAdResults(doctorInput, calculatedPlan.breakEvenCPA);

  // Quick preset test cases for user convenience
  const loadPreset = (type: 'good' | 'low_ctr' | 'no_conversions' | 'high_cpa') => {
    if (type === 'good') {
      setDoctorInput({ spentBudget: 1800, reach: 9500, clicks: 280, conversions: 26 });
    } else if (type === 'low_ctr') {
      setDoctorInput({ spentBudget: 1500, reach: 11000, clicks: 65, conversions: 5 });
    } else if (type === 'no_conversions') {
      setDoctorInput({ spentBudget: 1200, reach: 6000, clicks: 190, conversions: 0 });
    } else if (type === 'high_cpa') {
      setDoctorInput({ spentBudget: 2500, reach: 8000, clicks: 120, conversions: 4 });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">অ্যাড রেজাল্ট ডক্টর (Ad Doctor)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          আপনার চলমান বিজ্ঞাপনের খরচ ও ফলাফল নিচে লিখুন। রেজাল্ট ডক্টর ট্রাফিক-লাইট সংকেতের মাধ্যমে জানিয়ে দেবে আপনার অ্যাড লাভজনক নাকি পরিবর্তন প্রয়োজন।
        </p>

        {/* Preset quick test buttons */}
        <div className="pt-1">
          <p className="text-[11px] text-slate-400 mb-1.5 font-medium">নমুনা ডাটা দিয়ে দ্রুত পরীক্ষা করুন:</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => loadPreset('good')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold"
            >
              🟢 সফল অ্যাড টেস্ট
            </button>
            <button
              type="button"
              onClick={() => loadPreset('low_ctr')}
              className="px-2.5 py-1 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 text-[11px] font-bold"
            >
              🟡 কম ক্লিক সমস্যা
            </button>
            <button
              type="button"
              onClick={() => loadPreset('no_conversions')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-[11px] font-bold"
            >
              🔴 মেসেজ না পাওয়ার সমস্যা
            </button>
          </div>
        </div>
      </div>

      {/* Input Metrics Grid */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between">
          <span>আপনার বিজ্ঞাপনের আসল সংখ্যাগুলো লিখুন:</span>
          <span className="text-xs font-normal text-slate-500">(Ads Manager থেকে দেখে নিন)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Spend */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              ১. মোট কত টাকা খরচ হয়েছে (Spend):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">৳</span>
              <input
                type="number"
                value={doctorInput.spentBudget || ''}
                onChange={(e) => setDoctorInput({ ...doctorInput, spentBudget: Number(e.target.value) })}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="যেমন: ১৫০০"
              />
            </div>
          </div>

          {/* Reach */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                ২. কত মানুষের কাছে পৌঁছেছে (Reach):
              </label>
              <JargonBadge id="reach" label="Reach কি?" />
            </div>
            <input
              type="number"
              value={doctorInput.reach || ''}
              onChange={(e) => setDoctorInput({ ...doctorInput, reach: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="যেমন: ৮৫০০"
            />
          </div>

          {/* Clicks */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                ৩. মোট কতটি ক্লিক পেয়েছেন (Link Clicks):
              </label>
              <JargonBadge id="ctr" label="CTR কি?" />
            </div>
            <input
              type="number"
              value={doctorInput.clicks || ''}
              onChange={(e) => setDoctorInput({ ...doctorInput, clicks: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="যেমন: ২২০"
            />
          </div>

          {/* Conversions / Messages */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              ৪. কতগুলো মেসেজ বা সেল পেয়েছেন (Messages/Sales):
            </label>
            <input
              type="number"
              value={doctorInput.conversions || ''}
              onChange={(e) =>
                setDoctorInput({ ...doctorInput, conversions: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="যেমন: ১৮"
            />
          </div>
        </div>
      </div>

      {/* Traffic-Light Verdict Result Card */}
      <div
        className={`p-6 rounded-3xl border-2 shadow-lg transition-all space-y-4 ${
          verdict.status === 'green'
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : verdict.status === 'yellow'
            ? 'bg-amber-50/80 border-amber-300 text-amber-950'
            : 'bg-rose-50/80 border-rose-300 text-rose-950'
        }`}
      >
        {/* Verdict Header */}
        <div className="flex items-start justify-between gap-3 border-b pb-4 border-current/10">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md ${
                verdict.status === 'green'
                  ? 'bg-emerald-600'
                  : verdict.status === 'yellow'
                  ? 'bg-amber-500'
                  : 'bg-rose-600'
              }`}
            >
              {verdict.status === 'green' ? (
                <CheckCircle2 className="w-7 h-7" />
              ) : verdict.status === 'yellow' ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <XCircle className="w-7 h-7" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-current/20">
                {verdict.status === 'green'
                  ? '🟢 সবুজ সংকেত (সব ঠিক আছে)'
                  : verdict.status === 'yellow'
                  ? '🟡 হলুদ সংকেত (সতর্কতা)'
                  : '🔴 লাল সংকেত (জরুরি পদক্ষেপ)'}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold mt-1 leading-snug">
                {verdict.headline}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed">{verdict.summary}</p>

        {/* Live Metrics Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-white p-3 rounded-2xl border border-current/10 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">CTR (ক্লিক হার)</span>
              <JargonBadge id="ctr" label="?" />
            </div>
            <p className="text-base font-bold text-slate-900 mt-1">
              {formatDecimal(verdict.metrics.ctr, 1, useBengaliDigits)}%
            </p>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                verdict.benchmarks.ctrStatus === 'good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : verdict.benchmarks.ctrStatus === 'average'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {verdict.benchmarks.ctrStatus === 'good'
                ? 'চমৎকার (>২%)'
                : verdict.benchmarks.ctrStatus === 'average'
                ? 'মোটামুটি (১.২-২%)'
                : 'দুর্বল (<১.২%)'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-current/10 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">CPM (১০০০ রিচ)</span>
              <JargonBadge id="cpm" label="?" />
            </div>
            <p className="text-base font-bold text-slate-900 mt-1">
              {formatBDT(verdict.metrics.cpm, useBengaliDigits)}
            </p>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                verdict.benchmarks.cpmStatus === 'good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : verdict.benchmarks.cpmStatus === 'average'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {verdict.benchmarks.cpmStatus === 'good'
                ? 'কম খরচ (সাশ্রয়ী)'
                : verdict.benchmarks.cpmStatus === 'average'
                ? 'স্বাভাবিক'
                : 'অতিরিক্ত বেশি'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-current/10 shadow-2xs">
            <span className="text-[11px] text-slate-500">প্রতি ক্লিকে খরচ (CPC)</span>
            <p className="text-base font-bold text-slate-900 mt-1">
              {formatBDT(verdict.metrics.cpc, useBengaliDigits)}
            </p>
            <span className="text-[10px] text-slate-500">গড়ে প্রতি ক্লিক</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-current/10 shadow-2xs">
            <span className="text-[11px] text-slate-500">প্রতি মেসেজে খরচ</span>
            <p className="text-base font-bold text-slate-900 mt-1">
              {formatBDT(verdict.metrics.costPerConversion, useBengaliDigits)}
            </p>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                verdict.benchmarks.costStatus === 'good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : verdict.benchmarks.costStatus === 'average'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {verdict.benchmarks.costStatus === 'good'
                ? 'লাভজনক'
                : verdict.benchmarks.costStatus === 'average'
                ? 'সীমার মধ্যে'
                : 'ঝুঁকিপূর্ণ'}
            </span>
          </div>
        </div>

        {/* Root-cause Diagnoses */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            সমস্যার মূল কারণ (Root-Cause Diagnosis):
          </h4>
          {verdict.diagnoses.map((diag, i) => (
            <div
              key={i}
              className="bg-white p-3.5 rounded-2xl border border-current/15 space-y-1 shadow-2xs"
            >
              <p className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                {diag.problemBangla}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">{diag.explanationBangla}</p>
            </div>
          ))}
        </div>

        {/* Clear Action Steps */}
        <div className="bg-white p-4 rounded-2xl border border-current/15 space-y-2 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {verdict.nextAction.title}:
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {verdict.nextAction.actionSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(5)}
          className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে যান</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(7)}
          className="flex-[2] py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <span>শব্দকোষ ও FAQ দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
