/**
 * i18n iskeleti.
 *
 * Şu an varsayılan dil TR. EN ve RU sözlükleri burada hazır;
 * gelecekte route-level (örn. /en, /ru) ya da middleware tabanlı
 * çözüme geçildiğinde mevcut anahtar yapısı korunur.
 */

import type { Dictionary } from "./dictionaries/tr"
import { tr } from "./dictionaries/tr"
import { en } from "./dictionaries/en"
import { ru } from "./dictionaries/ru"

export type { Dictionary }

export const LOCALES = ["tr", "en", "ru"] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "tr"

export const LOCALE_LABELS: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
}

const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en,
  ru,
}

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
