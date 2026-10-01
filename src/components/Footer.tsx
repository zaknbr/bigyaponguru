import React from 'react';
import { Sparkles, ShieldCheck, Heart, Code2, Layers, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentStep, openHelpDrawer } = useApp();

  return (
    <footer className="w-full mt-12 border-t border-slate-200/80 bg-white/70 backdrop-blur-md pt-8 pb-12 sm:pb-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Top Developer Attribution Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white shadow-sm hover:shadow transition-all">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide">
              Developed by <span className="text-emerald-400 font-bold">Zakaria Masud</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              ১০০% প্রাইভেট ও ব্রাউজার-ভিত্তিক
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              সম্পূর্ণ ফ্রি
            </span>
          </div>
        </div>

        {/* Brand & Purpose Section */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                বি
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                বিজ্ঞাপন গুরু <span className="text-xs font-semibold text-slate-400 font-mono">(AdGuru BD)</span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              বাংলাদেশের অনলাইন উদ্যোক্তা ও ছোট ব্যবসার ফেসবুক, ইনস্টাগ্রাম এবং টিকটক বিজ্ঞাপনের জন্য নির্ভরযোগ্য ইন্টারঅ্যাক্টিভ গাইড।
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(7);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>শব্দকোষ ও FAQ</span>
            </button>
            <button
              type="button"
              onClick={() => openHelpDrawer('wizard')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>সমস্যা সমাধান</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Network Info */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
          <p className="flex items-center justify-center gap-1">
            <span>বাংলাদেশের উদ্যোক্তাদের জন্য ভালোবাসায় তৈরি</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="font-medium text-slate-400">
            © {new Date().getFullYear()} বিজ্ঞাপন গুরু • A{' '}
            <span className="text-slate-600 font-semibold">SmartConverterBD</span> Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};
