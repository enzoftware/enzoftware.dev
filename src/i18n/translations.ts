export type Locale = "en" | "es";

export interface Translations {
  hero: {
    name_line1: string;
    name_line2: string;
    subtitle: string;
    headlines: string[];
    bio: string;
    badge_kodeco: string;
    badge_article_author: string;
    badge_flutter: string;
    badge_projects: string;
    bubble_hint: string;
    resume_cta: string;
    contact_cta: string;
    expertise_topics_label: string;
  };
  current: { label: string; cta: string };
  modal: {
    title: string;
    close: string;
    linkedin_cta: string;
    highlights_label: string;
    tech_label: string;
  };
  speaking_modal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    watch: string;
    slides: string;
    close: string;
  };
  publications_modal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    read: string;
    close: string;
  };
  articles_modal: {
    title: string;
    filter_all: string;
    empty_state: string;
    close: string;
  };
  projects_modal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    architecture_label: string;
    highlights_label: string;
    tech_label: string;
    view_web: string;
    view_github: string;
    close: string;
  };
  signature: { role_at: string };
  latest_post: { label: string; empty: string };
  recent_activity: { label: string; empty: string };
  social: { title: string };
  contact: {
    headline_1: string;
    headline_2: string;
    note: string;
    availability_status: string;
    copy_email: string;
    copy_email_success: string;
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
      badge_kodeco: "Kodeco Author",
      badge_article_author: "Article Author",
      badge_flutter: "FlutterConf LATAM Speaker",
      badge_projects: "Featured Projects",
      bubble_hint: "Click to explore",
      resume_cta: "View Resume",
      contact_cta: "Get in touch",
      expertise_topics_label: "Interactive expertise topics",
    },
    current: { label: "Currently at", cta: "View full experience" },
    modal: {
      title: "Full experience",
      close: "Close",
      linkedin_cta: "See full experience on LinkedIn",
      highlights_label: "Key Impact & Contributions",
      tech_label: "Technologies",
    },
    speaking_modal: {
      eyebrow: "Community & Leadership",
      title: "Speaking & Talks",
      subtitle:
        "Conference talks and deep dives on Flutter, architecture, and accessibility.",
      watch: "Watch Recording",
      slides: "View Slides",
      close: "Close",
    },
    publications_modal: {
      eyebrow: "Technical Author & Educator",
      title: "Publications & Writing",
      subtitle:
        "Technical tutorials, architecture guides, and articles on mobile engineering.",
      read: "Read Article",
      close: "Close",
    },
    articles_modal: {
      title: "Latest Articles",
      filter_all: "All",
      empty_state: "No articles found for this source.",
      close: "Close",
    },
    projects_modal: {
      eyebrow: "Engineering Case Studies",
      title: "Featured Projects",
      subtitle:
        "Architectural case studies and production applications built and scaled.",
      architecture_label: "Architecture & Decisions",
      highlights_label: "Key Outcomes & Scale",
      tech_label: "Stack & Tools",
      view_web: "Visit Website",
      view_github: "View GitHub",
      close: "Close",
    },
    signature: { role_at: "at" },
    latest_post: { label: "Latest post", empty: "Nothing published yet" },
    recent_activity: {
      label: "Latest commits",
      empty: "No public commits recently",
    },
    social: { title: "Find me on" },
    contact: {
      headline_1: "Let's build something",
      headline_2: "worth shipping.",
      note: "Usually replies within a day · Lima, Peru (GMT-5)",
      availability_status: "🟢 Available for select advisory & speaking",
      copy_email: "Copy email",
      copy_email_success: "Copied hi@enzoftware.dev to clipboard!",
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
        "When you accept, PostHog collects anonymous usage metrics, page views, referring sites, and device/browser metadata. No passwords, financial information, or advertising profiles are ever collected.",
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
      badge_kodeco: "Autor en Kodeco",
      badge_article_author: "Autor de Artículos",
      badge_flutter: "Speaker FlutterConf LATAM",
      badge_projects: "Proyectos Destacados",
      bubble_hint: "Haz clic para explorar",
      resume_cta: "Ver Currículum",
      contact_cta: "Contáctame",
      expertise_topics_label: "Temas de experiencia interactivos",
    },
    current: { label: "Actualmente en", cta: "Ver experiencia completa" },
    modal: {
      title: "Experiencia completa",
      close: "Cerrar",
      linkedin_cta: "Ver experiencia completa en LinkedIn",
      highlights_label: "Impacto y Contribuciones Clave",
      tech_label: "Tecnologías",
    },
    speaking_modal: {
      eyebrow: "Comunidad y Liderazgo",
      title: "Conferencias y Charlas",
      subtitle:
        "Charlas y presentaciones sobre Flutter, arquitectura y accesibilidad.",
      watch: "Ver Grabación",
      slides: "Ver Diapositivas",
      close: "Cerrar",
    },
    publications_modal: {
      eyebrow: "Autor Técnico y Educador",
      title: "Publicaciones y Artículos",
      subtitle:
        "Tutoriales técnicos, guías de arquitectura y artículos sobre desarrollo móvil.",
      read: "Leer Artículo",
      close: "Cerrar",
    },
    articles_modal: {
      title: "Últimos Artículos",
      filter_all: "Todos",
      empty_state: "No se encontraron artículos para esta fuente.",
      close: "Cerrar",
    },
    projects_modal: {
      eyebrow: "Casos de Estudio de Ingeniería",
      title: "Proyectos Destacados",
      subtitle:
        "Casos de estudio de arquitectura y aplicaciones en producción escaladas.",
      architecture_label: "Arquitectura y Decisiones",
      highlights_label: "Resultados e Impacto Clave",
      tech_label: "Stack y Herramientas",
      view_web: "Visitar Sitio",
      view_github: "Ver GitHub",
      close: "Cerrar",
    },
    signature: { role_at: "en" },
    latest_post: { label: "Último artículo", empty: "Nada publicado aún" },
    recent_activity: {
      label: "Últimos commits",
      empty: "Sin commits públicos recientes",
    },
    social: { title: "Encuéntrame en" },
    contact: {
      headline_1: "Construyamos algo",
      headline_2: "que valga la pena.",
      note: "Normalmente respondo en un día · Lima, Perú (GMT-5)",
      availability_status: "🟢 Disponible para asesorías y charlas selectas",
      copy_email: "Copiar email",
      copy_email_success: "¡Copiado hi@enzoftware.dev al portapapeles!",
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
        "Si aceptas, PostHog registra métricas de uso anónimas, vistas de página, sitios de referencia y metadatos de navegador/dispositivo. Jamás se recopilan contraseñas ni información publicitaria.",
      section_not_done_title: "Lo que nunca hacemos",
      section_not_done_desc:
        "Tus datos nunca se venden, alquilan ni comparten con intermediarios publicitarios. El rastreo se limita exclusivamente a analítica del sitio.",
      section_rights_title: "Tus derechos y preferencias",
      section_rights_desc:
        "De acuerdo con el RGPD y estándares de privacidad, las analíticas solo se activan con tu consentimiento explícito. Puedes cambiar o revocar tu elección en cualquier momento.",
      status_label: "Preferencia actual:",
      status_accepted: "Aceptado (analítica activa)",
      status_declined: "Rechazado (analítica desactivada)",
      status_not_set: "Aún sin seleccionar",
      change_to_accept: "Activar analítica",
      change_to_decline: "Desactivar analítica",
    },
    lang_toggle: "EN",
  },
};
