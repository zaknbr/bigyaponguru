'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { diagnoseAdResults } from '@/config/resultDoctorEngine';
import { formatBDT, formatDecimal } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export function Step6ResultDoctor() {
  const { doctorInput, setDoctorInput, calculatedPlan, setCurrentStep, useBengaliDigits } = useApp();

  const verdict = diagnoseAdResults(doctorInput, calculatedPlan.breakEvenCPA);

  const loadPreset = (type: 'good' | 'low_ctr' | 'no_conversions') => {
    if (type === 'good') {
      setDoctorInput({ spentBudget: 1800, reach: 9500, clicks: 280, conversions: 26 });
    } else if (type === 'low_ctr') {
      setDoctorInput({ spentBudget: 1500, reach: 11000, clicks: 65, conversions: 5 });
    } else if (type === 'no_conversions') {
      setDoctorInput({ spentBudget: 1200, reach: 6000, clicks: 190, conversions: 0 });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Clean Header */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900">অ্যাড রেজাল্ট ডক্টর</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার বিজ্ঞাপনের আসল সংখ্যাগুলো লিখুন। ডক্টর জানিয়ে দেবে আপনার অ্যাড লাভজনক নাকি পরিবর্তন প্রয়োজন।
        </p>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 pt-2">
          <span className="text-xs text-slate-400">নমুনা ডেটা:</span>
          <button
            type="button"
            onClick={() => loadPreset('good')}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            🟢 সফল অ্যাড
          </button>
          <button
            type="button"
            onClick={() => loadPreset('low_ctr')}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            🟡 কম ক্লিক
          </button>
          <button
            type="button"
            onClick={() => loadPreset('no_conversions')}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            🔴 মেসেজ নেই
          </button>
        </div>
      </div>

      {/* Input Metrics Grid */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <h3 className="font-semibold text-sm text-slate-900">
          বিজ্ঞাপনের ডেটা ইনপুট করুন:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Spend */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              ১. মোট খরচ (Spend ৳):
            </label>
            <input
              type="number"
              value={doctorInput.spentBudget || ''}
              onChange={(e) => setDoctorInput({ ...doctorInput, spentBudget: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
              placeholder="১৫০০"
            />
          </div>

          {/* Reach */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-700">
                ২. কত মানুষের কাছে পৌঁছেছে (Reach):
              </label>
              <JargonBadge id="reach" label="Reach" />
            </div>
            <input
              type="number"
              value={doctorInput.reach || ''}
              onChange={(e) => setDoctorInput({ ...doctorInput, reach: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
              placeholder="৮৫০০"
            />
          </div>

          {/* Clicks */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-700">
                ৩. মোট ক্লিক সংখ্যা (Link Clicks):
              </label>
              <JargonBadge id="ctr" label="CTR" />
            </div>
            <input
              type="number"
              value={doctorInput.clicks || ''}
              onChange={(e) => setDoctorInput({ ...doctorInput, clicks: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
              placeholder="২২০"
            />
          </div>

          {/* Conversions / Messages */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              ৪. মেসেজ বা বিক্রির সংখ্যা:
            </label>
            <input
              type="number"
              value={doctorInput.conversions || ''}
              onChange={(e) =>
                setDoctorInput({ ...doctorInput, conversions: Number(e.target.value) })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
              placeholder="১৮"
            />
          </div>
        </div>
      </div>

      {/* Clean Diagnosis Result Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        {/* Verdict Header */}
        <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
          <div className="mt-0.5 flex-shrink-0">
            {verdict.status === 'green' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : verdict.status === 'yellow' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600" />
            )}
          </div>
          <div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                verdict.status === 'green'
                  ? 'bg-emerald-50 text-emerald-800'
                  : verdict.status === 'yellow'
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-rose-50 text-rose-800'
              }`}
            >
              {verdict.status === 'green'
                ? 'সবুজ সংকেত (লাভজনক)'
                : verdict.status === 'yellow'
                ? 'হলুদ সংকেত (সতর্কতা)'
                : 'লাল সংকেত (পরিবর্তন জরুরি)'}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {verdict.headline}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{verdict.summary}</p>
          </div>
        </div>

        {/* 4 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">CTR (ক্লিক হার)</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {formatDecimal(verdict.metrics.ctr, 1, useBengaliDigits)}%
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">CPM (১০০০ রিচ)</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {formatBDT(verdict.metrics.cpm, useBengaliDigits)}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">ক্লিকে খরচ (CPC)</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {formatBDT(verdict.metrics.cpc, useBengaliDigits)}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">প্রতি মেসেজে খরচ</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {formatBDT(verdict.metrics.costPerConversion, useBengaliDigits)}
            </p>
          </div>
        </div>

        {/* Action Steps */}
        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
          <h4 className="text-xs font-semibold text-slate-900">
            {verdict.nextAction.title}:
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
            {verdict.nextAction.actionSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(5)}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>লঞ্চ প্ল্যানে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(7)}
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span>শব্দকোষ ও FAQ দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
