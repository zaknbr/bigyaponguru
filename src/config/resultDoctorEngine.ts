import { ResultDoctorInput, ResultVerdict } from '@/types';

export function diagnoseAdResults(input: ResultDoctorInput, breakEvenCPA?: number): ResultVerdict {
  const spend = Math.max(0, input.spentBudget);
  const reach = Math.max(1, input.reach);
  const clicks = Math.max(0, input.clicks);
  const conversions = Math.max(0, input.conversions);

  // Computed metrics
  const ctr = reach > 0 ? (clicks / reach) * 100 : 0;
  const cpm = reach > 0 ? (spend / reach) * 1000 : 0;
  const cpc = clicks > 0 ? spend / clicks : 0;
  const costPerConversion = conversions > 0 ? spend / conversions : spend;

  // Thresholds based on Bangladesh market benchmarks
  const isCtrGood = ctr >= 2.0;
  const isCtrAverage = ctr >= 1.2 && ctr < 2.0;
  const isCtrPoor = ctr < 1.2;

  const isCpmGood = cpm <= 220;
  const isCpmAverage = cpm > 220 && cpm <= 380;

  // Cost per message/sale benchmark:
  // If breakEvenCPA is provided, compare with it, otherwise default threshold is ৳100 for messages
  const effectiveCPAThreshold = breakEvenCPA && breakEvenCPA > 0 ? breakEvenCPA * 0.5 : 120;
  const isCostGood = conversions > 0 && costPerConversion <= effectiveCPAThreshold;
  const isCostAverage = conversions > 0 && costPerConversion > effectiveCPAThreshold && costPerConversion <= effectiveCPAThreshold * 1.5;
  const isCostPoor = conversions === 0 || costPerConversion > effectiveCPAThreshold * 1.5;

  let status: 'green' | 'yellow' | 'red' = 'green';
  let headline = '';
  let summary = '';
  const diagnoses: ResultVerdict['diagnoses'] = [];
  const actionSteps: string[] = [];

  // Scenario 1: Zero conversions or very high cost
  if (conversions === 0 && spend >= 400) {
    status = 'red';
    headline = '🔴 বিজ্ঞাপনটিতে লোকসান হচ্ছে — অবিলম্বে সংস্কার প্রয়োজন';
    summary = `আপনি ৳${Math.round(spend)} খরচ করেছেন কিন্তু এখনো কোনো মেসেজ বা বিক্রয় পাননি। অবিলম্বে টাকা অপচয় বন্ধ করতে হবে।`;

    if (clicks === 0 || isCtrPoor) {
      diagnoses.push({
        type: 'creative',
        problemBangla: 'বিজ্ঞাপনের ছবি বা ভিডিও মানুষ খেয়াল করছে না (CTR কম)',
        explanationBangla: `আপনার CTR মাত্র ${ctr.toFixed(1)}%। অর্থাৎ মানুষ স্ক্রল করার সময় বিজ্ঞাপন দেখেও আকৃষ্ট হচ্ছে না বা থামছে না।`,
      });
      actionSteps.push('বর্তমান ছবিটি বা ভিডিওটি পরিবর্তন করুন। প্রথম ৩ সেকেন্ডে আকর্ষণীয় প্রশ্ন বা পণ্যের সমাধান দিয়ে নতুন ভিডিও দিন।');
    } else {
      diagnoses.push({
        type: 'offer_landing',
        problemBangla: 'মানুষ ক্লিক করছে কিন্তু ইনবক্সে এসে মেসেজ বা অর্ডার দিচ্ছে না',
        explanationBangla: `বিজ্ঞাপনে ${clicks} জন মানুষ ক্লিক করলেও কোনো মেসেজ আসেনি। এর অর্থ আপনার পণ্যের দাম বেশি মনে হচ্ছে, অথবা বিজ্ঞাপনের কথার সাথে পেজের অফারের মিল নেই।`,
      });
      actionSteps.push('পেজের মেসেঞ্জারে অটোমেটিক ওয়েলকাম মেসেজ ও অপশন বাটন সেট করুন। পণ্যের সাথে ফ্রি ডেলিভারি বা আকর্ষণীয় ছাড় যোগ করুন।');
    }

    actionSteps.push('অ্যাডটি পজ (Pause) করে নতুন একটি ক্রিয়েটিভ ও পরিষ্কার অফার দিয়ে পুনরায় চালু করুন।');
  } else if (isCtrPoor && conversions > 0) {
    // Scenario 2: Getting conversions, but low CTR (High CPM/Creative issue)
    status = 'yellow';
    headline = '🟡 বিজ্ঞাপনটি চলছে কিন্তু আরো অনেক ভালো ফল পাওয়া সম্ভব';
    summary = `আপনার বিজ্ঞাপন থেকে সেল আসছে, তবে ক্লিক করার হার (CTR ${ctr.toFixed(1)}%) কম হওয়ায় প্রতি ক্লিকে ও প্রতি মেসেজে অপ্রয়োজনীয় বেশি খরচ হচ্ছে।`;

    diagnoses.push({
      type: 'creative',
      problemBangla: 'বিজ্ঞাপনের থাম্বনেইল বা হুক দুর্বল',
      explanationBangla: 'অডিয়েন্সের একটি বড় অংশ বিজ্ঞাপনটি দেখে এড়িয়ে চলে যাচ্ছে। আকর্ষণ বাড়াতে পারলে একই খরচে দ্বিগুণ মেসেজ পাওয়া যাবে।',
    });

    actionSteps.push('চলমান অ্যাডটি চালু রেখেই পাশে নতুন একটি আকর্ষণীয় কাস্টমার রিভিউ ভিডিও দিয়ে ২য় একটি অ্যাডসেট টেস্ট করুন।');
    actionSteps.push('ক্যাপশনের প্রথম ২ লাইনে পরিষ্কার করে পণ্যের প্রধান সুবিধা ও অফার উল্লেখ করুন।');
  } else if (isCostPoor && conversions > 0) {
    // Scenario 3: High cost per conversion compared to profit margin
    status = 'yellow';
    headline = '🟡 প্রতি মেসেজে বা অর্ডারে অতিরিক্ত খরচ হচ্ছে';
    summary = `প্রতি মেসেজ/অর্ডারে আপনার গড়ে খরচ হচ্ছে ৳${Math.round(costPerConversion)}, যা আপনার লাভের মার্জিনকে কমিয়ে দিচ্ছে।`;

    diagnoses.push({
      type: 'audience_budget',
      problemBangla: 'অডিয়েন্স বা প্লেসমেন্ট অপ্টিমাইজেশন প্রয়োজন',
      explanationBangla: 'সম্ভবত আপনার টার্গেটিং খুব বেশি সংকীর্ণ অথবা ভুল অডিয়েন্স সিলেক্ট করা হয়েছে।',
    });

    actionSteps.push('টার্গেটিং সেটিংসে গিয়ে Advantage+ Audience বা ব্রড (Broad) টার্গেটিং ব্যবহার করুন।');
    actionSteps.push('মেসেঞ্জারে কাস্টমার চ্যাটে আসলে ৫ মিনিটের মধ্যে আন্তরিকভাবে কনভার্ট করার চেষ্টা করুন যাতে কনভার্শন রেট বাড়ে।');
  } else {
    // Scenario 4: Good results! Scale safely
    status = 'green';
    headline = '🟢 বিজ্ঞাপন চমৎকার পারফর্ম করছে! এবার বড় করার সময়';
    summary = `আপনার ক্যাম্পেইনে CTR (${ctr.toFixed(1)}%), প্রতি মেসেজের খরচ (৳${Math.round(costPerConversion)}) এবং ফলাফল বেশ স্বাস্থ্যকর!`;

    diagnoses.push({
      type: 'scaling',
      problemBangla: 'সবকিছু সঠিক ট্র্যাকে আছে (স্বাভাবিক প্রবৃদ্ধি)',
      explanationBangla: 'আপনার ক্রিয়েটিভ, অফার এবং অডিয়েন্স ম্যাচ করেছে। এখন সঠিকভাবে বাজেট বৃদ্ধি করে সেলস কয়েকগুণ বাড়ানো সম্ভব।',
    });

    actionSteps.push('নিরাপদ স্কেলিং করুন: বর্তমান দৈনিক বাজেট একবারে বেশি না বাড়িয়ে প্রতিদিন ২০% থেকে ৩০% বৃদ্ধি করুন।');
    actionSteps.push('একই ছবি/ভিডিও যেন মানুষ বারবার দেখে বিরক্ত না হয়, সেজন্য প্রতি সপ্তাহে একটি করে নতুন ছবি/ভিডিও অ্যাডসেটে যুক্ত করুন।');
    actionSteps.push('পণ্য প্যাকেজিং ও স্টক প্রস্তুত রাখুন যাতে হঠাৎ ডেলিভারির চাপ সামলানো যায়।');
  }

  return {
    status,
    headline,
    summary,
    metrics: {
      ctr: parseFloat(ctr.toFixed(2)),
      cpm: Math.round(cpm),
      costPerConversion: Math.round(costPerConversion),
      cpc: parseFloat(cpc.toFixed(2)),
    },
    benchmarks: {
      ctrStatus: isCtrGood ? 'good' : isCtrAverage ? 'average' : 'poor',
      cpmStatus: isCpmGood ? 'good' : isCpmAverage ? 'average' : 'poor',
      costStatus: isCostGood ? 'good' : isCostAverage ? 'average' : 'poor',
    },
    diagnoses,
    nextAction: {
      title: status === 'green' ? 'কীভাবে নিরাপদে স্কেল করবেন (Next Steps)' : 'আপনার পরবর্তী করণীয় পদক্ষেপ',
      actionSteps,
    },
  };
}
