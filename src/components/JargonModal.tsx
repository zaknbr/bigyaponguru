'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { JARGON_MAP } from '@/config/jargonDictionary';
import { X, HelpCircle, Lightbulb, Compass } from 'lucide-react';

export function JargonModal() {
  const { activeJargonId, closeJargonModal } = useApp();

  if (!activeJargonId) return null;

  const item = JARGON_MAP[activeJargonId];
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto transform transition-all animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                সহজ ব্যাখ্যা
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{item.term}</h3>
            </div>
          </div>
          <button
            onClick={closeJargonModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 space-y-4 text-slate-700">
          {/* Bengali Title */}
          <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100">
            <p className="text-xs text-emerald-800 font-medium">বাংলায় এর মানে:</p>
            <p className="text-base font-bold text-emerald-950 mt-0.5">{item.banglaTitle}</p>
          </div>

          {/* Simple Explanation */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              সহজ কথায় কী এটা?
            </h4>
            <p className="text-sm leading-relaxed text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {item.plainExplanation}
            </p>
          </div>

          {/* Local BD Example */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              দৈনন্দিন উদাহরণ:
            </h4>
            <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl text-amber-900 text-sm leading-relaxed">
              {item.bdExample}
            </div>
          </div>

          {/* Pro Tip */}
          {item.proTip && (
            <div className="bg-indigo-50/80 border border-indigo-100 p-3.5 rounded-xl text-indigo-950 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold text-indigo-700">💡 গুরু টিপস: </span>
              {item.proTip}
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-3 border-t border-slate-100">
          <button
            onClick={closeJargonModal}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors active:scale-[0.98] text-sm"
          >
            বুঝেছি, চালিয়ে যান 👍
          </button>
        </div>
      </div>
    </div>
  );
}

interface JargonBadgeProps {
  id: string;
  label?: string;
  className?: string;
}

export function JargonBadge({ id, label, className = '' }: JargonBadgeProps) {
  const { openJargonModal } = useApp();
  const item = JARGON_MAP[id];
  const displayLabel = label || (item ? item.term.split(' ')[0] : id.toUpperCase());

  return (
    <button
      type="button"
      onClick={() => openJargonModal(id)}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors active:scale-95 ${className}`}
      title="ট্যাপ করে সহজ ব্যাখ্যা জানুন"
    >
      <span>{displayLabel}</span>
      <HelpCircle className="w-3 h-3 text-emerald-600" />
    </button>
  );
}
