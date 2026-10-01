const banglaDigitsMap: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const englishDigitsMap: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English digits in a number or string to Bengali digits
 */
export function toBengaliDigits(input: number | string | null | undefined): string {
  if (input === null || input === undefined || input === '') return '';
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => banglaDigitsMap[digit] || digit);
}

/**
 * Converts Bengali digits in a string to standard English digits
 */
export function toEnglishDigits(input: string): string {
  if (!input) return '';
  return input.replace(/[০-৯]/g, (digit) => englishDigitsMap[digit] || digit);
}

/**
 * Formats a number with comma separators (e.g. 15000 -> 15,000)
 */
export function formatNumberWithCommas(num: number): string {
  if (isNaN(num)) return '0';
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Formats BDT currency with symbol ৳ and supports user's Bengali numeral preference
 */
export function formatBDT(
  amount: number | null | undefined,
  useBengaliDigits: boolean = true,
  withSymbol: boolean = true
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return withSymbol ? (useBengaliDigits ? '৳ ০' : '৳ 0') : '0';
  }

  const rounded = Math.round(amount);
  const formattedStr = rounded.toLocaleString('en-US');
  const finalDigits = useBengaliDigits ? toBengaliDigits(formattedStr) : formattedStr;

  return withSymbol ? `৳ ${finalDigits}` : finalDigits;
}

/**
 * Formats decimal numbers (like CTR %, ROAS)
 */
export function formatDecimal(
  value: number,
  decimals: number = 1,
  useBengaliDigits: boolean = true
): string {
  if (isNaN(value)) return '0';
  const fixed = value.toFixed(decimals);
  return useBengaliDigits ? toBengaliDigits(fixed) : fixed;
}
