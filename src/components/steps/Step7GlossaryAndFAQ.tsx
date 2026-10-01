'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JARGON_LIST } from '@/config/jargonDictionary';
import { FAQ_LIST, FAQ_TOPICS, TROUBLESHOOTING_SYMPTOMS } from '@/config/faqData';
import { FAQTopic } from '@/types';
import {
  HelpCircle,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowLeft,
  RotateCcw,
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
  Compass,
  ArrowRight,
} from 'lucide-react';

export function Step7GlossaryAndFAQ() {
  const { setCurrentStep, openJargonModal } = useApp();
  const [activeTab, setActiveTab] = useState<'glossary' | 'faq' | 'wizard'>('glossary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJargonCategory, setSelectedJargonCategory] = useState<string>('all');
  
  // FAQ state
  const [selectedFaqTopic, setSelectedFaqTopic] = useState<FAQTopic | 'all'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-minimum-budget');

  // Troubleshooting Wizard state
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);
  const [selectedOptionByQuestion, setSelectedOptionByQuestion] = useState<Record<string, string>>({});

  // Filter glossary items
  const filteredJargon = JARGON_LIST.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.term.toLowerCase().includes(query) ||
      item.banglaTitle.toLowerCase().includes(query) ||
      item.shortMeaning.toLowerCase().includes(query) ||
      item.plainExplanation.toLowerCase().includes(query);

    const matchesCategory =
      selectedJargonCategory === 'all' || item.category === selectedJargonCategory;

    return matchesSearch && matchesCategory;
  });

  // Filter FAQ items
  const filteredFaqs = FAQ_LIST.filter((faq) => {
    return selectedFaqTopic === 'all' || faq.topic === selectedFaqTopic;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  // Selected symptom details
  const activeSymptom = TROUBLESHOOTING_SYMPTOMS.find((s) => s.id === selectedSymptomId);

  const getSymptomIcon = (iconName: string) => {
    switch (iconName) {
      case 'ban':
        return <Ban className="w-5 h-5 text-rose-500" />;
      case 'eye-off':
        return <EyeOff className="w-5 h-5 text-amber-500" />;
      case 'mouse-pointer':
        return <MousePointer className="w-5 h-5 text-blue-500" />;
      case 'message-square':
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'dollar-sign':
        return <DollarSign className="w-5 h-5 text-emerald-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'credit-card':
        return <CreditCard className="w-4 h-4" />;
      case 'alert-triangle':
        return <AlertTriangle className="w-4 h-4" />;
      case 'trending-up':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ধাপ ৭ • স্বয়ংসম্পূর্ণ সাহায্য ভাণ্ডার
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">সাহায্য কেন্দ্র ও শব্দকোষ</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          বিজ্ঞাপনের কঠিন ইংরেজি শব্দের সহজ বাংলা অর্থ, বাংলাদেশে সাধারণ প্রশ্নোত্তর এবং সমস্যার তাত্ক্ষণিক সমাধান।
        </p>

        {/* 3 Tab Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/80 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'glossary'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="truncate">শব্দকোষ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'faq'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="truncate">প্রশ্নোত্তর (FAQ)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'wizard'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="truncate">সমস্যা সমাধান</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: Glossary (বিজ্ঞাপন শব্দকোষ)                       */}
      {/* ========================================================= */}
      {activeTab === 'glossary' && (
        <div className="space-y-4 animate-slide-up">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো শব্দ খুঁজুন (যেমন: Reach, CPM, CTR, ROAS, Pixel, Break-even)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'সকল শব্দ (২০+)' },
              { id: 'metric', label: 'মেট্রিক ও রেজাল্ট' },
              { id: 'budget', label: 'বাজেট ও হিসাব' },
              { id: 'strategy', label: 'কৌশল ও অডিয়েন্স' },
              { id: 'tech', label: 'অ্যাকাউন্ট ও কারিগরি' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedJargonCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedJargonCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Jargon Cards */}
          {filteredJargon.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-slate-200 p-6 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">কোনো শব্দ খুঁজে পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400">অন্য শব্দ দিয়ে অনুসন্ধান করুন</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredJargon.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                          {item.category === 'metric'
                            ? 'মেট্রিক'
                            : item.category === 'budget'
                            ? 'বাজেট'
                            : item.category === 'tech'
                            ? 'কারিগরি'
                            : 'কৌশল'}
                        </span>
                      </div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg mt-1">{item.term}</h3>
                      <p className="text-xs font-bold text-emerald-800 flex items-center gap-1 mt-0.5">
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.banglaTitle}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openJargonModal(item.id)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100 flex-shrink-0 flex items-center gap-1"
                      title="পপআপে বিস্তারিত দেখুন"
                    >
                      <span>বিস্তারিত</span>
                    </button>
                  </div>

                  {/* One-sentence meaning */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {item.shortMeaning}
                  </div>

                  {/* Detailed Explanation */}
                  <p className="text-xs text-slate-600 leading-relaxed pl-1">
                    {item.plainExplanation}
                  </p>

                  {/* Local BD Example */}
                  <div className="bg-amber-50/70 border border-amber-200/70 p-3 rounded-2xl text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-900 font-bold">দৈনন্দিন উদাহরণ: </strong>
                      <span>{item.bdExample}</span>
                    </div>
                  </div>

                  {item.proTip && (
                    <div className="text-xs text-indigo-950 bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100/80 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-indigo-900 font-bold">গুরু পরামর্শ: </strong>
                        <span>{item.proTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: Grouped FAQs (প্রশ্নোত্তর ও পরের করণীয়)           */}
      {/* ========================================================= */}
      {activeTab === 'faq' && (
        <div className="space-y-4 animate-slide-up">
          {/* Topic Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FAQ_TOPICS.map((topic) => {
              const isSelected = selectedFaqTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedFaqTopic(isSelected ? 'all' : topic.id)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 text-left ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'}`}>
                    {getTopicIcon(topic.iconName)}
                  </div>
                  <span className="truncate">{topic.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all hover:border-indigo-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-100">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {faq.question}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {faq.shortAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="text-slate-400 p-1 flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/40 text-xs sm:text-sm">
                      {/* Detailed Bullet points */}
                      <div className="space-y-2 text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100">
                        {faq.fullAnswer.map((ans, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                            <p className="leading-relaxed">{ans}</p>
                          </div>
                        ))}
                      </div>

                      {/* Highlighted "পরের করণীয়" Box */}
                      <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-emerald-950 text-xs flex items-start gap-2.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <strong className="text-emerald-900 font-extrabold text-xs uppercase tracking-wide">
                            পরের করণীয়:
                          </strong>
                          <p className="leading-relaxed font-semibold text-emerald-950">
                            {faq.nextAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: "আমার সমস্যা কী?" Troubleshooting Wizard            */}
      {/* ========================================================= */}
      {activeTab === 'wizard' && (
        <div className="space-y-5 animate-slide-up">
          {/* Step 1: Symptom Selector */}
          {!selectedSymptomId ? (
            <div className="space-y-3">
              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-3xl text-amber-950 space-y-1">
                <div className="flex items-center gap-2 font-black text-sm text-amber-900">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>তাত্ক্ষণিক সমস্যা নির্ণয় ও প্রতিকার</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  আপনার বিজ্ঞাপনে ঠিক কী সমস্যা হচ্ছে তা নিচের তালিকা থেকে সিলেক্ট করুন। বিজ্ঞাপন গুরু আপনাকে আসল কারণ ও সমাধানের পথ দেখাবে:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {TROUBLESHOOTING_SYMPTOMS.map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => {
                      setSelectedSymptomId(sym.id);
                      setSelectedOptionByQuestion({});
                    }}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-left flex items-start gap-3.5 group active:scale-[0.99]"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                      {getSymptomIcon(sym.iconName)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-amber-900 transition-colors">
                        {sym.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {sym.shortDescription}
                      </p>
                    </div>
                    <div className="text-slate-400 group-hover:text-amber-600 p-1 flex-shrink-0 mt-1">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2 & 3: Follow-up Questions & Resolution */
            <div className="space-y-4">
              {/* Back to Symptom Picker Header */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    {activeSymptom && getSymptomIcon(activeSymptom.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      সমস্যা নির্বাচন করা হয়েছে
                    </span>
                    <h3 className="font-black text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {activeSymptom?.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSymptomId(null);
                    setSelectedOptionByQuestion({});
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>অন্য সমস্যা</span>
                </button>
              </div>

              {/* Follow-up Questions */}
              {activeSymptom?.questions.map((q) => {
                const selectedOptId = selectedOptionByQuestion[q.id];
                const activeOption = q.options.find((opt) => opt.id === selectedOptId);

                return (
                  <div key={q.id} className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        ডায়াগনস্টিক প্রশ্ন
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base pt-1">
                        {q.question}
                      </h4>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = selectedOptId === opt.id;
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
                            className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all border flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20 shadow-sm'
                                : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Result and Step-by-Step Fix Solution */}
                    {activeOption && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3.5 animate-slide-up">
                        {/* Likely Cause */}
                        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-rose-900">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>সম্ভাব্য আসল কারণ:</span>
                          </div>
                          <p className="text-rose-950 font-medium leading-relaxed pl-5">
                            {activeOption.likelyCause}
                          </p>
                        </div>

                        {/* Step-by-Step Fix Steps */}
                        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                              🛠️
                            </div>
                            <h5 className="font-bold text-sm text-emerald-400">
                              সমাধানের করণীয় পদক্ষেপ:
                            </h5>
                          </div>

                          <div className="space-y-2 pl-1">
                            {activeOption.fixSteps.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 border border-slate-700">
                                  {sIdx + 1}
                                </span>
                                <p className="leading-relaxed pt-0.5">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pro Tip */}
                        {activeOption.proTip && (
                          <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl text-xs text-indigo-950 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-indigo-900">পরামর্শ: </strong>
                              <span>{activeOption.proTip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(6)}
          className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>রেজাল্ট ডক্টরে যান</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>শুরু থেকে নতুন প্ল্যান বানান</span>
        </button>
      </div>
    </div>
  );
}

