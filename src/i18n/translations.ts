export type Locale = "en" | "es";

export interface Translations {
  hero: {
    name_line1: string;
    name_line2: string;
    subtitle: string;
    bio: string;
    badge_kodeco: string;
    badge_flutter: string;
  };
  current: { label: string; cta: string };
  modal: { title: string; close: string };
  signature: { role_at: string };
  latest_post: { label: string; empty: string };
  recent_activity: { label: string; empty: string };
  social: { title: string };
  contact: {
    eyebrow: string;
    headline_1: string;
    headline_2: string;
    note: string;
  };
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
    },
    current: { label: "Currently at", cta: "View full experience" },
    modal: { title: "Full experience", close: "Close" },
    signature: { role_at: "at" },
    latest_post: { label: "Latest post", empty: "Nothing published yet" },
    recent_activity: { label: "Working on", empty: "Nothing public right now" },
    social: { title: "Find me on" },
    contact: {
      eyebrow: "Got a mobile app to ship?",
      headline_1: "Let's build something",
      headline_2: "worth shipping.",
      note: "Usually replies within a day · Lima, Peru (GMT-5)",
    },
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
    },
    current: { label: "Actualmente en", cta: "Ver experiencia completa" },
    modal: { title: "Experiencia completa", close: "Cerrar" },
    signature: { role_at: "en" },
    latest_post: { label: "Último artículo", empty: "Nada publicado aún" },
    recent_activity: {
      label: "Trabajando en",
      empty: "Nada público por ahora",
    },
    social: { title: "Encuéntrame en" },
    contact: {
      eyebrow: "¿Tienes una app móvil por lanzar?",
      headline_1: "Construyamos algo",
      headline_2: "que valga la pena.",
      note: "Normalmente respondo en un día · Lima, Perú (GMT-5)",
    },
    lang_toggle: "EN",
  },
};
