/**
 * Bundled fallback when /api/config is unreachable.
 * Keep in sync with public/api/config.json (or import JSON via fetch only in build).
 */
export const defaultPortfolioConfig = {
  version: 1,
  branding: {
    logoText: "Akash",
    logoImageUrl: "",
  },
  themes: {
    dark: {
      background: "#07080d",
      backgroundSecondary: "#0e1018",
      backgroundElevated: "rgba(20, 24, 35, 0.72)",
      textPrimary: "#f4f5f7",
      textSecondary: "#a8b0c4",
      primary: "#7c9cff",
      secondary: "#a78bfa",
      accentWarm: "#fbbf77",
      border: "rgba(255, 255, 255, 0.08)",
      glass: "rgba(255, 255, 255, 0.04)",
      glassBorder: "rgba(255, 255, 255, 0.1)",
    },
    light: {
      background: "#f6f7fb",
      backgroundSecondary: "#eef0f7",
      backgroundElevated: "rgba(255, 255, 255, 0.85)",
      textPrimary: "#12141c",
      textSecondary: "#4b5569",
      primary: "#4f6ef7",
      secondary: "#7c3aed",
      accentWarm: "#ea580c",
      border: "rgba(15, 23, 42, 0.08)",
      glass: "rgba(255, 255, 255, 0.65)",
      glassBorder: "rgba(15, 23, 42, 0.08)",
    },
  },
  typography: {
    fontPrimary: "Outfit",
    fontSecondary: "Inter",
    baseFontSize: "16px",
    googleFontsFamilies: "Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600",
  },
  content: {
    authorName: "Akash Gaurav",
    authorRole: "Full Stack Developer",
    heroSubheading: "Full Stack Developer | React Specialist | Scalable UI Architect",
    authorDescription:
      "I build high-performance, scalable web applications with modern UI/UX and clean architecture. Passionate about creating smooth, interactive, and user-focused digital experiences.",
    contactEmail: "akashgaurav140@gmail.com",
    contactPhone: "6280484227",
    contactLocation: "Himachal Pradesh, India",
    heroTypingPhrases: [
      "scalable web applications.",
      "CRM-grade dashboards.",
      "clean React architecture.",
      "smooth user experiences.",
    ],
    socialLinks: {
      github: "https://github.com/Akash-1508",
      linkedin: "https://linkedin.com/in/",
      twitter: "",
    },
  },
};
