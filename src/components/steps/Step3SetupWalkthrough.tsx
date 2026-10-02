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
      {/* Clean Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">সেটআপ গাইড</h2>
            <p className="text-xs sm:text-sm text-slate-500">ধাপে ধাপে অ্যাকাউন্ট রেডি করার চেকলিস্ট</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {useBengaliDigits ? toBengaliDigits(setupCompletedCount) : setupCompletedCount} /{' '}
            {useBengaliDigits ? toBengaliDigits(setupTotalCount) : setupTotalCount} সম্পন্ন
          </span>
        </div>

        {/* Task Ribbon Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : isDone
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDone ? <Check className="w-2.5 h-2.5" /> : taskNum}
                </div>
                <span>টাস্ক {taskNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ONE TASK PER SCREEN CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-5 animate-fade-in">
        {/* Task Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentTask.tag}
              </span>
              {currentTask.isOptional && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  ঐচ্ছিক
                </span>
              )}
              {currentTask.id === 'setup-pixel' && <JargonBadge id="pixel" label="Pixel কি?" />}
              {currentTask.id === 'setup-ads-manager' && (
                <JargonBadge id="placement" label="Placement" />
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {currentTask.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleTaskCompleted(currentTask.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 self-start sm:self-auto ${
              isCurrentDone
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>শেষ হয়েছে</span>
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
        <div className="bg-slate-50 p-4 rounded-xl space-y-1">
          <p className="text-xs font-semibold text-slate-900">কেন এই ধাপটি জরুরি?</p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentTask.whyItMatters}
          </p>
        </div>

        {/* Numbered Sub-Steps */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            ধাপে ধাপে করণীয়:
          </h4>

          <div className="space-y-2">
            {currentTask.numberedSubSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {useBengaliDigits ? toBengaliDigits(idx + 1) : idx + 1}
                </span>
                <p className="flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bangladesh Specific Pro-Tips */}
        {currentTask.bangladeshNotes && (
          <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>{currentTask.bangladeshNotes}</div>
          </div>
        )}

        {/* Troubleshooting Accordion */}
        {currentTask.troubleshooting && currentTask.troubleshooting.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700">সমস্যা হচ্ছে? (সাধারণ সমাধান):</p>

            <div className="space-y-1.5">
              {currentTask.troubleshooting.map((item, idx) => {
                const isOpen = expandedTroubleIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedTroubleIndex(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-medium text-slate-800 hover:bg-slate-100/70 transition-colors"
                    >
                      <span>❓ {item.problem}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
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
            className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              isCurrentDone
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isCurrentDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>টাস্কটি সম্পন্ন হয়েছে (টিক দেওয়া আছে)</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>কাজটি শেষ হলে এখানে চাপ দিয়ে সম্পন্ন করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unlock / Skip Banner */}
      {!isSetupComplete && (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            এখনো {setupTotalCount - setupCompletedCount} টি টাস্ক বাকি আছে।
          </span>
          <button
            type="button"
            onClick={skipSetup}
            className="text-xs font-semibold text-slate-800 hover:underline flex-shrink-0"
          >
            পরের ধাপে যান $\rightarrow$
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-3 flex items-center gap-3">
        {currentTaskIndex > 0 ? (
          <button
            type="button"
            onClick={handlePrevTask}
            className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>আগের টাস্ক</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>অ্যাড প্ল্যানে যান</span>
          </button>
        )}

        {currentTaskIndex < setupTasks.length - 1 ? (
          <button
            type="button"
            onClick={handleNextTask}
            className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
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
            className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>ক্রিয়েটিভ কিটে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
