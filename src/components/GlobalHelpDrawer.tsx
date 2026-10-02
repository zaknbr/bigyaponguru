'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JARGON_LIST, JARGON_MAP } from '@/config/jargonDictionary';
import { FAQ_LIST, FAQ_TOPICS, TROUBLESHOOTING_SYMPTOMS } from '@/config/faqData';
import { FAQTopic } from '@/types';
import {
  X,
  HelpCircle,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Ban,
  EyeOff,
  MousePointer,
  MessageSquare,
  DollarSign,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export function GlobalHelpDrawer() {
  const {
    isHelpDrawerOpen,
    closeHelpDrawer,
    helpDrawerTab,
    setHelpDrawerTab,
    activeJargonId,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJargonCategory, setSelectedJargonCategory] = useState<string>('all');
  const [selectedFaqTopic, setSelectedFaqTopic] = useState<FAQTopic | 'all'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-minimum-budget');

  // Troubleshooting state
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);
  const [selectedOptionByQuestion, setSelectedOptionByQuestion] = useState<Record<string, string>>({});

  if (!isHelpDrawerOpen) return null;

  const highlightedItem = activeJargonId ? JARGON_MAP[activeJargonId] : null;

  // Filter glossary
  const filteredJargon = JARGON_LIST.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.term.toLowerCase().includes(query) ||
      item.banglaTitle.toLowerCase().includes(query) ||
      item.shortMeaning.toLowerCase().includes(query);

    const matchesCategory =
      selectedJargonCategory === 'all' || item.category === selectedJargonCategory;

    return matchesSearch && matchesCategory;
  });

  // Filter FAQ
  const filteredFaqs = FAQ_LIST.filter((faq) => {
    return selectedFaqTopic === 'all' || faq.topic === selectedFaqTopic;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const activeSymptom = TROUBLESHOOTING_SYMPTOMS.find((s) => s.id === selectedSymptomId);

  const getSymptomIcon = (iconName: string) => {
    switch (iconName) {
      case 'ban':
        return <Ban className="w-4 h-4 text-rose-500" />;
      case 'eye-off':
        return <EyeOff className="w-4 h-4 text-amber-500" />;
      case 'mouse-pointer':
        return <MousePointer className="w-4 h-4 text-blue-500" />;
      case 'message-square':
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case 'dollar-sign':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'credit-card':
        return <CreditCard className="w-3.5 h-3.5" />;
      case 'alert-triangle':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'trending-up':
        return <TrendingUp className="w-3.5 h-3.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={closeHelpDrawer}
    >
      <div
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col transform transition-all animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                বিজ্ঞাপন সহায়তা কেন্দ্র
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">শব্দকোষ, সাধারণ প্রশ্ন ও সমস্যা সমাধান</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeHelpDrawer}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all active:scale-90"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100/90 rounded-2xl my-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setHelpDrawerTab('glossary')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 active:scale-95 ${
              helpDrawerTab === 'glossary'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="truncate">শব্দকোষ</span>
          </button>

          <button
            type="button"
            onClick={() => setHelpDrawerTab('faq')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 active:scale-95 ${
              helpDrawerTab === 'faq'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="truncate">FAQ</span>
          </button>

          <button
            type="button"
            onClick={() => setHelpDrawerTab('wizard')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 active:scale-95 ${
              helpDrawerTab === 'wizard'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="truncate">সমস্যা সমাধান</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-0.5">
          {/* TAB 1: GLOSSARY */}
          {helpDrawerTab === 'glossary' && (
            <div className="space-y-3">
              {/* Highlighted Term Card */}
              {highlightedItem && (
                <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-500/40 p-4 rounded-3xl space-y-2 animate-fade-in shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      নির্বাচিত শব্দ
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">{highlightedItem.term}</h4>
                  <p className="text-xs font-bold text-emerald-800">{highlightedItem.banglaTitle}</p>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white/90 p-3 rounded-2xl border border-emerald-100 font-medium">
                    {highlightedItem.plainExplanation}
                  </p>
                  <div className="text-xs text-amber-950 bg-amber-50/90 p-3 rounded-2xl border border-amber-200/80 leading-relaxed font-medium">
                    <strong>বাস্তব উদাহরণ: </strong>
                    {highlightedItem.bdExample}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="শব্দ খুঁজুন (যেমন: CPM, ROAS, Pixel)..."
                  className="w-full pl-10 pr-3 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
                {[
                  { id: 'all', label: 'সব' },
                  { id: 'metric', label: 'মেট্রিক' },
                  { id: 'budget', label: 'বাজেট' },
                  { id: 'strategy', label: 'কৌশল' },
                  { id: 'tech', label: 'কারিগরি' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedJargonCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all active:scale-95 ${
                      selectedJargonCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Terms List */}
              <div className="space-y-2.5">
                {filteredJargon.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50/80 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 space-y-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs sm:text-sm text-slate-900">{item.term}</span>
                      <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-bold">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-emerald-800">{item.banglaTitle}</p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.shortMeaning}</p>
                    <div className="text-[11px] text-amber-950 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                      <strong>উদাহরণ: </strong> {item.bdExample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FAQ */}
          {helpDrawerTab === 'faq' && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                {FAQ_TOPICS.map((topic) => {
                  const isSel = selectedFaqTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedFaqTopic(isSel ? 'all' : topic.id)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap border flex items-center gap-1.5 transition-all active:scale-95 ${
                        isSel
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {getTopicIcon(topic.iconName)}
                      <span>{topic.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2.5">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-slate-50/70 border border-slate-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-4 text-left flex items-start justify-between gap-2 hover:bg-slate-100/70 transition-colors"
                      >
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                          {faq.question}
                        </h4>
                        <div className="text-slate-400 p-0.5 flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-slate-200/60 text-xs">
                          <p className="text-slate-600 leading-relaxed font-medium">
                            {faq.shortAnswer}
                          </p>
                          <div className="space-y-1.5 pl-1">
                            {faq.fullAnswer.map((ans, aIdx) => (
                              <p key={aIdx} className="text-slate-700 leading-relaxed">
                                • {ans}
                              </p>
                            ))}
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950 font-semibold text-[11px]">
                            <strong>পরের করণীয়: </strong>
                            {faq.nextAction}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WIZARD */}
          {helpDrawerTab === 'wizard' && (
            <div className="space-y-3">
              {!selectedSymptomId ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600">আপনার সমস্যা সিলেক্ট করুন:</p>
                  {TROUBLESHOOTING_SYMPTOMS.map((sym) => (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => {
                        setSelectedSymptomId(sym.id);
                        setSelectedOptionByQuestion({});
                      }}
                      className="w-full p-3.5 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-2xl text-left flex items-center gap-3 transition-colors group active:scale-[0.99]"
                    >
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        {getSymptomIcon(sym.iconName)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-900">
                          {sym.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">{sym.shortDescription}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-amber-50 p-3 rounded-2xl border border-amber-200">
                    <span className="text-xs font-black text-amber-950 line-clamp-1">
                      {activeSymptom?.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSymptomId(null);
                        setSelectedOptionByQuestion({});
                      }}
                      className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1 flex-shrink-0 active:scale-95"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>বদলান</span>
                    </button>
                  </div>

                  {activeSymptom?.questions.map((q) => {
                    const selOptId = selectedOptionByQuestion[q.id];
                    const activeOpt = q.options.find((o) => o.id === selOptId);

                    return (
                      <div key={q.id} className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-xs font-black text-slate-900">{q.question}</p>
                        <div className="space-y-1.5">
                          {q.options.map((opt) => {
                            const isSel = selOptId === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setSelectedOptionByQuestion((prev) => ({
                                    ...prev,
                                    [q.id]: opt.id,
                                  }))
                                }
                                className={`w-full p-3 rounded-xl text-left text-xs font-semibold border flex items-center justify-between gap-2 active:scale-[0.99] transition-all ${
                                  isSel
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span>{opt.label}</span>
                                {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {activeOpt && (
                          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs animate-slide-up">
                            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-950 font-medium">
                              <strong>কারণ: </strong> {activeOpt.likelyCause}
                            </div>
                            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                              <p className="text-emerald-400 font-black text-xs">করণীয় পদক্ষেপ:</p>
                              {activeOpt.fixSteps.map((st, i) => (
                                <p key={i} className="text-slate-200 text-[11px] leading-relaxed font-medium">
                                  {i + 1}. {st}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex-shrink-0">
          <button
            type="button"
            onClick={closeHelpDrawer}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all text-xs active:scale-95 shadow-md"
          >
            বন্ধ করুন 👍
          </button>
        </div>
      </div>
    </div>
  );
}
