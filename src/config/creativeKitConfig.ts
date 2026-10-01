import { ProductCategory, SalesChannel } from '@/types';

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

export interface PhotoRuleItem {
  title: string;
  desc: string;
  isDo: boolean;
}

export interface PlacementSize {
  placement: string;
  aspectRatio: string;
  recommendedResolution: string;
  bestFor: string;
}

export interface VideoScriptBeat {
  timing: string;
  stageName: string;
  whatToDo: string;
  exampleSpokenBangla: string;
  visualCue: string;
}

export interface CategoryHookCollection {
  category: ProductCategory;
  categoryNameBangla: string;
  hooks: {
    id: string;
    title: string;
    spokenBangla: string;
    visualAction: string;
    psychologicalTrigger: string;
  }[];
}

export interface PolicyCheckItem {
  id: string;
  title: string;
  plainRule: string;
  dangerExplanation: string;
}

/**
 * Generates CTA text based on chosen order method
 */
export function getOrderMethodCTA(method: SalesChannel): { ctaButtonText: string; ctaLine: string } {
  switch (method) {
    case 'whatsapp':
      return {
        ctaButtonText: 'হোয়াটসঅ্যাপে অর্ডার করুন',
        ctaLine: '📲 সরাসরি হোয়াটসঅ্যাপে অর্ডার করতে নিচের "WhatsApp" বাটনে ক্লিক করে মেসেজ পাঠান।',
      };
    case 'website':
      return {
        ctaButtonText: 'ওয়েবসাইটে অর্ডার করুন',
        ctaLine: '🛒 আজই বিশেষ অফারে অর্ডার কনফার্ম করতে নিচের "Shop Now" লিংকে ক্লিক করুন।',
      };
    case 'phone':
      return {
        ctaButtonText: 'সরাসরি কল করুন',
        ctaLine: '📞 যেকোনো তথ্যে বা ফোনে অর্ডার দিতে এখনই "Call Now" বাটনে চাপ দিয়ে কথা বলুন।',
      };
    case 'cod':
    case 'messenger':
    default:
      return {
        ctaButtonText: 'মেসেঞ্জারে ইনবক্স করুন',
        ctaLine: '👉 ক্যাশ অন ডেলিভারিতে অর্ডার করতে এখনই "Send Message" বাটনে আপনার নাম, ঠিকানা ও ফোন নম্বর পাঠিয়ে দিন।',
      };
  }
}

/**
 * Generates 3 ready-to-copy variations from the 4 user questions
 */
export function generateFourStepAdCopies(input: FourQuestionCopyInput): AdCopyVariant[] {
  const product = input.productName.trim() || 'আমাদের প্রিমিয়াম পণ্য';
  const problem = input.customerProblem.trim() || 'সাধারণ ও নিম্নমানের পণ্য ব্যবহারের বিরক্তি';
  const offer = input.specialOffer.trim() || 'ক্যাশ অন ডেলিভারি ও সীমিত সময়ের বিশেষ মূল্যছাড়';
  const cta = getOrderMethodCTA(input.orderMethod);

  // Variant A: সমস্যা -> সমাধান
  const variantA: AdCopyVariant = {
    id: 'copy-problem-solution',
    styleName: '১. সমস্যা → সমাধান (Problem - Solution)',
    badge: 'সবচেয়ে দ্রুত কনভার্শন',
    headline: `👉 ${problem} নিয়ে আর কোনো চিন্তা নেই!`,
    bodyText: `প্রতিদিনের এই ঝামেলা থেকে মুক্তি পেতে বেছে নিন আমাদের অরিজিনাল "${product}"। এটি ব্যবহারে আপনি পাবেন প্রিমিয়াম কোয়ালিটি ও দীর্ঘস্থায়ী আরাম।`,
    bulletPoints: [
      `ঝামেলাহীন সমাধান: ${problem} দূর করবে সহজে`,
      `স্পেশাল অফার: ${offer}`,
      `ডেলিভারি সুবিধা: সারা বাংলাদেশে ক্যাশ অন ডেলিভারি`,
    ],
    ctaText: cta.ctaLine,
    fullCopy: `👉 ${problem} নিয়ে আর কোনো চিন্তা নেই!

প্রতিদিনের এই ঝামেলা থেকে মুক্তি পেতে বেছে নিন আমাদের অরিজিনাল "${product}"। এটি ব্যবহারে আপনি পাবেন সেরা কোয়ালিটি ও ১০০% তৃপ্তি।

✨ কেন আমাদেরটি সেরা:
✅ ${problem} এর চমৎকার সমাধান
✅ ১০০% প্রিমিয়াম ও টেকসই মান
✅ কোনো অগ্রিম টাকা ছাড়া পণ্য হাতে পেয়ে চেক করার সুযোগ

🎁 বিশেষ অফার: ${offer}

${cta.ctaLine}`,
  };

  // Variant B: অফার-কেন্দ্রিক
  const variantB: AdCopyVariant = {
    id: 'copy-offer-driven',
    styleName: '২. অফার-কেন্দ্রিক (Offer & Urgency)',
    badge: 'দ্রুত মেসেজ ও অর্ডারের জন্য',
    headline: `🎉 ধামাকা অফার! প্রিয় "${product}" এখন মিলছে বিশেষ ছাড়ে!`,
    bodyText: `সীমিত সময়ের জন্য সেরা দামে সংগ্রহ করুন আপনার পছন্দের "${product}"। ${problem} এর ঝামেলা ভুলে এখনই নিশ্চিত করুন নিজেরটি।`,
    bulletPoints: [
      `পণ্য: ${product}`,
      `আকর্ষণীয় অফার: ${offer}`,
      `সুবিধা: ${problem} থেকে মুক্তি`,
    ],
    ctaText: cta.ctaLine,
    fullCopy: `🎉 ধামাকা অফার! প্রিয় "${product}" এখন মিলছে বিশেষ ছাড়ে!

সীমিত সময়ের জন্য সেরা দামে সংগ্রহ করুন প্রিমিয়াম "${product}"। ${problem} এর ঝামেলা ভুলে আজই উপভোগ করুন বিশেষ সুযোগ।

🌟 আমাদের বিশেষত্ব:
💎 সেরা কোয়ালিটির নিশ্চয়তা
💎 ${offer}
💎 দ্রুততম হোম ডেলিভারি ও নির্ভরযোগ্য কাস্টমার সাপোর্ট

📦 স্টক খুব সীমিত! অফার শেষ হওয়ার আগেই আপনার অর্ডার কনফার্ম করুন:

${cta.ctaLine}`,
  };

  // Variant C: বিশ্বাস-কেন্দ্রিক
  const variantC: AdCopyVariant = {
    id: 'copy-trust-social-proof',
    styleName: '৩. বিশ্বাস ও গ্যারান্টি (Trust & Social Proof)',
    badge: 'বিশ্বাস অর্জনের জন্য',
    headline: `✨ নকল বা সাধারণ পণ্য এড়িয়ে বেছে নিন খাঁটি "${product}"`,
    bodyText: `বাজারের হাজারো নকল ও নিম্নমানের পণ্যে প্রতারিত না হয়ে আস্থা রাখুন শত শত সন্তুষ্ট ক্রেতার পছন্দের তালিকায় থাকা আমাদের অরিজিনাল "${product}"-এ।`,
    bulletPoints: [
      `১০০% অরিজিনাল কোয়ালিটি`,
      `ডেলিভারি ম্যানের সামনে চেক করে পেমেন্ট`,
      `অফার: ${offer}`,
    ],
    ctaText: cta.ctaLine,
    fullCopy: `✨ নকল বা সাধারণ পণ্য এড়িয়ে বেছে নিন খাঁটি "${product}"

বাজারের সাধারণ অপশনে ঠকে না গিয়ে আস্থা রাখুন শত শত সন্তুষ্ট কাস্টমারের পছন্দের তালিকায় শীর্ষে থাকা অরিজিনাল "${product}"-এ।

🛡️ আমাদের বিশ্বস্ততার প্রতিশ্রুতি:
১. ${problem} দূর করার নিখুঁত কার্যকারিতা
২. ছবির সাথে বাস্তব পণ্যের শতভাগ মিল
৩. ডেলিভারি ম্যানের সামনে খুলে দেখে মূল্য পরিশোধের সুবিধা

🎁 আজকের স্পেশাল অফার: ${offer}

👇 আসল কোয়ালিটির পণ্যটি পেতে এখনই অর্ডার করুন:
${cta.ctaLine}`,
  };

  return [variantA, variantB, variantC];
}

/**
 * PART B: Photo Guide rules and size matrix
 */
export const PHOTO_DO_RULES: PhotoRuleItem[] = [
  {
    title: 'পণ্য সবসময় ফোকাসে রাখুন',
    desc: 'ছবির কেন্দ্রবিন্দুতে যেন আপনার আসল পণ্যটি স্পষ্টভাবে দেখা যায়।',
    isDo: true,
  },
  {
    title: 'দিনের প্রাকৃতিক আলো ব্যবহার করুন',
    desc: 'সরাসরি জানালার পাশে বা দিনের নরম আলোয় তোলা ছবি আসল রঙ ফুটিয়ে তোলে।',
    isDo: true,
  },
  {
    title: 'পরিষ্কার ও সিম্পল ব্যাকগ্রাউন্ড',
    desc: 'সাদা বা এক রঙের পরিচ্ছন্ন ব্যাকগ্রাউন্ডে পণ্য অনেক বেশি আকর্ষণীয় লাগে।',
    isDo: true,
  },
  {
    title: 'ব্যবহারের দৃশ্য (In-use photo)',
    desc: 'পণ্যটি হাতে নিয়ে বা গায়ে পরে ব্যবহারের ছবি দিলে বিক্রি দ্বিগুণ বাড়ে।',
    isDo: true,
  },
];

export const PHOTO_DONT_RULES: PhotoRuleItem[] = [
  {
    title: 'ছবিতে অতিরিক্ত লেখা (Text Overload)',
    desc: 'ছবির ২০% এর বেশি জায়গায় লেখা থাকলে ফেসবুক স্বয়ংক্রিয়ভাবে বিজ্ঞাপনের রিচ কমিয়ে দেয়।',
    isDo: false,
  },
  {
    title: 'অস্পষ্ট, ব্লার বা ফাটা ছবি (Blurry/Low-res)',
    desc: 'কম রেজোলিউশনের ছবি কাস্টমারের চোখে পেজের গ্রহণযোগ্যতা নষ্ট করে।',
    isDo: false,
  },
  {
    title: 'গুগল বা অন্য ব্র্যান্ডের ছবি চুরি',
    desc: 'গুগল থেকে নেওয়া ছবি দেখলে মানুষ ফেক মনে করে এবং বিশ্বাস পায় না।',
    isDo: false,
  },
  {
    title: 'ছবি টেনে লম্বা বা চ্যাপ্টা করা (Stretched)',
    desc: 'অ্যাসপেক্ট রেশিও না মেনে ছবি চাপিয়ে দিলে প্রফেশনালিজম নষ্ট হয়।',
    isDo: false,
  },
];

export const PLACEMENT_SIZES: PlacementSize[] = [
  {
    placement: 'Facebook ও Instagram Feed',
    aspectRatio: '১:১ (বর্গাকার) অথবা ৪:৫ (লম্বা)',
    recommendedResolution: '১০৮০ × ১৩৫০ px (সবচেয়ে বেশি জায়গা নেয়)',
    bestFor: 'মোবাইল ফিডে স্ক্রল থামানোর জন্য সেরা সাইজ',
  },
  {
    placement: 'Facebook & Instagram Stories / Reels',
    aspectRatio: '৯:১৬ (সম্পূর্ণ স্ক্রিন)',
    recommendedResolution: '১০৮০ × ১৯২০ px',
    bestFor: 'ফুল-স্ক্রিন মোবাইল স্টোরি ও রিলস বিজ্ঞাপনের জন্য',
  },
  {
    placement: 'TikTok Ads',
    aspectRatio: '৯:১৬ (ভার্টিক্যাল)',
    recommendedResolution: '১০৮০ × ১৯২০ px',
    bestFor: 'টিকটক ভিডিও ফিড প্লেসমেন্ট',
  },
];

/**
 * PART C: 15-second Video Script Template & 5 Category-tailored Hooks
 */
export const FIFTEEN_SEC_SCRIPT: VideoScriptBeat[] = [
  {
    timing: '০ - ৩ সেকেন্ড',
    stageName: '১. হুক (Hook)',
    whatToDo: 'স্ক্রলিং থামানোর মতো প্রশ্ন বা চমকপ্রদ কথা বলুন।',
    exampleSpokenBangla: '"অনলাইন থেকে শাড়ি কেনার আগে এই ভুলটা একদম করবেন না!"',
    visualCue: 'পণ্যটি ক্যামেরার খুব কাছে এনে ঘোরান অথবা মুখের এক্সপ্রেশন দেখান।',
  },
  {
    timing: '৪ - ৭ সেকেন্ড',
    stageName: '২. সমস্যা (Problem)',
    whatToDo: 'ক্রেতার পরিচিত সাধারণ সমস্যার কথা তুলে ধরুন।',
    exampleSpokenBangla: '"ছবির মতো কাপড় বাস্তবে না পেয়ে আর কত ঠকবেন?"',
    visualCue: 'হতাশা বা নিম্নমানের সমস্যার দৃশ্য সংক্ষেপে দেখান।',
  },
  {
    timing: '৮ - ১১ সেকেন্ড',
    stageName: '৩. পণ্য প্রদর্শন (Solution & In-use)',
    whatToDo: 'আপনার আসল পণ্যের ফিনিশিং ও ব্যবহার দেখান।',
    exampleSpokenBangla: '"আমাদের ১০০% পিওর সুতি শাড়িতে পাবেন প্রিমিয়াম কমফোর্ট ও খাঁটি কোয়ালিটি।"',
    visualCue: 'হাতে কাপড়ের সফটনেস ফিল করা বা পরার দৃশ্য দেখান।',
  },
  {
    timing: '১২ - ১৩ সেকেন্ড',
    stageName: '৪. অফার (Offer)',
    whatToDo: 'সীমিত সময়ের বিশেষ চমক বা ফ্রি ডেলিভারি জানান।',
    exampleSpokenBangla: '"আজকের অর্ডারে থাকছে সারাদেশে সম্পূর্ণ ফ্রি ডেলিভারি!"',
    visualCue: 'স্ক্রিনে "ফ্রি ডেলিভারি" লেখা টেক্সট ব্যাজ ভেসে উঠবে।',
  },
  {
    timing: '১৪ - ১৫ সেকেন্ড',
    stageName: '৫. অ্যাকশন (Call To Action)',
    whatToDo: 'কাস্টমারকে স্পষ্টভাবে বাটনে চাপ দিতে বলুন।',
    exampleSpokenBangla: '"অর্ডার করতে এখনই নিচের Send Message বাটনে ইনবক্স করুন!"',
    visualCue: 'আঙুল দিয়ে নিচের বাটনের দিকে নির্দেশ করুন।',
  },
];

export const CATEGORY_HOOK_MAP: Record<ProductCategory, CategoryHookCollection> = {
  fashion: {
    category: 'fashion',
    categoryNameBangla: 'পোশাক ও ফ্যাশন',
    hooks: [
      {
        id: 'f-1',
        title: '১. "ছবির সাথে মিল" হুক',
        spokenBangla: 'অনলাইনে জামা কিনে ছবির সাথে বাস্তবের মিল না পেয়ে আর কত ঠকবেন? এই ভিডিওটি দেখুন...',
        visualAction: 'হাতে জামা ধরে জুম করে কাপড়ের খাঁটি বুনন ক্যামেরার কাছে আনা।',
        psychologicalTrigger: 'প্রতারণা এড়ানোর ভয় ও সত্য জানার আগ্রহ।',
      },
      {
        id: 'f-2',
        title: '২. "দাম শুনে অবাক" হুক',
        spokenBangla: 'এত প্রিমিয়াম ফিনিশিংয়ের ড্রেস বাজারে ৩ হাজারের নিচে অসম্ভব! কিন্তু আমরা দিচ্ছি অর্ধেক মূল্যে!',
        visualAction: 'আনবক্সিং করার দৃশ্য এবং সুন্দর ফিটিং পরা মডেল।',
        psychologicalTrigger: 'অপ্রত্যাশিত ভ্যালু ও সাশ্রয়ের আনন্দ।',
      },
      {
        id: 'f-3',
        title: '৩. "গরমের আরাম" হুক',
        spokenBangla: 'এই গরমে স্টাইল আর আরাম একসাথে পাওয়া কি সম্ভব? দেখুন আমাদের নতুন কালেকশন!',
        visualAction: 'কাপড়ের হালকা ও সফটনেস হাত দিয়ে ছুঁয়ে দেখানো।',
        psychologicalTrigger: 'শারীরিক আরাম ও স্টাইলিশ লুক।',
      },
      {
        id: 'f-4',
        title: '৪. "সীমিত স্টক সতর্কতা" হুক',
        spokenBangla: 'এই স্পেশাল ডিজাইনের ড্রেস কিন্তু আর মাত্র ১৫ পিস স্টকে আছে! মিস করবেন না!',
        visualAction: 'প্যাকেজিং টেবিল ও পার্সেল প্রস্তুতের দৃশ্য।',
        psychologicalTrigger: 'সুযোগ হারানোর ভয় (FOMO)।',
      },
      {
        id: 'f-5',
        title: '৫. "খুলে দেখে পেমেন্ট" হুক',
        spokenBangla: 'আগে ডেলিভারি ম্যানের সামনে খুলে দেখবেন, পছন্দ হলে টাকা দেবেন! এমন সুযোগ আর কোথাও পাবেন না!',
        visualAction: 'ডেলিভারি পার্সেল খোলার রিয়েল দৃশ্য।',
        psychologicalTrigger: 'শতভাগ ঝুঁকিহীন বিশ্বাসের নিশ্চয়তা।',
      },
    ],
  },
  beauty: {
    category: 'beauty',
    categoryNameBangla: 'কসমেটিকস ও রূপচর্চা',
    hooks: [
      {
        id: 'b-1',
        title: '১. "নকল স্কিনকেয়ারের ভয়" হুক',
        spokenBangla: 'অনলাইন থেকে স্কিনকেয়ার কেনার আগে আসল-নকল চেনার এই ১টি নিয়ম জেনে নিন!',
        visualAction: 'প্যাকেজের বারকোড ও হলোগ্রাম সিল ক্যামেরায় দেখানো।',
        psychologicalTrigger: 'ত্বকের ক্ষতি এড়ানোর সচেতনতা।',
      },
      {
        id: 'b-2',
        title: '২. "ন্যাচারাল গ্লো" হুক',
        spokenBangla: 'কোনো ক্ষতিকর কেমিক্যাল ছাড়াই ত্বকে প্রাকৃতিক গ্লো পেতে এই ১টি জিনিসই যথেষ্ট!',
        visualAction: 'মুখে বা হাতে সিরামের ১ ফোঁটা লাগিয়ে ম্যাজিকাল গ্লো দেখানো।',
        psychologicalTrigger: 'সহজ ও নিরাপদ সৌন্দর্য।',
      },
      {
        id: 'b-3',
        title: '৩. "লাইভ টেক্সচার টেস্ট" হুক',
        spokenBangla: 'একটুও চিটচিটে না! বিশ্বাস না হলে দেখুন ত্বকে কতটা দ্রুত মিশে যায়...',
        visualAction: 'হাতের ত্বকে ক্রিমটি ব্লেন্ড করে লাইভ শট।',
        psychologicalTrigger: 'সরাসরি প্রমাণ ও বিশ্বাস।',
      },
      {
        id: 'b-4',
        title: '৪. "গ্রাহকের আসল রিভিউ" হুক',
        spokenBangla: 'শত শত আপু কেন বারবার এই একটি প্রোডাক্টই অর্ডার করছেন? আসল কারণটি জানুন!',
        visualAction: 'স্ক্রিনে কাস্টমারদের পজিটিভ চ্যাট স্ক্রিনশট ও পণ্যের বাস্তব শট।',
        psychologicalTrigger: 'সোশ্যাল প্রুফ ও অন্যদের পছন্দ।',
      },
      {
        id: 'b-5',
        title: '৫. "ফ্রি গিফট অফার" হুক',
        spokenBangla: 'আজকের স্পেশাল কম্বো অর্ডারে থাকছে সম্পূর্ণ ফ্রি একটি লিপবাম বা উপহার!',
        visualAction: 'গিফট সহ সুন্দর বক্স খুলে দেখানো।',
        psychologicalTrigger: 'উপহার পাওয়ার আকর্ষণ।',
      },
    ],
  },
  gadgets: {
    category: 'gadgets',
    categoryNameBangla: 'গ্যাজেট ও ইলেকট্রনিক্স',
    hooks: [
      {
        id: 'g-1',
        title: '১. "ডুরাবিলিটি ও কোয়ালিটি টেস্ট" হুক',
        spokenBangla: '১,০০০ টাকার গ্যাজেট কি সত্যিই এত ফিচার দেয়? আসুন লাইভ টেস্ট করে দেখি!',
        visualAction: 'স্মার্টওয়াচ বা ইয়ারবাডস অন করে লাইভ ফিচার চালানো।',
        psychologicalTrigger: 'কৌতূহল ও গ্যাজেটপ্রেমীদের আকর্ষণ।',
      },
      {
        id: 'g-2',
        title: '২. "ব্যাটারি ব্যাকআপ চমক" হুক',
        spokenBangla: 'এক চার্জেই চলবে টানা ৫ দিন! যারা ঘন ঘন চার্জ দেওয়ার ঝামেলায় ত্যক্ত...',
        visualAction: 'ব্যাটারি পারসেন্টেজ ও প্রিমিয়াম ডিজাইন জুম করে দেখানো।',
        psychologicalTrigger: 'দৈনন্দিন ঝামেলার সহজ সমাধান।',
      },
      {
        id: 'g-3',
        title: '৩. "সাউন্ড কোয়ালিটি ড্রপ" হুক',
        spokenBangla: 'এর সাউন্ড বেস শুনলে যে কেউ ভাববে এটি দামি ব্র্যান্ডের অরিজিনাল হেডফোন!',
        visualAction: 'ইয়ারবাডস কানে পরা এবং গানের বিটে মাথা নাড়ার দৃশ্য।',
        psychologicalTrigger: 'অডিও কোয়ালিটি অভিজ্ঞতা।',
      },
      {
        id: 'g-4',
        title: '৪. "ওয়ারেন্টি গ্যারান্টি" হুক',
        spokenBangla: 'কোনো সমস্যা হলে ৬ মাসের রিপ্লেসমেন্ট গ্যারান্টি সহ পাচ্ছেন সরাসরি আমাদের থেকে!',
        visualAction: 'ওয়ারেন্টি কার্ড ও সীল দেখানো।',
        psychologicalTrigger: 'নিরাপদ ক্রয়ের নিশ্চয়তা।',
      },
      {
        id: 'g-5',
        title: '৫. "আনবক্সিং এক্সাইটমেন্ট" হুক',
        spokenBangla: 'দারুণ প্রিমিয়াম প্যাকেজিং! চলুন একসাথে আনবক্সিং করি...',
        visualAction: 'বক্সের সিল কেটে ভেতরে গ্যাজেট বের করার মসৃণ শট।',
        psychologicalTrigger: 'নতুন পণ্য হাতে পাওয়ার আনন্দ।',
      },
    ],
  },
  food: {
    category: 'food',
    categoryNameBangla: 'খাবার ও রেস্তোরাঁ',
    hooks: [
      {
        id: 'fo-1',
        title: '১. "জিভে জল আনা স্বাদ" হুক',
        spokenBangla: 'এমন খাঁটি স্বাদের হোমমেড খাবার একবার খেলে বারবার খেতে মন চাইবে!',
        visualAction: 'খাবারের ধোঁয়া ওঠা ক্লোজ-আপ শট এবং মুখে নেওয়ার দৃশ্য।',
        psychologicalTrigger: 'ক্ষুধা ও স্বাদের অনুভূতি জাগ্রত করা।',
      },
      {
        id: 'fo-2',
        title: '২. "১০০% স্বাস্থ্যসম্মত প্রস্তুতি" হুক',
        spokenBangla: 'বাইরের অস্বাস্থ্যকর খাবার না খেয়ে পরিবারকে দিন ঘরের তৈরি ১০০% স্বাস্থ্যকর স্বাদ!',
        visualAction: 'পরিচ্ছন্ন রান্নাঘর ও খাঁটি উপকরণ ব্যবহারের দৃশ্য।',
        psychologicalTrigger: 'স্বাস্থ্য সচেতনতা ও পরিবারের ভালোবাসা।',
      },
      {
        id: 'fo-3',
        title: '৩. "গরম গরম ডেলিভারি" হুক',
        spokenBangla: 'অর্ডার করার ৩০ মিনিটের মধ্যে গরম গরম খাবার পৌঁছাবে আপনার দরজায়!',
        visualAction: 'প্যাকেজিং ও ডেলিভারি ব্যাগে তোলার দৃশ্য।',
        psychologicalTrigger: 'দ্রুত ক্ষুধা নিবারণ।',
      },
      {
        id: 'fo-4',
        title: '৪. "সিক্রেট রেসিপি" হুক',
        spokenBangla: 'আমাদের স্পেশাল মসলার এই সিক্রেট রেসিপিটি একবার ট্রাই করে দেখেছেন কি?',
        visualAction: 'মসলা ছিটানো ও রোস্টিং এর দৃশ্য।',
        psychologicalTrigger: 'ভিন্নধর্মী স্পেশাল স্বাদের কৌতূহল।',
      },
      {
        id: 'fo-5',
        title: '৫. "ফ্রেন্ডস অ্যান্ড ফ্যামিলি কম্বো" হুক',
        spokenBangla: '৪ জনের পেটভর্তি খাবারের এই ধামাকা কম্বো প্যাকে মিলছে অবিশ্বাস্য ছাড়!',
        visualAction: 'টেবিলে সাজানো ভরপুর কম্বো প্লাটার।',
        psychologicalTrigger: 'সাশ্রয়ী পারিবারিক অফার।',
      },
    ],
  },
  course: {
    category: 'course',
    categoryNameBangla: 'কোর্স ও ডিজিটাল প্রোডাক্ট',
    hooks: [
      {
        id: 'c-1',
        title: '১. "ভুল গাইডলাইনের সময় অপচয়" হুক',
        spokenBangla: 'ইউটিউবে এলোমেলো ভিডিও দেখে সময় নষ্ট না করে এই ৩টি ধাপ অনুসরণ করুন!',
        visualAction: 'ল্যাপটপ স্ক্রিন দেখিয়ে স্টেপ-বাই-স্টেপ রোডম্যাপ পয়েন্ট করা।',
        psychologicalTrigger: 'সময় বাঁচানো ও সঠিক গাইডলাইন।',
      },
      {
        id: 'c-2',
        title: '২. "জিরো থেকে ইনকাম" হুক',
        spokenBangla: 'কোডিং না জেনেও কীভাবে ফ্রিল্যান্সিংয়ে প্রথম কাজ পাবেন? লাইভ ডেমো দেখুন!',
        visualAction: 'রিয়েল প্রজেক্ট বা পোর্টফোলিও স্ক্রিনে দেখানো।',
        psychologicalTrigger: 'সহজে ক্যারিয়ার গড়ার আশা।',
      },
      {
        id: 'c-3',
        title: '৩. "সফল শিক্ষার্থীর গল্প" হুক',
        spokenBangla: 'আমাদের আগের ব্যাচের শিক্ষার্থীরা এখন যেভাবে কাজ করছে...',
        visualAction: 'শিক্ষার্থীদের সাফল্যের স্ক্রিনশট ও অনুভূতি।',
        psychologicalTrigger: 'সোশ্যাল প্রুফ ও অনুপ্রেরণা।',
      },
      {
        id: 'c-4',
        title: '৪. "লাইফটাইম সাপোর্ট" হুক',
        spokenBangla: 'শুধু কোর্স নয়, কাজ পাওয়ার আগ পর্যন্ত পাবেন আমাদের পার্সোনাল ওয়ান-টু-ওয়ান সাপোর্ট!',
        visualAction: 'সাপোর্ট ক্লাসের লাইভ দৃশ্য।',
        psychologicalTrigger: 'নিরাপত্তা ও ভরসা।',
      },
      {
        id: 'c-5',
        title: '৫. "সীমিত সিট" হুক',
        spokenBangla: 'লাইভ ব্যাচে কোয়ালিটি ধরে রাখতে আমরা মাত্র ২০ জন নিচ্ছি! আর ৫টি সিট বাকি!',
        visualAction: 'কাউন্টডাউন টাইমার বা সিট বুকিং লিস্ট।',
        psychologicalTrigger: 'জরুরি পদক্ষেপ নেওয়ার তাগিদ।',
      },
    ],
  },
  homedecor: {
    category: 'homedecor',
    categoryNameBangla: 'ঘর সাজানো ও ফার্নিচার',
    hooks: [
      {
        id: 'h-1',
        title: '১. "ঘরের রূপ বদল" হুক',
        spokenBangla: 'বাজেটের মধ্যে সাধারণ একটি ঘরকে কীভাবে রাজকীয় লুক দেবেন? দেখুন এই ম্যাজিক!',
        visualAction: 'দেওয়ালে বা সোফায় পণ্য বসানোর সাথে সাথে ঘরের লুক পরিবর্তনের শট।',
        psychologicalTrigger: 'সৌন্দর্য ও আভিজাত্য।',
      },
      {
        id: 'h-2',
        title: '২. "মেহমানের প্রশংসা" হুক',
        spokenBangla: 'ঘরে মেহমান আসলেই এই জিনিসটি দেখে প্রশংসা করতে বাধ্য হবে!',
        visualAction: 'ড্রয়িংরুমে সুন্দরভাবে সাজানো শো-পিস বা কুশনের শট।',
        psychologicalTrigger: 'সামাজিক সম্মান ও প্রশংসা।',
      },
      {
        id: 'h-3',
        title: '৩. "সহজ ওয়াশ ও দীর্ঘস্থায়িত্ব" হুক',
        spokenBangla: 'কালার নষ্ট হবে না, অনায়াসে ওয়াশ করা যায়! বহু বছর থাকবে নতুনের মতো!',
        visualAction: 'কাপড় বা কাঠের ফিনিশিং হাত দিয়ে পরীক্ষা করা।',
        psychologicalTrigger: 'টেকসই পণ্যের নিশ্চয়তা।',
      },
      {
        id: 'h-4',
        title: '৪. "হ্যান্ডমেড স্পেশালিটি" হুক',
        spokenBangla: 'দক্ষ কারিগরের হাতে তৈরি এই খাঁটি হস্তশিল্পটি আপনার ঘরের সৌন্দর্য বাড়িয়ে দেবে বহুগুণ!',
        visualAction: 'কারিগরের তৈরি করার ক্লোজ-আপ দৃশ্য।',
        psychologicalTrigger: 'আসল শিল্পের মর্যাদা।',
      },
      {
        id: 'h-5',
        title: '৫. "ফ্রি ম্যাচিং গিফট" হুক',
        spokenBangla: 'আজকের হোম ডেকোর কম্বো নিলে সাথে পাচ্ছেন সুন্দর একটি টেবিল রানার একদম ফ্রি!',
        visualAction: 'ফ্রি গিফট সহ সম্পূর্ণ সেট প্রদর্শন।',
        psychologicalTrigger: 'উপহার ও ভ্যালু।',
      },
    ],
  },
  gifts: {
    category: 'gifts',
    categoryNameBangla: 'কাস্টমাইজড গিফট ও জুয়েলারি',
    hooks: [
      {
        id: 'gi-1',
        title: '১. "প্রিয়জনকে সেরা সারপ্রাইজ" হুক',
        spokenBangla: 'প্রিয় মানুষটির জন্মদিনে বা বার্ষিকীতে এমন স্পেশাল সারপ্রাইজ দিলে সে চিরদিন মনে রাখবে!',
        visualAction: 'কাস্টমাইজড ছবি বা খোদাই করা নাম সহ গিফট বক্স খোলার দৃশ্য।',
        psychologicalTrigger: 'ভালোবাসা ও আবেগ।',
      },
      {
        id: 'gi-2',
        title: '২. "কাস্টমাইজড নিজের নাম" হুক',
        spokenBangla: 'আপনার ও প্রিয়জনের নাম খোদাই করে তৈরি করুন এই ইউনিক স্মৃতিচিহ্ন!',
        visualAction: 'লেজার খোদাই বা হাতের ফিনিশিং দেখানো।',
        psychologicalTrigger: 'ব্যক্তিগত ইউনিক অনুভূতি।',
      },
      {
        id: 'gi-3',
        title: '৩. "জরুরি ডেলিভারি" হুক',
        spokenBangla: 'কালকেই গিফট দিতে হবে? নো চিন্তা! আমরা দিচ্ছি ২৪ ঘণ্টার মধ্যে সুপারফাস্ট ডেলিভারি!',
        visualAction: 'প্যাকিং ও রিবন বাঁধার দৃশ্য।',
        psychologicalTrigger: 'শেষ মুহূর্তের উদ্ধার।',
      },
      {
        id: 'gi-4',
        title: '৪. "প্রিমিয়াম জুয়েলারি শাইন" হুক',
        spokenBangla: 'রিয়েল গোল্ডের মতো চোখ ধাঁধানো শাইন! রঙ নষ্ট না হওয়ার ১০০% নিশ্চয়তা!',
        visualAction: 'আলোর নিচে জুয়েলারির ঝিলিক দেখানো।',
        psychologicalTrigger: 'আভিজাত্য ও স্থায়িত্ব।',
      },
      {
        id: 'gi-5',
        title: '৫. "গিফট র‍্যাপিং ফ্রি" হুক',
        spokenBangla: 'আলাদা গিফট র‍্যাপিংয়ের ঝামেলা নেই! আমরা পাঠাচ্ছি প্রিমিয়াম গিফট বক্স ও কার্ড সহ!',
        visualAction: 'সুন্দর ফিতা ও কার্ড সহ কমপ্লিট বক্স।',
        psychologicalTrigger: 'ঝামেলাহীন পূর্ণাঙ্গ উপহার।',
      },
    ],
  },
  general: {
    category: 'general',
    categoryNameBangla: 'সাধারণ পণ্য',
    hooks: [
      {
        id: 'gn-1',
        title: '১. "ভুল সিদ্ধান্ত এড়ানোর হুক"',
        spokenBangla: 'অনলাইন থেকে কেনার আগে এই ৩টি বিষয় চেক না করলে ঠকে যাওয়ার সম্ভাবনা ৯৯%!',
        visualAction: 'পণ্যটি ক্যামেরার কাছে এনে স্পষ্ট বিবরণ দেখানো।',
        psychologicalTrigger: 'ক্ষতি এড়ানোর তাগিদ।',
      },
      {
        id: 'gn-2',
        title: '২. "অফারের সুযোগ" হুক',
        spokenBangla: 'এত কম দামে এমন প্রিমিয়াম কোয়ালিটি মিস করলে পরে আফসোস করবেন!',
        visualAction: 'পণ্যটি ব্যবহার করে দেখানো।',
        psychologicalTrigger: 'সাশ্রয়ী সুযোগ গ্রহণ।',
      },
      {
        id: 'gn-3',
        title: '৩. "সমস্যা সমাধানের ম্যাজিক" হুক',
        spokenBangla: 'আপনারও কি এই ঝামেলা প্রতিদিন পোহাতে হয়? দেখুন মাত্র ১ সেকেন্ডের সমাধান!',
        visualAction: 'সমস্যা থেকে সমাধানের লাইভ ডেমো।',
        psychologicalTrigger: 'ঝামেলা মুক্তি।',
      },
      {
        id: 'gn-4',
        title: '৪. "হাতে পেয়ে দেখে মূল্য পরিশোধ" হুক',
        spokenBangla: '১ টাকাও অগ্রিম দেওয়া লাগবে না! ডেলিভারি ম্যানের সামনে চেক করে টাকা দিন!',
        visualAction: 'ক্যাশ অন ডেলিভারি পার্সেল চেক করার দৃশ্য।',
        psychologicalTrigger: 'শতভাগ বিশ্বাস।',
      },
      {
        id: 'gn-5',
        title: '৫. "কাস্টমার ফিডব্যাক" হুক',
        spokenBangla: 'কেন এই পণ্যটি এখন সবার পছন্দের তালিকায় শীর্ষে? নিজেই দেখুন...',
        visualAction: 'খুশি কাস্টমারদের রিভিউ ও পণ্যের আসল লুক।',
        psychologicalTrigger: 'সামাজিক গ্রহণযোগ্যতা।',
      },
    ],
  },
};

/**
 * PART D: Policy Safety Checklist
 */
export const POLICY_SAFETY_CHECKS: PolicyCheckItem[] = [
  {
    id: 'policy-no-exaggeration',
    title: '১. কোনো অবাস্তব বা অতিরঞ্জিত প্রতিশ্রুতি নেই',
    plainRule: 'যেমন: "৭ দিনে ফর্সা হওয়ার ১০০% গ্যারান্টি" বা "১০ কেজি ওজন কমবে" ধরনের মিথ্যা দাবি পরিহার করা হয়েছে।',
    dangerExplanation: 'মেটার অ্যালগরিদম মিথ্যা বা অবাস্তব দাবি সনাক্ত করলেই বিজ্ঞাপন তৎক্ষণাৎ রিজেক্ট করে দেয়।',
  },
  {
    id: 'policy-no-before-after',
    title: '২. কোনো Before/After শারীরিক পরিবর্তনের ছবি নেই',
    plainRule: 'সৌন্দর্য বা ফিটনেস পণ্যে পাশাপাশি আগের ও পরের তুলনামূলক শরীর বা ত্বকের ছবি দেওয়া হয়নি।',
    dangerExplanation: 'মেটা পলিসিতে মানুষের ব্যক্তিগত শারীরিক রূপ নিয়ে Before/After ছবি দেওয়া সম্পূর্ণ নিষিদ্ধ।',
  },
  {
    id: 'policy-price-match',
    title: '৩. বিজ্ঞাপনের দাম ও অফার ইনবক্সের সাথে হুবহু মিল আছে',
    plainRule: 'বিজ্ঞাপনে যে মূল্য বা অফার (যেমন ফ্রি ডেলিভারি) বলা হয়েছে, কাস্টমার চ্যাটে আসলে কোনো লুকানো চার্জ রাখা হয়নি।',
    dangerExplanation: 'কাস্টমাররা প্রতারিত হয়ে নেগেটিভ ফিডব্যাক বা রিপোর্ট দিলে পেজের কোয়ালিটি স্কোর ধ্বংস হয়ে যায়।',
  },
  {
    id: 'policy-image-truth',
    title: '৪. বিজ্ঞাপনের ছবি বিভ্রান্তিকর বা অন্য পেজ থেকে চুরি করা নয়',
    plainRule: 'বাস্তব পণ্যের আসল ছবি ব্যবহার করা হয়েছে এবং ছবির ২০% এর বেশি এলাকা লেখায় ঢেকে দেওয়া হয়নি।',
    dangerExplanation: 'নকল ছবি ব্যবহারের কারণে মেটা অ্যাডস ম্যানেজার একাউন্ট পার্মানেন্টলি রেস্ট্রিক্ট করতে পারে।',
  },
  {
    id: 'policy-no-copyright-music',
    title: '৫. কপিরাইট যুক্ত গান বা নামী ব্র্যান্ডের লোগো নেই',
    plainRule: 'ভিডিও ব্যাকগ্রাউন্ডে জনপ্রিয় বাংলা/হিন্দি গান বা নাইকি/অ্যাডিডাস ইত্যাদির ফেক লোগো ব্যবহার করা হয়নি।',
    dangerExplanation: 'কপিরাইট লঙ্ঘনের কারণে ফেসবুক স্বয়ংক্রিয়ভাবে ভিডিও মিউট বা ডিলিট করে দেয়।',
  },
];
