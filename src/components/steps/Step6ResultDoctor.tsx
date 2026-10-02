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
      {/* 2026 Executive Header Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-4 border border-blue-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black">অ্যাড রেজাল্ট ডক্টর (Ad Doctor)</h2>
            <p className="text-xs text-blue-200">চলমান বিজ্ঞাপনের আসল পারফরম্যান্স বিশ্লেষণ ও ট্রাফিক-লাইট রোগ নির্ণয়</p>
          </div>
        </div>

        {/* Preset quick test buttons */}
        <div className="pt-2 border-t border-blue-900/60">
          <p className="text-[11px] text-slate-300 mb-2 font-bold">নমুনা ডেটা দিয়ে দ্রুত টেস্ট করে দেখুন:</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadPreset('good')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-bold transition-all active:scale-95"
            >
              🟢 সফল লাভজনক অ্যাড
            </button>
            <button
              type="button"
              onClick={() => loadPreset('low_ctr')}
              className="px-3 py-1.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 text-xs font-bold transition-all active:scale-95"
            >
              🟡 কম ক্লিক সমস্যা (Low CTR)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('no_conversions')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs font-bold transition-all active:scale-95"
            >
              🔴 মেসেজ না পাওয়ার সমস্যা
            </button>
          </div>
        </div>
      </div>

      {/* Input Metrics Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center justify-between">
          <span>আপনার বিজ্ঞাপনের আসল সংখ্যাগুলো লিখুন:</span>
          <span className="text-xs font-semibold text-slate-400">(Ads Manager থেকে দেখে নিন)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Spend */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              ১. মোট কত টাকা খরচ হয়েছে (Spend):
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-black text-base">৳</span>
              <input
                type="number"
                value={doctorInput.spentBudget || ''}
                onChange={(e) => setDoctorInput({ ...doctorInput, spentBudget: Number(e.target.value) })}
                className="w-full pl-9 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="১৫০০"
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
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="৮৫০০"
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
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="২২০"
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
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="১৮"
            />
          </div>
        </div>
      </div>

      {/* Traffic-Light Verdict Result Card */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border-2 shadow-lg transition-all space-y-5 ${
          verdict.status === 'green'
            ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
            : verdict.status === 'yellow'
            ? 'bg-amber-50/90 border-amber-300 text-amber-950'
            : 'bg-rose-50/90 border-rose-300 text-rose-950'
        }`}
      >
        {/* Verdict Header */}
        <div className="flex items-start justify-between gap-3 border-b pb-4 border-current/10">
          <div className="flex items-center gap-3.5">
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
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 border border-current/20">
                {verdict.status === 'green'
                  ? '🟢 সবুজ সংকেত (সব ঠিক আছে)'
                  : verdict.status === 'yellow'
                  ? '🟡 হলুদ সংকেত (সতর্কতা)'
                  : '🔴 লাল সংকেত (জরুরি পদক্ষেপ)'}
              </span>
              <h3 className="text-base sm:text-xl font-black mt-1.5 leading-snug">
                {verdict.headline}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed font-medium">{verdict.summary}</p>

        {/* Live Metrics Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="bg-white p-3.5 rounded-2xl border border-current/10 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-bold">CTR (ক্লিক হার)</span>
              <JargonBadge id="ctr" label="?" />
            </div>
            <p className="text-lg font-black text-slate-900 mt-1">
              {formatDecimal(verdict.metrics.ctr, 1, useBengaliDigits)}%
            </p>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block ${
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

          <div className="bg-white p-3.5 rounded-2xl border border-current/10 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-bold">CPM (১০০০ রিচ)</span>
              <JargonBadge id="cpm" label="?" />
            </div>
            <p className="text-lg font-black text-slate-900 mt-1">
              {formatBDT(verdict.metrics.cpm, useBengaliDigits)}
            </p>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block ${
                verdict.benchmarks.cpmStatus === 'good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : verdict.benchmarks.cpmStatus === 'average'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {verdict.benchmarks.cpmStatus === 'good'
                ? 'সাশ্রয়ী খরচ'
                : verdict.benchmarks.cpmStatus === 'average'
                ? 'স্বাভাবিক'
                : 'বেশি খরচ'}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-current/10 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-bold block">প্রতি ক্লিকে খরচ (CPC)</span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {formatBDT(verdict.metrics.cpc, useBengaliDigits)}
            </p>
            <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">গড়ে প্রতি ক্লিক</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-current/10 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-bold block">প্রতি মেসেজে খরচ</span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {formatBDT(verdict.metrics.costPerConversion, useBengaliDigits)}
            </p>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block ${
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
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
            সমস্যার মূল কারণ (Root-Cause Diagnosis):
          </h4>
          {verdict.diagnoses.map((diag, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl border border-current/15 space-y-1 shadow-2xs"
            >
              <p className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {diag.problemBangla}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{diag.explanationBangla}</p>
            </div>
          ))}
        </div>

        {/* Clear Action Steps */}
        <div className="bg-white p-5 rounded-2xl border border-current/15 space-y-2.5 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {verdict.nextAction.title}:
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            {verdict.nextAction.actionSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
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
          className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>লঞ্চ প্ল্যানে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(7)}
          className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <span>শব্দকোষ ও FAQ দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
