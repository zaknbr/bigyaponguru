'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Unlock,
  FastForward,
  ShieldCheck,
  Check,
} from 'lucide-react';

export function Step3SetupWalkthrough() {
  const {
    setupTasks,
    toggleTaskCompleted,
    isSetupComplete,
    hasSkippedSetup,
    skipSetup,
    setupCompletedCount,
    setupTotalCount,
    activeSetupTaskId,
    setActiveSetupTaskId,
    setCurrentStep,
    useBengaliDigits,
  } = useApp();

  const [expandedTroubleIndex, setExpandedTroubleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!setupTasks.some((t) => t.id === activeSetupTaskId) && setupTasks.length > 0) {
      setActiveSetupTaskId(setupTasks[0].id);
    }
  }, [setupTasks, activeSetupTaskId, setActiveSetupTaskId]);

  const currentTaskIndex = setupTasks.findIndex((t) => t.id === activeSetupTaskId);
  const currentTask = setupTasks[currentTaskIndex] || setupTasks[0] || null;

  if (!currentTask) {
    return null;
  }

  const isCurrentDone = currentTask.completed;
  const progressPercent =
    setupTotalCount > 0 ? Math.round((setupCompletedCount / setupTotalCount) * 100) : 0;

  const handleNextTask = () => {
    if (currentTaskIndex < setupTasks.length - 1) {
      setActiveSetupTaskId(setupTasks[currentTaskIndex + 1].id);
      setExpandedTroubleIndex(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isSetupComplete || hasSkippedSetup) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevTask = () => {
    if (currentTaskIndex > 0) {
      setActiveSetupTaskId(setupTasks[currentTaskIndex - 1].id);
      setExpandedTroubleIndex(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Executive Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-4 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">সেটআপ গাইড</h2>
              <p className="text-xs text-slate-400">ধাপে ধাপে অ্যাকাউন্ট রেডি করার প্রফেশনাল চেকলিস্ট</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {useBengaliDigits ? toBengaliDigits(setupCompletedCount) : setupCompletedCount} /{' '}
              {useBengaliDigits ? toBengaliDigits(setupTotalCount) : setupTotalCount} শেষ
            </span>
          </div>
        </div>

        {/* Progress Bar with Glow */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span>সামগ্রিক প্রস্তুতি:</span>
            <span className="text-emerald-400 font-black">
              {useBengaliDigits ? toBengaliDigits(progressPercent) : progressPercent}% সম্পন্ন
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Task Ribbon Switcher */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {setupTasks.map((t, idx) => {
            const isActive = t.id === currentTask.id;
            const isDone = t.completed;
            const taskNum = useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveSetupTaskId(t.id);
                  setExpandedTroubleIndex(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md scale-102 ring-2 ring-emerald-400/40'
                    : isDone
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : taskNum}
                </div>
                <span>টাস্ক {taskNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ONE TASK PER SCREEN CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6 animate-slide-up">
        {/* Task Title & Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {currentTask.tag}
              </span>
              <span className="text-xs font-bold text-slate-400">
                টাস্ক {useBengaliDigits ? toBengaliDigits(currentTaskIndex + 1) : currentTaskIndex + 1} /{' '}
                {useBengaliDigits ? toBengaliDigits(setupTotalCount) : setupTotalCount}
              </span>
              {currentTask.isOptional && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  ঐচ্ছিক (Optional)
                </span>
              )}
              {currentTask.id === 'setup-pixel' && <JargonBadge id="pixel" label="Pixel কি?" />}
              {currentTask.id === 'setup-ads-manager' && (
                <JargonBadge id="placement" label="Placement" />
              )}
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
              {currentTask.title}
            </h3>
          </div>

          {/* Quick Toggle Button */}
          <button
            type="button"
            onClick={() => toggleTaskCompleted(currentTask.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all flex-shrink-0 active:scale-95 ${
              isCurrentDone
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>শেষ হয়েছে ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>অসম্পূর্ণ</span>
              </>
            )}
          </button>
        </div>

        {/* Section 1: Why it matters */}
        <div className="bg-indigo-50/80 border border-indigo-100/90 p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>কেন এই ধাপটি আপনার জন্য অত্যন্ত জরুরি?</span>
          </div>
          <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
            {currentTask.whyItMatters}
          </p>
        </div>

        {/* Section 2: Numbered Sub-Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            ধাপে ধাপে কীভাবে করবেন:
          </h4>

          <div className="space-y-2.5">
            {currentTask.numberedSubSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    {useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1}
                  </span>
                  <p className="flex-1 text-slate-900 font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Bangladesh Specific Pro-Tips */}
        {currentTask.bangladeshNotes && (
          <div className="bg-amber-50/90 border border-amber-200/90 p-4 rounded-3xl text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="font-medium">{currentTask.bangladeshNotes}</div>
          </div>
        )}

        {/* Section 4: Troubleshooting Accordion */}
        {currentTask.troubleshooting && currentTask.troubleshooting.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-rose-900 font-black text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>সমস্যা হচ্ছে? (Common Problems & Solutions):</span>
            </div>

            <div className="space-y-2">
              {currentTask.troubleshooting.map((item, idx) => {
                const isOpen = expandedTroubleIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedTroubleIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-rose-600 font-black">❓</span>
                        <span>{item.problem}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-1 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                        <p className="p-3 bg-emerald-50/90 rounded-2xl border border-emerald-100 text-emerald-950 font-medium">
                          <strong>💡 সমাধান:</strong> {item.solution}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Big Complete Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => toggleTaskCompleted(currentTask.id)}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-95 ${
              isCurrentDone
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>এই টাস্কটি সম্পন্ন হয়েছে (টিক দেওয়া আছে)</span>
              </>
            ) : (
              <>
                <Circle className="w-5 h-5 text-slate-400" />
                <span>কাজটি শেষ হলে এখানে চাপ দিয়ে &ldquo;শেষ হয়েছে&rdquo; মার্ক করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unlock / Skip Stage Banner */}
      <div
        className={`p-5 rounded-3xl border-2 transition-all space-y-3 ${
          isSetupComplete
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
            : 'bg-slate-50/80 border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold ${
                isSetupComplete ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {isSetupComplete ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isSetupComplete
                  ? '🎉 চমৎকার! আপনার বিজ্ঞাপন অ্যাকাউন্ট পুরোপুরি রেডি'
                  : 'পরবর্তী ধাপ: ক্রিয়েটিভ কিট ও ক্যাপশন তৈরি'}
              </h4>
              <p className="text-xs text-slate-500">
                {isSetupComplete
                  ? 'সবগুলো সেটআপ সম্পন্ন হয়েছে। এবার বিজ্ঞাপনের ছবি, ভিডিও স্ক্রিপ্ট ও ক্যাপশন বানান।'
                  : `এখনো ${setupTotalCount - setupCompletedCount} টি টাস্ক বাকি আছে।`}
              </p>
            </div>
          </div>

          {!isSetupComplete && (
            <button
              type="button"
              onClick={skipSetup}
              className="flex items-center gap-1 text-xs font-black text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-2xl border border-indigo-200 transition-all active:scale-95 flex-shrink-0"
              title="সেটআপ সম্পূর্ণ না করেই পরের ধাপে যান"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>স্কিপ করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Task Navigation Buttons */}
      <div className="pt-2 flex items-center gap-3">
        {currentTaskIndex > 0 ? (
          <button
            type="button"
            onClick={handlePrevTask}
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>আগের টাস্ক</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>অ্যাড প্ল্যানে যান</span>
          </button>
        )}

        {currentTaskIndex < setupTasks.length - 1 ? (
          <button
            type="button"
            onClick={handleNextTask}
            className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <span>পরের টাস্ক ({currentTaskIndex + 2}/{setupTotalCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setCurrentStep(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <span>বিজ্ঞাপনের কপি তৈরিতে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
