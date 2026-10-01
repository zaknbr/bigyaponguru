export type ProductCategory =
  | 'fashion' // পোশাক ও ফ্যাশন
  | 'beauty' // রূপচর্চা ও কসমেটিকস
  | 'gadgets' // গ্যাজেট ও ইলেকট্রনিক্স
  | 'food' // খাবার ও রেস্তোরাঁ
  | 'course' // কোর্স ও ডিজিটাল প্রোডাক্ট
  | 'homedecor' // ঘর সাজানো ও ফার্নিচার
  | 'gifts' // কাস্টমাইজড গিফট আইটেম
  | 'general'; // সাধারণ বা অন্যান্য পণ্য

export type SalesChannel =
  | 'messenger' // ফেসবুক মেসেঞ্জার
  | 'whatsapp' // হোয়াটসঅ্যাপ চ্যাট
  | 'website' // ই-কমার্স ওয়েবসাইট
  | 'phone' // সরাসরি ফোন কল
  | 'cod'; // ক্যাশ অন ডেলিভারি

export interface BusinessProfile {
  productName: string;
  category: ProductCategory;
  sellingPrice: number; // বিক্রয় মূল্য (৳)
  costPrice: number; // পণ্য ক্রয়/তৈরির খরচ (৳)
  monthlyBudget: number; // মাসিক বিজ্ঞাপনের বাজেট (৳)
  salesChannel: SalesChannel;
  hasFbPage: boolean;
  hasInstagram: boolean;
  hasTiktok: boolean;
  targetCity: 'all_bd' | 'dhaka_only' | 'divisional_cities' | 'custom';
  customLocationText?: string;
}

export interface CalculatedPlan {
  sellingPrice: number;
  costPrice: number;
  profitPerUnit: number;
  profitMarginPercent: number;
  breakEvenCPA: number; // সর্বোচ্চ কত খরচে একটি সেল আসলে লোকসান হবে না
  recommendedDailyBudget: number;
  recommendedDurationDays: number;
  platformMix: {
    metaShare: number; // শতাংশ %
    tiktokShare: number;
    description: string;
  };
  campaignObjective: {
    name: string;
    description: string;
    whyThis: string;
  };
  targetingRecommendation: {
    ageRange: string;
    gender: string;
    locations: string;
    interests: string[];
    placementTip: string;
  };
  expectedEstimates: {
    minReach: number;
    maxReach: number;
    minClicks: number;
    maxClicks: number;
    minConversations: number;
    maxConversations: number;
    estimatedMinSales: number;
    estimatedMaxSales: number;
    estimatedMinRevenue: number;
    estimatedMaxRevenue: number;
  };
}

export interface JargonItem {
  id: string;
  term: string;
  banglaTitle: string;
  shortMeaning: string;
  plainExplanation: string;
  bdExample: string;
  proTip?: string;
  category?: 'budget' | 'metric' | 'tech' | 'strategy';
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
}

export interface SetupTask {
  id: string;
  taskNumber: number;
  platform: 'meta' | 'tiktok' | 'pixel' | 'general';
  title: string;
  tag: string;
  whyItMatters: string; // কেন এটি জরুরি (সহজ বাংলা ব্যাখ্যা)
  numberedSubSteps: string[]; // ১, ২, ৩... ক্রমানুসারে সাব-স্টেপ
  bangladeshNotes?: string;
  isOptional?: boolean;
  troubleshooting: TroubleshootingItem[]; // "সমস্যা হচ্ছে?" বক্সের সমস্যা ও সমাধান
  completed: boolean;
}

export type ChecklistItem = SetupTask;

export interface FourQuestionCopyInput {
  productName: string; // ১. কী বিক্রি করছেন
  customerProblem: string; // ২. ক্রেতার সবচেয়ে বড় সমস্যা বা চাহিদা কী
  specialOffer: string; // ৩. আপনার সেরা সুবিধা বা অফার কী
  orderMethod: SalesChannel; // ৪. ক্রেতা কীভাবে অর্ডার করবে
}

export interface AdCopyVariant {
  id: string;
  styleName: string;
  badge: string;
  headline: string;
  bodyText: string;
  bulletPoints: string[];
  ctaText: string;
  fullCopy: string;
}

export interface CopyPromptInput {
  productName: string;
  mainBenefit: string;
  offerText: string;
  targetAudience: string;
}

export interface GeneratedCopy {
  id: string;
  styleName: string;
  badge: string;
  hook: string;
  body: string;
  bulletPoints: string[];
  cta: string;
  fullText: string;
}

export interface TikTokHook {
  id: string;
  title: string;
  category: string;
  visualIdea: string;
  spokenBangla: string;
  whyItWorks: string;
}

export interface MetricWatchItem {
  name: string;
  target: string;
  tip: string;
}

export interface LaunchDayPlan {
  dayNumber: number;
  day: string;
  title: string;
  tag: string;
  todayActions: string[]; // (১) আজকের কাজ (1-3 simple actions)
  whatNotToDo: string; // (২) আজ যা করবেন না (mistake to avoid)
  metricsToWatch: MetricWatchItem[]; // (৩) কী দেখবেন (which 1-2 numbers to look at)
  goldenRule: string;
  quickTroubleshooting?: {
    problem: string;
    solution: string;
  }[];
}

export interface WeeklyReviewData {
  totalSpend: number; // মোট খরচ (৳)
  totalMessagesOrOrders: number; // মোট মেসেজ বা সেল
  totalRevenue: number; // মোট আয় (৳)
  productCostTotal: number; // পণ্যের কেনা/তৈরি খরচ (৳)
  deliveryCostTotal: number; // কুরিয়ার ডেলিভারি খরচ (৳)
}

export interface ResultDoctorInput {
  spentBudget: number; // কত টাকা খরচ হয়েছে (৳)
  reach: number; // কত মানুষের কাছে পৌঁছেছে
  clicks: number; // কতজন ক্লিক করেছে
  conversions: number; // কতগুলো মেসেজ বা সেল পেয়েছেন
  actualSalesCount?: number; // যদি মেসেজের পর আসল সেল দিয়ে হিসাব করতে চান
}

export type VerdictStatus = 'green' | 'yellow' | 'red';

export interface ResultVerdict {
  status: VerdictStatus;
  headline: string;
  summary: string;
  metrics: {
    ctr: number; // %
    cpm: number; // ৳
    costPerConversion: number; // ৳
    cpc: number; // ৳
  };
  benchmarks: {
    ctrStatus: 'good' | 'average' | 'poor';
    cpmStatus: 'good' | 'average' | 'poor';
    costStatus: 'good' | 'average' | 'poor';
  };
  diagnoses: {
    type: 'creative' | 'offer_landing' | 'audience_budget' | 'scaling';
    problemBangla: string;
    explanationBangla: string;
  }[];
  nextAction: {
    title: string;
    actionSteps: string[];
  };
}

export type FAQTopic = 'getting_started' | 'account_payment' | 'ad_rejected' | 'results';

export interface FAQItem {
  id: string;
  category: FAQTopic | 'ban_issue' | 'payment_vat' | 'strategy' | 'basics';
  topic: FAQTopic;
  question: string;
  shortAnswer: string;
  fullAnswer: string[];
  nextAction: string; // পরের করণীয়
  keyTakeaway?: string;
}

export interface TroubleshootingFixOption {
  id: string;
  label: string;
  likelyCause: string;
  fixSteps: string[];
  proTip?: string;
}

export interface TroubleshootingQuestion {
  id: string;
  question: string;
  options: TroubleshootingFixOption[];
}

export interface TroubleshootingSymptom {
  id: string;
  title: string;
  iconName: 'ban' | 'eye-off' | 'mouse-pointer' | 'message-square' | 'dollar-sign';
  shortDescription: string;
  questions: TroubleshootingQuestion[];
}

export type GlobalHelpTab = 'glossary' | 'faq' | 'wizard';

