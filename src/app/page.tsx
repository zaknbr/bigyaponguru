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
import { Footer } from '@/components/Footer';
import { JargonModal } from '@/components/JargonModal';
import { GlobalHelpDrawer } from '@/components/GlobalHelpDrawer';
import { SEVEN_DAY_LAUNCH_PLAN } from '@/config/launchPlan';
import { toBengaliDigits } from '@/utils/bengaliNumbers';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center animate-bounce shadow-xl shadow-emerald-500/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-black tracking-tight">বিজ্ঞাপন গুরু প্রস্তুত হচ্ছে...</p>
            <p className="text-xs text-slate-400">সহজ বাংলায় প্রফেশনাল মেটা ও টিকটক অ্যাড গাইড</p>
          </div>
        </div>
      </div>
    );
  }

  const activeDayPlan =
    SEVEN_DAY_LAUNCH_PLAN.find((p) => p.dayNumber === currentCampaignDay) || SEVEN_DAY_LAUNCH_PLAN[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 pb-20 sm:pb-8 relative overflow-x-hidden">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-200/20 via-indigo-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Sticky Header */}
      <Navbar />

      {/* Today's Action Banner (shown when campaign is started and not currently on Step 5) */}
      {campaignStartDate && currentStep !== 5 && (
        <div className="max-w-4xl w-full mx-auto px-4 pt-4">
          <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white p-4 rounded-3xl shadow-md border border-teal-500/30 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-teal-400 text-slate-950 flex items-center justify-center font-black text-xs flex-shrink-0">
                {useBengaliDigits ? toBengaliDigits(currentCampaignDay) : currentCampaignDay}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-300">
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs transition-all flex-shrink-0 active:scale-95 shadow-xs"
            >
              <span>দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
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
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-white shadow-xl shadow-slate-900/20 border border-slate-700/80 backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all active:scale-95 hover:border-emerald-400"
        title="যেকোনো বিজ্ঞাপনী শব্দের অর্থ ও সাহায্য জানুন"
      >
        <HelpCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="hidden sm:inline font-bold">শব্দকোষ ও সহায়তা</span>
        <span className="sm:hidden font-bold">সাহায্য</span>
      </button>

      {/* Global Interactive Help Drawer & Jargon Modal */}
      <GlobalHelpDrawer />
      <JargonModal />

      {/* Professional Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Dock */}
      <BottomNav />
    </div>
  );
}
