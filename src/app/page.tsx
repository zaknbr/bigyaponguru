'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { Step1BusinessProfile } from '@/components/steps/Step1BusinessProfile';
import { Step2PersonalizedPlan } from '@/components/steps/Step2PersonalizedPlan';
import { Step3SetupWalkthrough } from '@/components/steps/Step3SetupWalkthrough';
import { Step4CreativeKit } from '@/components/steps/Step4CreativeKit';
import { Step5LaunchPlan } from '@/components/steps/Step5LaunchPlan';
import { Step6ResultDoctor } from '@/components/steps/Step6ResultDoctor';
import { Step7GlossaryAndFAQ } from '@/components/steps/Step7GlossaryAndFAQ';
import { JargonModal } from '@/components/JargonModal';
import { GlobalHelpDrawer } from '@/components/GlobalHelpDrawer';
import { SEVEN_DAY_LAUNCH_PLAN } from '@/config/launchPlan';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import { HelpCircle, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  const {
    currentStep,
    setCurrentStep,
    isHydrated,
    openHelpDrawer,
    campaignStartDate,
    currentCampaignDay,
    useBengaliDigits,
  } = useApp();

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-base font-bold tracking-tight">বিজ্ঞাপন গুরু লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const activeDayPlan =
    SEVEN_DAY_LAUNCH_PLAN.find((p) => p.dayNumber === currentCampaignDay) || SEVEN_DAY_LAUNCH_PLAN[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 pb-20 sm:pb-8">
      {/* Sticky Header */}
      <Navbar />

      {/* Today's Action Banner (shown when campaign is started and not currently on Step 5) */}
      {campaignStartDate && currentStep !== 5 && (
        <div className="max-w-3xl w-full mx-auto px-4 pt-4">
          <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-teal-500/30 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-xs flex-shrink-0">
                {useBengaliDigits ? toBengaliDigits(currentCampaignDay) : currentCampaignDay}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300">
                  আজ কী করতে হবে (দিন {useBengaliDigits ? toBengaliDigits(currentCampaignDay) : currentCampaignDay}):
                </span>
                <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {activeDayPlan.title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(5);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs transition-all flex-shrink-0 active:scale-95"
            >
              <span>দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {currentStep === 1 && <Step1BusinessProfile />}
        {currentStep === 2 && <Step2PersonalizedPlan />}
        {currentStep === 3 && <Step3SetupWalkthrough />}
        {currentStep === 4 && <Step4CreativeKit />}
        {currentStep === 5 && <Step5LaunchPlan />}
        {currentStep === 6 && <Step6ResultDoctor />}
        {currentStep === 7 && <Step7GlossaryAndFAQ />}
      </main>

      {/* Floating Quick Help Button (Accessible on all screens) */}
      <button
        type="button"
        onClick={() => openHelpDrawer('glossary')}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 p-3.5 rounded-2xl bg-slate-900/95 hover:bg-slate-900 text-white shadow-xl shadow-slate-900/20 border border-slate-700/80 backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all active:scale-95 hover:border-indigo-400"
        title="যেকোনো বিজ্ঞাপনী শব্দের অর্থ ও সাহায্য জানুন"
      >
        <HelpCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="hidden sm:inline">শব্দকোষ ও সহায়তা</span>
        <span className="sm:hidden">সাহায্য</span>
      </button>

      {/* Global Interactive Help Drawer / Sheet */}
      <GlobalHelpDrawer />
      <JargonModal />

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-slate-500 space-y-2 border-t border-slate-200/60 w-full mt-auto">
        <p className="flex items-center justify-center gap-1">
          <span>বাংলাদেশের উদ্যোক্তাদের জন্য ভালোবাসায় তৈরি</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>
        <p className="text-[11px] text-slate-400">
          বিজ্ঞাপন গুরু • ১০০% ফ্রি ও লোকাল রুলস ভিত্তিক • Vercel-এ ডেপ্লয় করার জন্য প্রস্তুত
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
