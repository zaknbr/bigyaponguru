'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { diagnoseAdResults } from '@/config/resultDoctorEngine';
import { formatBDT, toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
} from 'lucide-react';

export function Step6ResultDoctor() {
  const { calculatedPlan, setCurrentStep, useBengaliDigits } = useApp();

  const [inputs, setInputs] = useState({
    spend: 1500,
    reach: 8500,
    clicks: 180,
    conversations: 25,
    sales: 4,
    daysRunning: 3,
  });

  const diagnosis = diagnoseAdResults(
    {
      spentBudget: inputs.spend,
      reach: inputs.reach,
      clicks: inputs.clicks,
      conversions: inputs.sales,
      actualSalesCount: inputs.sales,
    },
    calculatedPlan.breakEvenCPA
  );

  // Real-time calculated metrics
  const cpc = inputs.clicks > 0 ? (inputs.spend / inputs.clicks).toFixed(2) : '০';
  const ctr = inputs.reach > 0 ? ((inputs.clicks / inputs.reach) * 100).toFixed(2) : '০';
  const convRate = inputs.conversations > 0 ? ((inputs.sales / inputs.conversations) * 100).toFixed(1) : '০';
  const cpa = inputs.sales > 0 ? Math.round(inputs.spend / inputs.sales) : inputs.spend;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Glassmorphic Header */}
      <div className="glass-card p-6 rounded-3xl space-y-3 border-emerald-500/20 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            স্মার্ট এআই রোগ নির্ণয় ও সমাধান
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          রেজাল্ট ডক্টর (বিজ্ঞাপন পারফরম্যান্স অ্যানালাইজার)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          আপনার বিজ্ঞাপনের বর্তমান ডাটা দিন—ডক্টর তাৎক্ষণিকভাবে রোগ নির্ণয় করে জানিয়ে দেবে কোথায় সমস্যা এবং কী পরিবর্তন করতে হবে।
        </p>
      </div>

      {/* Input Data Grid */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm">
        <h3 className="font-bold text-base text-slate-900">বিজ্ঞাপনের বর্তমান তথ্য লিখুন:</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">মোট খরচ (৳):</label>
            <input
              type="number"
              value={inputs.spend || ''}
              onChange={(e) => setInputs({ ...inputs, spend: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="১৫০০"
            />
          </div>

          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">রিচ (কতজন দেখেছে):</label>
            <input
              type="number"
              value={inputs.reach || ''}
              onChange={(e) => setInputs({ ...inputs, reach: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="৮৫০০"
            />
          </div>

          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">ক্লিক সংখ্যা:</label>
            <input
              type="number"
              value={inputs.clicks || ''}
              onChange={(e) => setInputs({ ...inputs, clicks: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="১৮০"
            />
          </div>

          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">মেসেজ/ইনকোয়ারি:</label>
            <input
              type="number"
              value={inputs.conversations || ''}
              onChange={(e) => setInputs({ ...inputs, conversations: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="২৫"
            />
          </div>

          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">সফল অর্ডার/বিক্রি:</label>
            <input
              type="number"
              value={inputs.sales || ''}
              onChange={(e) => setInputs({ ...inputs, sales: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="৪"
            />
          </div>

          <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold text-slate-700">বিজ্ঞাপন চলছে কতদিন:</label>
            <input
              type="number"
              value={inputs.daysRunning || ''}
              onChange={(e) => setInputs({ ...inputs, daysRunning: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              placeholder="৩"
            />
          </div>
        </div>
      </div>

      {/* 2026 Interactive Metric Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* CPC Gauge */}
        <div className="glass-card p-4 rounded-3xl border-slate-200 text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-slate-500 font-semibold">ক্লিক খরচ (CPC)</span>
            <JargonBadge id="cpc" label="?" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            ৳{useBengaliDigits ? toBengaliDigits(cpc) : cpc}
          </p>
          <span className="text-[11px] font-bold text-slate-500">টার্গেট: ৩-৭ ৳</span>
        </div>

        {/* CTR Gauge */}
        <div className="glass-card p-4 rounded-3xl border-slate-200 text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-slate-500 font-semibold">ক্লিক হার (CTR)</span>
            <JargonBadge id="ctr" label="?" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {useBengaliDigits ? toBengaliDigits(ctr) : ctr}%
          </p>
          <span className="text-[11px] font-bold text-emerald-700">টার্গেট: ১.৫%+</span>
        </div>

        {/* Conversion Rate Gauge */}
        <div className="glass-card p-4 rounded-3xl border-slate-200 text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-slate-500 font-semibold">মেসেজ কনভার্সন</span>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {useBengaliDigits ? toBengaliDigits(convRate) : convRate}%
          </p>
          <span className="text-[11px] font-bold text-slate-500">টার্গেট: ১০-২০%</span>
        </div>

        {/* CPA Gauge */}
        <div className="glass-card p-4 rounded-3xl border-slate-200 text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-slate-500 font-semibold">প্রতি সেলে খরচ (CPA)</span>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-800">
            ৳{useBengaliDigits ? toBengaliDigits(cpa) : cpa}
          </p>
          <span className="text-[11px] font-bold text-emerald-700">লিমিট: ৳{formatBDT(calculatedPlan.breakEvenCPA, useBengaliDigits)}</span>
        </div>
      </div>

      {/* Traffic Light Diagnosis Result Card */}
      <div
        className={`glass-card p-6 sm:p-7 rounded-3xl space-y-5 border-2 shadow-lg ${
          diagnosis.status === 'green'
            ? 'border-emerald-500 bg-emerald-50/40'
            : diagnosis.status === 'yellow'
            ? 'border-amber-500 bg-amber-50/40'
            : 'border-rose-500 bg-rose-50/40'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            {diagnosis.status === 'green' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : diagnosis.status === 'yellow' ? (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600" />
            )}
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {diagnosis.headline}
            </h3>
          </div>

          <span
            className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
              diagnosis.status === 'green'
                ? 'bg-emerald-600 text-white'
                : diagnosis.status === 'yellow'
                ? 'bg-amber-500 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            {diagnosis.status === 'green'
              ? 'চমৎকার পারফরম্যান্স'
              : diagnosis.status === 'yellow'
              ? 'সতর্কতা ও সমন্বয়'
              : 'জরুরি মেরামত'}
          </span>
        </div>

        {/* Diagnosis & Prescriptions */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase">সারসংক্ষেপ:</p>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              {diagnosis.summary}
            </p>
          </div>

          {diagnosis.diagnoses && diagnosis.diagnoses.length > 0 && (
            <div className="space-y-2">
              {diagnosis.diagnoses.map((d, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <p className="font-bold text-sm text-slate-900">⚠️ {d.problemBangla}</p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{d.explanationBangla}</p>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <p className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              {diagnosis.nextAction.title}:
            </p>
            <div className="space-y-2">
              {diagnosis.nextAction.actionSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 font-medium">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(5)}
          className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>লঞ্চ গাইডে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(7);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <span>শব্দকোষ ও FAQ দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
