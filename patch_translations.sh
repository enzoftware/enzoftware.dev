cat << 'INNER_EOF' > src/i18n/translations.ts
export type Locale = "en" | "es";

export interface Translations {
  hero: {
    name_line1: string;
    name_line2: string;
    subtitle: string;
    headlines?: string[];
    bio: string;
    badge_article_author: string;
    badge_kodeco: string;
    badge_flutter: string;
    badge_projects: string;
    bubble_hint: string;
    resume_cta: string;
    contact_cta: string;
    expertise_topics_label: string;
    badge_open_source: string;
  };
  social: {
    github: string;
    x: string;
    linkedin: string;
    label: string;
  };
  current: {
    label: string;
    badge: string;
  };
  modal: {
    close: string;
  };
  speaking_modal: {
    title: string;
  };
  publications_modal: {
    title: string;
  };
  projects_modal: {
    title: string;
    live_demo: string;
    source_code: string;
    private_repo: string;
  };
  signature: {
    role: string;
  };
  latest_post: {
    label: string;
    empty: string;
  };
  recent_activity: {
    label: string;
    more_repos: string;
    commits: string;
    fallback_date: string;
  };
  contact: {
    eyebrow: string;
    headline_1: string;
    headline_2: string;
    note: string;
  };
  cookie_consent: {
    banner_text: string;
    accept: string;
    decline: string;
    learn_more: string;
    manage_cookies: string;
    modal_title: string;
    modal_close: string;
    modal_intro: string;
    section_tracking_title: string;
    section_tracking_desc: string;
    section_not_done_title: string;
    section_not_done_desc: string;
    section_rights_title: string;
    section_rights_desc: string;
    status_label: string;
    status_accepted: string;
    status_declined: string;
    status_not_set: string;
    change_to_accept: string;
    change_to_decline: string;
  };
  lang_toggle: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    hero: {
      name_line1: "Enzo Lizama",
      name_line2: "Paredes",
      subtitle: "Senior Software Engineer",
      headlines: [
        "Senior Software Engineer — Flutter, Dart & TypeScript",
        "Mobile & full-stack engineer, from iOS/Android to cloud APIs",
        "Leading engineering teams from 0→1 to production scale",
        "End-to-end ownership — architecture, delivery & mentorship",
        "Conference speaker at FlutterConf LATAM",
        "Published technical author at Kodeco",
      ],
      bio: "7+ years building reliable, well-crafted software products end to end — from 0-to-1 launches to leading engineering teams at scale.",
      badge_article_author: "Article Author",
      badge_kodeco: "Kodeco Author",
      badge_flutter: "FlutterConf LATAM",
      badge_projects: "Featured Projects",
      badge_open_source: "Open Source",
      bubble_hint: "Click to explore",
      resume_cta: "View Resume",
      contact_cta: "Get in touch",
      expertise_topics_label: "Interactive expertise topics",
    },
    social: {
      github: "GitHub",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      label: "Social links",
    },
    current: {
      label: "Currently",
      badge: "Present",
    },
    modal: {
      close: "Close dialog",
    },
    speaking_modal: {
      title: "Conference Talks",
    },
    publications_modal: {
      title: "Publications & Articles",
    },
    projects_modal: {
      title: "Featured Projects",
      live_demo: "Live Demo",
      source_code: "Source Code",
      private_repo: "Private Repository",
    },
    signature: {
      role: "Software Engineer",
    },
    latest_post: {
      label: "Latest thought",
      empty: "Cooking up the next post...",
    },
    recent_activity: {
      label: "Recent activity",
      more_repos: "more repositories on GitHub",
      commits: "commits",
      fallback_date: "Recently",
    },
    contact: {
      eyebrow: "Let's connect",
      headline_1: "Have a project in mind?",
      headline_2: "Let's chat.",
      note: "Currently open to new opportunities.",
    },
    cookie_consent: {
      banner_text:
        "I use privacy-conscious analytics (PostHog) to understand site traffic and usage patterns. No personal info is sold or used for advertising.",
      accept: "Accept",
      decline: "Decline",
      learn_more: "Cookie Policy",
      manage_cookies: "Cookie Settings",
      modal_title: "Cookie & Privacy Policy",
      modal_close: "Close",
      modal_intro:
        "This portfolio uses cookies and client-side telemetry to understand how visitors interact with the site, helping me improve content and user experience.",
      section_tracking_title: "What is tracked",
      section_tracking_desc:
        "Only essential interaction data: page views, clicks on portfolio items, theme preferences, and broad geolocation (e.g., country level). All data is aggregated and anonymized via PostHog.",
      section_not_done_title: "What is never done",
      section_not_done_desc:
        "Your data is never sold, leased, or shared with third-party data brokers or advertisers. Tracking is strictly limited to site analytics.",
      section_rights_title: "Your choices & rights",
      section_rights_desc:
        "In accordance with GDPR and international privacy standards, analytics are only activated upon your explicit consent. You can withdraw or update your choice at any time below.",
      status_label: "Current preference:",
      status_accepted: "Accepted (analytics active)",
      status_declined: "Declined (analytics disabled)",
      status_not_set: "Not chosen yet",
      change_to_accept: "Enable analytics",
      change_to_decline: "Disable analytics",
    },
    lang_toggle: "ES",
  },
  es: {
    hero: {
      name_line1: "Enzo Lizama",
      name_line2: "Paredes",
      subtitle: "Ingeniero de Software Senior",
      headlines: [
        "Ingeniero de Software Senior — Flutter, Dart y TypeScript",
        "Ingeniero mobile y full-stack, de iOS/Android a APIs en la nube",
        "Liderando equipos de ingeniería de 0→1 hasta producción a escala",
        "Responsabilidad de punta a punta — arquitectura, entrega y mentoría",
        "Speaker en FlutterConf LATAM",
        "Autor técnico publicado en Kodeco",
      ],
      bio: "7+ años construyendo productos de software confiables y bien hechos, de punta a punta — desde lanzamientos 0-a-1 hasta liderar equipos de ingeniería a escala.",
      badge_article_author: "Autor de Artículos",
      badge_kodeco: "Autor en Kodeco",
      badge_flutter: "Speaker FlutterConf LATAM",
      badge_projects: "Proyectos Destacados",
      badge_open_source: "Código Abierto",
      bubble_hint: "Haz clic para explorar",
      resume_cta: "Ver Currículum",
      contact_cta: "Contáctame",
      expertise_topics_label: "Temas de experiencia interactivos",
    },
    social: {
      github: "GitHub",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      label: "Redes sociales",
    },
    current: {
      label: "Actualmente",
      badge: "Presente",
    },
    modal: {
      close: "Cerrar diálogo",
    },
    speaking_modal: {
      title: "Charlas y Conferencias",
    },
    publications_modal: {
      title: "Publicaciones y Artículos",
    },
    projects_modal: {
      title: "Proyectos Destacados",
      live_demo: "Demo en Vivo",
      source_code: "Código Fuente",
      private_repo: "Repositorio Privado",
    },
    signature: {
      role: "Ingeniero de Software",
    },
    latest_post: {
      label: "Última publicación",
      empty: "Cocinando el próximo post...",
    },
    recent_activity: {
      label: "Actividad reciente",
      more_repos: "más repositorios en GitHub",
      commits: "commits",
      fallback_date: "Recientemente",
    },
    contact: {
      eyebrow: "Conectemos",
      headline_1: "¿Tienes un proyecto en mente?",
      headline_2: "Hablemos.",
      note: "Actualmente abierto a nuevas oportunidades.",
    },
    cookie_consent: {
      banner_text:
        "Uso analíticas con enfoque en privacidad (PostHog) para entender el tráfico y uso del sitio. No se vende información personal ni se usa para publicidad.",
      accept: "Aceptar",
      decline: "Rechazar",
      learn_more: "Política de cookies",
      manage_cookies: "Configuración de cookies",
      modal_title: "Política de Cookies y Privacidad",
      modal_close: "Cerrar",
      modal_intro:
        "Este portafolio utiliza cookies y telemetría en el navegador para entender cómo los visitantes interactúan con el sitio y mejorar la experiencia de usuario.",
      section_tracking_title: "Qué se recopila",
      section_tracking_desc:
        "Solo datos esenciales de interacción: vistas de página, clics en elementos del portafolio, preferencias de tema y ubicación geográfica amplia (a nivel de país). Todos los datos son agregados y anonimizados a través de PostHog.",
      section_not_done_title: "Qué no se hace",
      section_not_done_desc:
        "Tus datos nunca se venden, alquilan ni comparten con terceros ni anunciantes. El rastreo se limita estrictamente a analíticas del sitio.",
      section_rights_title: "Tus opciones y derechos",
      section_rights_desc:
        "De acuerdo con el GDPR y estándares internacionales de privacidad, las analíticas solo se activan con tu consentimiento explícito. Puedes retirar o actualizar tu elección en cualquier momento a continuación.",
      status_label: "Preferencia actual:",
      status_accepted: "Aceptado (analíticas activas)",
      status_declined: "Rechazado (analíticas desactivadas)",
      status_not_set: "No se ha elegido aún",
      change_to_accept: "Activar analíticas",
      change_to_decline: "Desactivar analíticas",
    },
    lang_toggle: "EN",
  },
};
INNER_EOF
