export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Clipp",
    role: "Senior Mobile Engineer",
    period: "Oct 2025 – Feb 2026",
    location: "Remote, NY",
    current: true,
  },
  {
    company: "Somnio Software",
    role: "Senior Flutter Developer",
    period: "Nov 2024 – Jun 2025",
    location: "Remote, UY",
    current: false,
  },
  {
    company: "Very Good Ventures",
    role: "Senior Flutter Developer",
    period: "Feb – Jun 2024",
    location: "Remote, US",
    current: false,
  },
  {
    company: "Superformula",
    role: "Senior Software Engineer",
    period: "Nov 2021 – Jan 2024",
    location: "Remote, US",
    current: false,
  },
];
