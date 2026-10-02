'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JARGON_LIST } from '@/config/jargonDictionary';
import { FAQ_LIST, FAQ_TOPICS, TROUBLESHOOTING_SYMPTOMS } from '@/config/faqData';
import { FAQTopic } from '@/types';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Stethoscope,
} from 'lucide-react';

export function Step7GlossaryAndFAQ() {
  const { setCurrentStep, openJargonModal } = useApp();
  const [activeTab, setActiveTab] = useState<'glossary' | 'faq' | 'wizard'>('glossary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJargonCategory, setSelectedJargonCategory] = useState<string>('all');
  
  const [selectedFaqTopic, setSelectedFaqTopic] = useState<FAQTopic | 'all'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-minimum-budget');

  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);
  const [selectedOptionByQuestion, setSelectedOptionByQuestion] = useState<Record<string, string>>({});

  // Filtered Jargon
  const filteredJargon = JARGON_LIST.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bdExample.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedJargonCategory === 'all' || item.category === selectedJargonCategory;

    return matchesSearch && matchesCategory;
  });

  // Filtered FAQ
  const filteredFaq = FAQ_LIST.filter((faq) => {
    const matchesTopic = selectedFaqTopic === 'all' || faq.topic === selectedFaqTopic;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.nextAction.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopic && matchesSearch;
  });

  // Symptom Wizard
  const activeSymptom = TROUBLESHOOTING_SYMPTOMS.find((s) => s.id === selectedSymptomId);

  const getWizardOutcome = () => {
    if (!activeSymptom || activeSymptom.questions.length === 0) return null;
    const firstQ = activeSymptom.questions[0];
    const selectedOptId = selectedOptionByQuestion[firstQ.id];
    if (!selectedOptId) return null;

    const opt = firstQ.options.find((o) => o.id === selectedOptId);
    return opt || null;
  };

  const currentOutcome = getWizardOutcome();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 2026 Header with Glass Tabs */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            সাহায্য কেন্দ্র ও ডিকশনারি
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          বিজ্ঞাপনী শব্দকোষ, প্রশ্নোত্তর ও সমস্যা সমাধান
        </h2>
        <p className="text-sm text-slate-600">
          বিজ্ঞাপনের যেকোনো জটিল ইংরেজি শব্দের সহজ বাংলা অর্থ জানুন অথবা যেকোনো সমস্যা সমাধান করুন।
        </p>

        {/* Glass Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'glossary'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                : 'glass-card hover:bg-white text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>শব্দকোষ (Dictionary)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'faq'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                : 'glass-card hover:bg-white text-slate-600'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>সাধারণ FAQ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'wizard'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                : 'glass-card hover:bg-white text-slate-600'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>সমস্যা সমাধান</span>
          </button>
        </div>
      </div>

      {/* PART A: SEARCHABLE GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-5 animate-fade-in">
          {/* Glass Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো ইংরেজি বা বাংলা শব্দ খুঁজুন (যেমন: CPA, Pixel, CTR, Reach)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'সব শব্দ (All)' },
              { id: 'metric', label: 'মেট্রিক্স ও হিসাব' },
              { id: 'technical', label: 'টেকনিক্যাল ও পিক্সেল' },
              { id: 'audience', label: 'অডিয়েন্স ও টার্গেটিং' },
              { id: 'account', label: 'অ্যাকাউন্ট ও বাজেট' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedJargonCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  selectedJargonCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'glass-card hover:bg-white text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredJargon.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-3xl space-y-2.5 border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{item.term}</h3>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      {item.banglaTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openJargonModal(item.id)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    বিস্তারিত
                  </button>
                </div>

                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {item.shortMeaning}
                </p>

                <div className="p-3 bg-white border border-slate-100 rounded-2xl text-xs text-slate-600 font-medium">
                  💡 <strong className="text-slate-800">বাস্তব উদাহরণ:</strong> {item.bdExample}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PART B: GROUPED FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-5 animate-fade-in">
          {/* FAQ Topic Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedFaqTopic('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                selectedFaqTopic === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'glass-card hover:bg-white text-slate-600'
              }`}
            >
              সব প্রশ্ন
            </button>
            {FAQ_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedFaqTopic(topic.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  selectedFaqTopic === topic.id
                    ? 'bg-slate-900 text-white'
                    : 'glass-card hover:bg-white text-slate-600'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaq.map((faq) => {
              const isOpen = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="glass-card rounded-3xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-slate-900 hover:bg-white/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-3 text-sm text-slate-700 leading-relaxed font-medium">
                      <p className="font-semibold text-slate-900 bg-slate-50 p-3 rounded-xl">{faq.shortAnswer}</p>
                      <div className="space-y-1.5">
                        {faq.fullAnswer.map((line, li) => (
                          <p key={li}>{line}</p>
                        ))}
                      </div>
                      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-bold flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>পরের করণীয়: {faq.nextAction}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PART C: TROUBLESHOOTING WIZARD */}
      {activeTab === 'wizard' && (
        <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-6 border-slate-200 shadow-md animate-fade-in">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              বিজ্ঞাপনে কী ধরনের সমস্যা দেখতে পাচ্ছেন?
            </h3>
            <p className="text-xs text-slate-500">আপনার লক্ষণের ওপর চাপ দিলে কারণ ও সমাধান বের হবে:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TROUBLESHOOTING_SYMPTOMS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() => {
                  setSelectedSymptomId(sym.id);
                  setSelectedOptionByQuestion({});
                }}
                className={`p-4 rounded-2xl text-left border transition-all text-xs sm:text-sm font-bold flex items-center justify-between ${
                  selectedSymptomId === sym.id
                    ? 'border-2 border-emerald-500 bg-emerald-50 text-slate-900 shadow-xs'
                    : 'glass-card hover:bg-white text-slate-700'
                }`}
              >
                <div>
                  <p>⚠️ {sym.title}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{sym.shortDescription}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Follow-up questions & outcome */}
          {activeSymptom && (
            <div className="space-y-4 pt-3 border-t border-slate-100 animate-fade-in">
              {activeSymptom.questions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{q.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setSelectedOptionByQuestion({
                            ...selectedOptionByQuestion,
                            [q.id]: opt.id,
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                          selectedOptionByQuestion[q.id] === opt.id
                            ? 'border-2 border-slate-900 bg-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Final Outcome */}
              {currentOutcome && (
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200 space-y-3 animate-fade-in shadow-xs">
                  <div>
                    <p className="font-extrabold text-sm text-emerald-950">🔍 প্রধান কারণ:</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">{currentOutcome.likelyCause}</p>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-emerald-200/60">
                    <p className="font-bold text-xs sm:text-sm text-emerald-900">💡 সমাধান পদক্ষেপসমূহ:</p>
                    {currentOutcome.fixSteps.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/80 border border-emerald-100 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {currentOutcome.proTip && (
                    <p className="text-xs text-emerald-800 bg-emerald-100/60 p-2.5 rounded-xl font-semibold">
                      🌟 প্রো-টিপ: {currentOutcome.proTip}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(6)}
          className="flex-1 py-3.5 px-4 glass-card hover:bg-white text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>রেজাল্ট ডক্টরে ফিরুন</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[2] py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-slate-900/10 active:scale-98"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>নতুন পরিকল্পনা তৈরি করুন</span>
        </button>
      </div>
    </div>
  );
}
