import React from 'react';
import { Sparkles, ShieldCheck, Heart, Code2, Layers, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentStep, openHelpDrawer } = useApp();

  return (
    <footer className="w-full mt-12 border-t border-white/80 bg-white/75 backdrop-blur-xl pt-8 pb-14 sm:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Developer Attribution Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-slate-200/60">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:shadow-lg transition-all">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Developed by <span className="text-emerald-400 font-extrabold">Zakaria Masud</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ১০০% প্রাইভেট ও ব্রাউজার-ভিত্তিক
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
              <Sparkles className="w-4 h-4" />
              সম্পূর্ণ ফ্রি ও ওপেন
            </span>
          </div>
        </div>

        {/* Brand & Purpose Section */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                বি
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                বিজ্ঞাপন গুরু <span className="text-xs font-semibold text-slate-400 font-mono">(AdGuru BD)</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-medium">
              বাংলাদেশের অনলাইন উদ্যোক্তা ও এফ-কমার্স বিক্রেতাদের জন্য ফেসবুক, ইনস্টাগ্রাম ও টিকটক বিজ্ঞাপনের সহজ বাংলা গাইড।
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(7);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 shadow-xs transition-all active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>শব্দকোষ ও FAQ</span>
            </button>
            <button
              type="button"
              onClick={() => openHelpDrawer('wizard')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 shadow-xs transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>সমস্যা সমাধান</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Network Info */}
        <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>বাংলাদেশের উদ্যোক্তাদের জন্য ভালোবাসায় তৈরি</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="font-semibold text-slate-500">
            © {new Date().getFullYear()} বিজ্ঞাপন গুরু • A{' '}
            <span className="text-slate-800 font-bold">SmartConverterBD</span> Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};
