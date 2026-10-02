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
  ArrowRight,
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

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    return selectedFaqTopic === 'all' || faq.topic === selectedFaqTopic;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const activeSymptom = TROUBLESHOOTING_SYMPTOMS.find((s) => s.id === selectedSymptomId);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Clean Header */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900">সাহায্য কেন্দ্র ও শব্দকোষ</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          বিজ্ঞাপনের কঠিন ইংরেজি শব্দের সহজ বাংলা ব্যাখ্যা ও সাধারণ সমস্যার সমাধান
        </p>

        {/* 3 Tab Switcher */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'glossary'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            শব্দকোষ
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'faq'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            প্রশ্নোত্তর (FAQ)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'wizard'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সমস্যা সমাধান
          </button>
        </div>
      </div>

      {/* TAB 1: Glossary */}
      {activeTab === 'glossary' && (
        <div className="space-y-4 animate-fade-in">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শব্দ খুঁজুন (যেমন: Reach, CPM, CTR, ROAS, Pixel)..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
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
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedJargonCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Jargon Cards */}
          <div className="space-y-2.5">
            {filteredJargon.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.term}</h3>
                    <p className="text-xs font-semibold text-emerald-800">{item.banglaTitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openJargonModal(item.id)}
                    className="text-xs text-slate-500 hover:text-slate-900 font-medium px-2 py-1 bg-slate-100 rounded-md"
                  >
                    বিস্তারিত
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.shortMeaning}</p>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg leading-relaxed">
                  <strong>উদাহরণ: </strong> {item.bdExample}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {FAQ_TOPICS.map((topic) => {
              const isSelected = selectedFaqTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedFaqTopic(isSelected ? 'all' : topic.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;

              return (
                <div key={faq.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </h3>
                    <div className="text-slate-400 p-0.5 flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-2 text-xs border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed font-medium">{faq.shortAnswer}</p>
                      <div className="space-y-1 pl-1 text-slate-600">
                        {faq.fullAnswer.map((ans, idx) => (
                          <p key={idx}>• {ans}</p>
                        ))}
                      </div>
                      <div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-950 font-medium text-[11px]">
                        <strong>পরের করণীয়: </strong> {faq.nextAction}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Troubleshooting Wizard */}
      {activeTab === 'wizard' && (
        <div className="space-y-4 animate-fade-in">
          {!selectedSymptomId ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700">আপনার বিজ্ঞাপনী সমস্যা সিলেক্ট করুন:</p>
              <div className="space-y-2">
                {TROUBLESHOOTING_SYMPTOMS.map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => {
                      setSelectedSymptomId(sym.id);
                      setSelectedOptionByQuestion({});
                    }}
                    className="w-full p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900">{sym.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{sym.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {activeSymptom?.title}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSymptomId(null);
                    setSelectedOptionByQuestion({});
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>অন্য সমস্যা</span>
                </button>
              </div>

              {activeSymptom?.questions.map((q) => {
                const selectedOptId = selectedOptionByQuestion[q.id];
                const activeOption = q.options.find((opt) => opt.id === selectedOptId);

                return (
                  <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <p className="font-semibold text-xs text-slate-900">{q.question}</p>
                    <div className="space-y-1.5">
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
                            className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors border flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {activeOption && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                        <div className="bg-rose-50 p-2.5 rounded-lg text-rose-950">
                          <strong>সম্ভাব্য কারণ: </strong> {activeOption.likelyCause}
                        </div>
                        <div className="bg-slate-900 text-white p-3.5 rounded-lg space-y-1.5">
                          <p className="font-semibold text-xs text-emerald-400">করণীয় পদক্ষেপ:</p>
                          {activeOption.fixSteps.map((st, i) => (
                            <p key={i} className="text-slate-200 leading-relaxed">• {st}</p>
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

      {/* Navigation Footer */}
      <div className="pt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(6)}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
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
          className="flex-[2] py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>শুরু থেকে নতুন প্ল্যান বানান</span>
        </button>
      </div>
    </div>
  );
}
