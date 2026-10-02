'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import { JargonBadge } from '@/components/JargonModal';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export function Step3SetupWalkthrough() {
  const {
    setupTasks,
    toggleTaskCompleted,
    isSetupComplete,
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
  const progressPercent = Math.round((setupCompletedCount / (setupTotalCount || 1)) * 100);

  const handleNextTask = () => {
    if (currentTaskIndex < setupTasks.length - 1) {
      setActiveSetupTaskId(setupTasks[currentTaskIndex + 1].id);
      setExpandedTroubleIndex(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
      {/* 2026 Header & Progress Ribbon */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                ধাপে ধাপে অ্যাকাউন্ট রেডি
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              বিজ্ঞাপন সেটআপ গাইড ও চেকলিস্ট
            </h2>
            <p className="text-sm text-slate-600">
              বিজ্ঞাপন প্রকাশের আগে বিজনেস ম্যানেজার, পেজ ও পেমেন্ট সেটআপের সহজ ধাপসমূহ।
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-sm font-bold px-3.5 py-1.5 rounded-xl bg-slate-900 text-white shadow-xs">
              {useBengaliDigits ? toBengaliDigits(setupCompletedCount) : setupCompletedCount} /{' '}
              {useBengaliDigits ? toBengaliDigits(setupTotalCount) : setupTotalCount} সম্পন্ন ({useBengaliDigits ? toBengaliDigits(progressPercent) : progressPercent}%)
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Task Horizontal Ribbon Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : taskNum}
                </div>
                <span>টাস্ক {taskNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ONE TASK PER SCREEN GLASS CARD */}
      <div className="glass-card rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-6 animate-fade-in shadow-md">
        {/* Task Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                {currentTask.tag}
              </span>
              {currentTask.isOptional && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                  ঐচ্ছিক
                </span>
              )}
              {currentTask.id === 'setup-pixel' && <JargonBadge id="pixel" label="Pixel কি?" />}
              {currentTask.id === 'setup-ads-manager' && (
                <JargonBadge id="placement" label="Placement" />
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {currentTask.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleTaskCompleted(currentTask.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 self-start sm:self-auto ${
              isCurrentDone
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>সম্পন্ন হয়েছে</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>বাকি আছে</span>
              </>
            )}
          </button>
        </div>

        {/* Why it matters */}
        <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded-2xl border border-slate-100 space-y-1">
          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            কেন এই ধাপটি গুরুত্বপূর্ণ?
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentTask.whyItMatters}
          </p>
        </div>

        {/* Numbered Sub-Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            ধাপে ধাপে যা করবেন:
          </h4>

          <div className="space-y-2.5">
            {currentTask.numberedSubSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs text-sm text-slate-700 leading-relaxed flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1}
                </span>
                <p className="flex-1 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bangladesh Specific Pro-Tips */}
        {currentTask.bangladeshNotes && (
          <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl text-sm text-amber-950 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="font-medium">{currentTask.bangladeshNotes}</div>
          </div>
        )}

        {/* Troubleshooting Accordion */}
        {currentTask.troubleshooting && currentTask.troubleshooting.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              সমস্যা হচ্ছে? সাধারণ সমাধান:
            </p>

            <div className="space-y-2">
              {currentTask.troubleshooting.map((item, idx) => {
                const isOpen = expandedTroubleIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedTroubleIndex(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-bold text-slate-800 hover:bg-slate-100/70 transition-colors"
                    >
                      <span>❓ {item.problem}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        <p>💡 <strong>সমাধান:</strong> {item.solution}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Toggle Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => toggleTaskCompleted(currentTask.id)}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-xs ${
              isCurrentDone
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>টাস্কটি সম্পন্ন হয়েছে (টিক দেওয়া শেষ)</span>
              </>
            ) : (
              <>
                <Circle className="w-5 h-5 text-slate-400" />
                <span>কাজটি শেষ হলে এখানে চাপ দিয়ে টিক দিন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unlock / Skip Banner */}
      {!isSetupComplete && (
        <div className="p-4 rounded-2xl border border-slate-200 bg-white/70 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-600 font-medium">
          <span>
            এখনো {useBengaliDigits ? toBengaliDigits(setupTotalCount - setupCompletedCount) : setupTotalCount - setupCompletedCount} টি টাস্ক বাকি আছে।
          </span>
          <button
            type="button"
            onClick={skipSetup}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:underline flex-shrink-0"
          >
            পরের ধাপে যান $\rightarrow$
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center gap-3">
        {currentTaskIndex > 0 ? (
          <button
            type="button"
            onClick={handlePrevTask}
            className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>আগের টাস্ক</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>অ্যাড প্ল্যানে যান</span>
          </button>
        )}

        {currentTaskIndex < setupTasks.length - 1 ? (
          <button
            type="button"
            onClick={handleNextTask}
            className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
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
            className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
          >
            <span>ক্রিয়েটিভ কিটে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
