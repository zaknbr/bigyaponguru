'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import {
  BusinessProfile,
  CalculatedPlan,
  ChecklistItem,
  SetupTask,
  CopyPromptInput,
  FourQuestionCopyInput,
  ResultDoctorInput,
  WeeklyReviewData,
} from '@/types';
import { calculatePersonalizedPlan } from '@/config/adRules';
import { getFilteredSetupTasks } from '@/config/setupChecklist';
import { POLICY_SAFETY_CHECKS } from '@/config/creativeKitConfig';

interface AppContextType {
  useBengaliDigits: boolean;
  setUseBengaliDigits: (val: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  profile: BusinessProfile;
  setProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  updateProfile: (fields: Partial<BusinessProfile>) => void;
  calculatedPlan: CalculatedPlan;
  // Enhanced Setup Guide
  setupTasks: SetupTask[];
  completedTaskIds: string[];
  toggleTaskCompleted: (taskId: string) => void;
  hasSkippedSetup: boolean;
  skipSetup: () => void;
  isSetupComplete: boolean;
  setupProgressText: string;
  setupCompletedCount: number;
  setupTotalCount: number;
  activeSetupTaskId: string;
  setActiveSetupTaskId: (id: string) => void;
  // Checklist compatibility
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;
  // Creative Kit Part A: 4-question copy builder
  fourQuestionCopy: FourQuestionCopyInput;
  setFourQuestionCopy: React.Dispatch<React.SetStateAction<FourQuestionCopyInput>>;
  updateFourQuestionCopy: (fields: Partial<FourQuestionCopyInput>) => void;
  copyInput: CopyPromptInput;
  setCopyInput: React.Dispatch<React.SetStateAction<CopyPromptInput>>;
  // Creative Kit Part D: Policy checks
  checkedPolicyIds: string[];
  togglePolicyCheck: (id: string) => void;
  allPoliciesChecked: boolean;
  // 7-Day Launch Plan Protocol
  campaignStartDate: string | null;
  startCampaignToday: () => void;
  currentCampaignDay: number;
  completedLaunchDays: number[];
  toggleLaunchDayCompleted: (dayNum: number) => void;
  resetCampaignCycle: () => void;
  weeklyReviewData: WeeklyReviewData;
  setWeeklyReviewData: React.Dispatch<React.SetStateAction<WeeklyReviewData>>;
  // Result Doctor
  doctorInput: ResultDoctorInput;
  setDoctorInput: React.Dispatch<React.SetStateAction<ResultDoctorInput>>;
  // Help Center & Global Drawer
  activeJargonId: string | null;
  openJargonModal: (id: string) => void;
  closeJargonModal: () => void;
  isHelpDrawerOpen: boolean;
  helpDrawerTab: 'glossary' | 'faq' | 'wizard';
  setHelpDrawerTab: (tab: 'glossary' | 'faq' | 'wizard') => void;
  openHelpDrawer: (tab?: 'glossary' | 'faq' | 'wizard', jargonId?: string) => void;
  closeHelpDrawer: () => void;
  resetAllData: () => void;
  isHydrated: boolean;
}

const DEFAULT_PROFILE: BusinessProfile = {
  productName: 'প্রিমিয়াম সুতি শাড়ি',
  category: 'fashion',
  sellingPrice: 1850,
  costPrice: 1100,
  monthlyBudget: 8000,
  salesChannel: 'messenger',
  hasFbPage: true,
  hasInstagram: true,
  hasTiktok: false,
  targetCity: 'all_bd',
};

const DEFAULT_FOUR_QUESTION_COPY: FourQuestionCopyInput = {
  productName: 'প্রিমিয়াম হ্যান্ডলুম সুতি শাড়ি',
  customerProblem: 'গরমের অস্বস্তি ও নিম্নমানের সাধারণ কাপড়ে প্রতারিত হওয়ার ভয়',
  specialOffer: 'আজকের অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি ও ক্যাশ অন ডেলিভারিতে চেক করার সুযোগ',
  orderMethod: 'messenger',
};

const DEFAULT_COPY_INPUT: CopyPromptInput = {
  productName: 'প্রিমিয়াম হ্যান্ডলুম শাড়ি',
  mainBenefit: '১০০% পিওর সুতি সুতায় বোনা ও গরমে আরামদায়ক',
  offerText: 'আজকের অর্ডারে সম্পূর্ণ ফ্রি হোম ডেলিভারি ও আকর্ষণীয় ছাড়',
  targetAudience: 'স্টাইলিশ ও রুচিশীল নারীদের জন্য',
};

const DEFAULT_DOCTOR_INPUT: ResultDoctorInput = {
  spentBudget: 1500,
  reach: 8500,
  clicks: 220,
  conversions: 18,
};

const DEFAULT_WEEKLY_REVIEW: WeeklyReviewData = {
  totalSpend: 3500,
  totalMessagesOrOrders: 28,
  totalRevenue: 51800,
  productCostTotal: 30800,
  deliveryCostTotal: 2800,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bigyaponguru_app_state_v4';

export function AppProvider({ children }: { children: ReactNode }) {
  const [useBengaliDigits, setUseBengaliDigits] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [profile, setProfile] = useState<BusinessProfile>(DEFAULT_PROFILE);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [hasSkippedSetup, setHasSkippedSetup] = useState<boolean>(false);
  const [activeSetupTaskId, setActiveSetupTaskId] = useState<string>('setup-page');
  const [fourQuestionCopy, setFourQuestionCopy] = useState<FourQuestionCopyInput>(DEFAULT_FOUR_QUESTION_COPY);
  const [checkedPolicyIds, setCheckedPolicyIds] = useState<string[]>([]);
  // 7-Day Launch State
  const [campaignStartDate, setCampaignStartDate] = useState<string | null>(null);
  const [completedLaunchDays, setCompletedLaunchDays] = useState<number[]>([]);
  const [weeklyReviewData, setWeeklyReviewData] = useState<WeeklyReviewData>(DEFAULT_WEEKLY_REVIEW);
  // Result Doctor & Common
  const [copyInput, setCopyInput] = useState<CopyPromptInput>(DEFAULT_COPY_INPUT);
  const [doctorInput, setDoctorInput] = useState<ResultDoctorInput>(DEFAULT_DOCTOR_INPUT);
  const [activeJargonId, setActiveJargonId] = useState<string | null>(null);
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState<boolean>(false);
  const [helpDrawerTab, setHelpDrawerTab] = useState<'glossary' | 'faq' | 'wizard'>('glossary');
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Dynamic calculation plan
  const calculatedPlan = useMemo(() => calculatePersonalizedPlan(profile), [profile]);

  // Keep 4-question copy synced when profile changes if user hasn't edited
  useEffect(() => {
    setFourQuestionCopy((prev) => ({
      ...prev,
      productName: prev.productName || profile.productName,
      orderMethod: profile.salesChannel || prev.orderMethod,
    }));
  }, [profile.productName, profile.salesChannel]);

  // Filtered setup tasks based on user profile and platform recommendations
  const setupTasks = useMemo(() => {
    const filtered = getFilteredSetupTasks(profile, calculatedPlan);
    return filtered.map((task) => ({
      ...task,
      completed: completedTaskIds.includes(task.id),
    }));
  }, [profile, calculatedPlan, completedTaskIds]);

  // Setup completion metrics
  const setupTotalCount = setupTasks.length;
  const setupCompletedCount = setupTasks.filter((t) => t.completed).length;
  const isSetupComplete = setupTotalCount > 0 && setupCompletedCount >= setupTotalCount;

  // Policy check status
  const allPoliciesChecked =
    POLICY_SAFETY_CHECKS.length > 0 &&
    POLICY_SAFETY_CHECKS.every((p) => checkedPolicyIds.includes(p.id));

  // Compute current campaign day based on campaignStartDate
  const currentCampaignDay = useMemo(() => {
    if (!campaignStartDate) return 1;
    const start = new Date(campaignStartDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.min(7, Math.max(1, diffDays + 1));
  }, [campaignStartDate]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.useBengaliDigits !== undefined) setUseBengaliDigits(parsed.useBengaliDigits);
        if (parsed.currentStep !== undefined) setCurrentStep(parsed.currentStep);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.completedTaskIds) setCompletedTaskIds(parsed.completedTaskIds);
        if (parsed.hasSkippedSetup !== undefined) setHasSkippedSetup(parsed.hasSkippedSetup);
        if (parsed.activeSetupTaskId) setActiveSetupTaskId(parsed.activeSetupTaskId);
        if (parsed.fourQuestionCopy) setFourQuestionCopy(parsed.fourQuestionCopy);
        if (parsed.checkedPolicyIds) setCheckedPolicyIds(parsed.checkedPolicyIds);
        if (parsed.campaignStartDate !== undefined) setCampaignStartDate(parsed.campaignStartDate);
        if (parsed.completedLaunchDays) setCompletedLaunchDays(parsed.completedLaunchDays);
        if (parsed.weeklyReviewData) setWeeklyReviewData(parsed.weeklyReviewData);
        if (parsed.copyInput) setCopyInput(parsed.copyInput);
        if (parsed.doctorInput) setDoctorInput(parsed.doctorInput);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave = {
        useBengaliDigits,
        currentStep,
        profile,
        completedTaskIds,
        hasSkippedSetup,
        activeSetupTaskId,
        fourQuestionCopy,
        checkedPolicyIds,
        campaignStartDate,
        completedLaunchDays,
        weeklyReviewData,
        copyInput,
        doctorInput,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [
    useBengaliDigits,
    currentStep,
    profile,
    completedTaskIds,
    hasSkippedSetup,
    activeSetupTaskId,
    fourQuestionCopy,
    checkedPolicyIds,
    campaignStartDate,
    completedLaunchDays,
    weeklyReviewData,
    copyInput,
    doctorInput,
    isHydrated,
  ]);

  const updateProfile = (fields: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  const updateFourQuestionCopy = (fields: Partial<FourQuestionCopyInput>) => {
    setFourQuestionCopy((prev) => ({ ...prev, ...fields }));
  };

  const toggleTaskCompleted = (taskId: string) => {
    setCompletedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const togglePolicyCheck = (id: string) => {
    setCheckedPolicyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const startCampaignToday = () => {
    const todayIso = new Date().toISOString();
    setCampaignStartDate(todayIso);
  };

  const toggleLaunchDayCompleted = (dayNum: number) => {
    setCompletedLaunchDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const resetCampaignCycle = () => {
    if (window.confirm('আপনি কি পূর্ববর্তী অভিজ্ঞতার ভিত্তিতে নতুন ৭ দিনের লঞ্চ সাইকেল শুরু করতে চান?')) {
      const todayIso = new Date().toISOString();
      setCampaignStartDate(todayIso);
      setCompletedLaunchDays([]);
    }
  };

  const skipSetup = () => {
    setHasSkippedSetup(true);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleChecklistItem = (id: string) => {
    toggleTaskCompleted(id);
  };

  const resetChecklist = () => {
    setCompletedTaskIds([]);
  };

  const openJargonModal = (id: string) => {
    setActiveJargonId(id);
    setHelpDrawerTab('glossary');
    setIsHelpDrawerOpen(true);
  };

  const closeJargonModal = () => {
    setActiveJargonId(null);
  };

  const openHelpDrawer = (tab: 'glossary' | 'faq' | 'wizard' = 'glossary', jargonId?: string) => {
    setHelpDrawerTab(tab);
    if (jargonId) {
      setActiveJargonId(jargonId);
    }
    setIsHelpDrawerOpen(true);
  };

  const closeHelpDrawer = () => {
    setIsHelpDrawerOpen(false);
    setActiveJargonId(null);
  };

  const resetAllData = () => {
    if (window.confirm('আপনি কি সমস্ত তথ্য পুনরায় শুরু (Reset) করতে চান?')) {
      setProfile(DEFAULT_PROFILE);
      setCompletedTaskIds([]);
      setHasSkippedSetup(false);
      setActiveSetupTaskId('setup-page');
      setFourQuestionCopy(DEFAULT_FOUR_QUESTION_COPY);
      setCheckedPolicyIds([]);
      setCampaignStartDate(null);
      setCompletedLaunchDays([]);
      setWeeklyReviewData(DEFAULT_WEEKLY_REVIEW);
      setCopyInput(DEFAULT_COPY_INPUT);
      setDoctorInput(DEFAULT_DOCTOR_INPUT);
      setCurrentStep(1);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const setupProgressText = `${setupCompletedCount}/${setupTotalCount} ধাপ শেষ`;

  return (
    <AppContext.Provider
      value={{
        useBengaliDigits,
        setUseBengaliDigits,
        currentStep,
        setCurrentStep,
        profile,
        setProfile,
        updateProfile,
        calculatedPlan,
        setupTasks,
        completedTaskIds,
        toggleTaskCompleted,
        hasSkippedSetup,
        skipSetup,
        isSetupComplete,
        setupProgressText,
        setupCompletedCount,
        setupTotalCount,
        activeSetupTaskId,
        setActiveSetupTaskId,
        checklist: setupTasks,
        toggleChecklistItem,
        resetChecklist,
        fourQuestionCopy,
        setFourQuestionCopy,
        updateFourQuestionCopy,
        copyInput,
        setCopyInput,
        checkedPolicyIds,
        togglePolicyCheck,
        allPoliciesChecked,
        campaignStartDate,
        startCampaignToday,
        currentCampaignDay,
        completedLaunchDays,
        toggleLaunchDayCompleted,
        resetCampaignCycle,
        weeklyReviewData,
        setWeeklyReviewData,
        doctorInput,
        setDoctorInput,
        activeJargonId,
        openJargonModal,
        closeJargonModal,
        isHelpDrawerOpen,
        helpDrawerTab,
        setHelpDrawerTab,
        openHelpDrawer,
        closeHelpDrawer,
        resetAllData,
        isHydrated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
