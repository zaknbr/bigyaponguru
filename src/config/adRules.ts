import { BusinessProfile, CalculatedPlan, ProductCategory } from '@/types';

export interface CategoryDetail {
  id: ProductCategory;
  nameBangla: string;
  iconName: string;
  defaultSellingPrice: number;
  defaultCostPrice: number;
  avgCPM: number; // ৳
  avgCTR: number; // %
  conversionRatePercent: number; // % of clicks that message/order
  metaShare: number; // %
  tiktokShare: number; // %
  defaultTargeting: {
    ageRange: string;
    gender: string;
    interests: string[];
  };
}

export const CATEGORY_CONFIGS: Record<ProductCategory, CategoryDetail> = {
  fashion: {
    id: 'fashion',
    nameBangla: 'পোশাক ও ফ্যাশন (শাড়ি, থ্রি-পিস, পাঞ্জাবি, টি-শার্ট)',
    iconName: 'Shirt',
    defaultSellingPrice: 1650,
    defaultCostPrice: 950,
    avgCPM: 160,
    avgCTR: 2.6,
    conversionRatePercent: 8.5,
    metaShare: 70,
    tiktokShare: 30,
    defaultTargeting: {
      ageRange: '১৮ - ৩৫ বছর',
      gender: 'নারী ও পুরুষ (পণ্য অনুযায়ী)',
      interests: ['অনলাইন শপিং', 'পোশাক ও ফ্যাশন', 'বুটিক', 'সাম্প্রতিক ট্রেন্ড'],
    },
  },
  beauty: {
    id: 'beauty',
    nameBangla: 'রূপচর্চা ও কসমেটিকস (স্কিনকেয়ার, মেকআপ, হেয়ার কেয়ার)',
    iconName: 'Sparkles',
    defaultSellingPrice: 1250,
    defaultCostPrice: 650,
    avgCPM: 180,
    avgCTR: 3.1,
    conversionRatePercent: 9.0,
    metaShare: 65,
    tiktokShare: 35,
    defaultTargeting: {
      ageRange: '১৮ - ৩২ বছর',
      gender: 'মূলত নারী (অথবা গ্রুমিং প্রোডাক্ট হলে পুরুষ)',
      interests: ['স্কিন কেয়ার', 'প্রাকৃতিক রূপচর্চা', 'কোরিয়ান কসমেটিকস', 'বিউটি পার্লার'],
    },
  },
  gadgets: {
    id: 'gadgets',
    nameBangla: 'গ্যাজেট ও ইলেকট্রনিক্স (স্মার্টওয়াচ, ইয়ারবাডস, মোবাইল অ্যাক্সেসরিজ)',
    iconName: 'Smartphone',
    defaultSellingPrice: 1850,
    defaultCostPrice: 1100,
    avgCPM: 210,
    avgCTR: 2.2,
    conversionRatePercent: 7.0,
    metaShare: 75,
    tiktokShare: 25,
    defaultTargeting: {
      ageRange: '২০ - ৩৮ বছর',
      gender: 'মূলত পুরুষ (৮০%) ও প্রযুক্তিপ্রেমী নারী',
      interests: ['গ্যাজেট লাভার', 'নতুন প্রযুক্তি', 'স্মার্টফোন অ্যাক্সেসরিজ', 'অনলাইন শপিং'],
    },
  },
  food: {
    id: 'food',
    nameBangla: 'খাবার ও রেস্তোরাঁ (হোমমেড ফুড, ক্লাউড কিচেন, কেক, স্পেশাল খাবার)',
    iconName: 'Utensils',
    defaultSellingPrice: 750,
    defaultCostPrice: 380,
    avgCPM: 140,
    avgCTR: 3.4,
    conversionRatePercent: 11.0,
    metaShare: 60,
    tiktokShare: 40,
    defaultTargeting: {
      ageRange: '১৮ - ৪২ বছর',
      gender: 'উভয়',
      interests: ['ফুড লাভার', 'হোম ডেলিভারি ফুড', 'ফাস্ট ফুড ও ডেজার্ট', 'রেসিপি ও রান্না'],
    },
  },
  course: {
    id: 'course',
    nameBangla: 'কোর্স ও ডিজিটাল সার্ভিস (স্কিল ডেভেলপমেন্ট, কনসাল্টেশন)',
    iconName: 'GraduationCap',
    defaultSellingPrice: 3500,
    defaultCostPrice: 600,
    avgCPM: 280,
    avgCTR: 1.8,
    conversionRatePercent: 5.5,
    metaShare: 85,
    tiktokShare: 15,
    defaultTargeting: {
      ageRange: '১৯ - ৩৫ বছর',
      gender: 'উভয়',
      interests: ['ফ্রিল্যান্সিং ও আইটি', 'অনলাইন ক্যারিয়ার', 'ইংরেজি শেখা', 'উদ্যোক্তা ও ব্যবসা'],
    },
  },
  homedecor: {
    id: 'homedecor',
    nameBangla: 'ঘর সাজানো ও ফার্নিচার (ওয়ালম্যাট, কুশন, শো-পিস, ডেকোরেশন)',
    iconName: 'Home',
    defaultSellingPrice: 2200,
    defaultCostPrice: 1200,
    avgCPM: 170,
    avgCTR: 2.4,
    conversionRatePercent: 7.5,
    metaShare: 80,
    tiktokShare: 20,
    defaultTargeting: {
      ageRange: '২২ - ৪৫ বছর',
      gender: 'নারী ও গৃহিণী (প্রধানত) এবং পরিবার প্রধান',
      interests: ['ইন্টেরিয়র ডিজাইন', 'হোম ডেকোর', 'ঘর সাজানোর টিপস', 'আসবাবপত্র'],
    },
  },
  gifts: {
    id: 'gifts',
    nameBangla: 'কাস্টমাইজড গিফট ও জুয়েলারি (ছবি ফ্রেম, মগ, হ্যান্ডমেড জুয়েলারি)',
    iconName: 'Gift',
    defaultSellingPrice: 950,
    defaultCostPrice: 420,
    avgCPM: 150,
    avgCTR: 3.2,
    conversionRatePercent: 10.0,
    metaShare: 70,
    tiktokShare: 30,
    defaultTargeting: {
      ageRange: '১৮ - ৩০ বছর',
      gender: 'উভয় (প্রেমী-যুগল ও তরুণ প্রজন্ম)',
      interests: ['উপহার ও সারপ্রাইজ', 'বার্ষিকী ও জন্মদিন', 'হ্যান্ডমেড ক্রাফট', 'জুয়েলারি ডিজাইন'],
    },
  },
  general: {
    id: 'general',
    nameBangla: 'সাধারণ বা অন্যান্য পণ্য',
    iconName: 'Package',
    defaultSellingPrice: 1500,
    defaultCostPrice: 800,
    avgCPM: 180,
    avgCTR: 2.3,
    conversionRatePercent: 7.5,
    metaShare: 75,
    tiktokShare: 25,
    defaultTargeting: {
      ageRange: '২০ - ৪০ বছর',
      gender: 'উভয়',
      interests: ['অনলাইন শপিং', 'ক্যাশ অন ডেলিভারি ক্রেতা', 'জনপ্রিয় অফার'],
    },
  },
};

/**
 * Calculates a full personalized advertising plan based on business profile
 */
export function calculatePersonalizedPlan(profile: BusinessProfile): CalculatedPlan {
  const categoryConfig = CATEGORY_CONFIGS[profile.category] || CATEGORY_CONFIGS.general;

  const sellingPrice = Math.max(1, profile.sellingPrice);
  const costPrice = Math.max(0, profile.costPrice);
  const profitPerUnit = Math.max(1, sellingPrice - costPrice);
  const profitMarginPercent = Math.min(99, Math.max(1, Math.round((profitPerUnit / sellingPrice) * 100)));

  // Break-even CPA is equal to profit per unit
  const breakEvenCPA = profitPerUnit;

  // Monthly budget calculation
  const monthlyBudget = Math.max(1500, profile.monthlyBudget || 6000);
  // Recommend running campaign for 15-20 days or full month in batches
  const recommendedDurationDays = Math.min(30, Math.max(7, Math.round(monthlyBudget / 500)));
  const calculatedDailyBudget = Math.round(monthlyBudget / recommendedDurationDays);
  // Ensure daily budget is at least 350 BDT (approx $3) for effective Meta learning phase
  const recommendedDailyBudget = Math.max(350, calculatedDailyBudget);

  // Platform mix logic
  let metaShare = categoryConfig.metaShare;
  let tiktokShare = categoryConfig.tiktokShare;

  if (profile.hasTiktok && !profile.hasFbPage) {
    tiktokShare = 70;
    metaShare = 30;
  } else if (!profile.hasTiktok && profile.hasFbPage) {
    metaShare = 90;
    tiktokShare = 10;
  }

  let platformDescription = `বিজ্ঞাপনের বাজেটের ${metaShare}% মেটাতে (ফেসবুক ও ইনস্টাগ্রাম) এবং ${tiktokShare}% টিকটকে ব্যবহার করার পরামর্শ দেওয়া হচ্ছে।`;
  if (tiktokShare <= 10) {
    platformDescription = `আপনার পেজের বর্তমান অবস্থার ভিত্তিতে ফেসবুক ও ইনস্টাগ্রামে সম্পূর্ণ ফোকাস (মেসেঞ্জার সেলস) করাই সবচেয়ে বেশি লাভজনক হবে।`;
  }

  // Campaign Objective logic
  let campaignObjective = {
    name: 'মেসেজ ক্যাম্পেইন (Engagement / Messages)',
    description: 'ফেসবুক মেসেঞ্জার এবং হোয়াটসঅ্যাপে সরাসরি ক্রেতাদের থেকে চ্যাট ও অর্ডার নেওয়া।',
    whyThis:
      'বাংলাদেশের সাধারণ ক্রেতারা কোনো ওয়েবসাইটে ঢুকে অর্ডার করার চেয়ে সরাসরি মেসেঞ্জারে কথা বলে, পণ্যের আসল ছবি/ভিডিও দেখে ও দরদাম নিশ্চিত করে ক্যাশ অন ডেলিভারিতে অর্ডার করতে অনেক বেশি পছন্দ ও বিশ্বাস করেন।',
  };

  if (profile.salesChannel === 'website') {
    campaignObjective = {
      name: 'সেলস / কনভার্সন ক্যাম্পেইন (Sales with Meta Pixel)',
      description: 'ওয়েবসাইটে সরাসরি ভিজিটর পাঠিয়ে অ্যাড টু কার্ট ও চেকআউট করানো।',
      whyThis:
        'যেহেতু আপনার প্রফেশনাল ওয়েবসাইট আছে, তাই মেটা পিক্সেল ব্যবহার করে কনভার্সন অ্যাড চালালে ফেসবুক স্বয়ংক্রিয়ভাবে যাদের অনলাইনে চেকআউট করার অভ্যাস আছে তাদের কাছেই অ্যাড পৌঁছাবে।',
    };
  } else if (profile.salesChannel === 'phone') {
    campaignObjective = {
      name: 'লিডস ও কল ক্যাম্পেইন (Leads / Calls)',
      description: 'বিজ্ঞাপন থেকে সরাসরি ফোন কল অথবা নাম-ঠিকানা-মোবাইল নম্বর সংগ্রহ করা।',
      whyThis:
        'উচ্চমূল্যের পণ্য বা কাস্টমাইজড সার্ভিসের ক্ষেত্রে কাস্টমারের সাথে সরাসরি কথা বলে বিশ্বাস অর্জন করা দ্রুত বিক্রির চাবিকাঠি।',
    };
  }

  // Location logic
  let locationText = 'সমগ্র বাংলাদেশ (সকল ৬৪ জেলায় ক্যাশ অন ডেলিভারি)';
  if (profile.targetCity === 'dhaka_only') {
    locationText = 'ঢাকা মেট্রো ও পার্শ্ববর্তী এলাকা (দ্রুত ডেলিভারির সুবিধার্থে)';
  } else if (profile.targetCity === 'divisional_cities') {
    locationText = 'বিভাগীয় শহরসমূহ (ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা ইত্যাদি)';
  } else if (profile.customLocationText) {
    locationText = profile.customLocationText;
  }

  // Estimate performance ranges based on budget and BD benchmarks
  const totalCampaignBudget = recommendedDailyBudget * recommendedDurationDays;
  const cpm = categoryConfig.avgCPM;
  const ctr = categoryConfig.avgCTR / 100;
  const convRate = categoryConfig.conversionRatePercent / 100;

  // Total Impressions = (Budget / CPM) * 1000
  const expectedImpressions = (totalCampaignBudget / cpm) * 1000;
  // Reach is roughly 75% to 85% of Impressions in initial campaigns
  const minReach = Math.round(expectedImpressions * 0.7);
  const maxReach = Math.round(expectedImpressions * 0.9);

  // Clicks = Impressions * CTR
  const minClicks = Math.round(minReach * ctr * 0.85);
  const maxClicks = Math.round(maxReach * ctr * 1.15);

  // Conversations / Messages = Clicks * Conversion Rate
  const minConversations = Math.max(5, Math.round(minClicks * convRate * 0.75));
  const maxConversations = Math.max(10, Math.round(maxClicks * convRate * 1.25));

  // Actual sales closing rate from messages in BD is usually 12% to 25% for a responsive seller
  const minSalesClosingRate = 0.12;
  const maxSalesClosingRate = 0.25;

  const estimatedMinSales = Math.max(1, Math.round(minConversations * minSalesClosingRate));
  const estimatedMaxSales = Math.max(2, Math.round(maxConversations * maxSalesClosingRate));

  const estimatedMinRevenue = estimatedMinSales * sellingPrice;
  const estimatedMaxRevenue = estimatedMaxSales * sellingPrice;

  return {
    sellingPrice,
    costPrice,
    profitPerUnit,
    profitMarginPercent,
    breakEvenCPA,
    recommendedDailyBudget,
    recommendedDurationDays,
    platformMix: {
      metaShare,
      tiktokShare,
      description: platformDescription,
    },
    campaignObjective,
    targetingRecommendation: {
      ageRange: categoryConfig.defaultTargeting.ageRange,
      gender: categoryConfig.defaultTargeting.gender,
      locations: locationText,
      interests: categoryConfig.defaultTargeting.interests,
      placementTip:
        'Advantage+ Placements (স্বয়ংক্রিয় প্লেসমেন্ট) সিলেক্ট রাখুন। ফেসবুক নিজে থেকেই সবচেয়ে কম খরচে রিলস, ফিড ও স্টোরিতে আপনার অ্যাড অপ্টিমাইজ করবে।',
    },
    expectedEstimates: {
      minReach,
      maxReach,
      minClicks,
      maxClicks,
      minConversations,
      maxConversations,
      estimatedMinSales,
      estimatedMaxSales,
      estimatedMinRevenue,
      estimatedMaxRevenue,
    },
  };
}
