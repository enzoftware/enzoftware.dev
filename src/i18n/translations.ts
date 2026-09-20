export type Locale = "en" | "es";

export interface Translations {
  hero: {
    name_line1: string;
    name_line2: string;
    subtitle: string;
    bio: string;
    badge_kodeco: string;
    badge_flutter: string;
    badge_location: string;
  };
  experience: { title: string; years: string; current: string };
  current_job: { label: string };
  working_on: { label: string; empty: string };
  social: { title: string };
  contact: { label: string };
  lang_toggle: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    hero: {
      name_line1: "Enzo Lizama",
      name_line2: "Paredes",
      subtitle: "Senior Mobile Engineer · Flutter & Android",
      bio: "7+ years turning product goals into polished, maintainable apps across iOS and Android.",
      badge_kodeco: "Kodeco Author",
      badge_flutter: "FlutterConf LATAM Speaker",
      badge_location: "Lima, Peru",
    },
    experience: { title: "Experience", years: "7+ yrs", current: "current" },
    current_job: { label: "Currently at" },
    working_on: { label: "Working on", empty: "Nothing public right now" },
    social: { title: "Find me on" },
    contact: { label: "Contact me" },
    lang_toggle: "ES",
  },
  es: {
    hero: {
      name_line1: "Enzo Lizama",
      name_line2: "Paredes",
      subtitle: "Senior Mobile Engineer · Flutter & Android",
      bio: "7+ años convirtiendo metas de producto en apps pulidas y mantenibles para iOS y Android.",
      badge_kodeco: "Autor en Kodeco",
      badge_flutter: "Speaker FlutterConf LATAM",
      badge_location: "Lima, Perú",
    },
    experience: { title: "Experiencia", years: "7+ años", current: "actual" },
    current_job: { label: "Actualmente en" },
    working_on: { label: "Trabajando en", empty: "Nada público por ahora" },
    social: { title: "Encuéntrame en" },
    contact: { label: "Contáctame" },
    lang_toggle: "EN",
  },
};
