/**
 * Company name translations
 * When language is Vietnamese, "Hang Ky Investment Group" becomes "Hằng Kỷ Investment Group"
 */

type Lang = "en" | "vi" | "ja";

export function getCompanyName(lang: Lang | string = "en"): string {
  const normalized = typeof lang === "string" ? lang.toLowerCase().slice(0, 2) : lang;
  if (normalized === "vi") return "Hằng Kỷ Investment Group";
  if (normalized === "ja") return "Hang Ky Investment Group"; // Keep English for Japanese
  return "Hang Ky Investment Group";
}

export function getCompanyNameFull(lang: Lang | string = "en"): string {
  const normalized = typeof lang === "string" ? lang.toLowerCase().slice(0, 2) : lang;
  if (normalized === "vi") return "Hằng Kỷ Investment Group Joint Stock Company";
  if (normalized === "ja") return "Hang Ky Investment Group Joint Stock Company";
  return "Hang Ky Investment Group Joint Stock Company";
}

export function getCompanyNameShort(lang: Lang | string = "en"): string {
  const normalized = typeof lang === "string" ? lang.toLowerCase().slice(0, 2) : lang;
  if (normalized === "vi") return "Hằng Kỷ";
  return "Hang Ky";
}

/**
 * Client-side hook to get company name based on current document language
 */
export function useCompanyName(): string {
  if (typeof window === "undefined") return "Hang Ky Investment Group";
  const lang = document.documentElement.getAttribute("lang") || "en";
  return getCompanyName(lang);
}
